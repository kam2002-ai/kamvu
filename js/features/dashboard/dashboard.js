export function renderDashboard() {
  return `
  <section class="screen app-screen dashboard-screen">
    <header class="app-header">
      <div class="user-greeting">
        <a class="avatar" href="#/profile" aria-label="Hồ sơ">H</a>
        <div><p>Chào buổi sáng, Huy</p><small>Thứ Ba, 10 Tháng 11</small></div>
      </div>
      <a class="icon-button" href="#/integrations" aria-label="Kết nối sức khỏe">⌁</a>
    </header>

    <section class="calorie-card panel">
      <div class="calorie-ring"><div><strong>1.650</strong><small>/ 2.400 kcal</small></div></div>
      <div class="calorie-breakdown">
        <strong>Calories đã nạp</strong>
        <p><i class="dot dot-green"></i> Còn lại <b>750 kcal</b></p>
        <p><i class="dot dot-orange"></i> Đã đốt <b>420 kcal</b></p>
        <div class="burn-pill">♨ &nbsp; Nạp ròng: 1.230 kcal</div>
      </div>
    </section>

    <section class="panel macro-panel">
      <div class="section-heading"><h2>Macros hôm nay</h2><a href="#/nutrition">Dinh dưỡng</a></div>
      <div class="macro-line"><div><span>Protein</span><b>105g <em>/ 140g</em></b></div><i><span style="width:75%"></span></i></div>
      <div class="macro-line"><div><span>Carbs</span><b>180g <em>/ 230g</em></b></div><i class="macro-white"><span style="width:78%"></span></i></div>
      <div class="macro-line"><div><span>Fat</span><b>48g <em>/ 70g</em></b></div><i class="macro-orange"><span style="width:69%"></span></i></div>
    </section>

    <nav class="quick-actions" aria-label="Thao tác nhanh">
      <a href="#/training"><span>♧</span><b>Tập gym</b></a>
      <a href="#/running"><span>⌁</span><b>Chạy bộ</b></a>
      <a href="#/nutrition"><span>＋</span><b>Thêm món</b></a>
      <a href="#/progress"><span>⚖</span><b>Cân nặng</b></a>
    </nav>

    <section class="content-section">
      <div class="section-heading"><h2>Buổi tập hôm nay</h2><a href="#/training">Lịch tập</a></div>
      <a class="today-workout" href="#/training/active">
        <div><small>THỨ BA — LƯNG + TAY TRƯỚC</small><h3>Back + Biceps</h3><p>6 bài · ~65 phút · 8.400 kg</p></div>
        <span class="play-button">▶</span>
      </a>
    </section>

    <section class="content-section">
      <div class="section-heading"><h2>Buổi tập gần đây</h2><a href="#/training">Xem tất cả</a></div>
      <a class="list-row" href="#/training/history"><span class="row-icon">♧</span><span><b>Ngực + Tay sau</b><small>Hôm qua · 62 phút · 9.200 kg</small></span><span class="chevron">›</span></a>
      <a class="list-row" href="#/running"><span class="row-icon">⌁</span><span><b>Chạy nhẹ 6,2 km</b><small>Pace 6:10 · 38 phút · 312 kcal</small></span><span class="source-tag">STRAVA</span></a>
    </section>

    <section class="content-section">
      <div class="section-heading"><h2>Tổng quan tuần</h2></div>
      <div class="week-stats">
        <div class="stat-card"><span>♧</span><b>4 buổi</b><small>Gym tuần này</small></div>
        <div class="stat-card"><span>⌁</span><b>18,5 km</b><small>Quãng đường</small></div>
        <div class="stat-card"><span>◷</span><b>6h20</b><small>Tổng thời gian</small></div>
      </div>
      <div class="week-dots panel">
        ${["T2","T3","T4","T5","T6","T7","CN"].map((d,i)=>`<div class="day-dot ${i<4?"done":""}"><b>${i<4?"✓":"·"}</b><small>${d}</small></div>`).join("")}
      </div>
    </section>
    ${renderBottomNav("dashboard")}
  </section>`;
}

function renderBottomNav(active) {
  const items = [
    ["dashboard","▦","Hôm nay","/dashboard"],
    ["training","♧","Luyện tập","/training"],
    ["running","⌁","Chạy bộ","/running"],
    ["nutrition","♡","Dinh dưỡng","/nutrition"],
    ["progress","⌁","Tiến độ","/progress"]
  ];
  return `<nav class="bottom-nav">${items.map(([key,icon,label,path])=>`
    <a class="${active===key?"active":""}" href="#${path}"><span>${icon}</span><small>${label}</small></a>`).join("")}</nav>`;
}
