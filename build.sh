#!/bin/sh

OUTPUT_JS="build/js-beautify"
OUTPUT_CSS="build/css-beautify"

mkdir -p `dirname $OUTPUT_JS`
mkdir -p `dirname $OUTPUT_CSS`

echo "#!/usr/bin/env node

// vim: set ft=javascript:

var exports = {};

" | tee $OUTPUT_JS $OUTPUT_CSS 2>&1 > /dev/null

cat js/lib/beautify.js >> $OUTPUT_JS
cat nodejs.js | sed "s/BEAUTIFY_FUNCTION/js_beautify/g" >> $OUTPUT_JS

cat js/lib/beautify-css.js >> $OUTPUT_CSS
cat nodejs.js | sed "s/BEAUTIFY_FUNCTION/css_beautify/g" >> $OUTPUT_CSS

chmod 0755 $OUTPUT_JS $OUTPUT_CSS

