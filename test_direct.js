const http = require('http');
console.log('Sending request...');
const req = http.get('http://127.0.0.1:3000', (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', res.headers);
  res.on('data', (d) => {
    console.log('DATA CHUNK:', d.toString().slice(0, 100));
  });
});
req.on('error', (e) => {
  console.error('ERROR:', e.message);
});
req.end();
setTimeout(() => {
  console.log('Timeout reached. Exiting.');
  process.exit(0);
}, 10000);
