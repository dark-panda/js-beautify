
importPackage(java.io);
importPackage(java.lang);

(function (a) {
  function commandName() {
    var c = environment['sun.java.command'].split(/\s+/),
      f = new java.io.File(c[1]);
      return f.getName();
  }

  function readFromFile(fileName) {
    var reader, input, line, output = '';

    if (fileName === 'STDIN') {
      input = new InputStreamReader(System['in']);
    }
    else {
      input = new FileReader(fileName);
    }

    reader = new BufferedReader(input);

    while ((line = reader.readLine())) {
      output += line + "\n";
    }

    return output;
  }

  var OPTIONS = {
    'indent_size': 2,
    'indent_char': ' ',
    'preserve_newlines': true,
    'jslint_happy': false,
    'brace_style': 'collapse'
  };

  if (a.indexOf('-h') >= 0) {
    print("Usage: " + commandName() + " [file1.js ... fileN.js] OR read from STDIN");
    quit(1);
  }

  (function() {
    var output = [], input = {};

    if (!a.length) {
      files = [ 'STDIN' ];
    }
    else {
      files = a;
    }

    files.forEach(function(fileName) {
      input[fileName] = readFromFile(fileName);
    });

    (function() {
      var f;
      for (f in input) {
        buffer = js_beautify(input[f], OPTIONS);
        if (!buffer) {
          print("ERROR: Couldn't beautify " + f);
          quit(2);
        }
        else {
          output.push(buffer);
        }
      }
    }());

    print(output.join("\n"));
  }());
}(arguments));
