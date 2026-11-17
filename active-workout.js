import { loadState } from "../../core/storage.js";
import { renderBottomNav } from "../shared-nav.js";

const defaults = [
  {id:"rice",name:"Cơm trắng",detail:"1 chén · 150g",kcal:200,protein:4,carbs:45,fat:0.4,group:"Gần đây"},
  {id:"egg",name:"Ức gà luộc",detail:"150g",kcal:248,protein:46,carbs:0,fat:5,group:"Giàu đạm"},
  {id:"whey",name:"Whey + sữa tươi",detail:"1 serving",kcal:180,protein:27,carbs:12,fat:3,group:"Giàu đạm"},
  {id:"pho",name:"Phở bò tái",detail:"1 tô",kcal:420,protein:28,carbs:52,fat:11,group:"Gần đây"},
  {id:"banana",name:"Chuối",detail:"1 quả vừa",kcal:105,protein:1,carbs:27,fat:0.3,group:"Giàu carb"},
  {id:"oats",name:"Yến mạch",detail:"50g",kcal:190,protein:6.5,carbs:33,fat:3.5,group:"Giàu carb"},
  {id:"egg2",name:"Trứng gà luộc",detail:"2 quả",kcal:150,protein:13,carbs:1,fat:10,group:"Giàu đạm"}
];
const mealNames = ["Bữa sáng","Bữa trưa","Bữa tối","Ăn vặt"];
const fmt = n => Math.round(n).toLocaleString("vi-VN");
function getNutrition(){const s=loadState({});return s.nutrition || {foods:[],water:1800};}
function totals(foodList){return foodList.reduce((a,f)=>({kcal:a.kcal+f.kcal,protein:a.protein+f.protein,carbs:a.carbs+f.carbs,fat:a.fat+f.fat}),{kcal:0,protein:0,carbs:0,fat:0});}
export function renderNutrition(){
 const data=getNutrition(), p=loadState({}).profile||{}, target=p.calories||2400, proteinTarget=p.protein||140;
 const today=data.foods.filter(f=>f.date===new Date().toLocaleDateString("en-CA"));
 const t=totals(today), remaining=Math.max(0,target-t.kcal), water=data.water??1800;
 const meals=mealNames.map((name,i)=>{const foods=today.filter(f=>f.meal===name);const sum=totals(foods);return `<section class="meal-card"><header><b>${name}</b><small>${foods.length?fmt(sum.kcal)+' kcal':i===0?'420 kcal':i===1?'680 kcal':'Chưa nhập'}</small></header>${foods.length?foods.map(f=>`<div class="meal-food"><span class="food-icon">♧</span><span><b>${f.name}</b><small>${f.amount}g · P ${fmt(f.protein)}g</small></span><strong>${fmt(f.kcal)} kcal</strong><button class="food-remove" data-remove-food="${f.key}" aria-label="Xóa món">×</button></div>`).join(""):`<a class="meal-empty" href="#/nutrition/add?meal=${encodeURIComponent(name)}">＋ Thêm ${name.toLowerCase()}</a>`}</section>`}).join("");
 return `<section class="screen app-screen nutrition-screen"><header class="page-header"><h1>Dinh dưỡng</h1><button class="icon-btn" aria-label="Lịch" title="Hôm nay">▦</button></header>
 <section class="nutrition-summary panel"><div class="calorie-ring" style="--progress:${Math.min(100,t.kcal/target*100)}%"><div><b>${fmt(remaining)}</b><small>còn lại</small></div></div><div class="calorie-copy"><div>Đã nạp <b>${fmt(t.kcal)} / ${fmt(target)} kcal</b></div><div class="calorie-track"><i style="width:${Math.min(100,t.kcal/target*100)}%"></i></div><small>Mục tiêu hôm nay: ${fmt(target)} kcal</small></div><div class="macro-lines"><div><span>Protein</span><b>${fmt(t.protein)}g / ${proteinTarget}g</b><i><em style="width:${Math.min(100,t.protein/proteinTarget*100)}%"></em></i></div><div><span>Carbs</span><b>${fmt(t.carbs)}g / 260g</b><i><em style="width:${Math.min(100,t.carbs/260*100)}%"></em></i></div><div><span>Fat</span><b>${fmt(t.fat)}g / 70g</b><i><em style="width:${Math.min(100,t.fat/70*100)}%"></em></i></div></div></section>
 <a class="btn btn-primary nutrition-add-main" href="#/nutrition/add?meal=Bữa trưa">＋ Thêm món ăn</a>
 <div class="meal-list">${meals}</div><section class="water-card panel"><div><span>♨</span><b>Nước · ${(water/1000).toFixed(1).replace('.',',')} / 3,0 L</b></div><div class="water-track"><i style="width:${Math.min(100,water/3000*100)}%"></i></div><button data-water-add="250">+250ml</button></section>${renderBottomNav('nutrition')}</section>`;
}
export function renderAddFood(){
 const params=new URLSearchParams(location.hash.split('?')[1]||''), meal=params.get('meal')||'Bữa trưa';
 return `<section class="screen app-screen add-food-screen"><header class="page-header"><a class="icon-btn" href="#/nutrition">‹</a><h1>Thêm món ăn</h1><span class="meal-chip">${meal}</span></header><label class="food-search">⌕ <input id="food-search" placeholder="Tìm món ăn, thương hiệu..."><span>⌗</span></label><div class="food-filters"><button class="active" data-food-filter="Tất cả">Tất cả</button><button data-food-filter="Giàu đạm">Giàu đạm</button><button data-food-filter="Giàu carb">Giàu carb</button></div><div class="section-heading"><h2>Món ăn gợi ý</h2><small>Chọn món để thêm</small></div><div id="food-results" class="food-results">${defaults.map(foodCard).join('')}</div><section class="food-custom panel"><h2>Tạo món ăn thủ công</h2><form id="custom-food-form"><input name="name" placeholder="Tên món ăn" required><div class="custom-food-grid"><input name="kcal" type="number" placeholder="Calories" min="0" required><input name="protein" type="number" placeholder="Protein (g)" min="0" value="0"><input name="carbs" type="number" placeholder="Carbs (g)" min="0" value="0"><input name="fat" type="number" placeholder="Fat (g)" min="0" value="0"></div><button class="btn btn-primary" type="submit">Lưu món ăn</button></form></section></section>`;
}
function foodCard(f){return `<article class="food-option" data-food-name="${f.name.toLowerCase()}" data-food-group="${f.group}"><span class="food-icon">♧</span><span><b>${f.name}</b><small>${f.detail} · ${f.kcal} kcal · P ${f.protein}g</small></span><button data-add-food="${f.id}" aria-label="Thêm ${f.name}">＋</button></article>`}
export function foodCatalog(){return defaults;}
