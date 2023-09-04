`use strict`;

const express = require(`express`);
const app = express();
const port = 3000;

app.get(`/`, (req, res) => {
	return res.send(`Hello World!`);
});

app.listen(port, () => {
	console.log(`ポート番号${port}番を利用してサーバーを起動しました`);
});