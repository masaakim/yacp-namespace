var postcss = require('postcss');
var fs = require('fs');
var namespace = require('./');

var css = fs.readFileSync('test/fixtures/test-1.css', 'utf-8');

var output = postcss().use(namespace()).process(css).css;

console.log(output)
