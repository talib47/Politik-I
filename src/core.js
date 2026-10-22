"use strict";
/* ================= Speicher (eigene Schlüssel, damit nichts mit anderen Apps unter talib47.github.io kollidiert) ================= */
const KEY="p1-lernapp-v1";
function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function lsSet(k,v){ try{ localStorage.setItem(k,v); return true; }catch(e){ return false; } }
function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} }
let state;
try{ state=JSON.parse(lsGet(KEY)||"null"); }catch(e){ state=null; }
if(!state||typeof state!=="object") state={};
function norm(){ for(const k of ["days","lessons","box","essays","drafts","kreuz","unclear"]) if(!state[k]||typeof state[k]!=="object") state[k]={}; }
norm();
if(state.course!=="se") state.course="vl";
function save(){ state.updated=Date.now(); lsSet(KEY,JSON.stringify(state)); schedulePush(); }

/* ===== Geräte-Abgleich über GitHub (Datei fortschritt.json im Zweig "fortschritt", wie in der W&G-I-App) ===== */
const GH={repo:"https://api.github.com/repos/talib47/Politik-I", file:"fortschritt.json", branch:"fortschritt", tokenKey:"p1-gh-token"};
GH.api=GH.repo+"/contents/"+GH.file;
let ghToken=null, remoteSha=null, syncStatus="aus", lastSync=null, pushTimer=null, pushing=false, pushAgain=false;
function initToken(){
  const m=location.hash.match(/[#&]t=([A-Za-z0-9_]+)/);
  if(m){ lsSet(GH.tokenKey,m[1]); try{ history.replaceState(null,"",location.pathname+location.search); }catch(e){} }
  ghToken=lsGet(GH.tokenKey);
}
const ghHeaders=()=>({"Authorization":"Bearer "+ghToken,"Accept":"application/vnd.github+json"});
const b64enc=str=>btoa(unescape(encodeURIComponent(str)));
const b64dec=str=>decodeURIComponent(escape(atob(str.replace(/\n/g,""))));
async function ensureBranch(){
  const r=await fetch(GH.repo+"/git/ref/heads/"+GH.branch,{headers:ghHeaders(),cache:"no-store"});
  if(r.ok) return true;
  const base=await fetch(GH.repo,{headers:ghHeaders(),cache:"no-store"}); if(!base.ok) return false;
  const def=(await base.json()).default_branch||"main";
  const h=await fetch(GH.repo+"/git/ref/heads/"+def,{headers:ghHeaders(),cache:"no-store"}); if(!h.ok) return false;
  const sha=(await h.json()).object.sha;
  const c=await fetch(GH.repo+"/git/refs",{method:"POST",headers:ghHeaders(),body:JSON.stringify({ref:"refs/heads/"+GH.branch,sha})});
  return c.ok;
}
async function pull(){
  if(!ghToken) return null;
  const r=await fetch(GH.api+"?ref="+GH.branch+"&_="+Date.now(),{headers:ghHeaders(),cache:"no-store"});
  if(r.status===404){ remoteSha=null; return {}; }
  if(r.status===401){ syncStatus="schluessel"; return null; }
  if(!r.ok) throw new Error(r.status);
  const d=await r.json(); remoteSha=d.sha;
  return JSON.parse(b64dec(d.content));
}
async function push(){
  if(!ghToken) return;
  if(pushing){ pushAgain=true; return; }
  pushing=true;
  try{
    for(let attempt=0;attempt<3;attempt++){
      const body={message:"Lernstand",branch:GH.branch,content:b64enc(JSON.stringify(state))};
      if(remoteSha) body.sha=remoteSha;
      const r=await fetch(GH.api,{method:"PUT",headers:ghHeaders(),body:JSON.stringify(body)});
      if(r.ok){ const d=await r.json(); remoteSha=d.content.sha; syncStatus="ok"; lastSync=new Date(); break; }
      if(r.status===401){ syncStatus="schluessel"; break; }
      if(r.status===404){ if(!(await ensureBranch())){ syncStatus="fehler"; break; } continue; }  // Zweig fehlt noch: anlegen
      if(r.status===409||r.status===422){ await pull(); continue; }  // veraltete Version: neu holen und nochmal
      syncStatus="fehler"; break;
    }
  }catch(e){ syncStatus="fehler"; }
  pushing=false;
  if(pushAgain){ pushAgain=false; push(); }
}
function schedulePush(){ if(!ghToken) return; clearTimeout(pushTimer); pushTimer=setTimeout(()=>{ pushTimer=null; push(); },1500); }
function flushPush(){ if(pushTimer){ clearTimeout(pushTimer); pushTimer=null; push(); } }
/* Neuerer Stand gewinnt (Zeitstempel "updated") */
async function syncFromRemote(){
  if(!ghToken) return false;
  try{
    const remote=await pull();
    if(remote===null) return false;
    if(remote.updated && remote.updated>(state.updated||0)){ state=Object.assign(state,remote); norm(); lsSet(KEY,JSON.stringify(state)); syncStatus="ok"; lastSync=new Date(); return true; }
    if((state.updated||0)>(remote.updated||0)) await push();
    else { syncStatus="ok"; lastSync=new Date(); }
  }catch(e){ syncStatus="fehler"; }
  return false;
}
async function autoPull(){
  if(!ghToken||document.visibilityState!=="visible"||["exam","essay","lesson","cards","kreuz"].includes(view)||pushTimer||pushing) return;
  if(await syncFromRemote()) render();
}
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="hidden") flushPush(); else autoPull(); });
window.addEventListener("pagehide",flushPush);
window.addEventListener("focus",autoPull);
setInterval(autoPull,30000);
function syncBox(){
  if(!ghToken) return `<div class="block"><h3>Geräte verbinden</h3>
    <p class="small muted">Damit iPad, iPhone und Laptop denselben Stand haben, verbinde jedes Gerät einmal. Am einfachsten öffnest du dafür deinen Verbindungslink (Adresse der App mit #t=Schlüssel am Ende).</p>
    <label class="small muted" for="tkIn">Oder füge hier deinen GitHub-Schlüssel ein (beginnt mit github_pat_):</label>
    <textarea id="tkIn" style="width:100%;min-height:70px;margin-top:6px;border:1px solid var(--line);border-radius:10px;background:var(--bg);padding:8px;font-family:var(--mono);font-size:.85rem"></textarea>
    <button class="btn" id="tkGo" style="margin-top:8px">Gerät verbinden</button></div>`;
  const msg={ok:`Dieses Gerät ist verbunden und gleicht automatisch ab${lastSync?", zuletzt um "+lastSync.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}):""}.`,
    fehler:"Abgleich gerade nicht möglich, etwa ohne Internet. Dein Stand bleibt auf diesem Gerät und wird später abgeglichen.",
    schluessel:"Der Schlüssel funktioniert nicht. Prüfe, ob er Zugriff auf das Repository Politik-I hat, oder verbinde mit einem neuen Schlüssel.",
    aus:"Wird abgeglichen …"}[syncStatus];
  return `<div class="block"><h3>Geräte-Abgleich</h3>
    <p class="small" ${syncStatus==="ok"?'style="color:var(--muted)"':'style="color:var(--bad)"'}>${msg}</p>
    <div class="row"><button class="btn ghost small" id="syNow">Jetzt abgleichen</button><button class="btn ghost small" id="syOff">Gerät trennen</button></div></div>`;
}
function bindSync(){
  const goB=$("#tkGo");
  if(goB) goB.onclick=async()=>{
    const t=$("#tkIn").value.trim();
    if(!/^github_pat_\w+$/.test(t)){ toast("Das sieht nicht nach einem Schlüssel aus. Er beginnt mit github_pat_."); return; }
    lsSet(GH.tokenKey,t); ghToken=t; toast("Verbinde …");
    await syncFromRemote(); toast(syncStatus==="ok"?"Gerät verbunden":"Verbinden hat nicht geklappt"); render();
  };
  const now=$("#syNow");
  if(now) now.onclick=async()=>{ flushPush(); await syncFromRemote(); toast(syncStatus==="ok"?"Abgeglichen":"Abgleich hat nicht geklappt"); render(); };
  const off=$("#syOff");
  if(off) off.onclick=()=>{ if(!off.dataset.armed){ off.dataset.armed="1"; off.textContent="Wirklich trennen"; return; } lsDel(GH.tokenKey); ghToken=null; syncStatus="aus"; render(); };
}

/* ================= Helfer ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const rint=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const isInt=x=>Math.abs(x-Math.round(x))<1e-9;
const nice=(x,dec)=>Math.abs(x*10**dec-Math.round(x*10**dec))<1e-7;
const r=x=>Math.round(x*1e6)/1e6;
function fmt(x){
  x=r(x); if(Object.is(x,-0)) x=0;
  let s=String(Math.abs(x)); if(s.includes("e")) s=Math.abs(x).toFixed(6).replace(/0+$/,"");
  s=s.replace(".",","); return (x<0?"−":"")+s;
}
const par=x=>x<0?"("+fmt(x)+")":fmt(x);
function toast(t){ const d=document.createElement("div"); d.className="toast"; d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.remove(),2200); }
function today(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function parseNum(v){
  let t=String(v).trim().replace(/\s|€/g,"").replace(/−|–/g,"-");
  const pct=t.includes("%"); t=t.replace("%","");
  if(t.includes(",")) t=t.replace(/\./g,"").replace(",",".");
  if(t===""||t==="-"||isNaN(+t)) return null;
  return {v:+t,pct};
}
const close=(a,b)=>Math.abs(a-b)<=Math.max(0.011,Math.abs(b)*0.005);
function judge(step,raw){
  const p=parseNum(raw); if(!p) return null;
  let v=p.v;
  if(step.tol!=null) return Math.abs(v-step.ans)<=step.tol;
  if(step.rate){ if(p.pct) v=v/100; return close(v,step.ans)||close(v/100,step.ans); }
  if(step.pct){ return close(v,step.ans)||close(v*100,step.ans); }
  return close(v,step.ans);
}

