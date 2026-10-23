/* ================= „Was gehört wohin?“: Zuordnungstraining (Idee aus Wirtschaft II, „Wer sagt das?“) =================
   Mehrere Zuordnungsarten (WHO_SETS): Autor, Regimetyp, Teilregime der Embedded Democracy, Polity/Politics/Policy.
   Ein Eintrag: id (bleibt fest), set, ch (Sitzung), t (Aussage oder Merkmal), s (richtige Kategorie),
   alt (ähnliche Kategorien, die nicht als falsche Antwort angeboten werden), ex (Begründung aus Folie oder Lektüre).
   Verwechslungen werden gespeichert (state.who[id].conf) und kommen öfter. Inhalte je Sitzung in content_*.js. */
const WHO_SETS={};
const WHO=[];
const whoOf=n=>n? WHO.filter(x=>x.ch===n) : WHO.filter(x=>isReady(x.ch)&&chOf(x.ch).c===state.course);
function whoOptions(x){
  const S=WHO_SETS[x.set], all=Object.keys(S.opts);
  if(all.length<=4) return all.slice();
  const pool=all.filter(k=>k!==x.s&&!(x.alt||[]).includes(k));
  return shuffle([x.s].concat(shuffle(pool).slice(0,3)));
}
function whoPick(n,ch){
  const st=state.who||{}, pool=whoOf(ch).slice(), out=[];
  const w=pool.map(x=>{ const h=st[x.id]; return !h?3 : h.last?1 : 5; });
  while(out.length<Math.min(n,pool.length)){ let r=Math.random()*w.reduce((a,b)=>a+b,0), i=0; for(;i<pool.length;i++){ r-=w[i]; if(r<=0) break; } i=Math.min(i,pool.length-1); out.push(pool.splice(i,1)[0]); w.splice(i,1); }
  return out;
}
function openWho(n,ch){ cur.wh={list:whoPick(n||8,ch).map(x=>({x,o:whoOptions(x)})), i:0, a:null, right:0, ch:ch||0}; go("who"); }
function renderWho(){
  const W=cur.wh, L=W.list, back=W.ch?chLabel(W.ch):"Üben", backFn=()=>{ if(W.ch){ cur.ch=W.ch; go("chapter"); } else go("practice"); };
  if(W.i>=L.length){
    $("#app").innerHTML=`${backTo(back)}<h1>${L.length?"Runde geschafft":"Noch nichts zum Zuordnen"}</h1><div class="block">${L.length?`<p>${W.right} von ${L.length} richtig zugeordnet.</p>`:""}
      <p class="small muted">Falsch zugeordnete Aussagen kommen in den nächsten Runden häufiger. Welche Kategorien du oft verwechselst, steht unter Statistik.</p>
      <div class="row">${sess?sessBtn():`${L.length?`<button class="btn" id="wAgain">Neue Runde</button>`:""}<button class="btn ghost" id="wOut">Fertig</button>`}</div></div>`;
    bindCrumb(backFn); if($("#wAgain")) $("#wAgain").onclick=()=>openWho(8,W.ch); if($("#wOut")) $("#wOut").onclick=backFn; return;
  }
  const {x,o}=L[W.i], S=WHO_SETS[x.set];
  $("#app").innerHTML=`${backTo(back)}
    <p class="eyebrow">Was gehört wohin? · ${W.i+1} von ${L.length}</p>
    <div class="block"><p class="wset">${S.q}</p><p class="who${x.t.length>110?" sm":""}">${S.quote?"„"+inl(x.t)+"“":inl(x.t)}</p>
      <div class="mc">${o.map(k=>{ const cls=W.a===null?"":(k===x.s?"r":(k===W.a?"w":"")); return `<button data-s="${k}" class="${cls}" ${W.a!==null?"disabled":""}>${S.opts[k]}</button>`; }).join("")}</div>
      ${W.a===null?"":W.a===x.s?`<div class="fb good"><p class="fh">Richtig.</p><p style="margin:0">${inl(x.ex)}</p></div>`
        :`<div class="fb bad"><p class="fh">Nicht ganz.</p><div class="dlist"><b>Richtig</b><span>${S.opts[x.s]}</span><b>Warum</b><span>${inl(x.ex)}</span>${S.why&&S.why[W.a]?`<b>${S.opts[W.a]}</b><span>${inl(S.why[W.a])}</span>`:""}</div></div>`}</div>
    ${W.a!==null?`<button class="btn" id="wNext">Weiter</button>`:S.tip?`<p class="small muted">Tipp: ${S.tip}</p>`:""}`;
  bindCrumb(backFn);
  document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{ if(W.a!==null) return; W.a=b.dataset.s; const ok=W.a===x.s; if(ok) W.right++;
    const h=state.who[x.id]||{n:0,r:0}; h.n++; if(ok) h.r++; h.last=ok; if(!ok) h.conf=W.a; state.who[x.id]=h; logDay(); save(); renderWho(); });
  if($("#wNext")) $("#wNext").onclick=()=>{ W.i++; W.a=null; renderWho(); window.scrollTo(0,0); };
}
