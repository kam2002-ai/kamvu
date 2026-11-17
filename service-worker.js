import {loadState} from "../../core/storage.js";
import {renderBottomNav} from "../shared-nav.js";
const n=x=>Number(x).toLocaleString("vi-VN",{maximumFractionDigits:1});
export function renderProgress(){
 const s=loadState({}),records=s.bodyMetrics||[],current=records.at(-1)||{weight:Number(s.profile?.weight)||71.8};
 const range=Number(sessionStorage.getItem('fitness-range')||90);
 const days=range===0?365:range;
 const chosen=records.filter(r=>Date.now()-new Date(r.date).getTime()<=days*86400000);
 const data=(chosen.length?chosen:[{weight:73.8},{weight:73.5},{weight:73.7},{weight:73.1},{weight:72.9},{weight:72.4},current]).slice(-16);
 const min=Math.min(...data.map(d=>d.weight))-0.4,max=Math.max(...data.map(d=>d.weight))+0.4;
 const coords=data.map((d,i)=>`${12+(276*i/Math.max(1,data.length-1))},${92-70*(d.weight-min)/(max-min||1)}`).join(' ');
 const m=s.profile||{},goal=Number(s.progressGoal)||70;
 return `<section class="screen app-screen v5-screen"> <header class="v5-header"><h1>Tiến độ</h1><a class="v5-round" href="#/profile" aria-label="Hồ sơ và chia sẻ">⚙</a></header>
 <div class="v5-tabs">${[[7,'7 ngày'],[30,'30 ngày'],[90,'90 ngày'],[0,'Tất cả']].map(([v,l])=>`<button class="v5-tab ${range===v?'active':''}" data-progress-range="${v}">${l}</button>`).join('')}</div>
 <div class="v5-panel"><div class="v5-row"><b>Xu hướng cân nặng</b><strong class="v5-lime">${n(current.weight-goal)} kg tới mục tiêu</strong></div><svg viewBox="0 0 300 110" class="v5-chart" aria-label="Biểu đồ cân nặng"><polygon points="12,105 ${coords} 288,105" fill="#c6f36b" opacity=".12"/><polyline points="${coords}" fill="none" stroke="#c6f36b" stroke-width="2.5"/></svg><div class="v5-row"><span class="v5-chip">Hiện tại: ${n(current.weight)} kg</span><span class="v5-chip">Mục tiêu: ${n(goal)} kg</span></div></div>
 <div class="v5-grid"><div class="v5-panel"><small>Chạy / tuần</small><h2>18,5 <small>km</small></h2>${bars([23,42,31,51,25,80,18])}</div><div class="v5-panel"><small>Volume gym</small><h2>34,8 <small>t</small></h2>${bars([15,28,47,39,50,80,22])}</div></div>
 <div class="v5-panel"><h3>Tính nhất quán</h3>${[['Tập gym','5/5 buổi',100],['Calories đúng mục tiêu','4/7 ngày',57],['Đủ protein','6/7 ngày',86]].map(([a,b,c])=>`<div class="v5-metric"><div class="v5-row"><span>${a}</span><b>${b}</b></div><div class="v5-track"><i style="width:${c}%"></i></div></div>`).join('')}</div>
 <a class="v5-highlight" href="#/body-metrics">🏆 &nbsp;<span><b>Chỉ số cơ thể</b><small>Xem cân nặng, vòng eo và cập nhật số đo →</small></span></a>
 <div class="v5-links"><a href="#/integrations">⌁ Kết nối dữ liệu</a><a href="#/profile">⚙ Hồ sơ & cài đặt</a></div>${renderBottomNav('progress')}</section>`;
}
function bars(arr){return `<div class="v5-bars">${arr.map((v,i)=>`<i style="height:${v}%;${i===5?'background:var(--color-accent)':''}"></i>`).join('')}</div>`}
