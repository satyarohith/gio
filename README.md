# 🔗 gio

> gio is in development
## Installation

Install [Nodejs](https://nodejs.org) & then
```
npm i -g gio-cli
```

## Usage

### If you are in a directory which has `package.json` file.
 ```
 $ gio
 ```
When run, `gio` uses `repository` field as base url and `name` field to generate a `git.io/<name>` link.


### Global
#### If you have copied a github link to clipboard.
```
$ gio
```
When run, `gio` uses copied url as base url and generates a `git.io/<random>` link.

```
$ gio desired-link
```
When run, `gio` uses copied url as base url and first parameter as desired link.  `git.io/<desired-link>` link.

#### You don't have any github link in the clipboard.
```
$ gio github-link desired-link
```
When run, `gio` uses first parameter as base url and second parameter as desired link.

```
$ gio github-link
```
When run, `gio` uses first parameter as base url and generates a `git.io/<random>` link.


