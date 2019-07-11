# 🔗 gio
> A handy CLI tool to shorten github.com links.

## Installation

Install [Nodejs](https://nodejs.org) & then
```
npm i -g gio-cli
```

## Usage

> Note: If your machine has `gio` reserved, you can also access this tool with `gi`.

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

## Built with

- [chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [load-json-file](https://github.com/sindresorhus/load-json-file) - Read and parse a JSON file.
- [clipboardy](https://github.com/sindresorhus/clipboardy) - Access the system clipboard.
- [request](https://github.com/request/request) - Simplified HTTP request client.

## License

MIT © [Satya Rohith](https://satya.tech)
