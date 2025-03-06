# QVoG Standard Library

Query library built on top of QVoG Engine, providing a set of predefined queries for vulnerability detection.

> [!WARNING]
> Node.js 22 or higher required.

## Build

To initialize the project, run the following command:

```bash
npm install
```

If you have `qvog-engine` as a local module, run the following command to link your local one:

```bash
npm link qvog-engine
```

Then, run the following command to build the project:

```bash
npm run build
```

## Usage

### NPM Package

It has been published to NPM registry: [qvog-lib](https://www.npmjs.com/package/qvog-lib).

To install the package, run the following command:

```bash
npm install qvog-lib
```

### Local Package

If you want to build and use the latest version of the library, you can build and link it locally.

```bash
npm link
```

Later, in the project that uses the library, run the following command:

```bash
npm link qvog-lib
```

## Development

For better code style, we have ESLint set up. To run the linter, run the following command to check and fix the code:

```bash
npm run lint
```
