$("document").ready(function(){

    var map = L.map("map").setView([54.948,-7.729], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var greenIcon = L.icon({
        iconUrl: 'icons/green.png',
        iconSize:     [24, 24], // size of the icon
        iconAnchor:   [12, 12], // where point in icon = marker location
    });
    var yellowIcon = L.icon({
        iconUrl: 'icons/yellow.png',
        iconSize:     [24, 24], // size of the icon
        iconAnchor:   [12, 12], // where point in icon = marker location
    });

    map.on("click", function(e){
        // add your code here
       
    });


        L.marker([54.944, -7.736], {icon: greenIcon}).addTo(map)  .bindPopup("<b>Letterkenny Cinema</b><br>We are located Leckview Lane Pearse Road, Letterkenny, Co. Donegal, F92 DA02");;
        L.marker([54.952, -7.721], {icon: yellowIcon}).addTo(map)  .bindPopup("<b>ATU Donegal</b><br>Walking distance from ATU Donegal");;
        L.marker([54.949, -7.738], {icon: yellowIcon}).addTo(map)  .bindPopup("<b>Voodoo Club</b><br>Start of a great night starts with a great movie");;




        
        var qrcode = new QRCode("qrcode", {
            text: "https://maps.app.goo.gl/adBkmYmaxpUNMYC89",
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
});


  