/* ================= Essay-Trainer =================
   Prüfung Vorlesung: Essay, 60 Minuten am PC. Jede Frage hat
   op  = was der Operator verlangt, gl = Gliederungsvorschlag, k = Erwartungshorizont (zum Abhaken), m = Musteressay (Absätze).
   kind "lang" = Prüfungsfrage für 60 Minuten, "kurz" = Teilfrage für etwa 15 Minuten. */
const essaysOf=n=>n? ESSAYS.filter(x=>x.ch===n) : ESSAYS.filter(x=>isReady(x.ch)&&chOf(x.ch).c===state.course);
const essayScore=id=>(state.essays||{})[id];
const wordCount=t=>{ const s=String(t||"").trim(); return s?s.split(/\s+/).length:0; };
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
  return `Bewerte bitte mein ${exam?"Probe-Essay (60 Minuten, ohne Hilfsmittel)":"Essay"} für die Prüfung der ${C.short} „${C.title}“ (${C.who}, UDE, Modul Grundlagen Politik I). Die echte Prüfung ist ein Essay von 60 Minuten am PC, unbenotet (bestanden oder nicht).\n\nFrage:\n${x.q}\n\nErwartungshorizont aus meiner Lern-App:\n${x.k.map(k=>"- "+k).join("\n")}\n\nMein Essay (${wordCount(text)} Wörter):\n${text||"(leer)"}\n\nGib mir bitte:\n1. Würde das voraussichtlich bestehen? Kurz begründet.\n2. Je Punkt des Erwartungshorizonts: erfüllt, teilweise oder fehlt.\n3. Fachliche Fehler oder ungenaue Begriffe.\n4. Aufbau und Argumentation: was ich beim nächsten Mal anders machen sollte.\n5. Einen verbesserten Absatz als Beispiel.`;
}
function renderEssay(){
  const E=cur.es, n=E.n, back=n?chLabel(n):"Üben", backFn=()=>{ if(n){ cur.ch=n; go("chapter"); } else go("practice"); };
  const x=ESSAYS.find(e=>e.id===E.id), L=essaysOf(n);
  if(!x){ $("#app").innerHTML=`${backTo(back)}<h1>Noch keine Essay-Fragen</h1><p class="muted">Für diesen Bereich gibt es noch keine Fragen.</p>`; bindCrumb(backFn); return; }
  state.drafts=state.drafts||{}; const text=state.drafts[x.id]||"", done=L.filter(y=>essayScore(y.id)).length, last=essayScore(x.id);
  const head=`${backTo(back)}
    <p class="eyebrow">${x.kind==="lang"?"Prüfungsfrage · etwa 60 Min.":"Teilfrage · etwa 15 Min."} · Sitzung ${chOf(x.ch).no} · ${done} von ${L.length} bearbeitet</p>
    <div class="block"><p style="margin:0"><b>${x.q}</b></p><p class="small muted" style="margin:8px 0 0">${x.op}</p>${last?`<p class="small muted" style="margin:6px 0 0">Zuletzt: ${last.p} von ${last.max} Punkten des Erwartungshorizonts</p>`:""}</div>`;
  if(E.phase==="schreiben"){
    $("#app").innerHTML=`${head}
      <div class="block"><button class="btn ghost small" id="eh">${E.help?"Gliederungshilfe ausblenden":"Gliederungshilfe zeigen"}</button>${E.help?glHTML(x):`<p class="small muted" style="margin:8px 0 0">Versuch es erst ohne. In der Prüfung gibt es keine Hilfe.</p>`}</div>
      <div class="essay"><label class="small muted" for="et">Dein Essay (wird automatisch gespeichert)</label>
        <textarea id="et" style="margin-top:6px">${esc(text)}</textarea><p class="wc" id="ewc">${wordCount(text)} Wörter</p></div>
      <div class="row" style="margin-top:6px"><button class="btn" id="ed">Fertig, bewerten</button><button class="btn ghost" id="en">Andere Frage</button></div>`;
    let t=null; $("#et").oninput=e=>{ state.drafts[x.id]=e.target.value; $("#ewc").textContent=wordCount(e.target.value)+" Wörter"; clearTimeout(t); t=setTimeout(save,1200); };
    $("#eh").onclick=()=>{ E.help=!E.help; const y=window.scrollY; renderEssay(); window.scrollTo(0,y); };
    $("#ed").onclick=()=>{ save(); E.phase="bewerten"; renderEssay(); window.scrollTo(0,0); };
    $("#en").onclick=()=>{ save(); const others=L.filter(y=>y.id!==x.id); openEssay(n, others.length?pick(others).id:x.id); };
  } else {
    const pts=()=>x.k.filter((_,j)=>E.checks[j]).length;
    $("#app").innerHTML=`${head}
      <div class="block"><h3>Erwartungshorizont</h3><p class="small muted">Hake ab, was in deinem Text klar und fachlich richtig vorkommt.</p>
        ${x.k.map((k,j)=>`<label class="check"><input type="checkbox" id="q${j}" ${E.checks[j]?"checked":""}><span>${k}</span></label>`).join("")}
        <p class="pts" id="ep">${pts()} von ${x.k.length}</p>
        <div class="row"><button class="btn" id="es">Speichern</button><button class="btn ghost" id="ecl">Von Claude bewerten lassen</button></div><div id="ecopy"></div></div>
      <div class="block"><h3>Dein Text</h3>${text.trim()?`<p class="essaytext">${esc(text)}</p>`:`<p class="small muted" style="margin:0">Du hast nichts geschrieben. Lies dir die Gliederung und das Musteressay durch und versuch es danach noch einmal.</p>`}
        <div class="row" style="margin-top:8px"><button class="btn ghost small" id="eb">Weiterschreiben</button>${text.trim()?`<button class="btn ghost small" id="ex">Neu anfangen</button>`:""}</div></div>
      <div class="block"><h3>Gliederungsvorschlag</h3>${glHTML(x)}</div>
      <div class="block lesson"><h3>Musteressay</h3>${musterHTML(x)}</div>
      <div class="row" style="margin-bottom:12px"><button class="btn ghost" id="en">Nächste Frage</button></div>`;
    document.querySelectorAll(".check input").forEach(c=>c.onchange=()=>{ E.checks[+c.id.slice(1)]=c.checked; $("#ep").textContent=`${pts()} von ${x.k.length}`; });
    $("#es").onclick=()=>{ state.essays[x.id]={p:pts(),max:x.k.length,t:Date.now(),w:wordCount(text)}; logDay(); save(); toast(`${pts()} von ${x.k.length} gespeichert`); renderEssay(); };
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
function renderExam(){
  clearInterval(examTimer);
  const e=state.examRun;
  if(!e){
    const hist=(state.exams||[]).filter(h=>(h.c||"vl")===state.course).slice(-6).reverse(), ready=essaysOf(0).length;
    $("#app").innerHTML=`${backTo("Üben")}<p class="eyebrow">${COURSES[state.course].short} · Probe-Essay</p><h1>Probe-Essay</h1>
      <div class="block"><p>Wie in der Prüfung am 04.02.: Du bekommst eine Frage aus den Sitzungen, die schon fertig sind, und hast <b>60 Minuten</b>. Keine Gliederungshilfe, kein Musteressay. Der Text wird laufend gespeichert, auch wenn du die App zwischendurch schließt.</p>
        <p class="small muted">Danach bewertest du selbst am Erwartungshorizont oder lässt Claude bewerten. Plane 5 bis 10 Minuten für die Gliederung ein, bevor du losschreibst.</p>
        ${ready?`<div class="row"><button class="btn" id="xs">Starten (60 Min.)</button><button class="btn ghost" id="xs30">Kurz üben (30 Min.)</button></div>`:`<p class="small muted">Noch keine Fragen vorhanden.</p>`}</div>
      ${hist.length?`<div class="block"><h3>Bisherige Probe-Essays</h3>${hist.map(h=>`<div class="srow"><span>${new Date(h.t).toLocaleDateString("de-DE",{day:"numeric",month:"numeric"})}</span><span class="small muted">${esc(h.title||"")}${h.w?" · "+h.w+" Wörter":""}</span><span class="pts">${h.p}/${h.max}</span></div>`).join("")}</div>`:""}`;
    bindCrumb(()=>go("practice"));
    const start=min=>{ const x=pickEssay(0,true); state.examRun={id:x.id,c:state.course,start:Date.now(),min,text:"",checks:{}}; save(); renderExam(); window.scrollTo(0,0); };
    if($("#xs")) $("#xs").onclick=()=>start(60);
    if($("#xs30")) $("#xs30").onclick=()=>start(30);
    return;
  }
  const x=ESSAYS.find(y=>y.id===e.id);
  if(!x){ state.examRun=null; save(); renderExam(); return; }
  if(e.phase!=="grade"){
    $("#app").innerHTML=`<div class="etop"><span class="small muted">Probe-Essay · ${e.min} Min.</span><span class="clock" id="clock">${mmss(examLeft())}</span></div>
      <div class="block"><p style="margin:0"><b>${x.q}</b></p></div>
      <div class="essay"><textarea id="xt" style="min-height:22rem" placeholder="Erst gliedern, dann schreiben …">${esc(e.text||"")}</textarea><p class="wc" id="xwc">${wordCount(e.text)} Wörter</p></div>
      <div class="row" style="margin:8px 0 16px"><button class="btn" id="xg">Abgeben</button><button class="btn ghost small" id="xq">Abbrechen</button></div>`;
    $("#xt").oninput=ev=>{ e.text=ev.target.value; $("#xwc").textContent=wordCount(e.text)+" Wörter"; examSave(); };
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
    <div class="block"><h3>Gliederungsvorschlag</h3>${glHTML(x)}</div>
    <div class="block lesson"><h3>Musteressay</h3>${musterHTML(x)}</div>
    <div class="row" style="margin-bottom:20px"><button class="btn" id="gs">Ergebnis speichern und beenden</button></div>`;
  document.querySelectorAll(".check input").forEach(c=>c.onchange=()=>{ e.checks[+c.id.slice(1)]=c.checked; $("#gp").textContent=`${pts()} von ${x.k.length}`; examSave(); });
  $("#gcl").onclick=()=>copyForClaude(claudePrompt(x,e.text,true),"#gcopy");
  $("#gs").onclick=()=>{ state.exams=state.exams||[]; state.exams.push({t:Date.now(),c:e.c,id:x.id,title:x.short||"",p:pts(),max:x.k.length,w:wordCount(e.text),min:e.min});
    const s=essayScore(x.id); if(!s||pts()>=s.p) state.essays[x.id]={p:pts(),max:x.k.length,t:Date.now(),w:wordCount(e.text)};
    state.examRun=null; logDay(); save(); toast("Gespeichert"); renderExam(); window.scrollTo(0,0); };
}
