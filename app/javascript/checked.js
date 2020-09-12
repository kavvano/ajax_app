function check(){

  const posts = document.querySelectorAll(".post"); // 表示されているすべてのメモを取得

  posts.forEach(function(post){
    if(post.getAttribute("data-load") != null){
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => { // メモをクリックした場合に実行する処理を定義
      const postId = post.getAttribute("data-id"); // どのメモをクリックしたのか、カスタムデータを利用して取得
      const XHR = new XMLHttpRequest(); // Ajaxに必要なオブジェクトを生成
      XHR.open("GET", `/posts/${postId}`, true); // openでリクエストを初期化
      XHR.responseType = "json"; // レスポンスのタイプを指定
      XHR.send(); // sendでリクエストを送信
      XHR.onload = () => { // レスポンスを受け取った時の処理を記述
        if(XHR.status != 200){
          alert(`Error ${XHR.status}: ${XHR.statusText}`); // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示
          return null; // JavaScriptの処理から抜け出す
        }
        const item = XHR.response.post; // レスポンスされたデータを変数itemに代入
        if(item.checked === true){
          post.setAttribute("data-check", "true"); // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加
        }else if(item.checked === false){
          post.removeAttribute("data-check"); // 未読状態であれば、カスタムデータを削除
        }
      };
    });
  });
}

setInterval(check, 1000); // 1000msに1回checkを実行