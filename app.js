$("#addTodo").click(function () {
	const inputTodo = $("input").val();
	$("#todoList").append("<li><input type='checkbox'>" + inputTodo + "</li>");

	$("input").val("");
});

$(document).on("change", "input[type=checkbox]", function() {
	if($(this).is(":checked")) {
		// チェックされた場合は右横に「タスク削除」のボタンを追加
	} else {
		// チェックが外れた場合は「タスク削除」のボタンを削除
	};
});