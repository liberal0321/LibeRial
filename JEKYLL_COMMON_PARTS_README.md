# Jekyll共通化メモ

ヘッダーとフッターを `_includes` に共通化しました。

- `_includes/header.html`：全ページ共通ヘッダー
- `_includes/footer.html`：全ページ共通フッター
- 各HTML：`{% include header.html %}` / `{% include footer.html %}` で呼び出し
- `_layouts/post.html`：NEWS記事も同じ共通ヘッダー・フッターを使用

## 今後の変更
ヘッダーのメニューを増減するときは `_includes/header.html` だけを変更します。
フッターの共通文言を変えるときは `_includes/footer.html` だけを変更します。

ページごとの背景画像付きフッターなど、既存デザインは `footer_class` をFront Matterで指定して維持しています。
メニューの金色アクティブ表示も `nav_group` で維持しています。

※ RECRUITページ／リンク自体はまだ追加していません。求人ページを作る際に `_includes/header.html` / `_includes/footer.html` へ1回追加すれば全ページへ反映できます。
