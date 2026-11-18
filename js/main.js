// ===== SITE（index.html上部）の文字を画面に反映する =====
// ※文字の書き換えは index.html の SITE で行ってください。このファイルは触らなくてOKです。

function get(path) {
  return path.split('.').reduce((o, k) => (o == null ? '' : o[k]), SITE) ?? '';
}

document.querySelectorAll('[data-t]').forEach((el) => {
  el.innerHTML = get(el.dataset.t);
});

document.title = SITE.pageTitle;

// 動画
document.getElementById('video').innerHTML =
  `<source src="${SITE.showreel.video}" type="video/mp4">`;

// 制作ゲーム
document.getElementById('projectGrid').innerHTML = SITE.projects.items.map((p) => `
  <article class="project-card fade">
    <div class="card-img"><img src="${p.image}" alt="${p.title}"></div>
    <div class="card-body">
      <h3>${p.title}</h3>
      <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      <p class="card-desc">${p.desc}</p>
    </div>
  </article>`).join('');

// 学歴・資格
const toList = (arr) => arr.map((i) => `<li><span>${i.date}</span>${i.text}</li>`).join('');
document.getElementById('eduList').innerHTML = toList(SITE.about.education);
document.getElementById('licList').innerHTML = toList(SITE.about.licenses);

// プロフィール画像・メール
document.getElementById('avatar').src = SITE.about.image;
const mail = document.getElementById('mail');
mail.textContent = SITE.about.email;
mail.href = 'mailto:' + SITE.about.email;

// スクロールでフェードイン
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('show'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade').forEach((el) => observer.observe(el));
