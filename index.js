#!/usr/bin/env node
const fs = require("fs");

function parse(content, commentToken = "#") {
  const startRegex = new RegExp(`^${commentToken}`);
  const endRegex = new RegExp(`${commentToken}.*$`, "g");

  return content
    .split("\n")
    .map((line) => {
      // remove comment lines
      if (startRegex.test(line.trim())) return "";

      // remove trailing comments
      line = line.replace(endRegex, "");

      return line;
    })
    .filter((line) => line != null)
    .join("\n");
}

function parseFile(filename, commentToken = "#") {
  const content = fs.readFileSync(filename, "utf-8");
  return parse(content, commentToken);
}

module.exports = {
  parse,
  parseFile,
};

if (require.main === module) {
  function printHelp() {
    console.log(
      [
        "Usage: npx without-comments [options] <file>",
        "",
        "Options:",
        "  --help, -h: show usage instructions",
        "  --token, -t: specify comment token (defaults to '#')",
        "",
        "Examples:",
        "  npx without-comments ./stuff.txt",
        "  npx without-comments -t '//' ./stuff.txt",
      ].join("\n")
    );
  }

  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    printHelp();
    process.exit(1);
  }

  const opts = {};
  while (argv.length > 0) {
    const next = argv.shift();
    switch (next) {
      case "-h":
      case "--help": {
        printHelp();
        process.exit(0);
        break;
      }

      case "-t":
      case "--token": {
        opts.token = argv.shift();
        break;
      }

      default: {
        opts.file = next;
      }
    }
  }

  const result = parseFile(opts.file, opts.token);
  process.stdout.write(result);
}
