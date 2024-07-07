`use strict`;

const http = require(`http`);
const fs = require(`fs`);
const path = require(`path`);

const server = http.createServer((req, res) => {
  if(req.url === `/` || req.url === `/views/index.html`) {
    // HTMLファイルを送信
    fs.readFile(path.join(__dirname, `/views/index.html`), (err, content) => {
      if(err) {
        res.writeHead(500);
        res.end(`Error loading index.html`);
      } else {
        res.writeHead(200, { 'Content-Type': `text/html` });
        res.end(content);
      };
    });
  } else if(req.url === `/index-cs.js`) {
    // JavaScriptファイルを送信 ※読み込んだhtmlにscriptタグとかlinkタグにパスが記載されていると勝手にサーバにリクエストされる。例えばscriptタグのsrc属性に記述されているパスの値がreq.urlとなる。
    fs.readFile(path.join(__dirname, `/views/index-cs.js`), (err, content) => {
      if(err) {
        res.writeHead(500);
        res.end(`Error loading index-cs.js`);
      } else {
        res.writeHead(200, { 'Content-Type': `application/javascript` });
        res.end(content);
      };
    });
  } else {
    // 404 Not Found
    console.log(`Error requested URL: '${req.url}' is Not Found`);
    res.writeHead(404);
    res.end(`404 Not Found`);
  };
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});