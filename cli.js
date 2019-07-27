#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const clipboardy = require('clipboardy');
const request = require('request');

// Slice the first two values since we don't need them.
const args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log(`To shorten a GitHub URL, just run:
$ gi <github-link>
It outputs a git.io URL.

To get a custom short link, for example, to shorten https://github.com/satyarohith/shark to git.io/sharkcli, run as follows:
$ gi https://github.com/satyarohith/shark sharkcli

If your clipboard has a github.com URL.

To shorten the copied URL, run:
$ gi

To get a custom short link for the copied URL, run:
$ gi <code>
`);
  process.exit();
}

const isGitHubURL = URL => {
  if (URL.includes('github.com') || URL.includes('githubusercontent.com')) {
    return true;
  }

  return false;
};

if (args[0] === '--version' || args[0] === '-v') {
  console.log(require('./package.json').version);
  console.log('node', process.version);
  process.exit();
}

const clipboard = clipboardy.readSync();

const generateRequestBody = () => {
  const requestBody = {
    url: '',
    code: ''
  };

  if (args.length === 2) {
    // Commands: gi githuburl code OR gi code githuburl
    requestBody.url = isGitHubURL(args[0]) ? args[0] : args[1];
    requestBody.code = isGitHubURL(args[1]) ? args[0] : args[1];
  } else if (args.length === 1) {
    if (isGitHubURL(args[0])) {
      requestBody.url = args[0];
      delete requestBody.code;
    } else {
      if (isGitHubURL(clipboard)) {
        requestBody.url = clipboard;
      }

      requestBody.code = args[0];
    }
  } else if (isGitHubURL(clipboard)) {
    requestBody.url = clipboard;
    delete requestBody.code;
  }

  return requestBody;
};

const createUrlAndLog = requestBody => {
  request.post(
    {
      url: 'https://git.io',
      formData: requestBody
    },
    (err, {headers}, body) => {
      if (err) {
        console.log('Error occured while shortening the URL:', chalk.red(err));
        process.exit(1);
      }

      clipboardy.writeSync(String(headers.location));
      console.log(
        `${chalk.green.underline.bold(headers.location)} (${chalk.gray(
          'copied to clipboard!'
        )})`
      );
      console.log(chalk.gray(body));
    }
  );
};

const requestBody = generateRequestBody();

if (isGitHubURL(requestBody.url) === true) {
  createUrlAndLog(requestBody);
} else {
  console.error(
    'Please pass a GitHub URL as first argument or have it in your clipboard.'
  );
}
