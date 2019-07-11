#!/usr/bin/env node
'use strict';

const path = require('path');
const loadJSON = require('load-json-file');
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const request = require('request');

// TODO: check whether the dir has package.json file
const packageFile = path.normalize(`${process.cwd()}/package.json`);
const json = loadJSON.sync(packageFile);
let repositoryUrl = json.repository;
let packageName = json.name;

// process.argv has two values by default so slice them
let args = process.argv.slice(2);

// read clipboard
const clipboard = clipboardy.readSync();

let clipboardUrl = '';
// check if clipboard has a github link
if (clipboard.includes('github.com')) {
  clipboardUrl = clipboard;
}

const generateRequestBody = () => {
  let requestBody = {
    url: '',
    code: ''
  };
  if (args.length > 0 && !clipboardUrl) {
    // gio githublink
    if (args[0].includes('https://github.com') && !args[1]) {
      requestBody.url = args[0];
      delete requestBody.code;
      return requestBody;
    } else if (args[0].includes('https://github.com') && args[1]) {
      // gio githublink code
      requestBody.url = args[0];
      requestBody.code = args[1];
      return requestBody;
    } else if (args[0] && !args[1]) {
      requestBody.url = repositoryUrl;
      requestBody.code = args[0];
      return requestBody;
    }
  } else if (args[0] && !args[1] && clipboardUrl) {
    // gio code (clipboard)
    requestBody.url = clipboardUrl;
    requestBody.code = args[0];
    return requestBody;
  } else if (clipboardUrl && !args[0]) {
    // gio (clipboardUrl)
    requestBody.url = clipboardUrl;
    delete requestBody.code;
    return requestBody;
  } else {
    // gio
    requestBody.url = repositoryUrl;
    requestBody.code = packageName;
    return requestBody;
  }
};

const createUrl = requestBody => {
  request.post({
    url: 'https://git.io',
    formData: requestBody,
  }, (err, { headers }, body) => {
    if (err) {
      console.log(
        'Error occured while creating url:',
        chalk.red(err)
      );
      process.exit();
    }

    // copy url to clipboard
    clipboardy.writeSync(headers.location);
    console.log(
      `${chalk.green.underline.bold(headers.location)} (${chalk.gray(
        'copied to clipboard!'
      )})`
    );
    console.log(chalk.gray(body));
  })
};

const requestBody = generateRequestBody();
if (requestBody.url.includes('github.com')) {
  createUrl(requestBody);
} else {
  console.error(chalk.red('Make sure you are using a github.com URL'));
}
