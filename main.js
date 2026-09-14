/* =========================================================
   とうじょう米 - 共通レイアウト / 動作スクリプト
   ---------------------------------------------------------
   - 全ページ共通のヘッダー・モバイルナビ・フッターを生成して挿入します。
   - STORES（オンラインストア）のリンクは js/config.js から取得します。
   - ヘッダーのスクロール挙動・モバイルメニュー開閉も担当します。

   各 HTML 側の使い方:
     <div id="site-header" data-current="products" data-variant="solid"></div>
        ... ページ本文 ...
     <div id="site-footer"></div>
     <script src="js/config.js"></script>
     <script src="js/main.js"></script>

   data-current : ナビの現在地ハイライト（home / products / about）
   data-variant : ヘッダーの見た目
                    "hero"  = 透過（トップページ用・スクロールで背景表示）
                    省略/他 = 不透明で固定（下層ページ用）
   data-image-note (footer) : "false" で「掲載写真は仮画像です」の注記を非表示
   ========================================================= */
(function () {
  "use strict";

  var CFG = (window.SITE_CONFIG && window.SITE_CONFIG.stores) || {};
  var STORE_BASE = CFG.base || "#";
  var STORE_ITEMS = CFG.items || {};

  /* 指定キーの STORES URL を返す（base または商品キー） */
  function storeUrl(key) {
    if (!key || key === "base") return STORE_BASE;
    return STORE_ITEMS[key] || STORE_BASE;
  }

  /* ロゴマーク（SVG）*/
  function logoMark(size) {
    return '<svg class="logo-mark" width="' + size + '" height="' + size +
      '" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="13" cy="13" r="11.5" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M13 4V22M4 13H22M6.5 6.5L19.5 19.5M19.5 6.5L6.5 19.5" stroke="currentColor" stroke-width="1"/>' +
      '<circle cx="13" cy="13" r="3" fill="currentColor"/></svg>';
  }

  /* 共通ナビ項目 */
  var NAV_ITEMS = [
    { key: "home",     href: "index.html",    label: "ホーム" },
    { key: "products", href: "products.html", label: "商品一覧" },
    { key: "about",    href: "about.html",    label: "特A地区について" }
  ];

  /* ---- ヘッダー ---- */
  function buildHeader(current, variant) {
    var headerClass = (variant === "hero")
      ? "site-header"
      : "site-header solid site-header--static";

    var navLinks = NAV_ITEMS.map(function (item) {
      var cls = "navlink" + (item.key === current ? " current" : "");
      return '<a href="' + item.href + '" class="' + cls + '">' + item.label + '</a>';
    }).join("");

    return '' +
    '<header class="' + headerClass + '" id="siteHeader">' +
      '<div class="site-header__inner">' +
        '<div class="header-left">' +
          '<button class="nav-toggle" id="navToggle" aria-label="メニュー"><span></span><span></span><span></span></button>' +
          '<a href="index.html" class="logo">' + logoMark(24) + '<span>とうじょう米</span></a>' +
        '</div>' +
        '<nav class="header-nav">' + navLinks + '</nav>' +
        '<div class="header-right">' +
          '<a href="contact.html" class="pill-btn">お問い合わせはこちら</a>' +
          '<a href="' + STORE_BASE + '" class="pill-btn pill-btn--store" target="_blank" rel="noopener">STORESで購入</a>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  /* ---- モバイルナビ ---- */
  function buildMobileNav() {
    var links = NAV_ITEMS.map(function (item) {
      return '<a href="' + item.href + '">' + item.label + '</a>';
    }).join("");

    return '' +
    '<div class="mobile-nav" id="mobileNav">' +
      '<div class="mobile-nav__top">' +
        '<a href="index.html" class="logo" style="color:var(--color-ink);">' + logoMark(24) + '<span>とうじょう米</span></a>' +
        '<button class="mobile-nav__close" id="mobileNavClose" aria-label="閉じる">×</button>' +
      '</div>' +
      links +
      '<a href="contact.html">お問い合わせ</a>' +
      '<a href="' + STORE_BASE + '" target="_blank" rel="noopener">STORESで購入</a>' +
    '</div>';
  }

  /* ---- フッター ---- */
  function buildFooter(showImageNote) {
    var note = showImageNote ? '<span>掲載写真は準備中のため仮画像です。</span>' : '';
    return '' +
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="footer-logo">' + logoMark(22) + '<span>とうじょう米</span></div>' +
            '<p>兵庫県特A地区で育てる食用米ブランド。ヒノヒカリとコノホシを、産地から食卓へ。</p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h5>商品</h5>' +
            '<ul>' +
              '<li><a href="hinohikari.html">ヒノヒカリ</a></li>' +
              '<li><a href="konohoshi.html">コノホシ</a></li>' +
              '<li><a href="' + STORE_BASE + '" target="_blank" rel="noopener">オンラインストア（STORES）</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h5>サイト</h5>' +
            '<ul>' +
              '<li><a href="about.html">特A地区について</a></li>' +
              '<li><a href="contact.html">お問い合わせ</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h5>規約・法令</h5>' +
            '<ul>' +
              '<li><a href="legal.html">利用規約・プライバシー</a></li>' +
              '<li><a href="legal.html#tokushoho">特定商取引法に基づく表記</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>Copyright © 2026 とうじょう米. All Rights Reserved.</span>' +
          note +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  /* 本文中の STORES リンク（[data-store]）に config の URL を反映 */
  function applyStoreLinks(root) {
    var nodes = (root || document).querySelectorAll("[data-store]");
    Array.prototype.forEach.call(nodes, function (el) {
      el.setAttribute("href", storeUrl(el.getAttribute("data-store")));
    });
  }

  /* ヘッダー／フッターのプレースホルダーを実体に置換 */
  function injectLayout() {
    var headerRoot = document.getElementById("site-header");
    if (headerRoot) {
      var current = headerRoot.getAttribute("data-current") || "";
      var variant = headerRoot.getAttribute("data-variant") || "solid";
      headerRoot.outerHTML = buildHeader(current, variant) + buildMobileNav();
    }
    var footerRoot = document.getElementById("site-footer");
    if (footerRoot) {
      var showNote = footerRoot.getAttribute("data-image-note") !== "false";
      footerRoot.outerHTML = buildFooter(showNote);
    }
  }

  /* ヘッダーのスクロール挙動・モバイルメニュー開閉 */
  function initHeaderBehavior() {
    var header = document.getElementById("siteHeader");
    var toggle = document.getElementById("navToggle");
    var mobileNav = document.getElementById("mobileNav");
    var mobileClose = document.getElementById("mobileNavClose");

    function updateHeader() {
      if (!header) return;
      if (header.classList.contains("site-header--static")) return;
      if (window.scrollY > 40) header.classList.add("solid");
      else header.classList.remove("solid");
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (toggle && mobileNav) {
      toggle.addEventListener("click", function () { mobileNav.classList.add("open"); });
    }
    if (mobileClose && mobileNav) {
      mobileClose.addEventListener("click", function () { mobileNav.classList.remove("open"); });
    }
    if (mobileNav) {
      Array.prototype.forEach.call(mobileNav.querySelectorAll("a"), function (a) {
        a.addEventListener("click", function () { mobileNav.classList.remove("open"); });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectLayout();          // 1. 共通ヘッダー・フッターを挿入
    applyStoreLinks(document); // 2. 本文の STORES リンクを設定から反映
    initHeaderBehavior();    // 3. ヘッダーの挙動を有効化
  });
})();
