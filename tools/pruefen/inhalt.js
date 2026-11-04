/* Inhaltsprüfung ohne Lesen: lädt die gebaute App, misst Fragenqualität und Abdeckung.
   Aufruf (Server im Ordner repos/): node tools/pruefen/inhalt.js [URL]
   Meldet: doppelte IDs, Fragen ohne Begründung je falscher Option, Fragen, deren richtige Antwort deutlich die längste ist,
   Kreuzaufgaben nur wahr/nur falsch, Lektionen ohne Übung (Begriffe aus <b>…</b>, die in keiner Karte/Frage/Zuordnung vorkommen). */
const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8766/Politik-I/index.html';
(async()=>{ const b=await chromium.launch(); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(600);
  const r=await p.evaluate(()=>{
    const strip=s=>String(s||'').replace(/<[^>]+>/g,'');
    const out={fragen:0,laenge:[],ohneW:[],kreuz:[],dup:[],ungeuebt:{}};
    const ids=[];
    for(const [n,Ls] of Object.entries(LESSONS)) for(const L of Ls){ ids.push(L.id); (L.check||[]).forEach((q,j)=>{ out.fragen++;
      const o=q.o.map(strip), len=o.map(x=>x.length), a=q.a, s=[...len].sort((x,y)=>y-x);
      if(len[a]===s[0]&&s[0]>s[1]*1.25) out.laenge.push(L.id+'#'+j);
      const w=q.w||{}; if(o.some((_,k)=>k!==a&&!w[k]&&!w[String(k)])) out.ohneW.push(L.id+'#'+j); }); }
    for(const [n,Cs] of Object.entries(CARDS)) for(const c of Cs) ids.push(c.id);
    (KREUZ||[]).forEach(x=>{ ids.push(x.id); const t=x.s.filter(s=>s[1]).length; if(t===0||t===x.s.length) out.kreuz.push(x.id); });
    if(typeof WHO!=='undefined') WHO.forEach(x=>ids.push(x.id)); (ESSAYS||[]).forEach(x=>ids.push(x.id));
    const cnt={}; ids.forEach(i=>cnt[i]=(cnt[i]||0)+1); out.dup=Object.keys(cnt).filter(k=>cnt[k]>1);
    /* Begriffe, die in Lektionen fett stehen, aber in keiner Übung vorkommen */
    const practice=[].concat(...Object.values(CARDS).map(cs=>cs.map(c=>(c.f||'')+' '+(c.b||'')+' '+(c.rich||''))),
      ...Object.values(LESSONS).map(ls=>ls.map(l=>(l.check||[]).map(q=>q.q+' '+q.o.join(' ')+' '+(q.ex||'')).join(' '))),
      (KREUZ||[]).map(x=>x.stem+' '+x.s.map(s=>s[0]+' '+s[2]).join(' ')), typeof WHO!=='undefined'?WHO.map(x=>x.t+' '+(x.ex||'')):[],
      typeof TERM_GROUPS!=='undefined'?TERM_GROUPS.map(g=>g.items.map(i=>Object.values(i).join(' ')).join(' ')):[], (ESSAYS||[]).map(e=>[e.q,...(e.k||[]),...(e.gl||[])].join(' '))).join(' ').toLowerCase();
    for(const [n,Ls] of Object.entries(LESSONS)) for(const L of Ls){ const terms=[...new Set((L.html.match(/<b>([^<]{3,40})<\/b>/g)||[]).map(x=>strip(x).trim().replace(/[:.]$/,'')).filter(t=>!/^(Ergänzung|Lektüre|Empfehlung|Kernsatz|Kritik|Befund|Leitfragen)/.test(t)))];
      const miss=terms.filter(t=>!practice.includes(t.toLowerCase())); if(miss.length) out.ungeuebt[L.id]=miss; }
    return out; });
  const nu=Object.values(r.ungeuebt).reduce((a,x)=>a+x.length,0);
  console.log(`Fragen: ${r.fragen} | richtige Antwort deutlich die längste: ${r.laenge.length} | ohne Begründung je falscher Option: ${r.ohneW.length} | Kreuz nur wahr/falsch: ${r.kreuz.length} | doppelte IDs: ${r.dup.length}`);
  console.log('Längste richtig:',r.laenge.join(', '));
  console.log(`Fett gedruckt, aber in keiner Übung (${nu}):`); for(const [k,v] of Object.entries(r.ungeuebt)) console.log('  ',k,':',v.join(' · '));
  if(errs.length) console.log('Fehler:',errs); await b.close(); })();
