/* ================= Alles aufschreiben (freies Abrufen) =================
   Forschung: Freies Abrufen mit anschließendem Abgleich gehört zu den wirksamsten Formen des Abrufübens
   (Rowland 2014, freies Abrufen mit Rückmeldung g ≈ 0,8). Kurze Texte aus dem Gedächtnis bringen so viel
   wie lange Texte mit offenem Buch (Studie „Two routes to the same place“: quick closed-book essays). Genau das verlangt der Essay:
   Wissen ohne Hilfen ordnen und aufschreiben.
   Ablauf: Sitzung wählen, 5 Minuten alles aufschreiben, was du weißt, danach die Lektionen der Sitzung als Kernpunkte
   abhaken. Ergebnis in state.dump[n] = {p, max, t, w, k} (k = Anzahl Versuche). Nichts davon ändert IDs. */
const DUMP_MIN=5;
const dumpPoints=n=>(LESSONS[n]||[]).map(x=>x.t);
const dumpReady=()=>courseChs().filter(ch=>(LESSONS[ch.n]||[]).some(x=>lessonState(x.id)));
function pickDump(){ const R=dumpReady(), d=state.dump||{}; return R.slice().sort((a,b)=>((d[a.n]||{}).t||0)-((d[b.n]||{}).t||0))[0]; }
function openDump(n){ const ch=n?chOf(n):pickDump(); cur.dp={n:ch&&ch.n, phase:"write", t0:Date.now(), text:"", checks:{}}; go("dump"); }
let dumpTimer=null;
function renderDump(){
  clearInterval(dumpTimer);
  const D=cur.dp, n=D.n, ch=n&&chOf(n), back=sess?"Heute":"Üben", backFn=()=>go(sess?"home":"practice");
  if(!ch){ $("#app").innerHTML=`${backTo(back)}<h1>Alles aufschreiben</h1><div class="block"><p class="muted" style="margin:0">Lies zuerst eine Lektion. Dann kannst du hier aufschreiben, was hängen geblieben ist.</p></div>`; bindCrumb(backFn); return; }
  const last=(state.dump||{})[n];
  const head=`${backTo(back)}<p class="eyebrow">Alles aufschreiben · ${COURSES[ch.c].short} · ${chLabel(n)}${last?` · zuletzt ${last.p} von ${last.max}`:""}</p>
    <h1>${ch.title}</h1>`;
  if(D.phase==="write"){
    const others=dumpReady().filter(c=>c.n!==n);
    $("#app").innerHTML=`${head}
      <div class="block"><p class="small" style="margin:0"><b>Auftrag:</b> Schreib in ${DUMP_MIN} Minuten alles auf, was du zu dieser Sitzung noch weißt: Begriffe, Autoren, Modelle, Beispiele, Zusammenhänge. Stichworte reichen. Nicht nachschauen.</p>
        <p class="small muted" style="margin:6px 0 0">Was dir nicht einfällt, ist genau das, was du danach gezielt wiederholst.</p></div>
      <div class="etop"><span class="small muted">Richtwert ${DUMP_MIN} Minuten</span><span class="clock" id="dtime">${mmss(DUMP_MIN*60000)}</span></div>
      <div class="essay"><textarea id="dt" style="min-height:14rem" placeholder="Alles, was dir einfällt …">${esc(D.text)}</textarea><p class="wc" id="dwc">${wordCount(D.text)} Wörter</p></div>
      <div class="row" style="margin-top:8px"><button class="btn" id="dDone">Abgleichen</button>${others.length?`<button class="btn ghost" id="dOther">Andere Sitzung</button>`:""}</div>`;
    const ta=$("#dt"); ta.oninput=e=>{ D.text=e.target.value; $("#dwc").textContent=wordCount(D.text)+" Wörter"; };
    $("#dDone").onclick=()=>{ D.used=Date.now()-D.t0; D.phase="check"; renderDump(); window.scrollTo(0,0); };
    if($("#dOther")) $("#dOther").onclick=()=>{ const o=others.sort((a,b)=>(((state.dump||{})[a.n]||{}).t||0)-(((state.dump||{})[b.n]||{}).t||0))[0]; openDump(o.n); };
    dumpTimer=setInterval(()=>{ const c=$("#dtime"); if(!c||view!=="dump"){ clearInterval(dumpTimer); return; } const l=D.t0+DUMP_MIN*60000-Date.now(); c.textContent=l>0?mmss(l):"Zeit um"; if(l<=0) c.style.color="var(--bad)"; },1000);
  } else {
    const P=dumpPoints(n), pts=()=>P.filter((_,j)=>D.checks[j]).length;
    $("#app").innerHTML=`${head}
      <div class="block"><h3>Dein Text</h3>${D.text.trim()?`<p class="essaytext">${esc(D.text)}</p>`:`<p class="small muted" style="margin:0">Leer. Kein Problem: Schau dir die Kernpunkte an und versuch es in ein paar Tagen noch einmal.</p>`}
        <p class="small muted" style="margin:6px 0 0">${wordCount(D.text)} Wörter in ${(m=>m===1?"1 Minute":m+" Minuten")(Math.max(1,Math.round((D.used||0)/60000)))}.</p></div>
      <div class="block"><h3>Kernpunkte der Sitzung</h3><p class="small muted">Hak ab, wozu in deinem Text etwas Richtiges steht. Ein Stichwort reicht.</p>
        ${P.map((t,j)=>`<label class="check"><input type="checkbox" id="d${j}" ${D.checks[j]?"checked":""}><span>${t}</span></label>`).join("")}
        <p class="pts" id="dp">${pts()} von ${P.length}</p>
        <div class="row"><button class="btn" id="dSave">Speichern</button></div></div>
      <div class="block"><h3>Was fehlte?</h3><p class="small muted" style="margin:0">Nicht abgehakte Punkte öffnest du direkt als Lektion. Am wirksamsten: kurz nachlesen, dann in ein paar Tagen wieder aufschreiben.</p>
        <div class="tlist" id="dMiss" style="margin-top:8px"></div></div>
      ${sess?`<div class="row" style="margin-bottom:14px">${sessBtn()}</div>`:""}`;
    const miss=()=>{ const el=$("#dMiss"); const M=P.map((t,j)=>[t,j]).filter(([,j])=>!D.checks[j]);
      el.innerHTML=M.length?M.map(([t,j])=>`<button class="titem" data-li="${j}"><span class="t">${t}</span></button>`).join(""):`<p class="small muted" style="margin:0">Nichts. Alle Kernpunkte waren drin, stark.</p>`;
      el.querySelectorAll("[data-li]").forEach(b=>b.onclick=()=>openLesson(n,+b.dataset.li)); };
    miss();
    document.querySelectorAll(".check input").forEach(c=>c.onchange=()=>{ D.checks[+c.id.slice(1)]=c.checked; $("#dp").textContent=`${pts()} von ${P.length}`; miss(); });
    $("#dSave").onclick=()=>{ if(!D.saved){ state.dump=state.dump||{}; const h=state.dump[n]||{k:0}; state.dump[n]={p:pts(),max:P.length,t:Date.now(),w:wordCount(D.text),k:h.k+1}; D.saved=true; logDay(); save(); }
      toast(`${pts()} von ${P.length} gespeichert`); if(sess) sessNext(); else renderDump(); };
  }
  bindCrumb(backFn);
}
