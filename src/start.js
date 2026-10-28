/* Start: erst sofort zeigen, dann mit den anderen Geräten abgleichen */
/* Zoom gilt pro Gerät (nicht synchronisiert) */
(function(){ let z=parseFloat(lsGet("p1-zoom"))||1;
  const apply=()=>{ document.documentElement.style.setProperty("--z",z); lsSet("p1-zoom",String(z)); };
  apply();
  document.getElementById("zIn").onclick=()=>{ z=Math.min(1.8,Math.round((z+.1)*10)/10); apply(); };
  document.getElementById("zOut").onclick=()=>{ z=Math.max(.8,Math.round((z-.1)*10)/10); apply(); };
})();
initToken();
render();
syncFromRemote().then(changed=>{ if(changed&&!["essay","lesson","cards","kreuz","exam","recall","who","outline"].includes(view)) render(); });

/* Offline-Modus: App-Dateien im Gerät zwischenspeichern (sw.js). Der Lernstand liegt sowieso im Gerät. */
if("serviceWorker" in navigator){ window.addEventListener("load", ()=>navigator.serviceWorker.register("sw.js").catch(()=>{})); }
