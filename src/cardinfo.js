/* ================= Kleine Erklärhilfen zu Karten =================
   CARD_CTX: Kontextzeile auf der Vorderseite. CARD_INFO: dezente i-Infos auf der Rückseite, „Begriff: Erklärung“ je Zeile. */
const CARD_CTX={
 "v1-c01":"Die Definition, mit der Schwanholz einsteigt",
 "v1-c02":"Wo und wie Politik stattfindet",
 "v1-c03":"Dreifachgliederung des Politischen",
 "v1-c04":"Was Wissenschaft leisten kann",
 "v1-c05":"Definition des Fachs",
 "v1-c06":"Woran man gute Forschung erkennt",
 "v1-c07":"Gliederung des Fachs",
 "v1-c08":"Systemtheorie",
 "v1-c09":"Wie weit man den Systembegriff fasst",
 "v1-c10":"Input-Output-Modell",
 "v1-c11":"Woher ein System seine Anerkennung bezieht",
 "v1-c12":"Kreislaufdiagramm (1988)",
 "v1-c13":"Kreislaufdiagramm (1988)",
 "v1-c14":"Das wichtigste Unterscheidungsmerkmal",
 "v1-c15":"Entweder-oder-Einteilung",
 "v1-c16":"Untertypen auf beiden Seiten",
 "v1-c17":"Lauth 2006",
 "v1-c18":"Von links nach rechts",
 "v1-c19":"Noch Demokratie, aber mit Mängeln",
 "v1-c20":"Die Definition für die Einleitung eines Essays",
 "v1-c21":"Zwei Demokratievorstellungen",
 "v1-c22":"Polyarchie",
 "v1-c23":"Sechs Fragen an jede Herrschaft",
 "v1-c24":"Interne Einbettung",
 "v1-c25":"Externe Einbettung",
 "v1-c26":"Ziel und Zweck des Konzepts"
};
const CARD_INFO={
 "v1-c01":"Allgemein verbindlich: gilt für alle, auch für die, die dagegen waren.",
 "v1-c03":"Eselsbrücke: Polity = Rahmen, Politics = Streit, Policy = Programm (wie eine Versicherungspolice).",
 "v1-c06":"Reliabilität: Misst die Methode bei Wiederholung dasselbe?\nValidität: Misst sie das, was sie messen soll?",
 "v1-c08":"Talcott Parsons: US-Soziologe, Begründer der strukturfunktionalistischen Systemtheorie.",
 "v1-c09":"ZPES: Zentrales Politisches Entscheidungssystem.",
 "v1-c10":"David Easton: kanadisch-US-amerikanischer Politikwissenschaftler, Systemmodell ab den 1950er-Jahren.",
 "v1-c12":"Steuern: hier im Sinn von Abgaben erheben (englisch extraction), nicht lenken.",
 "v1-c15":"Dichotom: zweigeteilt, nur zwei Kategorien.",
 "v1-c16":"Juan Linz: spanisch-US-amerikanischer Politikwissenschaftler.\nWolfgang Merkel: deutscher Politikwissenschaftler (WZB Berlin).",
 "v1-c19":"Illiberal: Rechtsstaat und Freiheitsrechte beschädigt.\nDelegativ: Regierung umgeht Parlament und Justiz.\nExklusiv: Gruppen vom Wahlrecht ausgeschlossen.\nMerkel nennt als vierten Typ die Enklavendemokratie.",
 "v1-c22":"Robert Dahl nannte Systeme, die diese Garantien erfüllen, Polyarchien.",
 "v1-c24":"Horizontale Verantwortlichkeit: Die Gewalten kontrollieren sich gegenseitig.",
};
function cardInfoHTML(id){
  const t=CARD_INFO[id]; if(!t) return "";
  const lines=t.split("\n").map(l=>{ const m=l.match(/^([^:]{1,32}): (.*)$/); return m?`<span class="cl"><b>${m[1]}</b> ${m[2]}</span>`:`<span class="cl">${l}</span>`; }).join("");
  return `<div class="cinfo"><span class="ci">i</span><div>${lines}</div></div>`;
}
