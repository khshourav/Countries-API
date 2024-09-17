let map;
let marker;

let url = 'https://restcountries.com/v3.1/name/bd';
Update(url);

function search(){
    let input = document.getElementById('inp').value;
    let url = `https://restcountries.com/v3.1/name/${input}`;
    Update(url);
    document.getElementById('inp').value = '';
}



function Update(url){

fetch(url)
.then((response)=>{
    if(!response.ok){
        alert("Incorrect Country Name");
        throw new Error ('Country Not Found');
    }
    else if(!response){
        throw new Error ('JSON not Found');
    }
    return response.json();
}).then((x)=>{
    // console.log(x);

    // flag
    let flag = x[0].flags.png;
    document.getElementById('flag').src=flag;
    // let m = x[0].maps.googleMaps;

    // coat of Arms
    let coat =x[0].coatOfArms.png;
    document.getElementById('coat').src = coat;

    // common Name
    let name = x[0].name.common;
    document.getElementById('name').innerHTML = name;

    // Official Name
    let oName = x[0].name.official;
    document.getElementById('oName').innerText = oName;
    
    // Native Name
    let natName = Object.keys(x[0].name.nativeName)[0];
    let nName = x[0].name.nativeName[natName].common;
    document.getElementById('nName').innerText = nName;

    // Official Native Name
    let nativeKey = Object.keys(x[0].name.nativeName)[0];
    document.getElementById('onName').innerText = x[0].name.nativeName[nativeKey].official;

    // Country Code
    document.getElementById('cCode').innerText = x[0].cca2;

    // Currency
    document.getElementById('curr').innerText = Object.keys(x[0].currencies)[0];
    

    // Currency Name
    let currKey = Object.keys(x[0].currencies)[0];
    document.getElementById('currName').innerText = x[0].currencies[currKey].name.toUpperCase();

    // Currency Symbol
    document.getElementById('currSmb').innerText = x[0].currencies[currKey].symbol;

    // Time Zone
    document.getElementById('timeZone').innerText = x[0].timezones[0];

    // UN Membership
    if(x[0].unMember){
        document.getElementById('UN').innerText = "Yes";
    }
    else{
        document.getElementById('UN').innerText = "No";
    }

    // Capital
    document.getElementById('capital').innerText = x[0].capital[0];

    // Continent
    document.getElementById('conti').innerText = x[0].continents[0];

    // Region
    document.getElementById('region').innerText = x[0].region;

    // Sub Region
    document.getElementById('sRegion').innerText = x[0].subregion;

    // Language
    let lanKey = Object.keys(x[0].languages)[0];
    // document.getElementById('language').innerText = x[0].languages[lanKey];

    let allLanguage = Object.values(x[0].languages);
    let stringLang = allLanguage.join(', ');
    document.getElementById('language').innerText = stringLang;


    // Area
    document.getElementById('area').innerText = x[0].area.toLocaleString();

    // Borders
    document.getElementById("borders").innerText = "";
    isFirst = true;
        x[0].borders.forEach((border) => {
        let url2 = `https://restcountries.com/v3.1/alpha?codes=${border}`;

        fetch(url2)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Country Not Found");
            }
            return response.json();
            })
            .then((y) => {
            if (isFirst) {
                document.getElementById("borders").innerText += y[0].name.common;
                isFirst = false;
            } else {
                document.getElementById("borders").innerText += ", " + y[0].name.common;
            }
            })
            .catch((error) => {
            console.error(error);
            });
        });

    // Population
    document.getElementById('population').innerText = x[0].population.toLocaleString();

    // Natinality
    document.getElementById('Nationality').innerText = x[0].demonyms.eng.f;

    // Landlocked
    if(x[0].landlocked){
        document.getElementById('Landlocked').innerText = "Yes";
    }
    else{
        document.getElementById('Landlocked').innerText = "No";
    }
     
    // map
    lat1 = x[0].capitalInfo.latlng[0];
    lng2 = x[0].capitalInfo.latlng[1];

    if(!map){
        map = L.map('map').setView([lat1, lng2], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
        
          marker = L.marker([lat1, lng2]).addTo(map);
    }
     else{
        map.setView([lat1, lng2], 5);
        marker.setLatLng([lat1, lng2]);
     }
      
})
.catch((error) => {
    console.error(error);
});

}