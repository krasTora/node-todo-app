`use strict`;

const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
const port = 3000;
// POSTで受信するときに必要らしい（よくわからん）。この二つを書かないとリクエストボディにundefinedが渡ってきてしまう。
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 静的ファイルをクライアントへ返却
app.use(express.static(`views`));

// 画面の登録ボタン押下時に渡ってくるリクエスト
app.post(`/ajax/register/`, (req, res) => {
  // リクエスト情報をパース
  let reqData = JSON.parse(req.body.inputData);
  console.log(reqData);

  let registerLength = reqData.length;
  let resData = {
    error : false,
    msg : `データの登録に成功しました。登録した情報は${ registerLength }個です。`,
  };

  // 前回のタスク情報を削除
  // DBへ接続
  const { Client } = require("pg");
  const client = new Client({
    user: "kurastora",
    host: "localhost",
    database: "kurastora",
    password: "kurastora",
    port: 5432,
  });
  client.connect();
  // 実行クエリ定義
  const delQuery = {
    text: `DELETE FROM todo_t_task`,
    values: [],
  };

  // DBへINSERT
  client
    .query(delQuery)
    .then((res) => {
      console.log(res);
      // DBの接続解除
      client.end();
    })
    .catch((e) => console.error(e.stack));

  // リクエストの数分回す
  for(let i = 0; i < reqData.length; i++) {
    // 登録する情報を整形
    let taskName = reqData[i].itemName;
    let completeFlag;
    if(reqData[i].checkStatus) {
      completeFlag = `1`;
    } else{
      completeFlag = `0`;
    };
    let createUser = `kurastora`;
    let updateUser = `kurastora`;

    // DBへ接続
    const { Client } = require("pg");
    const client = new Client({
      user: "kurastora",
      host: "localhost",
      database: "kurastora",
      password: "kurastora",
      port: 5432,
    });
    client.connect();

    // 実行クエリ定義
    const query = {
      text: `INSERT INTO
          todo_t_task(
            task_name
            , complete_flg
            , create_user
            , create_date
            , update_user
            , update_date
          )
        VALUES (
          $1
          , $2
          , $3
          , current_timestamp
          , $4
          , current_timestamp
        )`,
      values: [taskName, completeFlag, createUser, updateUser],
    };

    // DBへINSERT
    client
      .query(query)
      .then((res) => {
        console.log(res);
        // DBの接続解除
        client.end();
      })
      .catch((e) => console.error(e.stack));
  };

  // レスポンス情報をクライアントへ返却
  res.json(resData);
});

app.listen(port, () => {
  console.log(`Start server port: ${port}`);
});