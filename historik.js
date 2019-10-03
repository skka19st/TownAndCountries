// Javascript-dokument 

// hämta tidigare besökta städer från local Storage
console.log("start av Histrikstäder:");

var stadstring = localStorage.getItem("stad");

if (stadstring === null) {  
    // historiken är tom 
    console.log("inget värde hittat");    
} else {
    stadlista = stadstring.split(",");   // string till array
    StadfilIn(stadlista);
}

// rensa tidigare historik, uppdatera sidan
function RensaHistorik(){
    localStorage.removeItem("stad");
    console.log ("efter rensning " + localStorage);
    document.getElementById("historikrad").innerHTML = "";
}

function ByggHistorikSida(stadfil, stadlista) {
    console.log("funktionen ByggHistorikSida:");
    console.log("stadlista = " + stadlista);

    // rensa skärmen från ev gammalt data
    document.getElementById("historikrad").innerHTML = "";
    //document.getElementById("valHist").innerHTML = "";
    
    // hämta fakta för de städer som ligger lagrade
    var arrayInd = 0;
    var totAntal = 0;
    for (stadInd = 0 ; stadInd < stadfil.length ; stadInd++) {
        console.log("stadInd = " + stadInd + stadfil[stadInd].id);
        console.log("ArrayInd = " + arrayInd + stadlista[arrayInd]);
        var num1 = Number(stadfil[stadInd].id);
        var num2 = Number(stadlista[arrayInd]);
        if (num1 === num2) {
        //if (stadfil[stadInd].id === stadlista[arrayInd]) {
            // stadens namn till detaljraden
            console.log("träff!");
            kodtext = "";
            var namn = stadfil[stadInd].stadname;
            kodtext += '<div id="namn">' + namn + '</div>';
            var listradtext = document.getElementById("historikrad");
            listradtext.insertAdjacentHTML("beforeend", kodtext) 

            // totalt antal innevånare för alla besökta städer
            totAntal += stadfil[stadInd].population;
            arrayInd++;
        } else {
            //if (stadfil[stadInd].id > stadlista[arrayInd]) {
            if (num1 > num2) {
                arrayInd++;
        }}
    }

    // beräknat antal personer i samtliga städer
    kodtext = "";
    kodtext += "<div>" + "I dessa städer bor totalt " + totAntal; 
    kodtext += " människor. Hur många av dem har du träffat?";
    var listradtext = document.getElementById("historikrad");
    listradtext.insertAdjacentHTML("beforeend", kodtext)

    // tillbaka eller rensa historik (bottons) 
    var kodtext = "";
    // var ledtext = "Tillbaka till förstasidan";
    // kodtext += '<button onClick="Tillbaka()">';
    // kodtext += ledtext + '</button>';

    var ledtext = "Rensa historik";
    kodtext += '<button onClick="RensaHistorik()">';
    kodtext += ledtext + '</button>';

    // lägg till den skapade valraden 
    var listradtext = document.getElementById("valHist");
    listradtext.insertAdjacentHTML("beforeend", kodtext) 
}

// inläsning av stad-filen
function StadfilIn(stadlista){
    fetch ("stad.json")
    // '.then' är ett promise som gör att JavaScript väntar tills 
    // förra anropet är klart
    .then (function(stadfil) { 
        // return skickar resultatet vidare till nästa '.then' 
        // 'stadfil.json()' är resultatet av fetch-läsningen          
        return stadfil.json();                 
    })
    // 'stadfil' innehåller resultatet av föregående '.then'
    // function utan namn (triggas av en händelse, anropas aldrig utifrån)
    .then (function(stadfil) {  
        ByggHistorikSida(stadfil, stadlista);                
    })
    // '.catch' hanterar fel
    .catch(function(staderror) {
        console.log("fel vid inläsning av stad");
    });
}

