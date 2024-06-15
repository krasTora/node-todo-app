`use strict`;

$(() => {
  // タスク追加ボタン押下時の処理
  $("#addTodo").click(() => {
    const inputTodo = $("#inputArea").val();
    if(!inputTodo) {
      alert('雑魚が！！！');
      return;
    };
    $("#todoList").append(`<li><input type='checkbox'>${inputTodo}</li>`);
    // 入力エリアの値を削除する
    $("#inputArea").val("");
  });

  // チェックボックスの入力状態が変わった時の処理
  // 備忘: functionをアロー関数に置き換えるとifの中に入ってこないなんで？（おそらくthisに入ってくる値が異なる、、、？）
  $(document).on('change', 'input[type="checkbox"]', function () {
    if($(this).is(":checked")) {
      // チェックされた場合は右横に「タスク削除」のボタンを追加
      $(this).parent().append(`<input type='button' onclick='javaScript:$(this).parent().remove();' value='削除'>`);
    } else {
      // チェックが外れた場合は「タスク削除」のボタンを削除
      $(this).parent().find('input[type=button]').remove();
    };
  });

  // 登録ボタン押下時の処理
  $("#registerButton").click(() => {
    // 項目名とチェックボックスの入力状況を取得
    let inputDataArray = [];
    $("#todoList li").each((i, el) => {
      const itemObj = {
        checkStatus: $(el).find(`input[type=checkbox]`).prop(`checked`),
        itemName: $(el).text(),
      };
      inputDataArray.push(itemObj);
    });

    // AjaxのdataTypeに合わせるためjson文字列に変換
    const jsonData = JSON.stringify(inputDataArray);

    // 取得した情報をサーバサイドへ送信する
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/ajax/register",
      dataType: "JSON",
      data: {
        inputData: jsonData,
      },
    })
    .done((res) => {
      // 実行結果を表示
      alert(res.msg);
    })
    .fail((hr, status, error) => {
      console.log(`サーバとの通信に失敗しました。`)
    });
  })
})