`use strict`;

const http = require(`http`);
const fs = require(`fs`);
const path = require(`path`);
const { Pool } = require(`pg`);
const querystring = require(`querystring`);
require(`dotenv`).config();

// postgreSQLへの接続情報
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

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
  } else if (req.url === `/ajax/register` && req.method === `POST`) {
    // タスク登録処理
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        // リクエストデータをパース
        const postData = querystring.parse(body);
        const inputData = JSON.parse(postData.inputData);

        // 登録前のデータを削除
        const deleteQuery = `
          DELETE FROM todo_t_task;
        `;
        pool.query(deleteQuery);

        // 1件ずつテーブルにinsertする
        let insertCount = 0;
        for(const task of inputData) {
          const insertQuery = `
            INSERT INTO todo_t_task (task_name, complete_flg, create_user, create_date, update_user, update_date)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $3, CURRENT_TIMESTAMP);
          `;
          const insertValues = [
            task.taskName,
            task.checkStatus ? '1' : '0',
            'system',
          ];

          await pool.query(insertQuery, insertValues);
          insertCount++;
        };

        // レスポンスデータ作成、送信処理
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: false,
          msg: `${insertCount}件のタスクを登録しました。`,
          insertCount: insertCount,
        }));
      } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: true,
          msg: `タスクの登録中にエラーが発生しました。`,
          description: error.message,
        }));
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