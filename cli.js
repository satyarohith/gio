#!/usr/bin/env node
'use strict';

// Packages
const curl = new (require('curl-request'))();
const loadJSON = require('load-json-file');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

// TODO: check whether the dir has package.json file
const packageFile = process.cwd() + '/package.json';
const json = loadJSON.sync(packageFile);
let repositoryUrl = json.repository;
let packageName = json.name;

// process.argv has two values by default so slice them
let argv = process.argv.slice(2);

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
  if (argv.length > 0 && !clipboardUrl) {
    // gio githublink
    if (argv[0].includes('https://github.com') && !argv[1]) {
      requestBody.url = argv[0];
      delete requestBody.code;
      return requestBody;
    } else if (argv[0].includes('https://github.com') && argv[1]) {
      // gio githublink code
      requestBody.url = argv[0];
      requestBody.code = argv[1];
      return requestBody;
    } else if (argv[0] && !argv[1]) {
      requestBody.url = repositoryUrl;
      requestBody.code = argv[0];
      return requestBody;
    }
  } else if (argv[0] && !argv[1] && clipboardUrl) {
    // gio code (clipboard)
    requestBody.url = clipboardUrl;
    requestBody.code = argv[0];
    return requestBody;
  } else if (clipboardUrl && !argv[0]) {
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
  curl
    .setBody(requestBody)
    .post('https://git.io')
    .then(({ statusCode, body, headers }) => {
      if (statusCode === 422) {
        console.log(body);
        process.exit();
      } else {
        // copy url to clipboard
        clipboardy.writeSync(headers.location);
        console.log(
          `${chalk.green.underline.bold(headers.location)} (${chalk.gray(
            'copied to clipboard!'
          )})`
        );
        console.log(chalk.gray(body));
      }
    })
    .catch(error => {
      console.log(
        'Error occured while creating url:',
        chalk.red(error.message)
      );
    });
};

const curlBody = generateRequestBody();
if (curlBody.url.includes('github.com')) {
  createUrl(curlBody);
} else {
  console.error(chalk.red('Make sure you are using a github repository'));
}
