import { loadState, saveState } from "../../../core/storage.js";

const defaultProfile = {
  name: "Huy Nguyễn",
  age: 28,
  height: 175,
  weight: 72.5,
  gender: "male",
  goal: "cutting",
  calories: 2400,
  protein: 140
};

const saved = loadState({ profile: defaultProfile });
const profile = { ...defaultProfile, ...(saved.profile || {}) };

const goalLabels = {
  hypertrophy: "Tăng cơ",
  cutting: "Giảm mỡ",
  recomp: "Tái cấu trúc",
  general: "Sức khỏe chung"
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

export function renderOnboarding() {
  return `
    <section class="screen onboarding-screen">
      <header class="onboarding-top">
        <div class="brand">
          <span class="brand-mark">ϟ</span>
          <span>FITNESS OS</span>
        </div>
        <span class="step-label">Bước 3 / 4</span>
      </header>

      <div class="progress-track"><div class="progress-fill"></div></div>

      <h1 class="onboarding-title">Thiết lập hồ sơ<br>của bạn</h1>
      <p class="onboarding-subtitle">
        Dữ liệu này dùng để tính TDEE, mục tiêu calories và giáo trình gợi ý.
      </p>

      <form id="profile-form" novalidate>
        <div class="profile-grid">
          <div class="field-card">
            <label for="profile-name">Tên</label>
            <input id="profile-name" name="name" value="${escapeHTML(profile.name)}" autocomplete="name" required>
          </div>
          <div class="field-card">
            <label for="profile-age">Tuổi</label>
            <input id="profile-age" name="age" type="number" min="13" max="100" value="${profile.age}" required>
          </div>
          <div class="field-card">
            <label for="profile-height">Chiều cao</label>
            <input id="profile-height" name="height" type="number" min="100" max="230" value="${profile.height}" required>
          </div>
          <div class="field-card">
            <label for="profile-weight">Cân nặng</label>
            <input id="profile-weight" name="weight" type="number" min="30" max="300" step="0.1" value="${profile.weight}" required>
          </div>
        </div>

        <div class="gender-section">
          <span class="form-label">Giới tính</span>
          <div class="choice-row" role="group" aria-label="Chọn giới tính">
            <button type="button" class="choice-btn ${profile.gender === "male" ? "is-selected" : ""}" data-gender="male">Nam</button>
            <button type="button" class="choice-btn ${profile.gender === "female" ? "is-selected" : ""}" data-gender="female">Nữ</button>
            <button type="button" class="choice-btn ${profile.gender === "other" ? "is-selected" : ""}" data-gender="other">Khác</button>
          </div>
        </div>

        <div class="goal-section">
          <h2 class="section-title">Mục tiêu chính</h2>
          <div class="goal-grid">
            <button type="button" class="goal-card ${profile.goal === "hypertrophy" ? "is-selected" : ""}" data-goal="hypertrophy">
              <span class="goal-icon">↗</span><strong>Tăng cơ</strong><small>Hypertrophy</small>
            </button>
            <button type="button" class="goal-card ${profile.goal === "cutting" ? "is-selected" : ""}" data-goal="cutting">
              <span class="goal-icon">♧</span><strong>Giảm mỡ</strong><small>Cutting</small>
            </button>
            <button type="button" class="goal-card ${profile.goal === "recomp" ? "is-selected" : ""}" data-goal="recomp">
              <span class="goal-icon">⚖</span><strong>Tái cấu trúc</strong><small>Recomp</small>
            </button>
            <button type="button" class="goal-card ${profile.goal === "general" ? "is-selected" : ""}" data-goal="general">
              <span class="goal-icon">♡</span><strong>Sức khỏe chung</strong><small>General</small>
            </button>
          </div>
        </div>

        <section class="nutrition-card" aria-label="Mục tiêu dinh dưỡng">
          <div class="nutrition-heading">
            <strong>Mục tiêu dinh dưỡng</strong>
            <span>Tự động tính</span>
          </div>
          <div class="nutrition-metrics">
            <div class="nutrition-metric">
              <strong id="calorie-target">${profile.calories.toLocaleString("vi-VN")}</strong>
              <span>kcal / ngày</span>
            </div>
            <div class="nutrition-metric">
              <strong id="protein-target">${profile.protein}g</strong>
              <span>protein / ngày</span>
            </div>
          </div>
          <div class="training-note"><span>◉</span> Tập gym 5 buổi + chạy 3 buổi / tuần</div>
        </section>

        <p class="form-error" id="form-error" role="alert">Vui lòng kiểm tra lại thông tin cá nhân.</p>
        <button class="btn btn-primary btn-full" type="submit">→ &nbsp; Tiếp tục</button>
      </form>

      <p class="onboarding-footer">Đồng bộ Apple Health &amp; Strava ở bước tiếp theo</p>
    </section>
  `;
}

export function initOnboarding() {
  // Event handling is attached after the route is rendered by app.js.
}
