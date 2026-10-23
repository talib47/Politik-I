/* ================= Begriffe und Abkürzungen (nach dem Symbol-Training aus Wirtschaft II) =================
   Jeder Begriff einmal erklärt: Bedeutung, Mini-Beispiel, typische Verwechslung, Merkhilfe, Quelle.
   Daraus entstehen zwei Kartenstapel (Begriff → Bedeutung, Bedeutung → Begriff) und das Lexikon.
   Felder: id (bleibt fest, sonst geht der Lernstand verloren), s Begriff/Abkürzung, lang Langform, n Bedeutung kurz,
   bed, bsp, falle (typische Verwechslung), merk (Merkhilfe), q (Quelle). Gruppen je Veranstaltung (c) und Sitzung (ch). */
const TERM_GROUPS=[];
function termsReady(){ TERMS.length=0; TERM_GROUPS.forEach(g=>g.items.forEach(x=>TERMS.push(Object.assign({g:g.id, gt:g.t, c:g.c, ch:g.ch},x)))); buildTermCards(); }
const TERMS=[];
const termCourse=id=>{ const t=TERMS.find(x=>"b-"+x.id===id||"br-"+x.id===id); return t?t.c:null; };
function termBack(x){ return [x.lang?`Langform: ${x.lang}`:"", `Bedeutung: ${x.bed}`, `Beispiel: ${x.bsp}`, x.falle?`Verwechslung: ${x.falle}`:""].filter(Boolean).join("\n"); }
function termBackRev(x){ return [`**${x.s}**${x.lang?" ("+x.lang+")":""}`, `Beispiel: ${x.bsp}`, x.falle?`Verwechslung: ${x.falle}`:""].filter(Boolean).join("\n"); }
function buildTermCards(){
  CARDS.b=TERMS.map(x=>({id:"b-"+x.id, f:x.s, rich:termBack(x)}));
  CARDS.br=TERMS.map(x=>({id:"br-"+x.id, f:x.n, rich:termBackRev(x)}));
  TERMS.forEach(x=>{ CARD_CTX["b-"+x.id]="Begriff · "+x.gt+" · Was bedeutet das?"; CARD_CTX["br-"+x.id]="Begriff · "+x.gt+" · Wie heißt das?";
    const info=[x.merk?"Merkhilfe: "+x.merk:"", x.q?"Quelle: "+x.q:""].filter(Boolean).join("\n"); if(info) CARD_INFO["b-"+x.id]=CARD_INFO["br-"+x.id]=info; });
}
/* Lexikon: alle Begriffe der Veranstaltung nach Themen */
function lexiconHTML(){
  const G=TERM_GROUPS.filter(g=>g.c===state.course&&isReady(g.ch));
  if(!G.length) return `<div class="block"><p class="small muted" style="margin:0">Noch keine Begriffe.</p></div>`;
  return G.map(g=>`<div class="block"><h3>${g.t}</h3><div class="dlist lex">${g.items.map(x=>`<b class="sy">${inl(x.s)}</b><span>${inl(x.n)}${x.lang?`<span class="small muted">${inl(x.lang)}</span>`:""}<span class="small muted">${inl(x.bsp)}</span>${x.falle?`<span class="small lexwarn">${inl(x.falle)}</span>`:""}</span>`).join("")}</div></div>`).join("");
}
function renderTerms(){
  const st=n=>{ const A=allCards(n); return `${dueCards(n).length} fällig · ${A.filter(x=>!isSeen(x.id)).length} neu`; };
  $("#app").innerHTML=`${backTo("Üben")}<p class="eyebrow">${COURSES[state.course].short} · Grundlagen fürs Essay</p><h1>Begriffe und Abkürzungen</h1>
    <p class="muted">Die Fachbegriffe der Sitzungen mit Beispiel und typischer Verwechslung. Gewusste Karten kommen nach 1, 3, 7, 16 und 35 Tagen wieder, wie die anderen Karten.</p>
    <div class="block"><div class="modes">
      <button class="mode" id="tb1"><span class="t">Begriff → Bedeutung</span><span class="n">${st("b")}</span><span class="d">Vorne steht der Begriff, z. B. ZPES. Erklär ihn in einem Satz.</span></button>
      <button class="mode" id="tb2"><span class="t">Bedeutung → Begriff</span><span class="n">${st("br")}</span><span class="d">Vorne steht die Erklärung. Nenn den Fachbegriff, so wie er im Essay stehen sollte.</span></button>
    </div></div>
    <h2 style="margin-top:18px">Lexikon</h2>${lexiconHTML()}`;
  bindCrumb(()=>go("practice"));
  $("#tb1").onclick=()=>openCards("b"); $("#tb2").onclick=()=>openCards("br");
}
