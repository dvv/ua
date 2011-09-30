'use strict';

var lookup = require('ua').lookup;
var ua = lookup('Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.13 (KHTML, like Gecko) Chrome/9.0.597.94 Safari/534.13');
console.log(ua);
