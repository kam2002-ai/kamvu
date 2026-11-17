export function renderTraining() {
  const days = [
    ["T2","Ngực + Tay sau","Đã lên kế hoạch","done"],
    ["T3","Lưng + Tay trước","Hôm nay · 6 bài · 65 phút","today"],
    ["T4","Chân","Đã lên kế hoạch",""],
    ["T5","Vai","Đã lên kế hoạch",""],
    ["T6","Thân trên","Đã lên kế hoạch",""],
    ["T7","Chạy bộ","Easy run 5 km",""],
    ["CN","Nghỉ","Phục hồi","rest"]
  ];
  const groups = [["Ngực",82],["Lưng",74],["Chân",60],["Vai",48],["Tay",65]];
  return `
  <section class="screen app-screen training-screen">
    <header class="page-header"><h1>Luyện tập</h1><button class="icon-button" aria-label="Lịch tập">▣</button></header>
    <a class="btn btn-primary btn-full start-workout" href="#/training/active">▷ &nbsp; Bắt đầu tập luyện</a>
    <div class="training-stats">
      <div class="mini-stat"><span>♧</span><b>34,8 t</b><small>Volume tuần</small></div>
      <div class="mini-stat"><span>◷</span><b>4h12</b><small>Thời gian tập</small></div>
      <div class="mini-stat"><span>▤</span><b>86 sets</b><small>Tổng số sets</small></div>
    </div>
    <div class="section-heading"><h2>Lịch tập tuần</h2><a href="#/profile">Chỉnh split</a></div>
    <div class="schedule-list">
      ${days.map(([day,title,sub,status])=>`
        <a class="schedule-item ${status}" href="${status==="today"?"#/training/active":"#/training"}">
          <span class="day-badge">${status==="done"?"✓":day}</span>
          <span class="schedule-copy"><b>${title}</b><small>${sub}</small></span>
          <span class="chevron">${status==="rest"?"◷":"›"}</span>
        </a>`).join("")}
    </div>
    <section class="muscle-panel panel">
      <div class="section-heading"><h2>Phân bổ nhóm cơ</h2></div>
      ${groups.map(([name,value])=>`<div class="muscle-row"><span>${name}</span><i><b style="width:${value}%"></b></i><small>${value}%</small></div>`).join("")}
    </section>
    <section class="content-section completed-section">
      <div class="section-heading"><h2>Buổi tập đã hoàn thành</h2><a href="#/training/history">Xem tất cả</a></div>
      <a class="list-row" href="#/training/history"><span class="row-icon">♧</span><span><b>Ngực + Tay sau · 9.200 kg</b><small>Hôm qua · 62 phút · 24 sets</small></span><span class="chevron">›</span></a>
    </section>
    ${renderBottomNav("training")}
  </section>`;
}
function renderBottomNav(active) {
  const items=[["dashboard","▦","Hôm nay","/dashboard"],["training","♧","Luyện tập","/training"],["running","⌁","Chạy bộ","/running"],["nutrition","♡","Dinh dưỡng","/nutrition"],["progress","⌁","Tiến độ","/progress"]];
  return `<nav class="bottom-nav">${items.map(([key,icon,label,path])=>`<a class="${active===key?"active":""}" href="#${path}"><span>${icon}</span><small>${label}</small></a>`).join("")}</nav>`;
}
