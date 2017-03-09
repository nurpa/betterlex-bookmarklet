# Better Lex bookmarklet

Better Lex bookmarklet is a tool for improving readability of the online Belgian consolidated legislation. It requires a modern Web browser, such as Firefox.

## Installing

See [Better Lex updater/installer](https://nurpa.be/betterlex-bookmarklet/) ([en](https://nurpa.be/betterlex-bookmarklet/?lang=en), [fr](https://nurpa.be/betterlex-bookmarklet/?lang=fr), [nl](https://nurpa.be/betterlex-bookmarklet/?lang=nl)) or, if you are familiar with bookmarklets, grab the [latest build on github](https://github.com/nurpa/betterlex-bookmarklet/releases).

## Screenshots

| Before | After |
| --- | ---|
| ![title-before] | ![title-after] |
| ![article-before] | ![article-after] |
| ![article-before] | ![article-after] |
| ![updates-before] | ![updates-after] |

[title-before]: https://imgs.be/58c1afac-15f.png
[title-after]: https://imgs.be/58c1b01a-1f51.png
[article-before]: https://imgs.be/58c1b07b-e20.png
[article-after]: https://imgs.be/58c1b08a-f54.png
[updates-before]: https://imgs.be/58c1b10f-cd1.png
[updates-after]: https://imgs.be/58c1b11c-2270.png

## Code overview

Here is the structure of this project.

```
betterlex-bookmarklet
├── bin
│   ├── bookmarklet_fr.js
│   └── bookmarklet_nl.js
├── lib
├── scripts
│   ├── build
│   └── install
├── src
│   ├── main.css
│   ├── main.js
│   ├── translations.json
│   └── utility.js
├── CREDITS
├── LICENSE
└── README.md
```

## How to build the bookmarklet from scratch

### Dependencies

* PHP 5.4 or any newer version
* [Composer](https://getcomposer.org/), a package manager for PHP
* [spotch](https://github.com/miclf/spotch), a bookmarklet generator

### Download and install dependencies

You can use the following bash script to install the project’s dependencies.

```bash
./scripts/install
```

### Build the bookmarklet

Once the dependencies are installed, you just need to run this build script to generate both the French and Dutch versions of the bookmarklet.

```bash
./scripts/build
```

## License

This is free/libre software, made available under the terms of the [GNU General Public License (GPLv3)](LICENSE).
