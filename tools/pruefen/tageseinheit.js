const {chromium}=require('playwright');
const URL=process.argv[2]||'http://localhost:8766/Politik-I/index.html';
async function scen(b,name,now,setup){
  const ctx=await b.newContext({viewport:{width:390,height:844}});
  await ctx.clock.install({time:new Date(now)});
  const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL); await p.waitForTimeout(400);
  const out=await p.evaluate(setup);
  console.log(`\n## ${name} (${now.slice(0,10)})`); console.log(out); if(errs.length) console.log('ERR',errs);
  await ctx.close();
}
const setup=(cfg)=>`(()=>{ const D=864e5, day=dayStart();
  const res=[];
  for(const c of ["vl","se"]){
    state.course=c;
    const chs=courseChs().filter(x=>LESSONS[x.n]);
    const cfg=${JSON.stringify(cfg)};
    chs.forEach(ch=>{ const L=LESSONS[ch.n]; L.slice(0,Math.round(L.length*cfg.read)).forEach((l,i)=>{ state.lessons[l.id]={ok:true,t:day-(cfg.age+i)*D}; });
      const K=(CARDS[ch.n]||[]); K.slice(0,Math.round(K.length*cfg.seen)).forEach((k,i)=>{ state.box[k.id]=1+(i%5); state.due[k.id]=day+((i%9)-cfg.overdue)*D; });
    });
    if(cfg.terms){ allCards("b").slice(0,cfg.terms).forEach((k,i)=>{ state.box[k.id]=2; state.due[k.id]=day+((i%5)-cfg.overdue)*D; }); }
    const S=planToday(); const min=S.reduce((a,s)=>a+s.min,0);
    res.push(c.toUpperCase()+": "+S.map(s=>s.t+" ["+s.d+", "+s.min+" Min]").join(" → ")+"  | Summe "+min+" Min | fällige Karten "+dueCards(0).length+", fällige Fragen "+qDue().length);
  }
  return res.join("\\n");
})()`;
(async()=>{
  const b=await chromium.launch();
  await scen(b,"Neu (nichts gelernt)","2026-11-04T19:00:00",setup({read:0,seen:0,age:0,overdue:0,terms:0}));
  await scen(b,"Mittendrin (Hälfte gelesen, Hälfte der Karten gesehen)","2026-11-20T19:00:00",setup({read:0.5,seen:0.5,age:3,overdue:0,terms:10}));
  await scen(b,"Nach einer Woche Pause","2026-11-27T19:00:00",setup({read:0.5,seen:0.5,age:10,overdue:7,terms:10}));
  await scen(b,"Kurz vor der Prüfung (alles gelesen, alles gesehen)","2027-01-31T19:00:00",setup({read:1,seen:1,age:30,overdue:0,terms:39}));
  await b.close();
})();
