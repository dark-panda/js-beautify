// node.js
/*
Copyright (c) 2013 J Smith <dark.panda@gmail.com> Node.js Edition
*/

/*global JSLINT */
/*jslint node: true, strict: false */

; (function () {
  function print(msg) {
    process.stdout.write(msg + "\n");
  }

  function quit(code) {
    process.exit(code);
  }

  function readArgs() {
    var retval = {
      'files': [],
      'options': DEFAULT_OPTIONS
    };

    process.argv.slice(2).forEach(function(arg) {
      if (arg.match(/^--([a-z_-]+)(?:=(.+))?/)) {
        (function() {
          var option = RegExp.$1,
            value = RegExp.$2;

          option = option.replace(/-/g, '_');

          switch (value) {
            case 'true':
            case '':
              retval.options[option] = true;
            break;

            case 'false':
              retval.options[option] = false;
            break;

            default:
              retval.options[option] = value;
          }
        }());
      }
      else {
        retval.files.push(arg);
      }
    });

    return retval;
  }

  var FS = require('fs'),
    DEFAULT_OPTIONS = {
      'brace_style': 'collapse',
      'break_chained_methods': false,
      'indent_char': ' ',
      'indent_size': 2,
      'jslint_happy': false,
      'keep_array_indentation': false,
      'max_preserve_newlines': 0,
      'preserve_newlines': true,
      'space_before_conditional': true,
      'unescape_strings': false,
      'wrap_line_length': 0
    },

    ARGV = readArgs();

  (function() {
    var files = ARGV.files,
      options = ARGV.options,
      output = [];

    if (!files.length) {
      files = [ '/dev/stdin' ]
    }

    files.forEach(function(fileName) {
      var input = FS.readFileSync(fileName, 'utf8'),
        buffer;

      buffer = exports.BEAUTIFY_FUNCTION(input, options);

      if (!buffer) {
        print("ERROR: Couldn't beautify " + fileName);
        quit(2);
      }
      else {
        output.push(buffer);
      }
    });

    print(output.join("\n"));

    quit(0);
  }());
}());

