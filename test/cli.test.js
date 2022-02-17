const { spawn } = require("first-base");

test("normal", async () => {
  const run = spawn(require.resolve(".."), ["./test-file.txt"], {
    cwd: __dirname,
  });

  await run.completion;

  expect(run.result).toMatchInlineSnapshot(`
    Object {
      "code": 0,
      "error": false,
      "stderr": "",
      "stdout": "
    someValue
    another value bla bla bla
    valueWithTrailingComment 


            anotherOne",
    }
  `);
});

test("no arg", async () => {
  const run = spawn(require.resolve(".."), [], { cwd: __dirname });

  await run.completion;

  expect(run.result).toMatchInlineSnapshot(`
    Object {
      "code": 1,
      "error": false,
      "stderr": "",
      "stdout": "Usage: npx without-comments [options] <file>

    Options:
      --help, -h: show usage instructions
      --token, -t: specify comment token (defaults to '#')

    Examples:
      npx without-comments ./stuff.txt
      npx without-comments -t '//' ./stuff.txt
    ",
    }
  `);
});

test("--help", async () => {
  const run = spawn(require.resolve(".."), ["--help"], { cwd: __dirname });

  await run.completion;

  expect(run.result).toMatchInlineSnapshot(`
    Object {
      "code": 0,
      "error": false,
      "stderr": "",
      "stdout": "Usage: npx without-comments [options] <file>

    Options:
      --help, -h: show usage instructions
      --token, -t: specify comment token (defaults to '#')

    Examples:
      npx without-comments ./stuff.txt
      npx without-comments -t '//' ./stuff.txt
    ",
    }
  `);
});

test("-h", async () => {
  const run = spawn(require.resolve(".."), ["-h"], { cwd: __dirname });

  await run.completion;

  expect(run.result).toMatchInlineSnapshot(`
    Object {
      "code": 0,
      "error": false,
      "stderr": "",
      "stdout": "Usage: npx without-comments [options] <file>

    Options:
      --help, -h: show usage instructions
      --token, -t: specify comment token (defaults to '#')

    Examples:
      npx without-comments ./stuff.txt
      npx without-comments -t '//' ./stuff.txt
    ",
    }
  `);
});
