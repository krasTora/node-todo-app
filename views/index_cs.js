`use strict`;

document.addEventListener(`DOMContentLoaded`, () => {
  // タスク追加ボタン押下時の処理
  document.getElementById(`addTodo`).addEventListener(`click`, () => {
    // テキストボックスを取得
    let inputTodo = document.getElementById(`inputArea`);
    // テキストボックス未入力の場合は処理を中断
    if(!inputTodo.value) {
      alert(`なにもしないのにタスクを作ろうとするのは馬鹿のすることです。ホイ卒ですか？`);
      return false;
    };

    // タスクを追加する要素を用意
    const todoList = document.getElementById(`todoList`);
    // liタグを作成
    const liTag = document.createElement(`li`);
    // チェックボックスを作成
    const inputTag = document.createElement(`input`);
    const randomId = getUniqueStr();
    inputTag.setAttribute(`type`, `checkbox`);
    inputTag.setAttribute(`id`, randomId);
    // チェックボックスに付与するラベルタグを作成
    const labelTag = document.createElement(`label`);
    labelTag.setAttribute(`for`, randomId);
    labelTag.textContent = inputTodo.value;

    // 作成した要素を組み立てる
    liTag.appendChild(inputTag);
    liTag.appendChild(labelTag);
    todoList.appendChild(liTag);

    // テキストボックスに入力された値を削除する
    inputTodo.value = ``;
  });

  // チェックボックスの入力状態が変わった時の処理
  const todoList = document.getElementById(`todoList`);
  todoList.addEventListener(`change`, function (e) {
    // イベントが発火したチェックボックスの要素を取得
    const targetCheckbox = e.target;

    // チェックボックスがチェックされた場合、チェックされたチェックボックスのliタグにボタンを追加
    if(targetCheckbox.checked === true) {
      const delButton = document.createElement(`input`);
      delButton.setAttribute(`type`, `button`);
      delButton.setAttribute(`value`, `削除`);
      delButton.onclick = function () {
        this.parentNode.remove();
      };
      targetCheckbox.parentNode.appendChild(delButton);
    } else {
      // チェックボックスからチェックが外された場合、チェックが外れたチェックボックスのliタグの配下にあるボタンを削除
      const delButton = targetCheckbox.parentNode.querySelector(`input[type='button']`);
      delButton.remove();
    };
  });

  // 登録ボタン押下時の処理
  document.getElementById(`registerButton`).addEventListener(`click`, () => {
    // 項目名とチェックボックスの入力状況を取得
    const liTagArray = document.querySelectorAll("#todoList li");
    // サーバへ送信用の配列を作成
    const inputDataArray = [];
    // liタグの数だけループ
    for(let i = 0; i < liTagArray.length; i++) {
      // DBに登録する情報を取得
      const checkbox = liTagArray[i].querySelector(`input[type='checkbox']`);
      const taskName = liTagArray[i].getElementsByTagName(`label`)[0];

      // DBに登録する情報をオブジェクトに設定
      const taskObj = {
        checkStatus: checkbox.checked,
        taskName: taskName.textContent,
      };

      // サーバへ送信用の配列に詰める
      inputDataArray.push(taskObj);
    };

    // サーバに送信するデータをJSON形式に変換
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
      alert(`サーバとの通信に失敗しました。`);
    });
  });
});

/**
 * ほぼ一意となる文字列を採番し、返却します
 * @param {number} myStrong 乱数の桁数
 * @returns {string}
 */
function getUniqueStr(myStrong){
  const NOW_DATE_TIME = new Date().getTime();
  const STRONG = 1000;
  // 引数に乱数の桁数が指定されている場合は引数に合わせる
  if (myStrong) {
    STRONG = myStrong;
  };
  return NOW_DATE_TIME.toString(16) + Math.floor(STRONG * Math.random()).toString(16);
};
