# Baut index.html aus den Modulen in src/ zusammen:  python3 build.py
import os
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),'src')
r=lambda f: open(os.path.join(d,f),encoding='utf-8').read()
order=['core.js','content.js','cardinfo.js','format.js','views.js','recall.js','who.js','terms.js','session.js','plan.js','kreuz.js','essay.js','content_v1.js','content_v1_lit.js','content_v1_train.js','start.js']
out=r('head.html')+''.join(r(f).rstrip()+'\n\n' for f in order)+'</script>\n'+r('update.html').rstrip()+'\n</body>\n</html>\n'
# Version = Prüfsumme des Inhalts; die App vergleicht sie mit version.txt und lädt sich bei Änderungen neu (update.html)
import hashlib
ver=hashlib.sha1(out.encode('utf-8')).hexdigest()[:12]
out=out.replace('__APPVER__',ver)
root=os.path.dirname(d)
open(os.path.join(root,'index.html'),'w',encoding='utf-8').write(out)
open(os.path.join(root,'version.txt'),'w',encoding='utf-8').write(ver+'\n')
print(len(out))
