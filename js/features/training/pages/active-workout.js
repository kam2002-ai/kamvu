const exercises = [
  {name:"Barbell Bench Press",detail:"Ngực · Barbell · Lần trước: 50kg × 10",sets:[[40,12],[50,10],[55,8]]},
  {name:"Incline Dumbbell Press",detail:"Ngực trên · Dumbbell · Lần trước: 22,5kg × 10",sets:[[20,12],[22.5,10]]},
  {name:"Cable Fly",detail:"Ngực · Cable · Lần trước: 14kg × 12",sets:[[14,12]]}
];

export function renderActiveWorkout() {
  return `
  <section class="screen app-screen active-workout-screen">
    <header class="workout-header">
      <a class="close-workout" href="#/training" aria-label="Thoát buổi tập">×</a>
      <div><small>ĐANG TẬP · <span id="workout-timer">00:34:12</span></small><h1>Lưng + Tay trước</h1></div>
    </header>
    <div class="rest-panel panel">
      <span class="rest-icon">◴</span>
      <div><small>Nghỉ giữa sets</small><b id="rest-time">01:24</b></div>
      <button class="tiny-button" id="rest-add">+30s</button>
      <button class="skip-button" id="rest-skip">Bỏ qua</button>
    </div>
    <div class="training-stats active-stats">
      <div class="mini-stat"><b>5/6 bài</b><small>Hoàn thành</small></div>
      <div class="mini-stat"><b id="set-count">18 sets</b><small>Tổng sets</small></div>
      <div class="mini-stat"><b>6.840 kg</b><small>Volume</small></div>
    </div>
    <div class="exercise-list">
      ${exercises.map((exercise,index)=>`
        <article class="exercise-card panel" data-exercise="${index}">
          <header class="exercise-title">
            <span class="row-icon">♧</span>
            <div><b>${exercise.name}</b><small>${exercise.detail}</small></div>
          </header>
          <div class="set-table-head"><span>SET</span><span>KG</span><span>REPS</span><span>DONE</span></div>
          <div class="set-rows">
            ${exercise.sets.map(([kg,reps],setIndex)=>`
              <div class="set-row">
                <span>${setIndex+1}</span>
                <input aria-label="Mức tạ set ${setIndex+1} bài ${exercise.name}" type="number" step="0.5" value="${kg}">
                <input aria-label="Số reps set ${setIndex+1} bài ${exercise.name}" type="number" value="${reps}">
                <button class="set-check ${setIndex===0?"checked":""}" aria-label="Đánh dấu set hoàn thành">${setIndex===0?"✓":""}</button>
              </div>`).join("")}
          </div>
          <button class="add-set">＋ Thêm set</button>
        </article>`).join("")}
    </div>
    <button class="add-exercise" id="add-exercise">＋ Thêm bài tập</button>
    <button class="btn btn-primary btn-full finish-workout" id="finish-workout">Hoàn thành buổi tập</button>
    <button class="cancel-workout" id="cancel-workout">Hủy buổi tập</button>
  </section>`;
}
