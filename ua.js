'use strict';

/*!
 *
 * Copyright(c) 2011 Vladimir Dronnikov <dronnikov@gmail.com>
 * MIT Licensed
 *
 */

/**
 *
 * Useragent database hash, keyed by User-Agent:
 *
 */

// not-available entry
var NA = {
 family: "Other"
};

var uatable = {
  // fallback keys
  '': NA,
  'undefined': NA,
  'null': NA
};

/**
 *
 * Load useragent database into memory
 *
 */

function prepare(src) {
  var Fs = require('fs');
  var freemem = require('os').freemem;
  var m0 = freemem();
  // load prepared JSON
  try {
    uatable = JSON.parse(Fs.readFileSync('ua.json', 'utf8'));
  // no prepared JSON. convert from yaml source
  } catch(err) {
    var raw = require('yamlparser').eval(Fs.readFileSync(src, 'utf8')).test_cases;
    // convert array to hash, to achieve O(1) search time
    for (var i = raw.length; --i >= 0 ;) {
      var v = raw[i];
      // workaround: yamlparser inserts empty hashes for empty key values
      if (Object(v.v1) === v.v1) delete v.v1;
      if (Object(v.v2) === v.v2) delete v.v2;
      if (Object(v.v3) === v.v3) delete v.v3;
      // hash by user agent
      var k = v.user_agent_string;
      delete v.user_agent_string;
      uatable[k] = v;
    }
    // dump for future reuse
    Fs.writeFileSync('ua.json', JSON.stringify(uatable), 'utf8');
    console.error('User agent lookup table prepared.');
  }
  console.error('User agent lookup table loaded.', Math.round((m0-freemem())/1024/1024*100)/100, 'Mb taken');
  return uatable;
}

/**
 *
 * Lookup given `str` in useragent database, return found value
 *
 */

function lookup(str, cb) {
  var ua = uatable[str];
  if (!ua) {
    // need fetch from outside
    //console.error('NOT FOUND IN DB');
    ua = NA;
  }
  if (cb) cb(null, ua); // allow continuation
  return ua;
}

/**
 *
 * Initialize the module
 *
 */

prepare('pgts.yaml');
module.exports = lookup;
