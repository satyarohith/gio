#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const request = require('request');

// process.argv has two values by default so slice them
let args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log(`To shorten a GitHub URL, just run:
$ gio <github-link>
It outputs a git.io URL.

To get a custom short link, for example, to shorten https://github.com/satyarohith/shark to git.io/sharkcli, run as follows:
$ gio https://github.com/satyarohith/shark sharkcli


If your clipboard has a github.com URL.

To shorten the copied URL, run:
$ gio

To get a custom short link for the copied URL, run:
$ gio <code>
`);
  process.exit();
}

if (args[0] === '--version' || args[0] === '-v') {
  console.log(require('./package.json').version);
  console.log('node', process.version);
  process.exit();
}

const clipboard = clipboardy.readSync();

const generateRequestBody = () => {
  let requestBody = {
    url: '',
    code: ''
  };

  if (args.length === 2) {
    // gio githuburl code OR gio code githuburl
    requestBody.url = args[0].includes('github.com') ? args[0] : args[1];
    requestBody.code = args[1].includes('github.com') ? args[0] : args[1];
  } else if (args.length === 1) {
    if (args[0].includes('github.com')) {
      requestBody.url = args[0];
      delete requestBody.code;
    } else {
      const clipboard = clipboardy.readSync();
      if (clipboard.includes('github.com')) requestBody.url = clipboard;
      requestBody.code = args[0];
    }
  } else if (clipboard.includes('github.com')) {
    requestBody.url = clipboard;
    delete requestBody.code;
  }

  return requestBody;
};

const createUrlAndLog = requestBody => {
  request.post({
    url: 'https://git.io',
    formData: requestBody,
  }, (err, {headers}, body) => {
    if (err) {
      console.log(
        'Error occured while shortening the URL:',
        chalk.red(err)
      );
      process.exit(1);
    }
    clipboardy.writeSync(String(headers.location));
    console.log(
      `${chalk.green.underline.bold(headers.location)} (${chalk.gray(
        'copied to clipboard!'
      )})`
    );
    console.log(chalk.gray(body));
  })
};

const requestBody = generateRequestBody();

if (requestBody.url.includes('github.com') === true) {
  createUrlAndLog(requestBody);
} else {
  console.error(('Please pass a GitHub URL as first argument or have it in your clipboard.'));
}
