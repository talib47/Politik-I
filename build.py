# Baut index.html aus den Modulen in src/ zusammen:  python3 build.py
import os
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),'src')
r=lambda f: open(os.path.join(d,f),encoding='utf-8').read()
order=['core.js','content.js','cardinfo.js','format.js','views.js','recall.js','who.js','terms.js','session.js','plan.js','appcfg.js','status.js','kreuz.js','essay.js','dump.js','content_v1.js','content_v1_lit.js','content_v1_train.js','content_s1.js','content_s1_train.js','start.js']
out=r('head.html').replace('/*__DESIGN__*/',r('design.css').strip())+''.join(r(f).rstrip()+'\n\n' for f in order)+'</script>\n'+r('update.html').rstrip()+'\n</body>\n</html>\n'
# Version = Prüfsumme des Inhalts; die App vergleicht sie mit version.txt und lädt sich bei Änderungen neu (update.html)
import hashlib
# Claude-Brücke: letzte Logbuch-Einträge dieser App aus CLAUDE.md in die App übernehmen
import json, re
APP='Politik I'
log=[]
try:
  md=open(os.path.join(os.path.dirname(d),'CLAUDE.md'),encoding='utf-8').read()
  sec=md.split('### Logbuch',1)[1].split('<!--',1)[0]
  for l in sec.splitlines():
    m=re.match(r'^- (\d{4}-\d\d-\d\d) · (.+?) · (.+?) · (.+?) · (.+)$',l.strip())
    if m and (APP in m.group(2) or m.group(2)=='alle'): log.append({'d':m.group(1),'a':m.group(2),'w':m.group(4),'y':m.group(5)})
except Exception as e: print('Brücke:',e)
out=out.replace('__BRUECKE__',json.dumps(log[:6],ensure_ascii=False))
ver=hashlib.sha1(out.encode('utf-8')).hexdigest()[:12]
out=out.replace('__APPVER__',ver)
root=os.path.dirname(d)
open(os.path.join(root,'index.html'),'w',encoding='utf-8').write(out)
open(os.path.join(root,'version.txt'),'w',encoding='utf-8').write(ver+'\n')
print(len(out))
