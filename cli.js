#!/usr/bin/env node
'use strict';
const curl = new (require('curl-request'))();
const loadJSON = require('load-json-file');
const chalk = require('chalk');

const packageFile = process.cwd() + '/package.json';

let repositoryUrl;
let packageName;
let json;

json = loadJSON.sync(packageFile);
repositoryUrl = json.repository;
packageName = json.name;

let requestBody = {};
if (repositoryUrl.includes('github.com')) {
  curl
    .setBody(requestBody)
    .post('https://git.io')
    .then(({ statusCode, body, headers }) => {
      console.log('StatusCode:', statusCode);
      if (statusCode === 422) {
        console.log(
          `URL ${chalk.green('https://git.io/' + packageName)} already exists!`
        );
        process.exit();
      }
      console.log(
        `${chalk.blue.underline(headers.location)} for ${chalk.magenta(body)}`
      );
    })
    .catch(e => {
      console.log('Error occured while creating', e);
    });
} else {
  console.error('Make sure you are using a github repository');
}
