import {
    locService
} from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    addClickListener,
    sendCurrLoc,
    getConvAddress,
    setCurrLoc,
    getCurrLoc
}

var gMap;
var gCurrLoc = {};
const API_KEY = 'AIzaSyCFlITp80vTDJKwz-aS-ohXgNh-s7n8RaU';

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: {
                    lat,
                    lng
                },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}


function addClickListener() {
    const myLatlng = {
        lat: -25.363,
        lng: 131.044
    };
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
    });
    infoWindow.open(gMap);
    //Add map click listener.
    gMap.addListener("click", (mapsMouseEvent) => {
        gCurrLoc = {
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng()
        }
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(gMap);
    });

}


function sendCurrLoc(locName) {
    // if (!Object.keys(gCurrLoc).length) 
    locService.addNewLoc(gCurrLoc, locName);
    addMarker(gCurrLoc);
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getConvAddress(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => res.data.results[0].geometry.location);
}

function setCurrLoc(lat, lng) {
    gCurrLoc = {
        lat,
        lng
    }
}

function getCurrLoc() {
    return gCurrLoc;
}