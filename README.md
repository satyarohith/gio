# 🔗 gio
> A handy CLI tool to shorten github.com URLs.

## Installation

Install [Nodejs](https://nodejs.org) & then

```sh
npm i -g gio-cli
```

## Usage

> Note: If your machine has `gio` reserved, you can also access this tool with `gi`.

To shorten a GitHub URL, just run:
```sh
$ gio <githuburl>
```
It outputs a git.io URL.

To get a custom short link, for example, to shorten [`https://github.com/satyarohith/shark`](https://github.com/satyarohith/shark) to [`git.io/sharkcli`](git.io/sharkcli), run as follows:
```sh
$ gio https://github.com/satyarohith/shark sharkcli
```

#### If your clipboard has a `github.com` URL.

To shorten the copied URL, run:
```sh
$ gio
```

To get a custom short link for the copied URL, run:
```sh
$ gio <code>
```

## Built with

- [chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [clipboardy](https://github.com/sindresorhus/clipboardy) - Access the system clipboard.
- [request](https://github.com/request/request) - Simplified HTTP request client.

## License

MIT © [Satya Rohith](https://satyarohith.com)
