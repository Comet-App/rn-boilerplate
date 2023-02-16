# Project Name

A boilerplate code for react native projects.

## Table of Contents

Include a table of contents to help readers quickly find the information they need. This could include things like:

- Pre-requisites installations
- Setup
- Run
- Screenshots

## Pre-requisites installations

**Step 1: Node setup (using [nvm](https://github.com/nvm-sh/nvm))**

If you don't already have nvm installed, you can download and install it from the official website: https://github.com/nvm-sh/nvm. Follow the installation instructions for your operating system.

**Step 2: Install Node.js using nvm**

After installing nvm, you can use it to install a specific version of Node.js. Open your terminal or command prompt and run the following command to install the latest LTS (Long Term Support) version of Node.js:

```
nvm install --lts
```

Alternatively, you can install a specific version of Node.js by running the following command:

```
nvm install x.x.x
```

Replace "x.x.x" with the version number of Node.js you want to install.

**Step 3: Set the default Node.js version**

By default, nvm will use the latest version of Node.js that you have installed. If you want to set a specific version of Node.js as the default for all projects, run the following command:

```
nvm alias default x.x.x
```

Replace "x.x.x" with the version number of Node.js you want to use.

**Step 4: Install Yarn**

To install Yarn, you can use npm. Open your terminal or command prompt and run the following command:

```
npm install -g yarn
```

This will install Yarn globally on your machine.

**Step 5: Install React Native CLI**

Next, you need to install the React Native command line interface (CLI) using npm. Open your terminal or command prompt and run the following command:

```
npm install -g react-native-cli
```

## Setup

**Step 1: Clone project**

Using ssh

```
git clone git@github.com:Comet-App/rn-boilerplate.git
```

or http

```
git clone https://github.com/Comet-App/rn-boilerplate.git
```

**Step 2: Change the current directory**

```
cd <cloned-project-path>
```

**Step 3: Copy example.env**

```
cp example.env .env
```

**Step 4: Install required libaries**

```
yarn
```

## Run

Open a terminal window and start the metro server

```
yarn start
```

In second terminal, start project for android or ios

```
yarn android/ios
```

## Screenshots

![App](https://raw.githubusercontent.com/Comet-App/rn-boilerplate/master/screenshots/app.png)
