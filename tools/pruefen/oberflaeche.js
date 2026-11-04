const {chromium}=require('playwright'); const fs=require('fs');
const APP=process.argv[2]||'Politik-I', OUT=process.argv[3]||'.', SHOTS=process.argv[4]!=='noshots';
const URL=`http://localhost:8766/${APP}/index.html`;
const VIEWS=[
 ['start-leer', ()=>{ go('home'); }],
 ['start-viel', ()=>{ const D=864e5,d=dayStart(); (LESSONS[1]||[]).slice(0,8).forEach((l,i)=>state.lessons[l.id]={ok:true,t:d-(9+i)*D}); (CARDS[1]||[]).forEach((k,i)=>{state.box[k.id]=1+(i%5); state.due[k.id]=d-(i%6)*D;}); state.unclear={'v1-2':1}; go('home'); }],
 ['ueben', ()=>{ go('practice'); }],
 ['statistik', ()=>{ go('stats'); }],
 ['sitzung', ()=>{ cur.ch=1; go('chapter'); }],
 ['lektion', ()=>{ openLesson(1,0); }],
 ['lektion-antwort', ()=>{ openLesson(1,1); }, async p=>{ const b=await p.$('[data-show]'); if(b){ await b.click(); await p.waitForTimeout(80);} const o=await p.$('.mc button[data-k="0"]'); if(o){ await o.click(); await p.waitForTimeout(80);} }],
 ['karte-vorn', ()=>{ openCards(1); }],
 ['karte-hinten', ()=>{ openCards(1); }, async p=>{ await p.keyboard.press('Space'); await p.waitForTimeout(120); }],
 ['frage', ()=>{ openRecall(allQuestions().slice(0,3)); }, async p=>{ const b=await p.$('[data-show]'); if(b){await b.click(); await p.waitForTimeout(80);} }],
 ['zuordnen', ()=>{ openWho(6); }],
 ['selbsttest', ()=>{ openKreuz(0); }],
 ['probe-essay-vl', ()=>{ state.course='vl'; go('exam'); }],
 ['probe-essay-se', ()=>{ state.course='se'; go('exam'); }],
 ['essay', ()=>{ state.course='vl'; openEssay(0); }],
 ['gliederung', ()=>{ state.course='vl'; openOutline(0); }],
 ['aufschreiben', ()=>{ state.course='vl'; state.lessons['v1-1']={ok:true,t:Date.now()}; openDump(1); }],
 ['begriffe', ()=>{ state.course='vl'; openCards('b'); }],
];
const CFG=[
 {n:'iphone-hell', vp:{width:390,height:844}, cs:'light'},
 {n:'iphone-dunkel', vp:{width:390,height:844}, cs:'dark'},
 {n:'ipad-hoch', vp:{width:820,height:1180}, cs:'light'},
 {n:'ipad-quer', vp:{width:1180,height:820}, cs:'dark'},
 {n:'schrift-80', vp:{width:390,height:844}, cs:'light', z:0.8},
 {n:'schrift-180', vp:{width:390,height:844}, cs:'light', z:1.8},
];
const MEASURE=()=>{
  const lum=c=>{ const a=c.map(v=>{v/=255; return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}); return .2126*a[0]+.7152*a[1]+.0722*a[2]; };
  const parse=s=>{ const m=s.match(/rgba?\(([^)]+)\)/); if(!m) return null; const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0],p[1],p[2],p.length>3?p[3]:1]; };
  const mix=(f,b)=>[0,1,2].map(i=>f[i]*f[3]+b[i]*(1-f[3])).concat(1);
  const rootBg=parse(getComputedStyle(document.body).backgroundColor)||[255,255,255,1];
  const cssv=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const hex=h=>{ h=h.replace('#',''); if(h.length===3) h=h.split('').map(x=>x+x).join(''); return [0,2,4].map(i=>parseInt(h.substr(i,2),16)).concat(1); };
  function bgOf(el){ const layers=[]; let e=el, grad=null;
    while(e&&e.nodeType===1){ const cs=getComputedStyle(e); const c=parse(cs.backgroundColor); if(cs.backgroundImage&&cs.backgroundImage.includes('gradient')&&!grad){ grad=e; }
      if(c&&c[3]>0){ layers.push(c); if(c[3]>=1) break; } e=e.parentElement; }
    let b=rootBg; for(let i=layers.length-1;i>=0;i--) b=mix(layers[i],b);
    if(grad&&grad.classList.contains('today')){ return [hex(cssv('--plate-top')),hex(cssv('--plate-bot'))]; }
    return [b]; }
  const vis=e=>{ const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&parseFloat(cs.opacity)>0.05; };
  const low=[]; const seen=new Set();
  document.querySelectorAll('#app *, nav *, #focusbar *, #sessbar *, .zoom *').forEach(e=>{
    if(!vis(e)) return; const own=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1); if(!own) return;
    const cs=getComputedStyle(e); let f=parse(cs.color); if(!f) return; let op=1, x=e; while(x&&x.nodeType===1){ op*=parseFloat(getComputedStyle(x).opacity); x=x.parentElement; } f=[f[0],f[1],f[2],f[3]*op];
    const fs=parseFloat(cs.fontSize), bold=parseInt(cs.fontWeight)>=700, large=fs>=24||(bold&&fs>=18.66);
    const need=large?3:4.5; let worst=99;
    for(const b of bgOf(e)){ const fc=mix(f,b); const L1=lum(fc), L2=lum(b); const r=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05); worst=Math.min(worst,r); }
    if(worst<need){ const t=e.textContent.trim().slice(0,40); const k=e.tagName+'.'+e.className+':'+t; if(!seen.has(k)){ seen.add(k); low.push(`${worst.toFixed(2)}<${need} ${e.tagName.toLowerCase()}${e.className?'.'+String(e.className).split(' ').join('.'):''} „${t}“`); } }
  });
  const small=[], tiny=[], noname=[];
  document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea, summary, [role=button]').forEach(e=>{
    if(!vis(e)) return; const r=e.getBoundingClientRect();
    const inline= e.tagName==='A' && getComputedStyle(e).display==='inline';
    const name=(e.getAttribute('aria-label')||e.getAttribute('title')||e.textContent||e.value||e.placeholder||'').trim();
    const lab=e.id&&document.querySelector(`label[for="${e.id}"]`);
    if(!name&&!lab&&e.tagName!=='TEXTAREA') noname.push(e.tagName.toLowerCase()+'#'+e.id+'.'+e.className);
    if(inline) return;
    const d=`${e.tagName.toLowerCase()}${e.id?'#'+e.id:''}${e.className?'.'+String(e.className).split(' ')[0]:''} „${name.slice(0,18)}“ ${Math.round(r.width)}×${Math.round(r.height)}`;
    if(r.width<24||r.height<24) tiny.push(d); else if(r.width<44||r.height<44) small.push(d);
  });
  const clipped=[]; document.querySelectorAll('#app *').forEach(e=>{ if(!vis(e)) return; const cs=getComputedStyle(e);
    if((cs.overflowX==='hidden'||cs.overflowX==='clip'||cs.textOverflow==='ellipsis') && e.scrollWidth>e.clientWidth+1 && e.clientWidth>0) clipped.push(e.tagName.toLowerCase()+'.'+e.className+' „'+e.textContent.trim().slice(0,30)+'“'); });
  const wide=[]; document.querySelectorAll('#app *').forEach(e=>{ const r=e.getBoundingClientRect(); if(r.right>innerWidth+1&&vis(e)&&getComputedStyle(e).position!=='fixed'){ let p=e.parentElement, inScroll=false; while(p){ const o=getComputedStyle(p).overflowX; if(o==='auto'||o==='scroll'){inScroll=true;break;} p=p.parentElement; } if(!inScroll) wide.push(e.tagName.toLowerCase()+'.'+e.className); } });
  return {ox:document.documentElement.scrollWidth-innerWidth, low, small, tiny, noname, clipped:clipped.slice(0,5), wide:[...new Set(wide)].slice(0,5)};
};
(async()=>{
  const b=await chromium.launch(); const report={};
  for(const c of CFG){
    for(const [vn,setup,after] of VIEWS){
      const ctx=await b.newContext({viewport:c.vp, colorScheme:c.cs, deviceScaleFactor:1});
      const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
      await p.goto(URL); await p.waitForTimeout(350);
      if(c.z) await p.evaluate(z=>document.documentElement.style.setProperty('--z',z),c.z);
      try{ await p.evaluate(setup); }catch(e){ errs.push('setup '+e.message); }
      await p.waitForTimeout(250); if(after) await after(p); await p.waitForTimeout(350);
      const m=await p.evaluate(MEASURE); m.errs=errs; report[c.n+'/'+vn]=m;
      if(SHOTS && (c.n.startsWith('iphone')||vn==='start-viel'||vn==='karte-vorn'||vn==='lektion')) await p.screenshot({path:`${OUT}/${c.n}_${vn}.png`, fullPage:true});
      await ctx.close();
    }
  }
  fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(report,null,1));
  // Zusammenfassung
  const agg={low:{},small:{},tiny:{},noname:{},ox:[],clipped:[],wide:[],errs:[]};
  for(const [k,m] of Object.entries(report)){
    if(m.ox>0) agg.ox.push(k+' +'+m.ox+'px'); if(m.clipped.length) agg.clipped.push(k+': '+m.clipped.join(' | ')); if(m.wide.length) agg.wide.push(k+': '+m.wide.join(' | ')); if(m.errs.length) agg.errs.push(k+': '+m.errs.join(' | '));
    for(const t of ['low','small','tiny','noname']) for(const x of m[t]){ const key=x.replace(/ \d+×\d+$/,'').replace(/^[\d.]+</,'<'); (agg[t][key]=agg[t][key]||[]).push(k+(t==='low'?' '+x.split('<')[0]:(x.match(/\d+×\d+$/)||[''])[0])); }
  }
  console.log('Ansichten×Konfigurationen:',Object.keys(report).length);
  console.log('Konsolenfehler:',agg.errs.length?agg.errs:'keine');
  console.log('Horizontaler Überlauf:',agg.ox.length?agg.ox:'keiner'); console.log('Über den Rand:',agg.wide.length?agg.wide:'nichts');
  console.log('Abgeschnitten:',agg.clipped.length?agg.clipped:'nichts');
  for(const t of ['low','tiny','small','noname']){ const e=Object.entries(agg[t]); console.log(`\n${t} (${e.length} Arten):`); e.slice(0,40).forEach(([k,v])=>console.log('  ',k,' →',v.length+'×',[...new Set(v.map(x=>x.split('/')[1].split(' ')[0]))].slice(0,4).join(','), v[0].split(' ').slice(1).join(' '))); }
  await b.close();
})();
