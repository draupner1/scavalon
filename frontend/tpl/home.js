module.exports = {"v":3,"t":[{"t":7,"e":"header","f":[{"t":7,"e":"navigation"}]}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"rankingtab"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"h4","f":[{"t":7,"e":"div","a":{"style":"float:left;"},"f":["Ranking"]}]}," ",{"t":7,"e":"center","f":[{"t":7,"e":"div","a":{"class":"input-field col s4"},"f":[{"t":7,"e":"select","a":{"id":"viewSelect"},"f":[{"t":7,"e":"option","a":{"value":0,"disabled":0,"selected":0}}," ",{"t":4,"f":[{"t":7,"e":"option","a":{"value":[{"t":2,"rx":{"r":"races","m":[{"t":30,"n":"index"},"_id"]}}]},"f":[{"t":2,"rx":{"r":"races","m":[{"t":30,"n":"index"},"title"]}}]}],"n":52,"i":"index","r":"races"}]}," ",{"t":7,"e":"label","f":["Välj Race för rankingen"]}]}]}," ",{"t":7,"e":"div","a":{"style":"float:right;"},"f":["Active Race: ",{"t":2,"r":"activeRaceTitle"}]}," ",{"t":7,"e":"div","a":{"style":"clear: left;"}}]}," ",{"t":7,"e":"table","a":{"class":"striped"},"f":[{"t":7,"e":"thead","f":[{"t":7,"e":"tr","f":[{"t":7,"e":"th","a":{"data-field":"frank"},"f":["Rank"]}," ",{"t":7,"e":"th","a":{"data-field":"lane"},"f":["Bana"]}," ",{"t":7,"e":"th","a":{"data-field":"laptime"},"f":["Varv Tid"]}," ",{"t":7,"e":"th","a":{"data-field":"userName"},"f":["Namn"]}," ",{"t":7,"e":"th","a":{"data-field":"car"},"f":["Bil"]}," ",{"t":7,"e":"th","a":{"data-field":"swv"},"f":["SW"]}," ",{"t":7,"e":"th","a":{"data-field":"time"},"f":["Tid"]}]}]}," ",{"t":7,"e":"tbody","f":[{"t":4,"f":[{"t":7,"e":"tr","f":[{"t":7,"e":"td","f":[{"t":2,"x":{"r":["frank","index"],"s":"_0+_1"}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"lane"]}}]}," ",{"t":7,"e":"td","f":[{"t":4,"f":[{"t":7,"e":"ul","a":{"class":"collapsible","data-collapsible":"accordion"},"f":[{"t":7,"e":"li","f":[{"t":7,"e":"div","a":{"class":"collapsible-header"},"f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"laptime"]}}]}," ",{"t":7,"e":"div","a":{"class":"collapsible-body"},"f":[{"t":4,"f":[{"t":7,"e":"div","f":[{"t":2,"r":"."}]}],"n":52,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"itime"]}}]}]}]}],"n":54,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"itime"]}},{"t":4,"n":50,"f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"laptime"]}}],"x":{"r":["index","posts"],"s":"!(_1[_0].itime)"}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"userName"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"car"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"swv"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"posts","m":[{"t":30,"n":"index"},"time"]}}]}]}],"n":52,"i":"index","r":"posts"}]}]}," ",{"t":4,"f":[{"t":7,"e":"ul","a":{"class":"pagination"},"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":"disabled"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","a":[1]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_left"]}]}]}],"n":50,"x":{"r":["pno"],"s":"_0===1"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"waves-effect"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["pno"],"s":"_0-1"}}]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_left"]}]}]}],"x":{"r":["pno"],"s":"_0===1"}}," ",{"t":4,"f":[{"t":4,"f":[{"t":7,"e":"li","a":{"class":"active"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["index"],"s":"_0+1"}}]}},"f":[{"t":2,"rx":{"r":"pagelist","m":[{"t":30,"n":"index"}]}}]}]}],"n":50,"x":{"r":["pno","index"],"s":"_0===_1+1"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"waves-effect"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["index"],"s":"_0+1"}}]}},"f":[{"t":2,"rx":{"r":"pagelist","m":[{"t":30,"n":"index"}]}}]}]}],"x":{"r":["pno","index"],"s":"_0===_1+1"}}],"n":52,"i":"index","r":"pagelist"}," ",{"t":4,"f":[{"t":7,"e":"li","a":{"class":"disabled"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"r":"maxpages"}]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_right"]}]}]}],"n":50,"x":{"r":["pno","maxpages"],"s":"_0===_1"}},{"t":4,"n":51,"f":[{"t":7,"e":"li","a":{"class":"waves-effect"},"f":[{"t":7,"e":"a","v":{"click":{"n":"getNext","d":[{"t":2,"x":{"r":["pno"],"s":"_0+1"}}]}},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["chevron_right"]}]}]}],"x":{"r":["pno","maxpages"],"s":"_0===_1"}}]}],"n":50,"x":{"r":["paginateit"],"s":"_0===1"}}]}," ",{"t":7,"e":"div","a":{"class":"divider"}}," ",{"t":7,"e":"h4","f":["Senaste Varvtider"]}," ",{"t":7,"e":"table","a":{"class":"striped"},"f":[{"t":7,"e":"thead","f":[{"t":7,"e":"tr","f":[{"t":7,"e":"th","a":{"data-field":"lane"},"f":["Bana"]}," ",{"t":7,"e":"th","a":{"data-field":"laptime"},"f":["Varv Tid"]}," ",{"t":7,"e":"th","a":{"data-field":"userName"},"f":["Namn"]}," ",{"t":7,"e":"th","a":{"data-field":"car"},"f":["Bil"]}," ",{"t":7,"e":"th","a":{"data-field":"swv"},"f":["SW"]}," ",{"t":7,"e":"th","a":{"data-field":"time"},"f":["Tid"]}]}]}," ",{"t":7,"e":"tbody","f":[{"t":4,"f":[{"t":7,"e":"tr","f":[{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"lane"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"laptime"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"userName"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"car"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"swv"]}}]}," ",{"t":7,"e":"td","f":[{"t":2,"rx":{"r":"latest","m":[{"t":30,"n":"index"},"time"]}}]}]}],"n":52,"i":"index","r":"latest"}]}]}," ",{"t":7,"e":"br"}," ",{"t":7,"e":"a","a":{"class":"btn-floating btn-large waves-effect waves-light red modal-trigger","href":"#modalStartLap"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["add"]}]}," ",{"t":7,"e":"div","a":{"id":"modalStartLap","class":"modal"},"f":[{"t":7,"e":"div","a":{"class":"modal-content"},"f":[{"t":7,"e":"h4","f":["Starta Bilarna"]}," ",{"t":7,"e":"form","a":{"enctype":"multipart/form-data","method":"post"},"f":[{"t":4,"f":[{"t":7,"e":"div","a":{"class":"error"},"f":[{"t":2,"r":"error"}]}],"n":50,"x":{"r":["error"],"s":"_0&&_0!=\"\""}}," ",{"t":4,"f":[{"t":7,"e":"div","a":{"class":"success"},"f":[{"t":3,"r":"success"}]}],"n":50,"x":{"r":["success"],"s":"_0&&_0!=\"\""}},{"t":4,"n":51,"f":[{"t":7,"e":"div","a":{"class":"s10"},"f":[{"t":7,"e":"p","a":{"class":"light"},"f":["När en koppling mot banan finns uppe kommer det här finnas en möjlighet att starta ett heat"]}," ",{"t":7,"e":"div","a":{"class":"row"}}," ",{"t":7,"e":"div","a":{"class":"modal-footer"},"f":[{"t":7,"e":"a","a":{"class":" modal-action modal-close waves-effect waves-light blue lighten-1 btn disabled","style":"float: left;"},"v":{"click":"starta"},"f":["Starta"]}," ",{"t":7,"e":"a","a":{"class":" modal-action modal-close waves-effect waves-light blue lighten-1 btn","style":"float: right;"},"f":["Avbryt"]}]}]}],"x":{"r":["success"],"s":"_0&&_0!=\"\""}}]}]}]}]}],"n":50,"x":{"r":["posting"],"s":"_0===true"}},{"t":4,"n":51,"f":[{"t":7,"e":"div","a":{"id":"index-banner","class":"parallax-container"},"f":[{"t":7,"e":"div","a":{"class":"section no-pad-bot"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"br"},{"t":7,"e":"br"}," ",{"t":7,"e":"h1","a":{"class":"header center blue-text text-lighten-2"},"f":["SlotCarduino by Avalon"]}," ",{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"h5","a":{"class":"header col s12 light blue-text"},"f":[{"t":7,"e":"strong","f":["Programera din egen banbil."]}]}]}," ",{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"a","a":{"href":"/register","class":"btn-large waves-effect waves-light blue lighten-1"},"f":["Register"]}]}," ",{"t":7,"e":"br"},{"t":7,"e":"br"}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax"},"f":[{"t":7,"e":"img","a":{"src":"static/uploads/background1.jpg","alt":"Unsplashed background img 1"}}]}]}," ",{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"section"},"f":[" ",{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"div","a":{"class":"col s12 m4"},"f":[{"t":7,"e":"div","a":{"class":"icon-block"},"f":[{"t":7,"e":"h2","a":{"class":"center blue-text darken-3"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["flash_on"]}]}," ",{"t":7,"e":"h5","a":{"class":"center"},"f":["Hur snabbt kan du köra?"]}," ",{"t":7,"e":"p","a":{"class":"light"},"f":["Gör din egen mjukvara till en av våra bilar. Hur snabbt vågar du låta dom köra? Hur kommer du runt alla kurvor? Hur når du kortaste varvtiden?"]}]}]}," ",{"t":7,"e":"div","a":{"class":"col s12 m4"},"f":[{"t":7,"e":"div","a":{"class":"icon-block"},"f":[{"t":7,"e":"h2","a":{"class":"center blue-text darken-3"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["group"]}]}," ",{"t":7,"e":"h5","a":{"class":"center"},"f":["Tävla mot alla andra i en rankingserie."]}," ",{"t":7,"e":"p","a":{"class":"light"},"f":["Alla vartider under helgen kommer att sparas. Rankingen uppdateras efter varje tävling. Vem kommer att ligga i topp?"]}]}]}," ",{"t":7,"e":"div","a":{"class":"col s12 m4"},"f":[{"t":7,"e":"div","a":{"class":"icon-block"},"f":[{"t":7,"e":"h2","a":{"class":"center blue-text darken-3"},"f":[{"t":7,"e":"i","a":{"class":"material-icons"},"f":["settings"]}]}," ",{"t":7,"e":"h5","a":{"class":"center"},"f":["Enkel att programmera"]}," ",{"t":7,"e":"p","a":{"class":"light"},"f":["Hämta ut ditt USB med ditt ID och våra libraries till en Arduinio-miljö. Sen är det bara att hacka ihop den bästa mjukvaran som går att ladda ner i våra bilar."]}]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax-container valign-wrapper"},"f":[{"t":7,"e":"div","a":{"class":"section no-pad-bot"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"h5","a":{"class":"header col s12 light blue-text"},"f":[{"t":7,"e":"strong","f":["Du styr den snabbaste bilen med din mjukvara!"]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax"},"f":[{"t":7,"e":"img","a":{"src":"static/uploads/background2.jpg","alt":"Unsplashed background img 2"}}]}]}," ",{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"section"},"f":[{"t":7,"e":"div","a":{"class":"row"},"f":[{"t":7,"e":"div","a":{"class":"col s12 center"},"f":[{"t":7,"e":"h3","f":[{"t":7,"e":"i","a":{"class":"mdi-content-send blue-text darken-3"}}]}," ",{"t":7,"e":"h4","f":["Mer detaljerad beskrivning"]}," ",{"t":7,"e":"p","a":{"class":"left-align light"},"f":["Tänk dig en bilbana där gasen alltid står på max. Du reglerar bilens hastighet genom att skriva Arduino-kod till våra bilar. Styr motorns effekt baserat på vad dom sensorer som finns i bilen säger. Vem får den snabbaste varvtiden?"]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax-container valign-wrapper"},"f":[{"t":7,"e":"div","a":{"class":"section no-pad-bot"},"f":[{"t":7,"e":"div","a":{"class":"container"},"f":[{"t":7,"e":"div","a":{"class":"row center"},"f":[{"t":7,"e":"h5","a":{"class":"header col s12 light blue-text"},"f":[{"t":7,"e":"strong","f":["Arduino baserade banbilar!"]}]}]}]}]}," ",{"t":7,"e":"div","a":{"class":"parallax"},"f":[{"t":7,"e":"img","a":{"src":"static/uploads/background3.jpg","alt":"Unsplashed background img 3"}}]}]}],"x":{"r":["posting"],"s":"_0===true"}},{"t":7,"e":"appfooter"}]}