
const PRODUCTS = [{"id": 1, "slug": "shirt-classic", "name": "قميص Classic", "category": "قمصان", "price": 3500, "premiumId": 9, "image": "shirt-classic.jpg", "desc": "قميص يومي بقصة مريحة وتصميم بسيط."}, {"id": 2, "slug": "pants-slim", "name": "سروال Slim", "category": "سراويل", "price": 5200, "premiumId": 10, "image": "pants-slim.jpg", "desc": "سروال بقصة Slim مناسب للإطلالات اليومية والرسمية."}, {"id": 3, "slug": "belt-leather", "name": "حزام Leather", "category": "إكسسوارات", "price": 1600, "premiumId": 11, "image": "belt-leather.jpg", "desc": "حزام جلدي بسيط يكمل الإطلالة."}, {"id": 4, "slug": "perfume-urban", "name": "عطر Urban", "category": "عطور", "price": 2800, "premiumId": 12, "image": "perfume-urban.jpg", "desc": "عطر يومي بطابع عصري."}, {"id": 5, "slug": "shoes-casual", "name": "حذاء Casual", "category": "أحذية", "price": 6900, "premiumId": 13, "image": "shoes-casual.jpg", "desc": "حذاء عملي للاستخدام اليومي."}, {"id": 6, "slug": "jacket-premium", "name": "جاكيت Premium", "category": "جاكيت", "price": 8900, "premiumId": 14, "image": "jacket-premium.jpg", "desc": "جاكيت أنيق بطابع Premium."}, {"id": 7, "slug": "watch-minimal", "name": "ساعة Minimal", "category": "إكسسوارات", "price": 4300, "premiumId": 15, "image": "watch-minimal.jpg", "desc": "ساعة بتصميم بسيط وحديث."}, {"id": 8, "slug": "cap-street", "name": "قبعة Street", "category": "إكسسوارات", "price": 1400, "premiumId": 16, "image": "cap-street.jpg", "desc": "قبعة كاجوال لإطلالة شبابية."}, {"id": 9, "slug": "shirt-premium", "name": "قميص Premium", "category": "قمصان", "price": 4700, "image": "shirt-premium.jpg", "desc": "خامة أعلى وتشطيب Premium مع قصة محسنة."}, {"id": 10, "slug": "pants-premium", "name": "سروال Premium", "category": "سراويل", "price": 6800, "image": "pants-premium.jpg", "desc": "خامة أفضل وقصة أكثر أناقة من الإصدار الأساسي."}, {"id": 11, "slug": "belt-premium", "name": "حزام Premium", "category": "إكسسوارات", "price": 2400, "image": "belt-premium.jpg", "desc": "جلد وتشطيب أعلى مع تصميم فاخر."}, {"id": 12, "slug": "perfume-premium", "name": "عطر Urban Intense", "category": "عطور", "price": 3900, "image": "perfume-premium.jpg", "desc": "نسخة أكثر ثباتًا وتركيزًا من Urban."}, {"id": 13, "slug": "shoes-premium", "name": "حذاء Premium", "category": "أحذية", "price": 8500, "image": "shoes-premium.jpg", "desc": "راحة وتشطيب أفضل مع خامات أعلى جودة."}, {"id": 14, "slug": "jacket-lux", "name": "جاكيت Lux", "category": "جاكيت", "price": 10900, "image": "jacket-lux.jpg", "desc": "إصدار فاخر بتفاصيل وخامات أعلى."}, {"id": 15, "slug": "watch-premium", "name": "ساعة Premium", "category": "إكسسوارات", "price": 5900, "image": "watch-premium.jpg", "desc": "نسخة معدنية وتشطيب أعلى من Minimal."}, {"id": 16, "slug": "cap-premium", "name": "قبعة Premium", "category": "إكسسوارات", "price": 2200, "image": "cap-premium.jpg", "desc": "خامة أثقل وتشطيب أفضل."}];
const CROSS_SELL = {"1": [2, 3, 4], "9": [2, 3, 7], "2": [1, 3, 5], "10": [9, 3, 5], "3": [1, 2, 7], "11": [9, 10, 7], "4": [1, 7, 3], "12": [9, 7, 11], "5": [2, 3, 8], "13": [10, 11, 8], "6": [2, 5, 7], "14": [10, 13, 15], "7": [1, 4, 3], "15": [9, 12, 11], "8": [1, 2, 5], "16": [9, 10, 13]};
const BUNDLES = [{"id": "b1", "name": "Classic Outfit", "items": [1, 2, 3], "price": 8900, "desc": "قميص + سروال + حزام"}, {"id": "b2", "name": "Premium Outfit", "items": [9, 10, 11], "price": 12400, "desc": "قميص Premium + سروال Premium + حزام Premium"}, {"id": "b3", "name": "Weekend Look", "items": [2, 5, 8], "price": 12300, "desc": "سروال + حذاء + قبعة"}, {"id": "b4", "name": "Smart Look", "items": [6, 2, 7], "price": 16900, "desc": "جاكيت + سروال + ساعة"}];

function money(n) {
  return Math.round(n).toLocaleString("ar-DZ") + " دج";
}
function byId(id) { return PRODUCTS.find(p => p.id === Number(id)); }
function getCart() { return JSON.parse(localStorage.getItem("aov_cart") || "[]"); }
function saveCart(cart) { localStorage.setItem("aov_cart", JSON.stringify(cart)); updateCartBadge(); }
function getOrders() { return JSON.parse(localStorage.getItem("aov_orders") || "[]"); }
function getPoints() { return Number(localStorage.getItem("aov_points") || 0); }
function setPoints(v) { localStorage.setItem("aov_points", String(v)); }
function toast(msg) {
  let t = document.getElementById("toast");
  if(!t){t=document.createElement("div");t.id="toast";t.className="toast";document.body.appendChild(t)}
  t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);
}
function imgMarkup(p, cls="") {
  return `<img src="images/${p.image}" alt="${p.name}" onerror="this.style.display='none';this.parentElement.classList.add('empty')">`;
}
function updateCartBadge() {
  const count = getCart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll("[data-cart-count]").forEach(el=>el.textContent=count);
}
function addToCart(id, qty=1, unitPrice=null, label=null) {
  const p = byId(id); if(!p) return;
  let cart = getCart();
  const key = label ? `${id}-${label}` : String(id);
  const found = cart.find(x=>x.key===key);
  if(found) found.qty += qty;
  else cart.push({key,id:p.id,name:label||p.name,price:unitPrice ?? p.price,qty,image:p.image});
  saveCart(cart); toast("تمت الإضافة إلى السلة");
}
function addBundle(bundleId) {
  const b = BUNDLES.find(x=>x.id===bundleId); if(!b) return;
  let cart=getCart();
  const found=cart.find(x=>x.key===`bundle-${bundleId}`);
  if(found) found.qty++;
  else cart.push({key:`bundle-${bundleId}`,id:0,name:b.name,price:b.price,qty:1,image:"bundle.jpg",bundle:true});
  saveCart(cart); toast("تمت إضافة الباقة بسعرها الخاص");
}
function cartRawSubtotal() { return getCart().reduce((s,i)=>s+i.price*i.qty,0); }
function initOfferDeadline() {
  let d=localStorage.getItem("aov_offer_deadline");
  if(!d) { d=Date.now()+24*60*60*1000; localStorage.setItem("aov_offer_deadline",String(d)); }
  return Number(d);
}
function offerRemaining() { return Math.max(0, initOfferDeadline()-Date.now()); }
function flashActive() { return offerRemaining()>0; }
function flashDiscount(subtotal) { return flashActive() ? subtotal*0.05 : 0; }
function thresholdDiscount(subtotal) { return subtotal>=12000 ? subtotal*0.10 : 0; }
function shippingCost(subtotal) { return subtotal>=8000 ? 0 : (subtotal>0?600:0); }
function calcCart() {
  const subtotal=cartRawSubtotal();
  const flash=flashDiscount(subtotal);
  const threshold=thresholdDiscount(subtotal);
  const shipping=shippingCost(subtotal);
  return {subtotal,flash,threshold,shipping,total:Math.max(0,subtotal-flash-threshold+shipping)};
}
function updateCountdowns() {
  const r=offerRemaining();
  const h=Math.floor(r/3600000), m=Math.floor((r%3600000)/60000), s=Math.floor((r%60000)/1000);
  const txt = r>0 ? `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}` : "انتهى العرض";
  document.querySelectorAll("[data-countdown]").forEach(el=>el.textContent=txt);
}
setInterval(updateCountdowns,1000);

function productCard(p) {
  return `<article class="product-card">
    <a href="product-${p.slug}.html">
      <div class="product-image">${imgMarkup(p)}</div>
      <div class="product-body">
        <span class="category">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
      </div>
    </a>
    <div class="product-body" style="padding-top:0">
      <div class="product-actions">
        <a class="btn btn-outline" href="product-${p.slug}.html">التفاصيل</a>
        <button class="btn btn-dark" onclick="addToCart(${p.id})">أضف</button>
      </div>
    </div>
  </article>`;
}
function renderCatalog(target="productGrid", limit=null) {
  const el=document.getElementById(target); if(!el) return;
  let list=PRODUCTS.filter(p=>p.id<=8);
  if(limit) list=list.slice(0,limit);
  el.innerHTML=list.map(productCard).join("");
}
function renderProductPage(id) {
  const p=byId(id); if(!p) return;
  document.title=p.name+" - AOV Lab";
  document.querySelector("[data-product-title]").textContent=p.name;
  document.querySelector("[data-product-category]").textContent=p.category;
  document.querySelector("[data-product-price]").textContent=money(p.price);
  document.querySelector("[data-product-desc]").textContent=p.desc;
  document.querySelector("[data-product-image]").innerHTML=imgMarkup(p);
  document.querySelector("[data-add-main]").onclick=()=>addToCart(p.id);

  const flashEl=document.querySelector("[data-flash-price]");
  if(flashEl) flashEl.textContent=money(p.price*0.95);

  const upsell=document.getElementById("upsellArea");
  if(p.premiumId){
    const u=byId(p.premiumId);
    upsell.innerHTML=`<div class="strategy-box upsell">
      <div class="strategy-title"><div><b>Upselling</b><div class="small">بديل أعلى قيمة من نفس المنتج</div></div><span class="pill">+${money(u.price-p.price)}</span></div>
      <div class="mini-grid" style="grid-template-columns:120px 1fr">
        <div class="mini-thumb">${imgMarkup(u)}</div>
        <div><b>${u.name}</b><p class="small">${u.desc}</p><div class="price">${money(u.price)}</div>
        <div class="actions"><a class="btn btn-outline" href="product-${u.slug}.html">شاهد Premium</a><button class="btn btn-dark" onclick="addToCart(${u.id})">اختر Premium</button></div></div>
      </div>
    </div>`;
  } else {
    upsell.innerHTML=`<div class="strategy-box upsell"><b>Upselling</b><p class="small">هذا المنتج هو بالفعل النسخة الأعلى قيمة، لذلك لا نعرض ترقية إضافية.</p></div>`;
  }

  const crossIds=CROSS_SELL[p.id]||[];
  const cross=document.getElementById("crossArea");
  cross.innerHTML=`<div class="strategy-box cross">
    <div class="strategy-title"><div><b>Cross-selling</b><div class="small">منتجات مكملة للمنتج الحالي</div></div><span class="pill">منتجات مناسبة</span></div>
    <div class="mini-grid">${crossIds.map(cid=>{
      const c=byId(cid); return `<div class="mini-card"><div class="mini-thumb">${imgMarkup(c)}</div><b>${c.name}</b><span class="small">${money(c.price)}</span><button class="btn btn-blue" onclick="addToCart(${c.id})">أضف</button></div>`;
    }).join("")}</div>
  </div>`;

  const bundleArea=document.getElementById("bundleArea");
  const relevant=BUNDLES.filter(b=>b.items.includes(p.id)).slice(0,2);
  bundleArea.innerHTML=`<div class="strategy-box bundle">
    <div class="strategy-title"><div><b>Product Bundling</b><div class="small">مجموعات جاهزة توفر على العميل وتزيد قيمة الطلب</div></div></div>
    ${relevant.length? relevant.map(b=>{
      const normal=b.items.reduce((s,i)=>s+byId(i).price,0);
      return `<div class="notice" style="margin-top:10px"><b>${b.name}</b> — ${b.desc}<br>السعر العادي <span class="old-price">${money(normal)}</span> <b>${money(b.price)}</b>
      <button class="btn btn-green" style="margin-top:8px" onclick="addBundle('${b.id}')">أضف الباقة</button></div>`;
    }).join("") : `<div class="small" style="margin-top:10px">لا توجد باقة خاصة لهذا المنتج حاليًا.</div>`}
  </div>`;
}

function renderCart() {
  const box=document.getElementById("cartItems"); if(!box) return;
  let cart=getCart();
  if(!cart.length) {
    box.innerHTML=`<div class="notice">السلة فارغة. ابدأ من صفحة المتجر.</div>`;
  } else {
    box.innerHTML=cart.map((i,idx)=>`<div class="cart-row">
      <div class="cart-thumb"><img src="images/${i.image}" alt="" onerror="this.style.display='none'"></div>
      <div><b>${i.name}</b><div class="small">${money(i.price)} للقطعة</div>
        <div class="qty"><button onclick="changeQty(${idx},-1)">−</button><b>${i.qty}</b><button onclick="changeQty(${idx},1)">+</button></div>
      </div>
      <b>${money(i.price*i.qty)}</b>
    </div>`).join("");
  }
  const c=calcCart();
  setText("cartSubtotal",money(c.subtotal)); setText("flashDiscount","- "+money(c.flash));
  setText("thresholdDiscount","- "+money(c.threshold)); setText("shipping",c.shipping===0&&c.subtotal>0?"مجاني":money(c.shipping));
  setText("cartTotal",money(c.total)); setText("earnPoints",Math.floor(c.total/1000)*10+" نقطة");
  const bar=document.getElementById("shippingBar");
  if(bar) bar.style.width=Math.min(100,(c.subtotal/8000)*100)+"%";
  setText("shippingHint", c.subtotal>=8000 ? "تم فتح الشحن المجاني." : `أضف ${money(Math.max(0,8000-c.subtotal))} للحصول على الشحن المجاني.`);
  setText("discountHint", c.subtotal>=12000 ? "تم تطبيق خصم 10% على قيمة السلة." : `أضف ${money(Math.max(0,12000-c.subtotal))} للحصول على خصم إضافي 10%.`);
}
function changeQty(idx,d) {
  let cart=getCart(); if(!cart[idx]) return; cart[idx].qty+=d; if(cart[idx].qty<=0) cart.splice(idx,1); saveCart(cart); renderCart();
}
function checkout() {
  const c=calcCart(); if(c.subtotal<=0){toast("السلة فارغة");return}
  const orders=getOrders(); orders.push({date:new Date().toISOString(),subtotal:c.subtotal,total:c.total,items:getCart()});
  localStorage.setItem("aov_orders",JSON.stringify(orders));
  const earned=Math.floor(c.total/1000)*10; setPoints(getPoints()+earned);
  saveCart([]); renderCart(); toast(`تم الطلب التجريبي وربحت ${earned} نقطة`);
}
function setText(id,txt){const e=document.getElementById(id);if(e)e.textContent=txt}

function renderOffers() {
  const el=document.getElementById("bundleGrid"); if(!el)return;
  el.innerHTML=BUNDLES.map(b=>{
    const normal=b.items.reduce((s,i)=>s+byId(i).price,0);
    return `<div class="card offer-card"><span class="pill">Bundle</span><h3>${b.name}</h3><p class="small">${b.desc}</p><div><span class="old-price">${money(normal)}</span><span class="price">${money(b.price)}</span></div><button class="btn btn-green btn-block" style="margin-top:12px" onclick="addBundle('${b.id}')">أضف العرض للسلة</button></div>`;
  }).join("");
}
function renderLoyalty() {
  const pts=getPoints(); setText("loyaltyPoints",pts+" نقطة");
  const tier=pts>=500?"Gold":pts>=200?"Silver":"Starter"; setText("loyaltyTier",tier);
  document.querySelectorAll("[data-tier]").forEach(el=>el.classList.toggle("active",el.dataset.tier===tier));
  const orders=getOrders(); setText("ordersCount",orders.length);
  const spend=orders.reduce((s,o)=>s+o.total,0); setText("totalSpend",money(spend));
}
function renderDashboard() {
  const orders=getOrders();
  const total=orders.reduce((s,o)=>s+o.total,0);
  const aov=orders.length?total/orders.length:0;
  setText("kpiOrders",String(orders.length)); setText("kpiRevenue",money(total)); setText("kpiAOV",money(aov)); setText("kpiPoints",String(getPoints()));
  const body=document.getElementById("ordersTable"); if(body) body.innerHTML=orders.slice().reverse().map((o,i)=>`<tr><td>${orders.length-i}</td><td>${new Date(o.date).toLocaleString("ar-DZ")}</td><td>${o.items.reduce((s,x)=>s+x.qty,0)}</td><td>${money(o.subtotal)}</td><td>${money(o.total)}</td></tr>`).join("") || `<tr><td colspan="5">لا توجد طلبات تجريبية بعد.</td></tr>`;
}
function init() {
  updateCartBadge(); updateCountdowns();
  renderCatalog(); renderCatalog("featuredGrid",4); renderCart(); renderOffers(); renderLoyalty(); renderDashboard();
}
document.addEventListener("DOMContentLoaded",init);
