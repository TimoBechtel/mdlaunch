<h1 align="center">📄🚀<br>mdlaunch</h1>
<h3 align="center">Quickly spin up a HTML presentation from any existing markdown file.</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/mdlaunch" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/mdlaunch.svg">
  </a>
  <a href="https://github.com/TimoBechtel/mdlaunch/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/TimoBechtel/mdlaunch" />
  </a>
</p>
<p align="center">
  ·
  <a href="https://github.com/TimoBechtel/mdlaunch#readme">Homepage</a>
  ·
  <a href="https://timobechtel.github.io/mdlaunch/">View Demo</a>
  ·
  <a href="https://github.com/TimoBechtel/mdlaunch/issues">Report Bug / Request Feature</a>
  ·
</p>

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Examples](#examples)
- [Test](#run-tests)
- [Contact](#contact)
- [Contributing](#Contributing)
- [License](#license)

## About

**▶ [View this readme as slideshow generated with mdlaunch!](https://timobechtel.github.io/mdlaunch/)**

`mdlaunch` was made to quickly create a HTML slideshow from any existing markdown files without making changes.
So you can spin up a presentation from your existings notes/wiki/etc.

It uses [Reveal.js](https://github.com/hakimel/reveal.js/) under the hood.

## Prerequisites
To use it you need [Node](https://nodejs.org/en/) installed.

## Usage

```sh
npx mdlaunch YOUR_MARKDOWN_FILE
```

And open it with any webbrowser: http://localhost:5000

You can of course install it globally, if you want to:

```sh
npm install --global mdlaunch
```

Then you can run `mdlaunch` directly.

### Help screen: `mdlaunch --help`

```
mdlaunch <file>

build a presentation from a markdown file and  start a server (alias to
"mdlaunch serve <file> --open")

Commands:
  mdlaunch <file>        build a presentation from a markdown file and  start a
                         server (alias to "mdlaunch serve <file> --open")
                                                                          [default]
  mdlaunch serve <file>  build presentation from markdown and start a server
  mdlaunch build <file>  build a presentation

Positionals:
  port, p  port to bind server to                                         [number] [default: 5000]

Options:
  --help              Display this help                                   [boolean]
  --version           Display version                                     [boolean]
  --output, -o        output directory                                    [string] [default: "dist"]
  --separator, -s     regular expression for separating slides            [string]
  --header-level, -l  maximum header level for separating slides          [number]
  --port, -p          port to bind server to                              [number] [default: 5000]
  --open              open browser after creating presentation            [boolean] [default: true]
```

## Examples

```sh
# Build a presentation to my-presentation without starting a server.
# Also use any header with level 4 or lower to separate slides. (e.g. ### Header)
mdlaunch build README.md --output "my-presentation" --header-level 4

# Build a presentation and run it on port 3000. Also separate slides with <hr>.
mdlaunch FILE.md --port 3000 --separator "<hr>"
```

## Contact

👤 **Timo bechtel**

- Website: https://timobechtel.com
- Twitter: [@TimoBechtel](https://twitter.com/TimoBechtel)
- GitHub: [@TimoBechtel](https://github.com/TimoBechtel)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />

1. Check [issues](https://github.com/TimoBechtel/mdlaunch/issues)
1. Fork the Project
1. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
1. Test your changes `npm run test`
1. Commit your Changes (`git commit -m 'feat: add amazingFeature'`)
1. Push to the Branch (`git push origin feat/AmazingFeature`)
1. Open a Pull Request

### Commit messages

This project uses semantic-release for automated release versions. So commits in this project follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines. I recommend using [commitizen](https://github.com/commitizen/cz-cli) for automated commit messages.

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Distributed under the [MIT](https://github.com/TimoBechtel/mdlaunch/blob/master/LICENSE) License.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
