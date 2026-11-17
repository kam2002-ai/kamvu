.onboarding-screen { display: flex; flex-direction: column; gap: 0; }
.onboarding-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.brand { display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; letter-spacing: -.2px; }
.brand .brand-mark { width: 22px; height: 22px; border-radius: 6px; font-size: 16px; }
.step-label { color: var(--color-dim); font-size: 9px; }
.progress-track { height: 3px; border-radius: 99px; background: #292e28; overflow: hidden; margin-bottom: 18px; }
.progress-fill { height: 100%; width: 75%; background: var(--color-accent); border-radius: inherit; }
.onboarding-title { font-size: clamp(23px, 6vw, 28px); line-height: 1.12; letter-spacing: -.8px; margin: 0 0 8px; font-weight: 800; }
.onboarding-subtitle { color: var(--color-muted); font-size: 10px; line-height: 1.5; margin: 0 0 17px; max-width: 330px; }
.profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.gender-section { margin-bottom: 17px; }
.section-title { font-size: 10px; font-weight: 750; margin: 0 0 9px; }
.goal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-bottom: 15px; }
.nutrition-card { padding: 12px; margin-bottom: 15px; }
.nutrition-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.nutrition-heading strong { font-size: 10px; }
.nutrition-heading span { color: var(--color-accent); font-size: 9px; font-weight: 700; }
.nutrition-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.nutrition-metric { background: var(--color-surface-2); border-radius: 10px; padding: 9px 5px; text-align: center; }
.nutrition-metric strong { display: block; color: var(--color-accent); font-size: 17px; letter-spacing: -.5px; }
.nutrition-metric span { color: var(--color-muted); font-size: 9px; }
.training-note { display: flex; align-items: center; gap: 6px; color: var(--color-dim); font-size: 9px; margin-top: 9px; }
.onboarding-footer { color: var(--color-dim); text-align: center; font-size: 9px; margin: 15px 0 0; }
.form-error { display: none; color: var(--color-danger); font-size: 10px; margin: 0 0 10px; }
.form-error.is-visible { display: block; }
@media (max-height: 760px) and (min-width: 601px) {
  .screen { padding-top: 20px; padding-bottom: 18px; }
  .onboarding-title { font-size: 23px; }
  .field-card { min-height: 50px; }
  .goal-card { min-height: 68px; }
}
