`use strict`;

// タスク追加ボタン押下時の処理
$("#addTodo").click(() => {
	const inputTodo = $("#inputArea").val();
	if(!inputTodo) {
		alert('雑魚が！！！');
		return;
	};
	$("#todoList").append(`<li><input type='checkbox'>${inputTodo}</li>`);

	$("#inputArea").val("");
});

// 登録ボタン押下時の処理
$("#registButton").click(() => {
	let inputDataArray = [];
	$("#todoList li").each((i, el) => {
		inputDataArray.push($(el).text());
	});
	// テキストを取得することはできたけど、タスクの完了状況も登録するようにしたいよね
})

$(document).on("change", "input[type=checkbox]", () => {
	if($(this).is(":checked")) {
		// 追加するボタンのID属性の値を採番
		const buttonId = 'toriaezu';
		// チェックされた場合は右横に「タスク削除」のボタンを追加
		$(this).parent().append(`<input type='button' onclick='javaScript:$(this).parent().remove();' value='削除'>`);
	} else {
		// チェックが外れた場合は「タスク削除」のボタンを削除
		$(this).parent().find('input[type=button]').remove();
	};
});