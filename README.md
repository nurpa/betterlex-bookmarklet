# Better Lex bookmarklet

Better Lex bookmarklet is a tool for improving readability of the online Belgian consolidated legislation. It requires a modern Web browser, such as Firefox.

## Overview

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
