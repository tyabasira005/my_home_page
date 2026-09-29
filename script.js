// 1. スクロールによるヘッダーの自動隠蔽/表示
const header = document.getElementById('header');
function updateHeader() {
    header.classList.toggle('is-hidden', window.scrollY < 40);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// 2. セクションのフェードイン監視
const fadeSections = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

fadeSections.forEach(section => observer.observe(section));

// 3. サイバーパンク・テキストスクランブル（暗号解読エフェクト）
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@!$%&*+-/<>";

function scrambleText(element) {
    const originalText = element.dataset.value || element.innerText;
    let iteration = 0;
    
    clearInterval(element.interval);
    
    element.interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((char, index) => {
                if (char === " ") return " ";
                if (index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if (iteration >= originalText.length) {
            clearInterval(element.interval);
        }
        
        iteration += 1 / 2; // 解読スピード
    }, 30);
}


// ナビゲーションホバー時にもスクランブルを発火
document.querySelectorAll('nav a').forEach(navLink => {
    navLink.addEventListener('mouseenter', (e) => {
        scrambleText(e.target);
    });
});

// ヒーロータイトルの初回ロード時解読アニメーション（2行両方に適用）
window.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.scramble-line');
    lines.forEach(line => scrambleText(line));
});