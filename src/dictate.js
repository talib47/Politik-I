/* ================= Diktieren in Textfeldern (aus BiWi II übernommen, 23.11.) =================
   Mikrofon-Knopf unten rechts im Textfeld. Spracherkennung des Geräts (Web Speech API, de-DE):
   schreibt in Echtzeit direkt ins Feld (der gerade gesprochene Satz wird laufend ersetzt, fertige Sätze bleiben geglättet stehen).
   Glätten ohne KI, nur nach festen Regeln: Füllwörter (äh, ähm …) und doppelte Wörter raus,
   gesprochene Satzzeichen („Punkt“, „Komma“, „neue Zeile“, „Spiegelstrich“) umsetzen, Satzanfänge groß.
   Gibt es keine Spracherkennung im Browser, zeigt der Knopf den Weg über das Mikrofon der Tastatur. */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function cleanSpeech(t){
  let s=" "+t+" ";
  s=s.replace(/\s+(äh+m?|ähm|öh+m?|hm+|mhm|ehm)(?=[\s,.!?])/gi," ");
  s=s.replace(/\s+(neuer absatz|neue zeile)\s+/gi,"\n");
  s=s.replace(/\s+(spiegelstrich|aufzählungspunkt|nächster punkt)\s+/gi,"\n- ");
  s=s.replace(/\s+fragezeichen(?=\s)/gi,"?").replace(/\s+ausrufezeichen(?=\s)/gi,"!").replace(/\s+doppelpunkt(?=\s)/gi,":")
     .replace(/\s+komma(?=\s)/gi,",").replace(/\s+punkt(?=\s|$)/gi,".");
  s=s.replace(/\b(\p{L}+)(\s+\1\b)+/giu,"$1");
  s=s.replace(/[ \t]+([,.!?:])/g,"$1").replace(/([,.!?:])(?=\p{L})/gu,"$1 ").replace(/[ \t]{2,}/g," ").replace(/ *\n */g,"\n").trim();
  s=s.replace(/(^|[.!?]\s+|\n-?\s*)(\p{Ll})/gu,(m,a,b)=>a+b.toUpperCase());
  return s;
}
function attachDictation(ta){
  if(!ta||ta.dataset.dict) return; ta.dataset.dict="1";
  const wrap=document.createElement("div"); wrap.className="dictwrap"; ta.parentNode.insertBefore(wrap,ta); wrap.appendChild(ta);
  const b=document.createElement("button"); b.type="button"; b.className="dictbtn"; b.setAttribute("aria-label","Diktieren"); b.title="Diktieren";
  b.innerHTML=`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`;
  wrap.appendChild(b);
  const live=document.createElement("p"); live.className="dictlive"; live.hidden=true; live.setAttribute("aria-live","polite"); wrap.after(live);
  let rec=null, on=false;
  /* Echtzeit: Das Feld zeigt immer festen Text plus den gerade gesprochenen Satz; fertige Sätze werden fest. */
  let base="";
  const join=(v,c)=>{ if(!c) return v; const sep=!v||/\s$/.test(v)||/^\n/.test(c)?"":" "; const cap=!v.trim()||/[.!?:]\s*$/.test(v)||/\n\s*$/.test(v); return v+sep+(cap?c.charAt(0).toUpperCase()+c.slice(1):c); };
  const show=(interim)=>{ ta.value=join(base,cleanSpeech(interim)); ta.dispatchEvent(new Event("input",{bubbles:true})); ta.scrollTop=ta.scrollHeight; };
  const stop=()=>{ on=false; b.classList.remove("on"); b.setAttribute("aria-label","Diktieren"); live.hidden=true; live.textContent=""; try{ rec&&rec.stop(); }catch(x){} };
  b.onclick=()=>{
    if(!SR){ live.hidden=!live.hidden; live.className="dictlive hint"; live.textContent="Diktieren hier über die Tastatur: ins Feld tippen, dann auf das Mikrofon der Bildschirmtastatur."; return; }
    if(on) return stop();
    rec=new SR(); rec.lang="de-DE"; rec.continuous=true; rec.interimResults=true;
    base=ta.value;
    rec.onresult=e=>{ let interim=""; for(let i=e.resultIndex;i<e.results.length;i++){ const r=e.results[i]; if(r.isFinal) base=join(base,cleanSpeech(r[0].transcript)); else interim+=r[0].transcript; } show(interim); };
    rec.onerror=e=>{ if(e.error==="not-allowed"||e.error==="service-not-allowed"){ stop(); live.hidden=false; live.className="dictlive hint"; live.textContent="Mikrofon nicht erlaubt. In den Einstellungen für Safari das Mikrofon freigeben oder das Mikrofon der Tastatur nutzen."; } };
    rec.onend=()=>{ if(on){ try{ rec.start(); }catch(x){ stop(); } } };
    try{ rec.start(); on=true; b.classList.add("on"); b.setAttribute("aria-label","Diktieren beenden"); live.hidden=true; }
    catch(x){ stop(); }
  };
  /* Tippt Talib selbst, endet das Diktat, damit nichts überschrieben wird */
  ta.addEventListener("beforeinput",()=>{ if(on) stop(); });
  /* Beim Verlassen der Ansicht aufhören */
  const obs=new MutationObserver(()=>{ if(!document.body.contains(ta)){ stop(); obs.disconnect(); } }); obs.observe(document.getElementById("app"),{childList:true});
}
