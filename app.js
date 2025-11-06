// very small Node HTTP app
const http = require('http');
const port = process.env.PORT || 8080;
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from jenkins-basis-pipeline\n');
}).listen(port, () => console.log(`App listening on ${port}`));
