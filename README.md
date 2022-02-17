# without-comments

A utility that parses stuff like this:

```
# line comment
someValue
another value bla bla bla
valueWithTrailingComment # isn't that nice


        anotherOne
```

Into this:

```

someValue
another value bla bla bla
valueWithTrailingComment


        anotherOne
```

You can use it for whatever data you want; all it does is remove line/trailing comments from your input.

## Usage (CLI)

Given you have a file named `stuff.txt`, run:

```
npx without-comments ./stuff.txt
```

If you want to use a token other than `#` for comments, specify it like so:

```
npx without-comments --token '//' ./stuff.txt
```

## Usage (API)

This package exports two functions:

```ts
export function parse(content: string, commentToken?: string): string;
export function parseFile(filename: string, commentToken?: string): string;
```

`parse` takes a content string, and optionally a comment token (it defaults to `'#'`), and returns the content string with the comments removed.

`parseFile` takes a path to a file, and optionally a comment token (it defaults to `'#'`), reads the file at that path synchronously, and returns the contents of that file with the comments removed.

## Notes

Each line of the input is parsed separately, so inline and multiline comments (eg `/* */` or `--[[ ]]`) aren't supported.

## License

MIT
