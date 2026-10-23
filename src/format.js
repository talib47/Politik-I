/* ================= Textformat: Karten, Rückmeldungen, Beispielboxen =================
   Schreibweise in den Inhalten (Karten-Rückseite b, Beispielboxen):
   - Zeilen mit "- " werden Aufzählung, "1. " nummerierte Schritte
   - "Begriff: Erklärung" wird Begriff fett, Erklärung daneben
   - "$ Formel" wird Formelbox (bricht auf dem Handy um)
   - "| Kopf | A | B" (mehrere Zeilen) wird Gegenüberstellung, auf dem Handy gestapelt
   - **fett**, Y^N hochgestellt, Y_POT tiefgestellt; Klammern mit Wörtern werden leiser gesetzt */
const nb=s=>String(s).replace(/(\d) (%|€|Prozentpunkte|Punkte|P\.|Tage|Minuten)/g,"$1&nbsp;$2");
const subsup=s=>s.replace(/([A-Za-zΠ*])\^([A-Za-z]+)/g,"$1<sup>$2</sup>").replace(/([A-Za-zΠ])_([A-Za-zΠ]{1,8})/g,"$1<sub>$2</sub>");
const quietParens=s=>s.replace(/\(([^()]{2,})\)/g,(m,x)=>/^[A-Za-zÄÖÜäöüß„]/.test(x)&&/[A-Za-zÄÖÜäöüß]{3,}/.test(x)&&!/[=+−·<>\/]/.test(x)?`<span class="pz">(${x})</span>`:m);
const inl=s=>quietParens(subsup(nb(String(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>"))));
const fx=s=>subsup(nb(s));
const TERM=/^([^:=⇒]{1,42}): (.+)$/;
function cmp(rows){
  const h=rows[0], body=rows.slice(1);
  const tight=rows.every(r=>r.every(c=>String(c).replace(/\*\*/g,"").length<=18));
  return `<table class="cmp${tight?" tight":""}"><thead><tr>${h.map(x=>`<th>${inl(x)}</th>`).join("")}</tr></thead><tbody>${body.map(r=>`<tr><th scope="row">${inl(r[0])}</th>${r.slice(1).map((c,j)=>`<td data-l="${esc(String(h[j+1]).replace(/\*\*/g,"").replace(/[\^_]/g,""))}"><span>${inl(c)}</span></td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function richText(b){
  const L=String(b).split("\n"); let out="", kind=null, items=[];
  const flush=()=>{ if(!kind) return;
    if(kind==="dl") out+=`<div class="dlist">${items.join("")}</div>`;
    else out+=`<${kind}>${items.map(x=>`<li>${x}</li>`).join("")}</${kind}>`;
    kind=null; items=[]; };
  const open=k=>{ if(kind!==k){ flush(); kind=k; } };
  for(let i=0;i<L.length;i++){ const l=L[i].trim(); let m;
    if(!l){ flush(); continue; }
    if((m=l.match(/^\$ ?(.*)$/))){ const box=`<div class="eq">${fx(m[1])}</div>`;
      if((kind==="ol"||kind==="ul")&&items.length) items[items.length-1]+=box; else { flush(); out+=box; } continue; }
    if(l.startsWith("|")){ flush(); const rows=[];
      while(i<L.length&&L[i].trim().startsWith("|")){ rows.push(L[i].trim().replace(/^\||\|$/g,"").split("|").map(x=>x.trim())); i++; }
      i--; out+=cmp(rows); continue; }
    if((m=l.match(/^[-•] (.*)$/))){ open("ul"); items.push(termInline(m[1])); continue; }
    if((m=l.match(/^\d+[.)] (.*)$/))){ open("ol"); items.push(termInline(m[1])); continue; }
    if((m=l.match(TERM))){ open("dl"); items.push(`<b>${inl(m[1])}</b><span>${inl(m[2])}</span>`); continue; }
    flush(); out+=`<p>${inl(l)}</p>`;
  }
  flush(); return out;
}
function termInline(s){ const m=s.match(TERM); return m? `<b>${inl(m[1])}:</b> ${inl(m[2])}` : inl(s); }
/* Beispielbox für Lektionen: links Label, rechts Inhalt */
function bsp(title,rows){ return `<div class="bsp"><p class="bh">${title}</p><div class="dlist">${rows.map(([k,v])=>`<b>${k}</b><span>${v.split("\n").map(x=>x.startsWith("$")?`<div class="eq">${fx(x.replace(/^\$ ?/,""))}</div>`:inl(x)).join("<br>")}</span>`).join("")}</div></div>`; }
/* Text kopieren, sonst zum Markieren anzeigen */
async function copyText(text,holder){
  try{ await navigator.clipboard.writeText(text); toast("Kopiert. In den Claude-Chat einfügen."); return true; }
  catch(x){ const h=$(holder); if(h){ h.innerHTML=`<textarea class="copybox" readonly>${esc(text)}</textarea>`; const t=h.querySelector("textarea"); t.focus(); t.select(); } toast("Text markiert, jetzt kopieren"); return false; }
}
