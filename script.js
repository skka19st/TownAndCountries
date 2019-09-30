// Javascript-dokument 

// börja med att läsa land-filen för att komma igång
//SparaStadfil(1);
LandfilIn();

// Tillbaka till land-sidan via onClick
function InitLand(){
    LandfilIn();
}

// kod för land skickas via onClick
function InitStad(landid){
    console.log("ska läsa in städer");
    StadfilIn(landid, "Land");
}

// kod för stad skickas via onClick
function InitDetaljSida(stadid){
    console.log("ska läsa in städer");
    StadfilIn(stadid, "Stad");
}

// stad markeras som besökt
function MarkeraStad(stadid){
    localStorage.setItem("visit", stadid);
    console.log("sparas i localstogare: ");
    localStorage.getItem("visit");
    console.log(localStorage);
}

// visa besökta städer
function InitVisit(){
    localStorage.setItem("visit", stadid);
    console.log("sparas i localstogare: ");
    localStorage.getItem("visit");
    console.log(localStorage);
    StadfilIn(0,"visit");
}

// rensa historik och läs in landfil
function RensaHist() {
    localStorage.removeItem("visit");
    LandfilIn();
}
// Inläsning från land-filen
function LandfilIn() {
    fetch ("land.json")
    // '.then' är ett promise som gör att JavaScript väntar tills 
    // förra anropet är klart
    .then (function(landfil) {     // landfil är respons från fetch    
        return landfil.json();  // returnerar svaret (texten) som json-fil              
    })
    // 'landfil' innehåller resultatet av föregående '.then'
    // function utan namn (triggas av en händelse, anropas aldrig utifrån)
    .then(function(landfil) {   // här kommer inläst data in som json-fil
        ByggLandSida(landfil);
        //ByggVisitSida(landfil);                    
    })
    // '.catch' hanterar fel
    .catch(function(landdata) {
        console.log("fel vid inläsning av land");
    });
}   

// inläsning av stad-filen
function StadfilIn(id, val){
    fetch ("stad.json")
    // '.then' är ett promise som gör att JavaScript väntar tills 
    // förra anropet är klart
    .then (function(stadfil) { 
        // return skickar resultatet vidare till nästa '.then' 
        // 'stadfil.json()' är resultatet av fetch-läsningen
        // (standardord för stadfil = response)           
        return stadfil.json();                 
    })
    // 'stadfil' innehåller resultatet av föregående '.then'
    // function utan namn (triggas av en händelse, anropas aldrig utifrån)
    .then (function(stadfil) {  
        BearbetaStadfil(stadfil, id, val);                       
    })
    // '.catch' hanterar fel
    .catch(function(staderror) {
        console.log("fel vid inläsning av stad");
    });
}

function ByggLandSida(landfil) {
    // rensa skärmen
    document.getElementById("listrad").innerHTML = "";
    document.getElementById("valrad").innerHTML = "";
    SparaStadfil(landfil);
    // console.log("landfilen = ");
    // console.log(landfil);
    // var texta = JSON.stringify(landfil);
    // console.log("efter stringify = ");
    // console.log(texta);
    // console.log(landfil[0]);
    // rubrik
    document.getElementById("rubrik").innerText = "Länder";

    // en rad per land skapas
    for (landInd = 0 ; landInd < landfil.length ; landInd++) {
        var kodtext = "";

        // land till detaljraden
        var land = landfil[landInd].countryname;
        kodtext += "<div id='radinfo'>" + land + "</div>";

        // button med land-id och infoval lagrat i 'OnClick'
        var param = landfil[landInd].id + ", true";
        var onClickText = 'OnClick="InitStad('+ param + ')"' ;
        kodtext += "<button id='radbutton' "+onClickText + ">Visa städer";

        // slut på button-deklaration + radbryt
        kodtext += "</button><br>";

        // lägg till den skapade listraden 
        var listradtext = document.getElementById("listrad");
        listradtext.insertAdjacentHTML("beforeend", kodtext)
    }
        // button för vidare val
        var kodtext = "";
        kodtext += '<button id="val" onClick="InitVisit()">Se historik</button>';
    
        // lägg till den skapade valraden 
        var listradtext = document.getElementById("valrad");
        console.log("kodtext = ");
        console.log(kodtext);
        console.log(listradtext);
        listradtext.insertAdjacentHTML("beforeend", kodtext) 
}

function BearbetaStadfil(stadfil, id, val) {
    // val 'lista' = visa städer för inkommande landid
    // val 'detalj' = visa detaljinfo för inkommande stadid
    // val 'visit' = visa lista på stadid lagrade i localStorage
    if (val = "lista") {
        ByggStadSida(stadfil, id);
    } 
    if (val = "detalj") {
        ByggDetaljSida(stadfil, id);
    }
    if (val = "visit") {
        ByggVisitSida(stadfil);
    } else {
        console.log("fel vid bearbetning av stadfilen");
    }
}

function ByggStadSida(stadfil, landid) {
    // rensa skärmen
    document.getElementById("listrad").innerHTML = "";
    document.getElementById("valrad").innerHTML = "";

    // rubrik
    document.getElementById("rubrik").innerText = "Städer";

    // en rad per stad skapas
    for (stadInd = 0 ; stadInd < stadfil.length ; stadInd++) {
        var kodtext = "";

        // ta enbart med de städer som hör till aktuellt land
        if (stadfil[stadInd].countryid === landid) {
            // stad till detaljraden
            var stad = stadfil[stadInd].stadname;
            kodtext += "<div id='radinfo'>" + stad + "</div>";
    
            // button med stad-id och infoval lagrat i 'OnClick'
            var param = stadfil[stadInd].id + ", false";
            var onClickText = 'OnClick="InitDetaljSida('+ param + ')"' ;
            kodtext += "<button id='radbutton' "+onClickText + ">Mer info";
    
            // slut på button-deklaration + radbryt
            kodtext += "</button><br>";

            // lägg till den skapade listraden 
            var listradtext = document.getElementById("listrad");
            console.log("kodtext för stad = ");
            console.log(kodtext);
            console.log(listradtext);
            listradtext.insertAdjacentHTML("beforeend", kodtext)     
        }
    }
    // button för vidare val
    var kodtext = "";
    kodtext += '<button id="val" onClick="InitLand()">Tillbaka</button>';

    // lägg till den skapade valraden 
    var listradtext = document.getElementById("valrad");
    console.log("kodtext = ");
    console.log(kodtext);
    console.log(listradtext);
    listradtext.insertAdjacentHTML("beforeend", kodtext) 
}

function ByggDetaljSida(stadfil, stadid) {
    // rensa skärmen
    document.getElementById("listrad").innerHTML = "";
    document.getElementById("valrad").innerHTML = "";

    // rubrik
    document.getElementById("rubrik").innerText = "Detaljinfo";

    // rätt stad ska hittas
    stadInd = 0;
    while ((stadfil[stadInd].id != stadid) && (stadInd < stadfil.length)) {
        stadInd++;
    }
    if (stadfil[stadInd].id === stadid) {
        var kodtext = "";

        // namn 
        var stad = stadfil[stadInd].stadname;
        kodtext += "<p id='namn'>Lokala fakta: " + stad + "</p>";

        // antal innevånare
        var antal = stadfil[stadInd].population;
        kodtext += "<p id='antal'>Antal invånare: " + antal + "</p>";
        
        // uppgift om tidigare besök-markering
           
        // button för besök-markering (stad-id lagrat i 'OnClick')
        var stadid = stadfil[stadInd].id;
        var onClickText = 'OnClick="MarkeraStad('+ stadid + ')"';
        kodtext += "<button id='radbutton' "+ onClickText + ">";

        // slut på button-deklaration (inkl ledtext) + radbryt
        kodtext += "Markera staden som besökt</button><br>";

        // lägg till den skapade listraden 
        var listradtext = document.getElementById("listrad");
        console.log("kodtext för stad = ");
        console.log(kodtext);
        console.log(listradtext);
        listradtext.insertAdjacentHTML("beforeend", kodtext)  
        // valknappar
        var kodtext = "";  
    
        // tillbaka till stad-sidan (land-id och infoval lagrat i 'OnClick')
        var param = stadfil[stadInd].countryid + ", true";
        var onClickText = 'OnClick="InitStad('+ param + ')"' ;
        kodtext += "<button id='valbtnStad' "+onClickText + ">Tillbaka till stad-lista";
        kodtext += "</button>";   // slut på button-deklaration 
    
        // tillbaka till land-listan    
        kodtext += '<button id="valbtnLand" onClick="InitLand()">Tillbaka till land-lista';
        kodtext += "</button>";   // slut på button-deklaration 
    
        // lägg till den skapade listraden 
        var listradtext = document.getElementById("valrad");
        console.log("kodtext = ");
        console.log(kodtext);
        console.log(listradtext);
        listradtext.insertAdjacentHTML("beforeend", kodtext);  
    } else {
        console.log("stad med id " + stadid) + " hittades inte";
    }
}

function ByggVisitSida(stadfil, stadid) {
    // rensa skärmen
    document.getElementById("listrad").innerHTML = "";
    document.getElementById("valrad").innerHTML = "";

    // rubrik
    var text = "Följande städer har du tidigare besökt";
    document.getElementById("rubrik").innerText = text;

    // hämta sparade städer från localstogare
    var visit = [3,6,7];

    // hämta data för aktuella städer
    visit.forEach(skrivut);
    function skrivut(stadid){
        console.log ("dags att skriva ut nr " + stadid);
    }
    // for (visitInd = 0 ; visitInd < visit.length ; visitInd++) {

        // namn 
        var stad = stadfil[stadid].stadname;
        kodtext += "<p id='namn'>Lokala fakta: " + stad + "</p>";

        // antal innevånare
        var antal = stadfil[stadid].population;
        kodtext += "<p id='antal'>Antal invånare: " + antal + "</p>";

        // button för besök-markering (stad-id lagrat i 'OnClick')
        var stadid = visit[visitInd].id;
        var onClickText = 'OnClick="MarkeraStad('+ stadid + ')"';
        kodtext += "<button id='radbutton' "+ onClickText + ">";

        // slut på button-deklaration (inkl ledtext) + radbryt
        kodtext += "Markera staden som besökt</button><br>";

        // lägg till den skapade listraden 
        var listradtext = document.getElementById("listrad");
        console.log("kodtext för stad = ");
        console.log(kodtext);
        console.log(listradtext);
        listradtext.insertAdjacentHTML("beforeend", kodtext)  
        // valknappar
        var kodtext = "";  
    
        // rensa historik
        var param = visit[visitInd].countryid + ", true";
        var onClickText = 'OnClick="RensaHist()"';
        kodtext += "<button id='valbtnrensa' "+onClickText + ">Rensa";
        kodtext += "</button>";   // slut på button-deklaration 
    
        // tillbaka till land-listan    
        kodtext += '<button id="valbtnLand" onClick="InitLand()">Tillbaka till land-lista';
        kodtext += "</button>";   // slut på button-deklaration 
    
        // lägg till den skapade listraden 
        var listradtext = document.getElementById("valrad");
        console.log("kodtext = ");
        console.log(kodtext);
        console.log(listradtext);
        listradtext.insertAdjacentHTML("beforeend", kodtext);  

}

function SparaStadfil(stadfil) {
    console.log("dags att skriva ut landsfil");
    console.log(stadfil);
    console.log(stadfil[0]);
    console.log(stadfil[0].countryname);
    //document.getElementById("rubrik").innerHTML = "Städer";
    // console.log("städer = ");
    // console.log(stadfil);
    // en rad per stad skapas
    // var kodrad = "";
    // for (stadInd = 0 ; stadInd < stadFil.length ; stadInd++) {
    //     // spar i localStorage
    // localStorage.removeItem("TownArray");
    // tryArray = [1,2,3,4,5];
    // stadfil.forEach(skrivut);
    // function skrivut(nr){
    //     console.log ("dags att skriva ut nr " + nr);
    //}
    // for (ind = 0 ; ind < 5 ; ind++){
    //     var nyckel=
    //     //localStorage[TownArray[ind]] = tryArray[ind];
    //     //localStorage.TownArray = tryArray;
    //     localStorage.TownArray[ind] = tryArray[ind];
    // }
    //localStorage.setItem("TownArray",tryArray);  // key, value
    // console.log("localstorage = ");
    // console.log(localStorage);
    // console.log("tryArray = ");
    // console.log(tryArray);
}
