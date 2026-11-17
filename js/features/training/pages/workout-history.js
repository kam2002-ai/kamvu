export function renderWorkoutHistory() {
  const sessions = [
    {id:'chest',day:'HÔM NAY',name:'Ngực + Tay sau',date:'17/11/2026 · 17:32',meta:'62 phút · Nhập tay',volume:'9.200 kg',sets:'24 sets',exercises:[['Barbell Bench Press','40 × 12 · 50 × 10 · 55 × 8'],['Incline DB Press','20 × 12 · 22,5 × 10 · 22,5 × 9'],['Triceps Pushdown','18 × 12 · 20 × 10 · 22 × 8']]},
    {id:'legs',day:'HÔM QUA',name:'Chân — Squat Focus',date:'16/11/2026 · 18:05',meta:'75 phút · Nhập tay',volume:'11.400 kg',sets:'28 sets',exercises:[['Barbell Squat','50 × 12 · 60 × 10 · 70 × 8'],['Romanian Deadlift','40 × 12 · 50 × 10 · 55 × 8'],['Leg Press','100 × 12 · 120 × 10 · 140 × 8']]},
    {id:'back',day:'TRƯỚC ĐÓ',name:'Lưng + Tay trước',date:'14/11/2026 · 18:20',meta:'68 phút · Nhập tay',volume:'8.600 kg',sets:'22 sets',exercises:[['Lat Pulldown','35 × 12 · 40 × 10 · 45 × 8'],['Seated Cable Row','35 × 12 · 40 × 10 · 45 × 8']]},
    {id:'shoulder',day:'TRƯỚC ĐÓ',name:'Vai + Core',date:'12/11/2026 · 18:10',meta:'55 phút · Nhập tay',volume:'5.800 kg',sets:'18 sets',exercises:[['Shoulder Press','15 × 12 · 17,5 × 10 · 17,5 × 8'],['Lateral Raise','7 × 15 · 8 × 12 · 8 × 12']]}
  ];
  return `<section class="screen app-screen history-screen">
    <header class="page-header"><h1>Lịch sử tập luyện</h1><button class="icon-button" aria-label="Tìm kiếm" id="history-search">⌕</button></header>
    <div class="history-search-wrap" id="history-search-wrap" hidden><input id="history-search-input" type="search" placeholder="Tìm buổi tập..." /></div>
    <div class="filter-chips" role="group" aria-label="Lọc nhóm cơ">${['Tất cả','Ngực','Lưng','Chân','Vai'].map((x,i)=>`<button class="filter-chip ${i===0?'active':''}" data-history-filter="${x}">${x}</button>`).join('')}</div>
    <div class="section-heading history-week-heading"><h2>Tuần này</h2><span>4 buổi</span></div>
    <div class="history-list">${sessions.map((s,i)=>`<article class="history-entry" data-groups="${s.name.includes('Ngực')?'Ngực':s.name.includes('Chân')?'Chân':s.name.includes('Lưng')?'Lưng':'Vai'}" data-name="${s.name.toLowerCase()}">
      <button class="history-session ${i===0?'selected':''}" data-history-open="${s.id}" aria-expanded="${i===0?'true':'false'}">
        <span class="row-icon">♧</span><span class="history-session-copy"><b>${s.name} ${i===0?'<em>PR</em>':''}</b><small>${s.date} · ${s.meta}</small><span class="history-tags"><i>${s.volume}</i><i>${s.sets}</i></span></span><span class="chevron">›</span>
      </button>
      <div class="history-detail ${i===0?'open':''}" data-history-detail="${s.id}">
        <div class="history-detail-title"><div><b>${s.name}</b><small>${s.date} · ${s.meta}</small></div><a href="#/training/active">Chia sẻ</a></div>
        <div class="history-kpis"><div><b>${s.volume}</b><small>Volume</small></div><div><b>${s.sets.split(' ')[0]}</b><small>Sets</small></div><div><b>${s.exercises.length}</b><small>Bài tập</small></div></div>
        <div class="history-exercises">${s.exercises.map(([n,d])=>`<div><span class="exercise-done">✓</span><span><b>${n}</b><small>${d}</small></span></div>`).join('')}</div>
        <div class="history-actions"><a class="btn btn-primary" href="#/training/active">Tập lại buổi này</a><button class="btn btn-secondary" data-history-export="${s.id}">Xuất PDF</button></div>
      </div>
    </article>`).join('')}</div>
    <div class="section-heading older-heading"><h2>Trước đó</h2></div>
    <div class="history-older"><button class="history-session" data-history-open="back"><span class="row-icon">♧</span><span class="history-session-copy"><b>Lưng + Tay trước</b><small>14/11 · 68 phút · 8.600 kg</small></span><span class="chevron">›</span></button><button class="history-session" data-history-open="shoulder"><span class="row-icon">♧</span><span class="history-session-copy"><b>Vai + Core</b><small>12/11 · 55 phút · 5.800 kg</small></span><span class="chevron">›</span></button></div>
    ${renderBottomNav('training')}
  </section>`;
}
function renderBottomNav(active){const items=[['dashboard','▦','Hôm nay','/dashboard'],['training','♧','Luyện tập','/training'],['running','⌁','Chạy bộ','/running'],['nutrition','♡','Dinh dưỡng','/nutrition'],['progress','⌁','Tiến độ','/progress']];return `<nav class="bottom-nav">${items.map(([k,ic,l,p])=>`<a class="${active===k?'active':''}" href="#${p}"><span>${ic}</span><small>${l}</small></a>`).join('')}</nav>`;}
