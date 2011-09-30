var uatable = JSON.parse(require('fs').readFileSync(__dirname + '/2.json', 'utf8'));
var x = uatable.concat(JSON.parse(require('fs').readFileSync(__dirname + '/3.json', 'utf8')));
require('fs').writeFileSync('ua.json', JSON.stringify(x), 'utf8');
