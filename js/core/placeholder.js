export function renderPlaceholder(title, description) {
  return `
    <section class="screen placeholder-screen">
      <div class="brand"><span class="brand-mark">ϟ</span> FITNESS OS</div>
      <div class="placeholder-panel">
        <h1>${title}</h1>
        <p>${description}</p>
        <p>Đây là màn hình khung. Chúng ta sẽ xây dựng giao diện và chức năng riêng cho module này sau.</p>
        <div class="placeholder-nav">
          <a href="#/onboarding">Onboarding</a>
          <a href="#/dashboard">Hôm nay</a>
          <a href="#/training">Luyện tập</a>
          <a href="#/running">Chạy bộ</a>
          <a href="#/nutrition">Dinh dưỡng</a>
          <a href="#/progress">Tiến độ</a>
        </div>
      </div>
    </section>
  `;
}
