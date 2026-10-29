/* ================= Essay-Trainer =================
   Prüfung Vorlesung: Essay, 60 Minuten am PC. Jede Frage hat
   op  = was der Operator verlangt, gl = Gliederungsvorschlag, k = Erwartungshorizont (zum Abhaken), m = Musteressay (Absätze).
   kind "lang" = Prüfungsfrage für 60 Minuten, "kurz" = Teilfrage für etwa 15 Minuten. */
const essaysOf=n=>n? ESSAYS.filter(x=>x.ch===n) : ESSAYS.filter(x=>isReady(x.ch)&&chOf(x.ch).c===state.course);
const essayScore=id=>(state.essays||{})[id];
const wordCount=t=>{ const s=String(t||"").trim(); return s?s.split(/\s+/).length:0; };
/* Seminar Schwarz: Essay von etwa 500 Wörtern, bewertet nach vier Kriterien (Verlaufsplan).
   Je Kriterium gut / hinreichend / unzureichend; bestanden, wenn keines unzureichend ist.
   Die Stichworte (d) sind eine Lesehilfe, keine Vorgabe von Schwarz. */
const isSE=x=>!!x&&chOf(x.ch).c==="se";
const SE_WORDS=500;
const SE_CRIT=[
 {k:"aufbau", t:"Aufbau und Struktur", d:"Einleitung mit Fragestellung und These, je Absatz ein Gedanke, roter Faden, Fazit beantwortet die Frage"},
 {k:"arg", t:"Argumentation", d:"Behauptungen begründet und belegt, Gegenargument abgewogen, eigene Position folgt aus den Argumenten"},
 {k:"fach", t:"Fachwissen", d:"Begriffe, Konzepte und Autoren korrekt und präzise"},
 {k:"anw", t:"Anwendung des fachspezifischen Wissens", d:"Wissen auf die Frage und ein Beispiel angewendet, nicht nur nacherzählt"}];
const SE_LV=[["g","gut"],["h","hinreichend"],["u","unzureichend"]];
const wcLabel=(t,x)=>{ const n=wordCount(t); if(!isSE(x)) return n+" Wörter"; const d=n<SE_WORDS*.7?" · eher zu kurz":n>SE_WORDS*1.4?" · deutlich zu lang":""; return `${n} von etwa ${SE_WORDS} Wörtern${d}`; };
const sePass=r=>{ if(!r) return null; const v=SE_CRIT.map(c=>r[c.k]); if(v.some(x=>x==="u")) return false; return v.every(Boolean)?true:null; };
function rubricHTML(r,pre){
  const p=sePass(r);
  return `<div class="block"><h3>Die vier Kriterien von Dr. Schwarz</h3><p class="small muted">Stuf jedes Kriterium ehrlich ein. Bestanden ist das Essay, wenn keines „unzureichend“ ist. Die Stichworte sind eine Lesehilfe (Ergänzung).</p>
    ${SE_CRIT.map(c=>`<div class="rub"><p style="margin:10px 0 2px"><b>${c.t}</b></p><p class="small muted" style="margin:0 0 6px">${c.d}</p>
      <div class="row">${SE_LV.map(([v,l])=>`<button class="btn small ${r[c.k]===v?"":"ghost"}" data-rk="${pre}" data-c="${c.k}" data-v="${v}" aria-pressed="${r[c.k]===v}">${l}</button>`).join("")}</div></div>`).join("")}
    <p class="pts" id="${pre}verdict" style="margin-top:12px">${p===true?"Voraussichtlich bestanden":p===false?"Voraussichtlich nicht bestanden":"Noch nicht alle Kriterien eingestuft"}</p></div>`;
}
function bindRubric(r,pre,after){
  document.querySelectorAll(`[data-rk="${pre}"]`).forEach(b=>b.onclick=()=>{ r[b.dataset.c]=b.dataset.v; after(); });
}
const musterHTML=x=>`<p class="small muted">So könnte eine gute Antwort aussehen. Beispiele und Zusatzwissen darin gehen teils über die Folien hinaus.</p><div class="musterp">${x.m.map(p=>`<p>${p}</p>`).join("")}</div>`;
const glHTML=x=>`<ol class="gl">${x.gl.map(g=>`<li>${g}</li>`).join("")}</ol>`;
function pickEssay(n,onlyLong){
  let L=essaysOf(n); if(onlyLong&&L.some(x=>x.kind==="lang")) L=L.filter(x=>x.kind==="lang");
  const w=L.map(x=>{ const s=essayScore(x.id); return !s?4:(s.p<s.max*.75?3:1); });
  let r=Math.random()*w.reduce((a,b)=>a+b,0), i=0; for(;i<L.length;i++){ r-=w[i]; if(r<=0) break; }
  return L[Math.min(i,L.length-1)];
}
function openEssay(n,id){ n=n||0; const x=id?ESSAYS.find(e=>e.id===id):pickEssay(n); cur.es={n, id:x&&x.id, phase:"schreiben", help:false, checks:{}}; go("essay"); }
function claudePrompt(x,text,exam){
  const C=COURSES[chOf(x.ch).c];
  if(isSE(x)) return `Bewerte bitte mein ${exam?"Probe-Essay (60 Minuten, ohne Hilfsmittel)":"Essay"} für die Essayklausur im Seminar „${C.title}“ (Dr. Oliver Schwarz, UDE, Modul Grundlagen Politik I). Vorgaben: ein Essay von etwa 500 Wörtern zu einer von drei Fragen, 60 Minuten, keine Hilfsmittel. Bewertet wird nach vier Kriterien: Aufbau und Struktur, Argumentation, Fachwissen, Anwendung des fachspezifischen Wissens, je mit „gute Leistung“, „hinreichende Leistung“ oder „unzureichende Leistung“. Bestanden ist das Essay, wenn kein Kriterium unzureichend ist.\n\nFrage:\n${x.q}\n\nErwartungshorizont aus meiner Lern-App:\n${x.k.map(k=>"- "+k).join("\n")}\n\nMein Essay (${wordCount(text)} Wörter):\n${text||"(leer)"}\n\nGib mir bitte:\n1. Je Kriterium: gut, hinreichend oder unzureichend, mit einem Satz Begründung.\n2. Bestanden oder nicht?\n3. Fachliche Fehler oder ungenaue Begriffe.\n4. Was ich beim nächsten Mal anders machen sollte, vor allem bei Aufbau und Argumentation.\n5. Einen verbesserten Absatz als Beispiel.`;
  return `Bewerte bitte mein ${exam?"Probe-Essay (60 Minuten, ohne Hilfsmittel)":"Essay"} für die Prüfung der ${C.short} „${C.title}“ (${C.who}, UDE, Modul Grundlagen Politik I). Die echte Prüfung ist ein Essay von 60 Minuten am PC, unbenotet (bestanden oder nicht).\n\nFrage:\n${x.q}\n\nErwartungshorizont aus meiner Lern-App:\n${x.k.map(k=>"- "+k).join("\n")}\n\nMein Essay (${wordCount(text)} Wörter):\n${text||"(leer)"}\n\nGib mir bitte:\n1. Würde das voraussichtlich bestehen? Kurz begründet.\n2. Je Punkt des Erwartungshorizonts: erfüllt, teilweise oder fehlt.\n3. Fachliche Fehler oder ungenaue Begriffe.\n4. Aufbau und Argumentation: was ich beim nächsten Mal anders machen sollte.\n5. Einen verbesserten Absatz als Beispiel.`;
}
function renderEssay(){
  const E=cur.es, n=E.n, back=n?chLabel(n):"Üben", backFn=()=>{ if(n){ cur.ch=n; go("chapter"); } else go("practice"); };
  const x=ESSAYS.find(e=>e.id===E.id), L=essaysOf(n);
  if(!x){ $("#app").innerHTML=`${backTo(back)}<h1>Noch keine Essay-Fragen</h1><p class="muted">Für diesen Bereich gibt es noch keine Fragen.</p>`; bindCrumb(backFn); return; }
  state.drafts=state.drafts||{}; const text=state.drafts[x.id]||"", done=L.filter(y=>essayScore(y.id)).length, last=essayScore(x.id);
  const head=`${backTo(back)}
    <p class="eyebrow">${isSE(x)?"Prüfungsfrage · etwa 500 Wörter":x.kind==="lang"?"Prüfungsfrage · etwa 60 Min.":"Teilfrage · etwa 15 Min."} · Sitzung ${chOf(x.ch).no} · ${done} von ${L.length} bearbeitet</p>
    <div class="block"><p style="margin:0"><b>${x.q}</b></p><p class="small muted" style="margin:8px 0 0">${x.op}</p>${last?`<p class="small muted" style="margin:6px 0 0">Zuletzt: ${last.p} von ${last.max} Punkten des Erwartungshorizonts${last.pass===true?", bestanden":last.pass===false?", nicht bestanden":""}</p>`:""}</div>`;
  if(E.phase==="schreiben"){
    $("#app").innerHTML=`${head}
      <div class="block"><button class="btn ghost small" id="eh">${E.help?"Gliederungshilfe ausblenden":"Gliederungshilfe zeigen"}</button>${E.help?glHTML(x):`<p class="small muted" style="margin:8px 0 0">Versuch es erst ohne. In der Prüfung gibt es keine Hilfe.</p>`}</div>
      <div class="essay"><label class="small muted" for="et">Dein Essay (wird automatisch gespeichert)</label>
        <textarea id="et" style="margin-top:6px">${esc(text)}</textarea><p class="wc" id="ewc">${wcLabel(text,x)}</p></div>
      <div class="row" style="margin-top:6px"><button class="btn" id="ed">Fertig, bewerten</button><button class="btn ghost" id="en">Andere Frage</button></div>`;
    let t=null; $("#et").oninput=e=>{ state.drafts[x.id]=e.target.value; $("#ewc").textContent=wcLabel(e.target.value,x); clearTimeout(t); t=setTimeout(save,1200); };
    $("#eh").onclick=()=>{ E.help=!E.help; const y=window.scrollY; renderEssay(); window.scrollTo(0,y); };
    $("#ed").onclick=()=>{ save(); E.phase="bewerten"; E.r=Object.assign({},(essayScore(x.id)||{}).r||{}); renderEssay(); window.scrollTo(0,0); };
    $("#en").onclick=()=>{ save(); const others=L.filter(y=>y.id!==x.id); openEssay(n, others.length?pick(others).id:x.id); };
  } else {
    const pts=()=>x.k.filter((_,j)=>E.checks[j]).length;
    $("#app").innerHTML=`${head}
      <div class="block"><h3>Erwartungshorizont</h3><p class="small muted">Hake ab, was in deinem Text klar und fachlich richtig vorkommt.</p>
        ${x.k.map((k,j)=>`<label class="check"><input type="checkbox" id="q${j}" ${E.checks[j]?"checked":""}><span>${k}</span></label>`).join("")}
        <p class="pts" id="ep">${pts()} von ${x.k.length}</p>
        <div class="row"><button class="btn" id="es">Speichern</button><button class="btn ghost" id="ecl">Von Claude bewerten lassen</button></div><div id="ecopy"></div></div>
      ${isSE(x)?rubricHTML(E.r=E.r||{},"er"):""}
      <div class="block"><h3>Dein Text</h3>${isSE(x)?`<p class="small muted" style="margin:0 0 6px">${wcLabel(text,x)}</p>`:""}${text.trim()?`<p class="essaytext">${esc(text)}</p>`:`<p class="small muted" style="margin:0">Du hast nichts geschrieben. Lies dir die Gliederung und das Musteressay durch und versuch es danach noch einmal.</p>`}
        <div class="row" style="margin-top:8px"><button class="btn ghost small" id="eb">Weiterschreiben</button>${text.trim()?`<button class="btn ghost small" id="ex">Neu anfangen</button>`:""}</div></div>
      <div class="block"><h3>Gliederungsvorschlag</h3>${glHTML(x)}</div>
      <div class="block lesson"><h3>Musteressay</h3>${musterHTML(x)}</div>
      <div class="row" style="margin-bottom:12px"><button class="btn ghost" id="en">Nächste Frage</button></div>`;
    document.querySelectorAll(".check input").forEach(c=>c.onchange=()=>{ E.checks[+c.id.slice(1)]=c.checked; $("#ep").textContent=`${pts()} von ${x.k.length}`; });
    if(isSE(x)) bindRubric(E.r,"er",()=>{ const y=window.scrollY; renderEssay(); window.scrollTo(0,y); });
    $("#es").onclick=()=>{ state.essays[x.id]=Object.assign({p:pts(),max:x.k.length,t:Date.now(),w:wordCount(text)}, isSE(x)?{r:Object.assign({},E.r),pass:sePass(E.r)}:{}); logDay(); save(); toast(`${pts()} von ${x.k.length} gespeichert`); renderEssay(); };
    $("#ecl").onclick=()=>copyForClaude(claudePrompt(x,text,false),"#ecopy");
    $("#eb").onclick=()=>{ E.phase="schreiben"; renderEssay(); };
    if($("#ex")) $("#ex").onclick=()=>{ const b=$("#ex"); if(!b.dataset.armed){ b.dataset.armed="1"; b.textContent="Text wirklich löschen"; return; } delete state.drafts[x.id]; save(); E.phase="schreiben"; E.checks={}; renderEssay(); };
    $("#en").onclick=()=>{ const others=L.filter(y=>y.id!==x.id); openEssay(n, others.length?pick(others).id:x.id); };
  }
  bindCrumb(backFn);
}

/* ---------- Probe-Essay: 60 Minuten, keine Hilfen ---------- */
let examTimer=null, examSaveT=null;
function examSave(){ clearTimeout(examSaveT); examSaveT=setTimeout(()=>save(),1200); }
function examLeft(){ const e=state.examRun; return e? e.start+e.min*60000-Date.now() : 0; }
const mmss=ms=>{ const s=Math.max(0,Math.round(ms/1000)); return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); };
/* Seminar: drei Fragen zur Wahl, möglichst aus verschiedenen Sitzungen, Ungeübte bevorzugt */
function pickThree(){
  const L=shuffle(essaysOf(0).filter(x=>x.kind==="lang")).sort((a,b)=>(essayScore(a.id)?1:0)-(essayScore(b.id)?1:0));
  const out=[], used=new Set();
  L.forEach(x=>{ if(out.length<3&&!used.has(x.ch)){ out.push(x.id); used.add(x.ch); } });
  L.forEach(x=>{ if(out.length<3&&!out.includes(x.id)) out.push(x.id); });
  return out;
}
function renderExam(){
  clearInterval(examTimer);
  const e=state.examRun;
  if(!e){
    const hist=(state.exams||[]).filter(h=>(h.c||"vl")===state.course).slice(-6).reverse(), ready=essaysOf(0).length;
    $("#app").innerHTML=`${backTo("Üben")}<p class="eyebrow">${COURSES[state.course].short} · Probe-Essay</p><h1>Probe-Essay</h1>
      <div class="block">${state.course==="se"?`<p>Wie in der Essayklausur am 04.02.: Du bekommst <b>drei Fragen</b> aus den fertigen Sitzungen, wählst eine und schreibst <b>etwa 500 Wörter</b> in <b>60 Minuten</b>. Die Uhr läuft ab dem Start, auch während du wählst. Keine Gliederungshilfe, kein Musteressay.</p>
        <p class="small muted">Danach stufst du die vier Kriterien von Dr. Schwarz ein und hakst den Erwartungshorizont ab, oder lässt Claude bewerten. Der Text wird laufend gespeichert.</p>`:`<p>Wie in der Prüfung am 04.02.: Du bekommst eine Frage aus den Sitzungen, die schon fertig sind, und hast <b>60 Minuten</b>. Keine Gliederungshilfe, kein Musteressay. Der Text wird laufend gespeichert, auch wenn du die App zwischendurch schließt.</p>
        <p class="small muted">Danach bewertest du selbst am Erwartungshorizont oder lässt Claude bewerten. Plane 5 bis 10 Minuten für die Gliederung ein, bevor du losschreibst.</p>`}
        ${ready?`<div class="row"><button class="btn" id="xs">Starten (60 Min.)</button><button class="btn ghost" id="xs30">Kurz üben (30 Min.)</button></div>`:`<p class="small muted">Noch keine Fragen vorhanden.</p>`}</div>
      ${hist.length?`<div class="block"><h3>Bisherige Probe-Essays</h3>${hist.map(h=>`<div class="srow"><span>${new Date(h.t).toLocaleDateString("de-DE",{day:"numeric",month:"numeric"})}</span><span class="small muted">${esc(h.title||"")}${h.w?" · "+h.w+" Wörter":""}</span><span class="pts">${h.pass===true?"bestanden":h.pass===false?"nicht bestanden":h.p+"/"+h.max}</span></div>`).join("")}</div>`:""}`;
    bindCrumb(()=>go("practice"));
    const start=min=>{
      if(state.course==="se"){ const opts=pickThree(); state.examRun={id:opts.length===1?opts[0]:null,opts,c:"se",start:Date.now(),min,text:"",checks:{},r:{}}; }
      else { const x=pickEssay(0,true); state.examRun={id:x.id,c:state.course,start:Date.now(),min,text:"",checks:{}}; }
      save(); renderExam(); window.scrollTo(0,0); };
    if($("#xs")) $("#xs").onclick=()=>start(60);
    if($("#xs30")) $("#xs30").onclick=()=>start(30);
    return;
  }
  if(!e.id&&e.opts&&e.opts.length){
    const O=e.opts.map(id=>ESSAYS.find(y=>y.id===id)).filter(Boolean);
    $("#app").innerHTML=`<div class="etop"><span class="small muted">Probe-Essay · ${e.min} Min.</span><span class="clock" id="clock">${mmss(examLeft())}</span></div>
      <h1>Wähle eine Frage</h1><p class="small muted">Lies alle drei. Nimm die, zu der dir Autoren, Begriffe und ein Beispiel einfallen.</p>
      ${O.map((y,i)=>`<div class="block"><p class="eyebrow">Frage ${i+1} · Sitzung ${chOf(y.ch).no}</p><p style="margin:0 0 10px"><b>${y.q}</b></p><button class="btn ghost small" data-pick="${y.id}">Diese Frage schreiben</button></div>`).join("")}
      <div class="row" style="margin:8px 0 16px"><button class="btn ghost small" id="xq">Abbrechen</button></div>`;
    document.querySelectorAll("[data-pick]").forEach(b=>b.onclick=()=>{ e.id=b.dataset.pick; save(); renderExam(); window.scrollTo(0,0); });
    $("#xq").onclick=()=>{ state.examRun=null; save(); renderExam(); };
    examTimer=setInterval(()=>{ const c=$("#clock"); if(!c||view!=="exam"){ clearInterval(examTimer); return; } const l=examLeft(); c.textContent=l>0?mmss(l):"Zeit um"; if(l<=0) c.style.color="var(--bad)"; },1000);
    return;
  }
  const x=ESSAYS.find(y=>y.id===e.id);
  if(!x){ state.examRun=null; save(); renderExam(); return; }
  if(e.phase!=="grade"){
    $("#app").innerHTML=`<div class="etop"><span class="small muted">Probe-Essay · ${e.min} Min.</span><span class="clock" id="clock">${mmss(examLeft())}</span></div>
      <div class="block"><p style="margin:0"><b>${x.q}</b></p></div>
      <div class="essay"><textarea id="xt" style="min-height:22rem" placeholder="Erst gliedern, dann schreiben …">${esc(e.text||"")}</textarea><p class="wc" id="xwc">${wcLabel(e.text,x)}</p></div>
      <div class="row" style="margin:8px 0 16px"><button class="btn" id="xg">Abgeben</button><button class="btn ghost small" id="xq">Abbrechen</button></div>`;
    $("#xt").oninput=ev=>{ e.text=ev.target.value; $("#xwc").textContent=wcLabel(e.text,x); examSave(); };
    $("#xg").onclick=()=>{ const b=$("#xg"); if(examLeft()>0&&!b.dataset.armed){ b.dataset.armed="1"; b.textContent="Wirklich abgeben?"; return; } e.used=Date.now()-e.start; e.phase="grade"; save(); renderExam(); window.scrollTo(0,0); };
    $("#xq").onclick=()=>{ const b=$("#xq"); if(!b.dataset.armed){ b.dataset.armed="1"; b.textContent="Wirklich abbrechen (Text geht verloren)"; return; } state.examRun=null; save(); renderExam(); };
    examTimer=setInterval(()=>{ const c=$("#clock"); if(!c||view!=="exam"){ clearInterval(examTimer); return; } const l=examLeft(); c.textContent=l>0?mmss(l):"Zeit um"; if(l<=0) c.style.color="var(--bad)"; },1000);
    return;
  }
  const pts=()=>x.k.filter((_,j)=>e.checks[j]).length;
  $("#app").innerHTML=`<p class="eyebrow">Probe-Essay · Bewertung · ${Math.min(e.min,Math.round((e.used||0)/60000))} von ${e.min} Minuten genutzt · ${wordCount(e.text)} Wörter</p>
    <div class="block"><p style="margin:0"><b>${x.q}</b></p></div>
    <div class="block"><h3>Dein Essay</h3>${(e.text||"").trim()?`<p class="essaytext">${esc(e.text)}</p>`:`<p class="small muted" style="margin:0">Kein Text.</p>`}</div>
    <div class="block"><h3>Erwartungshorizont</h3><p class="small muted">Streng abhaken: nur, was wirklich im Text steht.</p>
      ${x.k.map((k,j)=>`<label class="check"><input type="checkbox" id="g${j}" ${e.checks[j]?"checked":""}><span>${k}</span></label>`).join("")}
      <p class="pts" id="gp">${pts()} von ${x.k.length}</p>
      <div class="row"><button class="btn ghost" id="gcl">Von Claude bewerten lassen</button></div><div id="gcopy"></div></div>
    ${isSE(x)?rubricHTML(e.r=e.r||{},"xr"):""}
    <div class="block"><h3>Gliederungsvorschlag</h3>${glHTML(x)}</div>
    <div class="block lesson"><h3>Musteressay</h3>${musterHTML(x)}</div>
    <div class="row" style="margin-bottom:20px"><button class="btn" id="gs">Ergebnis speichern und beenden</button></div>`;
  if(isSE(x)) bindRubric(e.r,"xr",()=>{ examSave(); const y=window.scrollY; renderExam(); window.scrollTo(0,y); });
  document.querySelectorAll(".check input").forEach(c=>c.onchange=()=>{ e.checks[+c.id.slice(1)]=c.checked; $("#gp").textContent=`${pts()} von ${x.k.length}`; examSave(); });
  $("#gcl").onclick=()=>copyForClaude(claudePrompt(x,e.text,true),"#gcopy");
  $("#gs").onclick=()=>{ state.exams=state.exams||[]; const extra=isSE(x)?{r:Object.assign({},e.r),pass:sePass(e.r)}:{};
    state.exams.push(Object.assign({t:Date.now(),c:e.c,id:x.id,title:x.short||"",p:pts(),max:x.k.length,w:wordCount(e.text),min:e.min},extra));
    const s=essayScore(x.id); if(!s||pts()>=s.p) state.essays[x.id]=Object.assign({p:pts(),max:x.k.length,t:Date.now(),w:wordCount(e.text)},extra);
    state.examRun=null; logDay(); save(); toast("Gespeichert"); renderExam(); window.scrollTo(0,0); };
}

/* ---------- Gliederung in 10 Minuten: der erste Schritt jedes Essays als tägliche Übung ----------
   Prüfungsfrage lesen, nur die Gliederung schreiben, dann mit dem Gliederungsvorschlag (gl) abgleichen.
   Ergebnis in state.outl[id] = {p, max, n, t}. Der Text kann als Anfang ins ganze Essay übernommen werden. */
let outlineTimer=null;
function pickOutline(n){
  let L=essaysOf(n); if(L.some(x=>x.kind==="lang")) L=L.filter(x=>x.kind==="lang");
  const o=state.outl||{}; return L.slice().sort((a,b)=>((o[a.id]||{}).t||0)-((o[b.id]||{}).t||0)||Math.random()-.5)[0];
}
function openOutline(n,id){ n=n||0; const x=id?ESSAYS.find(e=>e.id===id):pickOutline(n); cur.ol={n, id:x&&x.id, phase:"write", t0:Date.now(), text:"", checks:{}}; go("outline"); }
function renderOutline(){
  clearInterval(outlineTimer);
  const O=cur.ol, n=O.n, back=n?chLabel(n):"Üben", backFn=()=>{ if(n){ cur.ch=n; go("chapter"); } else go("practice"); };
  const x=ESSAYS.find(e=>e.id===O.id);
  if(!x){ $("#app").innerHTML=`${backTo(back)}<h1>Noch keine Prüfungsfragen</h1>`; bindCrumb(backFn); return; }
  const last=(state.outl||{})[x.id];
  const head=`${backTo(back)}<p class="eyebrow">Gliederung in 10 Minuten · Sitzung ${chOf(x.ch).no}${last?` · zuletzt ${last.p} von ${last.max}`:""}</p>
    <div class="block"><p style="margin:0"><b>${x.q}</b></p></div>`;
  if(O.phase==="write"){
    $("#app").innerHTML=`${head}
      <div class="block"><p class="small" style="margin:0 0 6px"><b>Auftrag:</b> Schreib nur die Gliederung: Einleitung, drei bis fünf Schritte, Fazit. Zu jedem Schritt Stichworte und die Autoren, die du nennen würdest. Kein ganzer Text.</p>
        <p class="small muted" style="margin:0">Operator: ${x.op}</p></div>
      <div class="etop"><span class="small muted">Richtwert 10 Minuten</span><span class="clock otime" id="otime">10:00</span></div>
      <div class="essay"><textarea id="ot" style="min-height:14rem" placeholder="1. Einleitung: …&#10;2. …&#10;3. …&#10;4. Fazit: …">${esc(O.text)}</textarea></div>
      <div class="row" style="margin-top:8px"><button class="btn" id="oDone">Mit dem Vorschlag vergleichen</button><button class="btn ghost" id="oOther">Andere Frage</button></div>`;
    $("#ot").oninput=e=>{ O.text=e.target.value; };
    $("#oDone").onclick=()=>{ O.used=Date.now()-O.t0; O.phase="compare"; renderOutline(); window.scrollTo(0,0); };
    $("#oOther").onclick=()=>{ const L=essaysOf(n).filter(y=>y.id!==x.id&&y.kind===x.kind); openOutline(n,L.length?pick(L).id:x.id); };
    outlineTimer=setInterval(()=>{ const c=$("#otime"); if(!c||view!=="outline"){ clearInterval(outlineTimer); return; } const l=O.t0+600000-Date.now(); c.textContent=l>0?mmss(l):"Zeit um"; if(l<=0) c.style.color="var(--bad)"; },1000);
  } else {
    const pts=()=>x.gl.filter((_,j)=>O.checks[j]).length;
    $("#app").innerHTML=`${head}
      <div class="block"><h3>Deine Gliederung</h3>${O.text.trim()?`<p class="essaytext">${esc(O.text)}</p>`:`<p class="small muted" style="margin:0">Leer. Lies den Vorschlag und versuch es morgen noch einmal.</p>`}
        <p class="small muted" style="margin:6px 0 0">${(m=>m===1?"1 Minute":m+" Minuten")(Math.max(1,Math.round((O.used||0)/60000)))} gebraucht.</p></div>
      <div class="block"><h3>Vorschlag: Was davon steckt in deiner Gliederung?</h3>
        ${x.gl.map((g,j)=>`<label class="check"><input type="checkbox" id="g${j}" ${O.checks[j]?"checked":""}><span>${g}</span></label>`).join("")}
        <p class="pts" id="op">${pts()} von ${x.gl.length}</p>
        <div class="row"><button class="btn" id="oSave">Speichern</button><button class="btn ghost" id="oEssay">Daraus das ganze Essay schreiben</button></div></div>
      <div class="block"><h3>Worauf es bei dieser Frage ankommt</h3><ul class="gl">${x.k.map(k=>`<li>${inl(k)}</li>`).join("")}</ul></div>
      ${sess?`<div class="row" style="margin-bottom:14px">${sessBtn()}</div>`:""}`;
    document.querySelectorAll(".check input").forEach(c=>c.onchange=()=>{ O.checks[+c.id.slice(1)]=c.checked; $("#op").textContent=`${pts()} von ${x.gl.length}`; });
    const store=()=>{ if(O.saved) return; const h=state.outl[x.id]||{n:0}; state.outl[x.id]={p:pts(),max:x.gl.length,n:h.n+1,t:Date.now()}; O.saved=true; logDay(); save(); };
    $("#oSave").onclick=()=>{ store(); toast(`${pts()} von ${x.gl.length} gespeichert`); if(sess) sessNext(); else renderOutline(); };
    $("#oEssay").onclick=()=>{ store(); state.drafts=state.drafts||{}; if(!(state.drafts[x.id]||"").trim()&&O.text.trim()){ state.drafts[x.id]=O.text.trim()+"\n\n"; save(); } openEssay(n,x.id); };
  }
  bindCrumb(backFn);
}
