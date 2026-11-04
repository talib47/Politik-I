import datetime as dt
D=dt.date; EXAM=D(2027,2,4); START=D(2026,11,5)
INTERVAL=[1,3,7,16,35]
def reviews(intro):
    """Wiederholungen einer Karte ab Einführung bis zum Termin nach dem App-Plan (Deckel: ein Drittel der Resttage), ohne Fehler"""
    day=intro; n=1  # Erstkontakt
    k=0
    while True:
        left=(EXAM-day).days
        d=INTERVAL[min(k,4)]; d=min(d,max(1,left//3)) if left>2 else d
        day=day+dt.timedelta(days=d)
        if day>=EXAM: break
        n+=1; k+=1
    return n
wd=[START+dt.timedelta(days=i) for i in range((EXAM-START).days)]
weekdays=[d for d in wd if d.weekday()<5]
print("Abende Mo–Fr bis zum 03.02.:",len(weekdays))
sess_vl=[D(2026,11,5),D(2026,11,12),D(2026,11,19),D(2026,11,26),D(2026,12,3),D(2026,12,10),D(2026,12,17),D(2027,1,7),D(2027,1,14)]
sess_se=[D(2026,11,12),D(2026,11,19),D(2026,11,26),D(2026,12,3),D(2026,12,10),D(2026,12,17),D(2027,1,14),D(2027,1,21)]
for nm,sess,first in [("VL",sess_vl,(14,50,39,21)),("SE",sess_se,(12,39,36,18))]:
  for lab,(nl,nc,nq,nt) in [("klein",(6,20,18,8)),("mittel",(8,30,24,12))]:
    r0=reviews(START); items=[(START,)+first]+[(d+dt.timedelta(days=3),nl,nc,nq,nt) for d in sess]
    L=sum(x[1] for x in items); C=sum(x[2] for x in items); Q=sum(x[3] for x in items); T=sum(x[4] for x in items)
    rc=sum(x[2]*reviews(x[0]) for x in items); rq=sum(x[3]*reviews(x[0]) for x in items); rt=sum(2*x[4]*reviews(x[0]) for x in items); rt1=sum(x[4]*reviews(x[0]) for x in items)
    fail=1.3  # etwa 30 % zusätzliche Abrufe durch „nicht sicher“ (gleiche Runde, nächster Tag)
    m_l=L*5; m_c=rc*fail*0.4; m_q=rq*fail*0.5; m_t=rt*fail*0.4; m_t1=rt1*fail*0.4
    m_e=4*75 + 10*10   # 4 Probe-Essays à 60 Min + 15 Min Auswertung, 10 Gliederungen à 10 Min
    tot=m_l+m_c+m_q+m_t+m_e
    print(f"{nm} {lab}: {L} Lektionen, {C} Karten, {Q} Fragen, {T} Begriffe | Wiederholungen je Karte: früh {r0}, späteste {reviews(items[-1][0])}")
    print(f"   Minuten: Lektionen {m_l:.0f}, Karten {m_c:.0f}, Fragen {m_q:.0f}, Begriffe beide Richtungen {m_t:.0f} (eine Richtung {m_t1:.0f}), Prüfungsformat {m_e} → gesamt {tot:.0f} Min = {tot/len(weekdays):.0f} Min je Abend (Mo–Fr)")
