`use strict`;

$("#addTodo").click(function () {
	const inputTodo = $("#inputArea").val();
	if(!inputTodo) {
		alert('雑魚が！！！');
		return;
	};
	$("#todoList").append(`<li><input type='checkbox'>${inputTodo}</li>`);

	$("#inputArea").val("");
});

$(document).on("change", "input[type=checkbox]", function() {
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