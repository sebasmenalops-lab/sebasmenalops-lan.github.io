/* ============ CONFIGURACIÓN EDITABLE ============
   Completa estos datos. Lo que dejes vacío se mostrará como "por completar".
   whatsapp: solo números con código de país, ej. "59170000000" */
const CONFIG = {
  brand: "La Casa del Tío César",
  whatsapp: "",
  phone: "",
  email: "",
  location: "Tarija, Bolivia",
  social: { Instagram: "", Facebook: "", TikTok: "", LinkedIn: "" }
};

/* Problemas frecuentes (editable) */
const PROBLEMS = [
  { q:"Mi negocio no aparece en Google Maps", icon:"i-pin", service:"Google Maps y presencia digital",
    a:"Configuramos y optimizamos tu perfil de negocio para que los clientes encuentren tu ubicación, horarios y servicios.",
    s:["Revisamos si ya tienes un perfil","Completamos datos, horarios y categorías","Te enseñamos a mantenerlo al día"] },
  { q:"Quiero vender, pero no tengo página web", icon:"i-web", service:"Página web",
    a:"Creamos una página profesional o un catálogo digital que se ve bien en el celular y facilita que te contacten.",
    s:["Definimos qué quieres mostrar","Diseñamos una página clara y rápida","La publicamos y te explicamos cómo actualizarla"] },
  { q:"Respondo las mismas preguntas todo el día", icon:"i-chat", service:"Inteligencia artificial y chatbots",
    a:"Configuramos un asistente virtual o respuestas automáticas con herramientas oficiales para atender consultas frecuentes.",
    s:["Listamos tus preguntas más comunes","Configuramos las respuestas y el flujo","Probamos antes de ponerlo en marcha"] },
  { q:"No sé configurar una aplicación", icon:"i-support", service:"Asistencia puntual",
    a:"Te acompañamos paso a paso para que la aplicación quede lista y entiendas cómo usarla.",
    s:["Vemos qué necesitas lograr","Configuramos contigo o por ti","Te dejamos instrucciones simples"] },
  { q:"Mi comunidad de Discord está desordenada", icon:"i-users", service:"Servidores de Discord",
    a:"Organizamos tu servidor con canales, roles, permisos, bots y reglas de moderación claras.",
    s:["Revisamos cómo funciona hoy tu comunidad","Estructuramos canales, roles y permisos","Configuramos bots y moderación"] },
  { q:"Tengo un problema y no sé por dónde empezar", icon:"i-spark", service:"Otra cosa / no sé qué necesito",
    a:"No hace falta que sepas el nombre de la solución. Cuéntanos qué te frena y la buscamos juntos.",
    s:["Escuchamos tu situación","Analizamos opciones posibles","Te proponemos la más práctica"] }
];

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = t => String(t).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* Marca y datos */
$$("[data-brand]").forEach(e => e.textContent = CONFIG.brand);
document.title = CONFIG.brand + " | Soluciones digitales para negocios y personas en Tarija";
$("#yr").textContent = new Date().getFullYear();
const todo = t => `<span class="todo">${t}</span>`;
const waLink = (text) => CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp.replace(/\D/g,"")}${text ? "?text="+encodeURIComponent(text) : ""}` : "";
$("#dPhone").innerHTML = CONFIG.phone ? `<a href="tel:${esc(CONFIG.phone)}">${esc(CONFIG.phone)}</a>` : todo("Teléfono: por completar");
$("#dMail").innerHTML = CONFIG.email ? `<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>` : todo("Correo: por completar");
$("#dLoc").textContent = CONFIG.location;
const socials = Object.entries(CONFIG.social).filter(([,u]) => u);
$("#dSocial").innerHTML = socials.length ? socials.map(([n,u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(" · ") : todo("Redes sociales: por completar");
$("#fContact").innerHTML = [
  CONFIG.whatsapp ? `<li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></li>` : `<li>${todo("WhatsApp: por completar")}</li>`,
  CONFIG.email ? `<li><a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a></li>` : `<li>${todo("Correo: por completar")}</li>`,
  `<li><span style="color:var(--muted)">${esc(CONFIG.location)}</span></li>`
].join("");
$("#fSocial").innerHTML = socials.length ? socials.map(([n,u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a></li>`).join("") : `<li>${todo("Por completar")}</li>`;
const btnWa = $("#btnWa");
if (CONFIG.whatsapp) { btnWa.href = waLink("Hola, quisiera consultar sobre sus servicios digitales."); btnWa.target = "_blank"; btnWa.rel = "noopener"; }
else { btnWa.addEventListener("click", e => { e.preventDefault(); showStatus("warn","Falta configurar el número de WhatsApp en CONFIG. Mientras tanto, usa el formulario."); $("#formulario").scrollIntoView(); }); }

/* Menú móvil */
const toggle = $(".nav-toggle"), menu = $("#menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
$$("#menu a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); toggle.setAttribute("aria-label","Abrir menú"); }));
document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { menu.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); toggle.focus(); } });

/* Sección activa */
const links = $$("#menu ul a");
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(l => l.setAttribute("aria-current", l.getAttribute("href") === "#"+en.target.id ? "true" : "false"));
}), { rootMargin:"-45% 0px -50% 0px" });
links.forEach(l => { const t = $(l.getAttribute("href")); if (t) io.observe(t); });

/* Problemas -> solución */
const tabs = $("#tabs"), panel = $("#panel");
tabs.innerHTML = PROBLEMS.map((p,i) => `<button class="tab" role="tab" id="tab${i}" aria-selected="${i===0}" aria-controls="panel" tabindex="${i===0?0:-1}"><svg class="icon"><use href="#${p.icon}"/></svg><span>${esc(p.q)}</span></button>`).join("");
function showProblem(i){
  const p = PROBLEMS[i];
  $$(".tab").forEach((t,j) => { t.setAttribute("aria-selected", j===i); t.tabIndex = j===i?0:-1; });
  panel.setAttribute("aria-labelledby","tab"+i);
  panel.innerHTML = `<h3>${esc(p.q)}</h3><p>${esc(p.a)}</p><ul class="steps">${p.s.map(s=>`<li><svg class="icon"><use href="#i-check"/></svg><span>${esc(s)}</span></li>`).join("")}</ul><a class="btn btn-primary" href="#contacto" data-service="${esc(p.service)}">Quiero resolver esto <svg class="icon"><use href="#i-arrow"/></svg></a>`;
}
showProblem(0);
tabs.addEventListener("click", e => { const b = e.target.closest(".tab"); if (b) showProblem($$(".tab").indexOf(b)); });
tabs.addEventListener("keydown", e => {
  const all = $$(".tab"), cur = all.findIndex(t => t.getAttribute("aria-selected")==="true");
  let n = null;
  if (e.key==="ArrowDown"||e.key==="ArrowRight") n = (cur+1)%all.length;
  if (e.key==="ArrowUp"||e.key==="ArrowLeft") n = (cur-1+all.length)%all.length;
  if (n!==null){ e.preventDefault(); showProblem(n); all[n].focus(); }
});

/* Botones que preseleccionan el formulario */
function prefill({service, tipo}){
  if (service) $("#servicio").value = service;
  if (tipo) $("#tipo").value = tipo;
}
document.addEventListener("click", e => {
  const a = e.target.closest("[data-service],[data-quote],[data-problem]");
  if (!a) return;
  if (a.dataset.service) prefill({service:a.dataset.service, tipo:"Solicitar una cotización"});
  if (a.hasAttribute("data-quote")) prefill({tipo:"Solicitar una cotización"});
  if (a.hasAttribute("data-problem")) prefill({tipo:"Describir un problema"});
});

/* Demo del hero */
const demo = [
  ["Mi tienda no aparece en Google Maps.", "Revisamos tu perfil, configuramos horarios y ubicación y optimizamos tu ficha.", ["Google Maps","Presencia digital"]],
  ["Contesto lo mismo por WhatsApp todo el día.", "Armamos respuestas automáticas para tus consultas frecuentes con herramientas oficiales.", ["WhatsApp","Automatización"]],
  ["Quiero vender en línea pero no tengo página.", "Creamos un catálogo digital adaptado a celulares, con contacto directo.", ["Página web","Catálogo"]]
];
const dq = $("#demoQ"), da = $("#demoA");
const renderA = d => { da.innerHTML = esc(d[1]) + `<div class="chips">${d[2].map(c=>`<span class="chip">${esc(c)}</span>`).join("")}</div>`; };
if (reduce) { dq.textContent = demo[0][0]; renderA(demo[0]); }
else {
  let k = 0;
  const typeIt = () => {
    const d = demo[k % demo.length]; let i = 0;
    da.classList.remove("show"); dq.textContent = ""; dq.classList.add("caret");
    const t = setInterval(() => {
      dq.textContent = d[0].slice(0, ++i);
      if (i >= d[0].length) { clearInterval(t); dq.classList.remove("caret"); setTimeout(() => { renderA(d); da.classList.add("show"); }, 450); setTimeout(() => { k++; typeIt(); }, 5200); }
    }, 38);
  };
  setTimeout(typeIt, 900);
}

/* Red de nodos (canvas) */
(function(){
  const c = $("#net"), ctx = c.getContext("2d");
  let w, h, pts = [], raf, visible = true, dpr = Math.min(devicePixelRatio||1, 2);
  const mouse = {x:-999,y:-999};
  function size(){
    const r = c.getBoundingClientRect(); w = r.width; h = r.height;
    c.width = w*dpr; c.height = h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.round(Math.min(60, Math.max(18, w*h/16000)));
    pts = Array.from({length:n}, () => ({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28}));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for (const p of pts){ if(!reduce){p.x+=p.vx;p.y+=p.vy;} if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; }
    const max = Math.min(150, w*.28);
    for (let i=0;i<pts.length;i++){
      const a = pts[i];
      for (let j=i+1;j<pts.length;j++){
        const b = pts[j], d = Math.hypot(a.x-b.x,a.y-b.y);
        if (d<max){ ctx.strokeStyle = `rgba(110,130,255,${(1-d/max)*.35})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
      }
      const dm = Math.hypot(a.x-mouse.x,a.y-mouse.y);
      if (dm<160){ ctx.strokeStyle = `rgba(139,92,255,${(1-dm/160)*.6})`; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke(); }
      ctx.fillStyle = "rgba(150,170,255,.85)"; ctx.beginPath(); ctx.arc(a.x,a.y,2,0,6.283); ctx.fill();
    }
    if (visible && !reduce) raf = requestAnimationFrame(draw);
  }
  size(); draw();
  addEventListener("resize", () => { cancelAnimationFrame(raf); size(); draw(); });
  c.parentElement.addEventListener("pointermove", e => { const r=c.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; });
  c.parentElement.addEventListener("pointerleave", () => { mouse.x=mouse.y=-999; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduce){ cancelAnimationFrame(raf); draw(); } }).observe(c);
})();

/* Formulario con validación básica */
const form = $("#formulario"), statusEl = $("#status");
function showStatus(kind, msg){ statusEl.className = "status " + kind; statusEl.textContent = msg; }
function setErr(id, msg){ const el = $("#"+id); const field = el.closest(".field"); field.classList.toggle("bad", !!msg); $("#e-"+id.replace("contacto-dato","contacto")).textContent = msg || ""; }
function validate(){
  let ok = true;
  const nombre = $("#nombre").value.trim();
  const dato = $("#contacto-dato").value.trim();
  const msg = $("#mensaje").value.trim();
  const mail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dato);
  const tel = /^\+?[\d\s-]{7,16}$/.test(dato);
  if (nombre.length < 2){ setErr("nombre","Escribe tu nombre."); ok=false; } else setErr("nombre","");
  if (!mail && !tel){ setErr("contacto-dato","Escribe un correo válido o un número de teléfono."); ok=false; } else setErr("contacto-dato","");
  if (msg.length < 10){ setErr("mensaje","Cuéntanos un poco más (mínimo 10 caracteres)."); ok=false; } else setErr("mensaje","");
  if (!$("#ok").checked){ $("#e-ok").textContent = "Debes aceptar para poder enviar tu consulta."; ok=false; } else $("#e-ok").textContent = "";
  if (!ok) { const first = $(".field.bad input, .field.bad textarea", form) || $("#ok"); first.focus(); }
  return ok;
}
form.addEventListener("submit", e => {
  e.preventDefault(); statusEl.className = "status";
  if (!validate()) return;
  const text = `Hola, soy ${$("#nombre").value.trim()}.\n${$("#tipo").value} — ${$("#servicio").value}.\n${$("#mensaje").value.trim()}\nContacto: ${$("#contacto-dato").value.trim()}`;
  if (CONFIG.whatsapp){ window.open(waLink(text), "_blank", "noopener"); showStatus("ok","¡Listo! Se abrió WhatsApp con tu mensaje. Solo falta que lo envíes."); form.reset(); }
  else if (CONFIG.email){ location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent($("#tipo").value+" - "+$("#servicio").value)}&body=${encodeURIComponent(text)}`; showStatus("ok","Se abrió tu aplicación de correo con el mensaje listo para enviar."); form.reset(); }
  else { showStatus("warn","Tus datos son válidos, pero este formulario aún no tiene destino. Configura WhatsApp o correo en CONFIG para recibir las consultas."); }
});
form.addEventListener("input", e => { const f = e.target.closest(".field.bad"); if (f) { f.classList.remove("bad"); const m = f.querySelector(".err"); if (m) m.textContent = ""; } });

/* Aviso de privacidad */
const dlg = $("#privacy");
$$("[data-privacy]").forEach(b => b.addEventListener("click", () => dlg.showModal()));
$("#closePriv").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
