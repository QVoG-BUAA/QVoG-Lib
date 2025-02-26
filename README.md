# QVoG Standard Library

> [!WARNING]
> THIS PROJECT IS A WORK IN PROGRESS

QVoG Engine's standard query library.

## Build

> [!NOTE]
> Make sure you have [qvog-engine](https://github.com/QVoG-BUAA/QVoG-Engine-TS) linked as local module.

To initialize the project, run the following command:

```bash
npm install
```

If you have `qvog-engine` as a local module, run the following command next to link your local one:

```bash
npm link qvog-engine
```

Then, to build the project, run the following command:

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

If you want to use the latest version of the library, you can build and link it locally. The package will be automatically updated when you build the project.

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
