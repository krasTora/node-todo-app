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
	let reqData = JSON.parse(req.body.inputData);
	// DBへ登録する処理を書く
	res.json(reqData);
});

app.listen(port, () => {
	console.log(`Start server port: ${port}`);
});