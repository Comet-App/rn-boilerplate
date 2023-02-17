const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

let envFile = '.env';
if (process.argv.length === 4) {
  if (process.argv[3].toString().toLowerCase() === 'prod') {
    envFile = '.prod.env';
    console.log(
      ` ===========================================================================================\n`,
      '|| Using .prod.env                                                                        ||\n',
      `===========================================================================================\n`,
    );
  } else if (process.argv[3].toString().toLowerCase() === 'test') {
    envFile = '.test.env';
    console.log(
      ` ===========================================================================================\n`,
      '|| Using .test.env                                                                        ||\n',
      `===========================================================================================\n`,
    );
  } else {
    console.warn(
      ` ===========================================================================================\n`,
      '|| No `ENV` or invalid (possible values: DEV, TEST, PROD) passed,, using DEV as default  ||\n',
      `===========================================================================================\n`,
    );
  }
} else {
  console.warn(
    ` ==========================================================================================\n`,
    '|| No `ENV` or invalid (possible values: DEV, TEST, PROD) passed,, using DEV as default  ||\n',
    `===========================================================================================\n`,
  );
}

envFile = path.join(process.cwd(), envFile);
try {
  if (!fs.existsSync(envFile)) {
    throw new Error(`⚠️ Couldn't find ${envFile} file ⚠️`);
  }
} catch (err) {
  console.error(err);
}

if (!dotenv) {
  throw new Error('Unable to use dot env lib');
}

const envFound = dotenv.config({path: envFile});
if (!envFound) {
  // This error should crash whole process
  throw new Error(`⚠️ Couldn't find ${envFile}file ⚠️`);
}

// Load version from package json
const packageJSONPath = path.join(process.cwd(), 'package.json');
const {version} = require(packageJSONPath);

let versionHash = 'xxxxxxx';
const gitPath = path.join(process.cwd(), '.git');
try {
  if (!fs.existsSync(gitPath)) {
    console.log('Cannot find .git folder skipping versioning tag');
  } else {
    // Load last git commit
    versionHash = require('child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();
    if (versionHash.length > 6) {
      versionHash = versionHash.slice(0, 7);
    }
  }
} catch (err) {}

const current_timestamp = parseInt(new Date().getTime() / 1000);

// Build config.json
const config = {
  ENV: process.env.ENV || 'DEV',
  VERSION: process.env.VERSION || version,
  VERSION_HASH: process.env.VERSION_HASH || versionHash,
  API_SUFFIX: process.env.API_SUFFIX || '',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT) || 5000,
  BUILD_TIMESTAMP: parseInt(process.env.BUILD_TIMESTAMP) || current_timestamp,
  API_URL: process.env.API_URL,
  APP_DOMAIN_NAME: process.env.APP_DOMAIN_NAME,
  APP_PACKAGE: process.env.APP_PACKAGE,
};

let template = `
export default ${JSON.stringify(config)}
`;

fs.writeFile('./src/constants/config.ts', template, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Configuration file has generated');
});
