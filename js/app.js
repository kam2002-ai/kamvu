import { createRouter } from "./core/router.js";
import { renderOnboarding } from "./features/onboarding/pages/profile-setup.js";
import { renderDashboard } from "./features/dashboard/dashboard.js";
import { renderTraining } from "./features/training/training.js";
import { renderActiveWorkout } from "./features/training/pages/active-workout.js";
import { renderWorkoutHistory } from "./features/training/pages/workout-history.js";
import { renderRunning } from "./features/running/running.js";
import { renderRunDetail } from "./features/running/run-detail.js";
import { renderRunLog } from "./features/running/run-log.js";
import { renderNutrition, renderAddFood, foodCatalog } from "./features/nutrition/nutrition.js";
import { renderBodyMetrics } from "./features/progress/body-metrics.js";
import { renderProgress } from "./features/progress/progress.js";
import { renderIntegrations } from "./features/integrations.js";
import { renderProfile } from "./features/profile.js";
import { renderPlaceholder } from "./core/placeholder.js";
import { loadState, saveState } from "./core/storage.js";

const routes = {
  "/onboarding": renderOnboarding,
  "/dashboard": renderDashboard,
  "/training": renderTraining,
  "/training/active": renderActiveWorkout,
  "/training/history": renderWorkoutHistory,
  "/running": renderRunning,
  "/running/detail": renderRunDetail,
  "/running/log": renderRunLog,
  "/running/all": renderRunning,
  "/nutrition": renderNutrition,
  "/nutrition/add": renderAddFood,
  "/progress": renderProgress,
  "/body-metrics": renderBodyMetrics,
  "/profile": renderProfile,
  "/integrations": renderIntegrations
};

const root = document.querySelector("#app");
const router = createRouter({ root, routes, fallback: "/onboarding" });
router.start();

const stored = loadState({});
const state = {
  profile: {
    name: "Huy Nguyễn", age: 28, height: 175, weight: 72.5,
    gender: "male", goal: "cutting", calories: 2400, protein: 140,
    ...(stored.profile || {})
  }
};

function updateSelected(selector, attribute, value) {
  document.querySelectorAll(selector).forEach(button => {
    button.classList.toggle("is-selected", button.getAttribute(attribute) === value);
  });
}

function estimateTargets() {
  const p = state.profile;
  const weight = Number(p.weight) || 72.5, height = Number(p.height) || 175, age = Number(p.age) || 28;
  const sexOffset = p.gender === "female" ? -161 : p.gender === "male" ? 5 : -78;
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + sexOffset;
  const maintenance = bmr * 1.55;
  const multipliers = { hypertrophy: 1.08, cutting: .85, recomp: 1, general: 1 };
  p.calories = Math.round((maintenance * (multipliers[p.goal] || 1)) / 50) * 50;
  p.protein = Math.round(weight * (p.goal === "cutting" || p.goal === "recomp" ? 2 : 1.8) / 5) * 5;
  const kcal = document.querySelector("#calorie-target"), protein = document.querySelector("#protein-target");
  if (kcal) kcal.textContent = p.calories.toLocaleString("vi-VN");
  if (protein) protein.textContent = `${p.protein}g`;
}

function bindOnboarding() {
  const form = document.querySelector("#profile-form");
  if (!form || form.dataset.bound) return;
  form.dataset.bound = "true";
  document.querySelectorAll("[data-gender]").forEach(button => button.addEventListener("click", () => {
    state.profile.gender = button.dataset.gender;
    updateSelected("[data-gender]", "data-gender", state.profile.gender); estimateTargets();
  }));
  document.querySelectorAll("[data-goal]").forEach(button => button.addEventListener("click", () => {
    state.profile.goal = button.dataset.goal;
    updateSelected("[data-goal]", "data-goal", state.profile.goal); estimateTargets();
  }));
  ["name","age","height","weight"].forEach(key => {
    const input = form.elements.namedItem(key);
    input.addEventListener("input", () => {
      state.profile[key] = key === "name" ? input.value : Number(input.value);
      if (key !== "name") estimateTargets();
    });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const p = state.profile, error = document.querySelector("#form-error");
    const valid = p.name.trim() && p.age >= 13 && p.age <= 100 && p.height >= 100 && p.height <= 230 && p.weight >= 30 && p.weight <= 300;
    error.classList.toggle("is-visible", !valid);
    if (!valid) return;
    saveState(state);
    window.location.hash = "/dashboard";
  });
}

function bindActiveWorkout() {
  const activeScreen = document.querySelector(".active-workout-screen");
  if (!activeScreen || activeScreen.dataset.activeBound === "true") return;
  activeScreen.dataset.activeBound = "true";

  document.querySelectorAll(".set-check").forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("checked");
    button.textContent = button.classList.contains("checked") ? "✓" : "";
    const completed = document.querySelectorAll(".set-check.checked").length;
    const total = document.querySelectorAll(".set-check").length;
    const count = document.querySelector("#set-count");
    if (count) count.textContent = `${completed}/${total} sets`;
  }));

  document.querySelectorAll(".add-set").forEach(button => button.addEventListener("click", () => {
    const rows = button.previousElementSibling;
    const next = rows.children.length + 1;
    const row = document.createElement("div");
    row.className = "set-row";
    row.innerHTML = `<span>${next}</span><input aria-label="Mức tạ set ${next}" type="number" value="10" step="0.5"><input aria-label="Số reps set ${next}" type="number" value="10"><button class="set-check" aria-label="Đánh dấu set hoàn thành"></button>`;
    row.querySelector(".set-check").addEventListener("click", event => {
      const b = event.currentTarget; b.classList.toggle("checked"); b.textContent = b.classList.contains("checked") ? "✓" : "";
    });
    rows.appendChild(row);
  }));

  let seconds = 84;
  const timer = document.querySelector("#rest-time");
  const showTime = () => timer.textContent = `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;
  document.querySelector("#rest-add").addEventListener("click", () => { seconds += 30; showTime(); });
  document.querySelector("#rest-skip").addEventListener("click", () => { seconds = 0; showTime(); });
  document.querySelector("#add-exercise").addEventListener("click", () => alert("Danh sách bài tập sẽ được bổ sung ở bước phát triển tiếp theo."));
  document.querySelector("#finish-workout").addEventListener("click", () => {
    alert("Buổi tập đã được ghi nhận trong prototype!");
    window.location.hash = "/training";
  });
  document.querySelector("#cancel-workout").addEventListener("click", () => {
    if (confirm("Bạn có chắc muốn hủy buổi tập?")) window.location.hash = "/training";
  });
}

function bindRouteInteractions() {
  bindOnboarding();
  bindActiveWorkout();
}

// Prototype interactions for screens 05–07. Delegation survives hash-route re-renders.
if (!root.dataset.prototypeBound) {
  root.dataset.prototypeBound = "true";
  root.addEventListener("click", event => {
    const range = event.target.closest('[data-progress-range]');
    if(range){sessionStorage.setItem('fitness-range',range.dataset.progressRange);router.render();return;}
    const integration = event.target.closest('[data-integration-demo]');
    if(integration){if(integration.dataset.integrationDemo==='strava'){const saved=loadState({});saved.demoStrava=!saved.demoStrava;saveState(saved);router.render();}else alert('Apple Health cần ứng dụng iOS native và quyền HealthKit. Bản web này chưa kết nối.');return;}
    if(event.target.closest('[data-profile-edit]')){const saved=loadState({});const old=saved.profile||state.profile;const name=prompt('Tên hiển thị:',old.name||'Huy');if(name?.trim()){saved.profile={...old,name:name.trim()};saveState(saved);router.render();}return;}
    if(event.target.closest('[data-notifications]')){const saved=loadState({});saved.settings={...(saved.settings||{}),notifications:saved.settings?.notifications===false};saveState(saved);router.render();return;}
    if(event.target.closest('[data-export-data]')){const blob=new Blob([JSON.stringify(loadState({}),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='fitness-os-data.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}
    if(event.target.closest('[data-privacy]')){alert('Bản prototype chỉ lưu dữ liệu trong localStorage của trình duyệt. Chưa có máy chủ hoặc đồng bộ thật.');return;}
    if(event.target.closest('[data-reset-demo]')){if(confirm('Xóa toàn bộ dữ liệu FITNESS OS đã lưu trên trình duyệt này?')){localStorage.removeItem('fitness-os-state');window.location.hash='/onboarding';router.render();}return;}
    const filter = event.target.closest("[data-history-filter]");
    if (filter) {
      const selected = filter.dataset.historyFilter;
      root.querySelectorAll("[data-history-filter]").forEach(x => x.classList.toggle("active", x === filter));
      root.querySelectorAll(".history-entry").forEach(card => {
        card.hidden = selected !== "Tất cả" && card.dataset.groups !== selected;
      });
    }
    const open = event.target.closest("[data-history-open]");
    if (open) {
      const id = open.dataset.historyOpen;
      const detail = root.querySelector(`[data-history-detail="${id}"]`);
      if (detail) {
        detail.classList.toggle("open");
        open.classList.toggle("selected", detail.classList.contains("open"));
        open.setAttribute("aria-expanded", String(detail.classList.contains("open")));
      }
    }
    if (event.target.closest("#history-search")) {
      const wrap = root.querySelector("#history-search-wrap");
      if (wrap) { wrap.hidden = !wrap.hidden; if (!wrap.hidden) root.querySelector("#history-search-input")?.focus(); }
    }
    const exportBtn = event.target.closest("[data-history-export]");
    if (exportBtn) window.print();
    const addFood = event.target.closest("[data-add-food]");
    if (addFood) {
      const item = foodCatalog().find(f => f.id === addFood.dataset.addFood);
      if (item) {
        const saved = loadState({}), nutrition = saved.nutrition || { foods: [], water: 1800 };
        const meal = new URLSearchParams(location.hash.split("?")[1] || "").get("meal") || "Bữa trưa";
        nutrition.foods.push({ ...item, key: `${Date.now()}-${Math.random()}`, amount: 150, meal, date: new Date().toLocaleDateString("en-CA") });
        saved.nutrition = nutrition; saveState(saved); window.location.hash = "/nutrition";
      }
    }
    const removeFood = event.target.closest("[data-remove-food]");
    if (removeFood) {
      const saved=loadState({}), nutrition=saved.nutrition||{foods:[],water:1800};
      nutrition.foods=nutrition.foods.filter(f=>String(f.key)!==removeFood.dataset.removeFood); saved.nutrition=nutrition; saveState(saved); router.render();
    }
    const waterAdd = event.target.closest("[data-water-add]");
    if (waterAdd) { const saved=loadState({}), nutrition=saved.nutrition||{foods:[],water:0}; nutrition.water=(nutrition.water||0)+Number(waterAdd.dataset.waterAdd); saved.nutrition=nutrition; saveState(saved); router.render(); }
    const foodFilter = event.target.closest("[data-food-filter]");
    if (foodFilter) { root.querySelectorAll("[data-food-filter]").forEach(b=>b.classList.toggle("active",b===foodFilter)); root.querySelectorAll(".food-option").forEach(card=>card.hidden=foodFilter.dataset.foodFilter!=="Tất cả"&&card.dataset.foodGroup!==foodFilter.dataset.foodFilter); }
    if (event.target.closest("#show-metric-form")) root.querySelector("#metric-form-card")?.scrollIntoView({behavior:"smooth",block:"center"});
    if (event.target.closest("#share-run")) {
      const shareData = { title: "FITNESS OS · Long Run cuối tuần", text: "10,0 km · 1:04:20 · Pace 6:26/km" };
      if (navigator.share) navigator.share(shareData).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(`${shareData.title} — ${shareData.text}`).then(() => alert("Đã sao chép thông tin buổi chạy!"));
      else alert(shareData.text);
    }
  });
  root.addEventListener("input", event => {
    if (event.target.id === "history-search-input") {
      const term = event.target.value.trim().toLowerCase();
      root.querySelectorAll(".history-entry").forEach(card => { card.hidden = !card.dataset.name.includes(term); });
    }
  });
  root.addEventListener("input", event => {
    if (event.target.id === "food-search") { const term=event.target.value.toLowerCase().trim(); root.querySelectorAll(".food-option").forEach(card=>card.hidden=!card.dataset.foodName.includes(term)); }
  });
  root.addEventListener("submit", event => {
    if (event.target.id === "custom-food-form") {
      event.preventDefault(); const d=Object.fromEntries(new FormData(event.target).entries()); const saved=loadState({}), n=saved.nutrition||{foods:[],water:1800}; const meal=new URLSearchParams(location.hash.split("?")[1]||"").get("meal")||"Bữa trưa";
      n.foods.push({key:`${Date.now()}`,id:"custom",name:d.name,detail:"Món tự tạo",kcal:Number(d.kcal),protein:Number(d.protein||0),carbs:Number(d.carbs||0),fat:Number(d.fat||0),amount:100,meal,date:new Date().toLocaleDateString("en-CA")}); saved.nutrition=n; saveState(saved); window.location.hash="/nutrition";
    }
    if (event.target.id === "body-metric-form") {
      event.preventDefault(); const d=Object.fromEntries(new FormData(event.target).entries()), saved=loadState({}); saved.bodyMetrics=[...(saved.bodyMetrics||[]),{weight:Number(d.weight),waist:Number(d.waist),bodyFat:Number(d.bodyFat),date:new Date().toISOString()}]; saveState(saved); alert("Đã lưu số đo cơ thể!"); router.render();
    }
    if (event.target.id === "run-log-form") {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target).entries());
      const distance = data.distance;
      const saved = loadState({});
      saved.manualRuns = [...(saved.manualRuns || []), { distance: Number(distance), duration: data.duration, heartRate: data.heartRate ? Number(data.heartRate) : null, note: data.note, createdAt: new Date().toISOString() }];
      saveState(saved);
      alert(`Đã lưu hoạt động chạy ${distance} km vào prototype.`);
      window.location.hash = "/running";
    }
  });
}
const observer = new MutationObserver(bindRouteInteractions);
observer.observe(root, { childList: true, subtree: true });
bindRouteInteractions();
