Template was sourced from:

https://github.com/jvandemo/generator-angular2-library/edit/master/README.md


## Building library

To build:

```bash
$ npm run build
```



## Generating documentation for your library

From the root of your library directory, run:

```bash
$ npm run docs:build
```
This will generate a `docs` directory with all documentation of your library.

To serve your documentation, run:

```bash
$ npm run docs:serve
```

## Publishing your library to NPM

Update version in src/package.json file, then run build.

To publish your library to NPM, first generate the `dist` directory:

```bash
$ npm run build
```

and then publish the contents of the `dist` directory to NPM:

```bash
$ npm publish dist
```

## Preview your library during development

To preview your library code during development, start the playground:

```bash
$ npm run playground
```

