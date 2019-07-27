# 🔗 gio
> A handy CLI tool to shorten github.com URLs.

## Installation

Install [Nodejs](https://nodejs.org) & then

```sh
npm i -g gio-cli
```

## Usage

To shorten a GitHub URL, just run:
```sh
$ gi <githuburl>
```
It outputs a git.io URL.

To get a custom short link, for example, to shorten [`https://github.com/satyarohith/shark`](https://github.com/satyarohith/shark) to [`git.io/sharkcli`](git.io/sharkcli), run as follows:
```sh
$ gi https://github.com/satyarohith/shark sharkcli
```

#### If your clipboard has a `github.com` URL.

To shorten the copied URL, run:
```sh
$ gi
```

To get a custom short link for the copied URL, run:
```sh
$ gi <code>
```

## Built with

- [chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [clipboardy](https://github.com/sindresorhus/clipboardy) - Access the system clipboard.
- [request](https://github.com/request/request) - Simplified HTTP request client.

## License

MIT © [Satya Rohith](https://satyarohith.com)
