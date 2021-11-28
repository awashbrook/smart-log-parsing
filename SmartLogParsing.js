const _ = require('lodash');
const https = require('https');

const url = process.argv.slice(2).pop();

https.get(url, (res) => {
  console.log('statusCode:', res.statusCode);
  // console.log('headers:', res.headers);

  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      processLogs(rawData.split("\n"));
    } catch (e) {
      console.error(e.message);
    }
  });
  
}).on('error', (e) => {
  console.error(e);
});
// TODO Number of queries made be each source 
var processLogs = function (logLines) {
  var sources = logLines.map(function (line) {
    return line.split(" ")[6];
  });
  var targets = logLines.map(function (line) {
    return line.split(" ")[8];
  });
  console.log(targets);
  console.log(_.uniq(sources));
};
// TODO Test sample logs with mocha
var sampleLogs = `\
2000-03-15 12:15:18.524652 [aabbcc] [proxy] POST source api.ho
2000-03-15 12:15:18.524652 [aabbcc] [proxy] POST source api.host.com/pay target paymenthouse.com/create-payment timestamp 2000-03-15 12:15:18.524652 duration 129.174ms`;
