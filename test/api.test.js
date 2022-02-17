const { parse, parseFile } = require("..");

test("parse", () => {
  const content =
    [
      "# line comment",
      "someValue",
      "another value bla bla bla",
      "valueWithTrailingComment # isn't that nice",
      "",
      "",
      "        anotherOne",
    ].join("\n") + "\n";

  expect(parse(content)).toMatchInlineSnapshot(`
    "
    someValue
    another value bla bla bla
    valueWithTrailingComment 


            anotherOne
    "
  `);
});

test("parseFile", () => {
  expect(parseFile(require.resolve("./test-file.txt"))).toMatchInlineSnapshot(`
    "
    someValue
    another value bla bla bla
    valueWithTrailingComment 


            anotherOne"
  `);
});
