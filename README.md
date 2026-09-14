# とうじょう米 公式サイト

兵庫県・特A地区で育てる食用米ブランド「とうじょう米」の静的ウェブサイトです。
ヘッダー・フッターを共通化し、STORES（オンラインストア）のリンクを外部設定ファイルに集約しています。

## フォルダ構成

```
tojo-kome/
├── index.html          … トップページ
├── products.html       … 商品一覧
├── hinohikari.html     … ヒノヒカリ 商品ページ
├── konohoshi.html      … コノホシ 商品ページ
├── about.html          … 特A地区について
├── contact.html        … お問い合わせ
├── legal.html          … 利用規約・プライバシー・特商法表記
├── css/
│   └── style.css       … スタイルシート（変更なし）
├── js/
│   ├── config.js       … ★STORESリンクの外部設定（ここだけ編集すればOK）
│   └── main.js         … 共通ヘッダー／フッター生成・リンク注入・挙動
└── images/             … 画像を配置（README.txt にファイル名一覧）
```

## STORESリンクの変更方法

`js/config.js` の値を書き換えるだけで、全ページ・全リンクに反映されます。

```js
window.SITE_CONFIG = {
  stores: {
    base: "https://tayui-kome.stores.jp/",          // ストアのトップ
    items: {
      hinohikari: "https://tayui-kome.stores.jp/items/hinohikari",
      konohoshi:  "https://tayui-kome.stores.jp/items/konohoshi"
    }
  }
};
```

## ヘッダー／フッターの編集方法

共通パーツは `js/main.js` が生成しています。文言やリンクを直す場合は main.js の1か所を編集すれば全ページに反映されます。
各HTML側はプレースホルダーを置くだけです。

```html
<div id="site-header" data-current="products" data-variant="solid"></div>
   ... 本文 ...
<div id="site-footer"></div>
<script src="js/config.js"></script>
<script src="js/main.js"></script>
```

- data-current … ナビの現在地ハイライト（home / products / about）
- data-variant … hero＝透過ヘッダー（トップ用）、省略時＝不透明固定（下層ページ用）
- data-image-note="false"（フッター）… 「掲載写真は仮画像です」の注記を非表示

## 公開方法

このフォルダ一式をそのままWebサーバーにアップロードしてください。
ヘッダー・フッターはJavaScriptで描画されるため、JavaScriptを有効にした状態でご利用ください。
