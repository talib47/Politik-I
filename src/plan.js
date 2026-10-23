/* ================= Prüfungstermin, Plan für Probeprüfungen und Schwachstellen (aus Wirtschaft II) =================
   Termin je Veranstaltung in state.examDates (vl/se). Ohne Eintrag gilt der Termin aus den Unterlagen (nur angezeigt,
   nicht gespeichert): Vorlesung 04.02.2027 laut Folie „Modulprüfung“. */
const EXAM_DEFAULT={vl:"2027-02-04"};
const fmtDate=t=>{ const d=new Date(t); return ["So","Mo","Di","Mi","Do","Fr","Sa"][d.getDay()]+" "+d.getDate()+"."+(d.getMonth()+1)+"."; };
const examDateStr=()=>(state.examDates||{})[state.course]||EXAM_DEFAULT[state.course]||null;
const examDateTs=()=>{ const s=examDateStr(); if(!s) return null; const [y,m,d]=s.split("-").map(Number); return new Date(y,m-1,d).getTime(); };
const probeName=()=>state.course==="vl"?"Probe-Essay":"Probeklausur";
/* Plan: eine Probeprüfung früh als Standortbestimmung, dann 21, 14 und 7 Tage vor dem Termin */
function examPlan(){
  const T=examDateTs(), ex=(state.exams||[]).filter(e=>(e.c||"vl")===state.course).map(e=>e.t).sort((a,b)=>a-b);
  const P=[{lab:"Standortbestimmung", when:null}];
  if(T) [21,14,7].forEach(d=>P.push({lab:`${d} Tage vorher`, when:T-d*864e5}));
  const used=new Set();
  P.forEach(p=>{ const i=ex.findIndex((t,k)=>!used.has(k)&&(p.when==null||t>=p.when-3*864e5)); if(i>=0){ used.add(i); p.done=ex[i]; } });
  return P;
}
function examPlanToday(){
  if(!essaysOf(0).length) return "";
  const P=examPlan(), now=Date.now(), open=P.find(p=>!p.done);
  if(!open) return "";
  if(open.when==null) return "Schreib bald einen als Standortbestimmung (unter Üben). Er zeigt, wo du stehst.";
  if(open.when-now<=864e5) return `Laut Plan ist jetzt der nächste dran (${open.lab}).`;
  return "";
}
function examPlanBlock(){
  const T=examDateTs(), P=examPlan(), days=T?Math.ceil((T-dayStart())/864e5):null, own=!!(state.examDates||{})[state.course];
  return `<div class="block"><h2>Prüfung und ${probeName()}s</h2>
    <div class="row" style="margin-bottom:8px"><label class="small" for="exD">Prüfungstermin ${COURSES[state.course].short}</label><input type="date" id="exD" value="${examDateStr()||""}" class="dateinp"><button class="btn ghost small" id="exS">Speichern</button></div>
    ${T?`<p class="small" style="margin:0 0 6px">${days>0?`Noch <b>${days} Tage</b> bis zur Prüfung.`:days===0?"<b>Heute ist Prüfung.</b> Viel Erfolg!":"Der Termin liegt in der Vergangenheit."}${!own&&EXAM_DEFAULT[state.course]?" Termin aus der Folie „Modulprüfung“.":""}</p>`:`<p class="small muted" style="margin:0 0 6px">Trag den Termin ein, sobald er feststeht. Dann plant die App drei ${probeName()}s in den letzten Wochen.</p>`}
    <div class="klist">${P.map(p=>`<b>${p.done?"✓ ":""}${p.lab}</b><span>${p.done?`geschrieben am ${fmtDate(p.done)}`:p.when?fmtDate(p.when):"so bald wie möglich"}</span>`).join("")}</div>
    ${essaysOf(0).length?`<button class="btn ghost small" id="exGo">${probeName()} starten</button>`:""}</div>`;
}
function bindExamPlan(){
  if($("#exS")) $("#exS").onclick=()=>{ const v=$("#exD").value; if(v) state.examDates[state.course]=v; else delete state.examDates[state.course]; save(); toast(v?"Termin gespeichert":"Termin entfernt"); render(); };
  if($("#exGo")) $("#exGo").onclick=()=>go("exam");
}

/* Schwachstellen aus allen Übungsformen der gewählten Veranstaltung */
function weakData(){
  const cardsAll=allCards(0), byId=Object.fromEntries(cardsAll.map(c=>[c.id,c]));
  const weakCards=Object.entries(state.lapses||{}).filter(([id,n])=>n>=2&&byId[id]).sort((a,b)=>b[1]-a[1]).map(([id])=>byId[id]);
  const qs=allQuestions(), qById=Object.fromEntries(qs.map(q=>[q.id,q]));
  const weakQ=Object.entries(state.qlapses||{}).filter(([id,n])=>n>=1&&qById[id]&&(qInfo(id)||{}).b<=2).sort((a,b)=>b[1]-a[1]).map(([id])=>qById[id]);
  const conf={}, confItems={};
  whoOf(0).forEach(x=>{ const h=(state.who||{})[x.id]; if(h&&h.conf&&!h.last){ const S=WHO_SETS[x.set], k=S.opts[x.s]+" ↔ "+S.opts[h.conf]; conf[k]=(conf[k]||0)+1; (confItems[k]=confItems[k]||[]).push(x); } });
  const confL=Object.entries(conf).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const weakE=essaysOf(0).filter(x=>{ const s=essayScore(x.id); return s&&s.p<s.max*.6; });
  const weakO=essaysOf(0).filter(x=>{ const s=(state.outl||{})[x.id]; return s&&s.p<s.max*.6; });
  return {weakCards,weakQ,confL,confItems,weakE,weakO};
}
function weakBlock(){
  const {weakCards,weakQ,confL,weakE,weakO}=weakData();
  const none=!weakCards.length&&!weakQ.length&&!confL.length&&!weakE.length&&!weakO.length;
  return `<div class="block"><h2>Deine Schwachstellen</h2>${none?`<p class="small muted" style="margin:0">Noch nichts Auffälliges. Die Übersicht füllt sich, sobald du übst: Karten, die du mehrmals nicht wusstest, falsche Verständnisfragen, verwechselte Zuordnungen und schwache Gliederungen oder Essays.</p>`:""}
    ${weakCards.length?`<h3>Karten, die du mehrmals nicht wusstest</h3><ul class="weak">${weakCards.slice(0,5).map(c=>`<li>${inl(c.f)}</li>`).join("")}</ul><button class="btn ghost small" id="wkC">${weakCards.length===1?"Diese Karte":"Diese "+Math.min(weakCards.length,15)+" Karten"} üben</button>`:""}
    ${weakQ.length?`<h3 style="margin-top:14px">Verständnisfragen mit Fehlern</h3><ul class="weak">${weakQ.slice(0,5).map(q=>`<li>${inl(q.c.q)}</li>`).join("")}</ul><button class="btn ghost small" id="wkQ">Diese Fragen üben</button>`:""}
    ${confL.length?`<h3 style="margin-top:14px">Oft verwechselt</h3><ul class="weak">${confL.map(([k,n])=>`<li>${k} (${n}×)</li>`).join("")}</ul><button class="btn ghost small" id="wkW">Diese Zuordnungen üben</button>`:""}
    ${weakO.length?`<h3 style="margin-top:14px">Gliederungen unter 60 %</h3><ul class="weak">${weakO.slice(0,3).map(x=>`<li>${inl(x.short||x.q)}</li>`).join("")}</ul><button class="btn ghost small" id="wkO">Nochmal gliedern</button>`:""}
    ${weakE.length?`<h3 style="margin-top:14px">Essays unter 60 %</h3><ul class="weak">${weakE.slice(0,3).map(x=>`<li>${inl(x.short||x.q)}</li>`).join("")}</ul><button class="btn ghost small" id="wkE">Nochmal schreiben</button>`:""}
  </div>`;
}
function bindWeak(){
  const D=weakData();
  if($("#wkC")) $("#wkC").onclick=()=>openCards(0,true,D.weakCards.slice(0,15));
  if($("#wkQ")) $("#wkQ").onclick=()=>openRecall(D.weakQ.slice(0,8));
  if($("#wkW")) $("#wkW").onclick=()=>{ const items=[].concat(...D.confL.map(([k])=>D.confItems[k])); cur.wh={list:items.slice(0,8).map(x=>({x,o:whoOptions(x)})), i:0, a:null, right:0, ch:0}; go("who"); };
  if($("#wkO")) $("#wkO").onclick=()=>openOutline(0,D.weakO[0].id);
  if($("#wkE")) $("#wkE").onclick=()=>openEssay(0,D.weakE[0].id);
}
