// Javascript-dokument 

fetch ("stad.json")
// '.then' är ett promise som gör att JavaScript väntar tills 
// förra anropet är klart
.then (function(stadfil) { 
    // return skickar resultatet vidare till nästa '.then' 
    // 'stadfil.json()' är resultatet av fetch-läsningen
    // (standardord för stadfil = response)           
    return stadfil.json();                 
})
// 'dataStad' innehåller resultatet av föregående '.then'
// function utan namn (triggas av en händelse, anropas aldrig utifrån)
.then(function(stadfil) {  
    // stadfilen skickas med för att vara tillgänglig i nästa steg
    LaesInfilLand(stadfil);                         
})
// '.catch' hanterar fel
.catch(function(data) {
    console.log("fel vid inläsning av stad");
});

function LaesInfilLand(dataStad){
    fetch ("land.json")
    // '.then' är ett promise som gör att JavaScript väntar tills 
    // förra anropet är klart
    .then (function(dataLand) {            
        return dataLand.json();                 
    })
    // 'dataland' innehåller resultatet av föregående '.then'
    // function utan namn (triggas av en händelse, anropas aldrig utifrån)
    .then(function(dataLand) { 
        BehandlaData(dataLand, dataStad);                       
    })
    // '.catch' hanterar fel
    .catch(function(infilLand) {
        console.log("fel vid inläsning av land");
    });
}
function BehandlaData(landFil, stadFil) {
    // första gången = landbilden
    ByggLandSida(landFil);

    // document.getElementById("rubrik").innerHTML = "Länder";

    // var kodrad = "";
    // document.getElementById("radinfo").innerText = "Sverige";
    // document.getElementById("buttonid").innerText = "Visa städer";
    
    // kodrad += document.getElementById("listrad").innerHTML;

    // console.log("efter första läsningen ");
    // console.log(kodrad);

    // document.getElementById("radinfo").innerText = "Norge";
    // document.getElementById("buttonid").innerText = "Visa städer";
    // kodrad += document.getElementById("listrad").innerHTML;

    // console.log("efter andra läsningen ");
    // console.log(kodrad);

    // document.getElementById("lista").innerHTML = kodrad;

    // document.getElementById("vidareval").innerHTML = "Visa besökta städer";
}

function SorteraStad(data) {
    // sort-version med return behövs för att sortera sträng
    // Sortera efter landskod
    data.sort(function (x, y) {
       //return x.population - y.population;  // stigande sortering
       return y.population - x.population;   // fallande sortering  
    });   
}
function ByggLandSida(landFil) {

    // en rad per land skapas
    for (landInd = 0 ; landInd < landFil.length ; landInd++) {
        var kodtext = "";

        // land till detaljraden
        var land = landFil[landInd].countryname;
        kodtext += "<div id='radinfo'>" + land + "</div>";
        console.log("kodtext med landrad = ");
        console.log(kodtext);

        // button med land-id lagrat i 'OnClick'
        var landid = landFil[landInd].id;
        var onClickText = 'OnClick="ByggStadSida('+ landid + ')"' ;
        console.log("onClickText = ");
        console.log(onClickText);
        kodtext += "<button id='radbutton' " + onClickText + ">Visa städer";

        // slut på button-deklaration + radbryt
        kodtext += "</button><br>";
        console.log("kodtext med button = ");
        console.log(kodtext);

        // lägg till den skapade listraden 
        var listradtext = document.getElementById("listrad");
        console.log("listrad före insättning");
        console.log(listradtext);
        listrad.insertAdjacentHTML("beforeend", kodtext)
    }
}
function ByggStadSida(radid) {
    console.log("dags att bygga stadsida");
    console.log("radid = " + radid); 
    // console.log(document.getElementById("lista").innerHTML);
    // console.log(document.getElement("radid").innerHTML);
    //ByggStadSida(stadFil, "1");
}
function ByggStadSida2(stadFil, landid) {
    document.getElementById("rubrik").innerHTML = "Städer";

    // samma text på button för samtliga detaljrader
    document.getElementById("radbutton").innerText = "Mer info";

    // en rad per stad skapas
    var kodrad = "";
    for (stadInd = 0 ; stadInd < stadFil.length ; stadInd++) {
        var stad = stadFil[stadInd].stadname;
        document.getElementById("radinfo").innerText = stad; 

        // raden behöver ha ett id som kan fångas upp
        var id = stadFil[stadInd].id;
        document.getElementById("radid").innerText = id; 
        
        // lägg ihop den skapade listraden med tidigare rader
        kodrad += document.getElementById("listrad").innerHTML;
        console.log("kodrad = " + kodrad);
    }
    // info om länder läggs ut på skärmen
    document.getElementById("lista").innerHTML = kodrad;
    console.log("listdetaljer = " + kodrad);

    // val för sidan Besökta städer
    document.getElementById("vidareval").innerHTML = "Tillbaka";
}

function SkrivUt(land, stad, antal, listrad) {
    // document.getElementById("land").innerHTML = land;
    // document.getElementById("stad").innerHTML = stad;
    // document.getElementById("antal").innerHTML = antal;
    var nyListrad = document.getElementById("listrad").innerHTML;
    listrad += nyListrad;
    return listrad;
}

function vidareval(){
    console.log("dags att gå vidare");
}