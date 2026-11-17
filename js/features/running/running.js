export function renderRunning(){
 const bars=[22,34,8,29,40,55,76];
 return `<section class="screen app-screen running-screen">
  <header class="page-header"><h1>Chạy bộ</h1><a class="btn btn-primary run-log-btn" href="#/running/log">＋ Ghi nhận</a></header>
  <section class="run-week-card panel"><div class="run-card-label">Quãng đường tuần này</div><div class="run-total"><strong>18,5</strong><span>km</span><em>+12% vs tuần trước</em></div><div class="run-bars">${bars.map((v,i)=>`<div class="run-bar-col"><i style="height:${v}%" class="${i===6?'highlight':''}"></i><small>${['T2','T3','T4','T5','T6','T7','CN',''][i]}</small></div>`).join('')}</div></section>
  <div class="run-metrics"><div class="panel"><span>◴</span><b>6:15</b><small>Pace TB /km</small></div><div class="panel"><span>◷</span><b>2h08</b><small>Thời gian</small></div><div class="panel"><span>♡</span><b>148</b><small>bpm TB</small></div></div>
  <div class="run-month-stats panel"><div><small>Tháng 11</small><b>62,4 km</b></div><div><small>Run dài nhất</small><b>10 km</b></div><div><small>Số runs</small><b>3</b></div></div>
  <div class="section-heading recent-run-heading"><h2>Hoạt động gần đây</h2><a href="#/running/all">Tất cả</a></div>
  <div class="recent-runs">
   <a class="run-activity" href="#/running/detail"><span class="run-activity-icon">⌁</span><span><b>Long Run cuối tuần</b><small>10,0 km · 1:04:20 · 6:26/km</small></span><span class="run-source"><b>STRAVA</b><small>152 bpm</small></span></a>
   <a class="run-activity" href="#/running/detail"><span class="run-activity-icon">⌁</span><span><b>Easy Run sáng</b><small>6,2 km · 38:15 · 6:10/km</small></span><span class="run-source"><b>WATCH</b><small>141 bpm</small></span></a>
   <a class="run-activity" href="#/running/detail"><span class="run-activity-icon">⌁</span><span><b>Interval 400m × 8</b><small>8,3 km · 45:02 · 5:25/km</small></span><span class="run-source"><b>THỦ CÔNG</b><small>165 bpm</small></span></a>
  </div>
  ${renderBottomNav('running')}
 </section>`;
}
function renderBottomNav(active){const items=[['dashboard','▦','Hôm nay','/dashboard'],['training','♧','Luyện tập','/training'],['running','⌁','Chạy bộ','/running'],['nutrition','♡','Dinh dưỡng','/nutrition'],['progress','⌁','Tiến độ','/progress']];return `<nav class="bottom-nav">${items.map(([k,ic,l,p])=>`<a class="${active===k?'active':''}" href="#${p}"><span>${ic}</span><small>${l}</small></a>`).join('')}</nav>`;}
