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
npm link qvog-engine
```

To build the project, run the following command:

```bash
npm run build
```

## Usage

Since it is a library, it is not necessary to run the project. To make it a local module, run the following command:

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
