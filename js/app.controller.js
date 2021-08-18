import {
    locService
} from './services/loc.service.js'

import {
    mapService
} from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onAddLoc = onAddLoc;
window.onDelete = onDelete;
window.onSearchLoc = onSearchLoc;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            mapService.addClickListener();
        })
        .catch(() => console.log('Error: cannot init map'));

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function onAddLoc() {
    //check if map not clicked yet
    var locName = prompt('Enter Location Name:')
    mapService.sendCurrLoc(locName)
    renderLocTable();

}

function onAddMarker() {
    console.log('Adding a marker');
    // var {lat, lang} = func that get lat lang from click
    mapService.addMarker({
        lat: 32.0749831,
        lng: 34.9120554
    });
}

function renderLocTable() {
    locService.getLocs()
        .then(locs => {
            const strHTML = locs.map(loc => {
                return `<tr>
                        <td>
                            <button class="btn-go" onclick="onPanTo(${loc.lat},${loc.lng})">Go</button>
                            <button class="btn-delete" onclick="onDelete('${loc.id}')">Delete</button>
                        </td>
                        <td>${loc.id}</td>
                        <td>${loc.locName}</td>
                        <td>${loc.lat}</td>
                        <td>${loc.lng}</td>
                        <td>${loc.weather}</td>
                        <td>${loc.createdAt}</td>
                        <td>${loc.updatedAt}</td>
                        </tr> \n`
            }).join('');

            document.querySelector('.my-locations-tb').innerHTML = strHTML;

        })
        .catch(err => console.log(err));

}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            // console.log('User position is:', pos.coords);
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            mapService.addMarker({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })

        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat, lng) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

function onDelete(locId) {
    console.log(locId);
    locService.deleteLoc(locId);
    renderLocTable();
}

function onSearchLoc() {
    var address = document.querySelector('[name="search-bar"]').value;
    // geocode to turn "address" into {lat:232345, lng:43545}
    mapService.getConvAddress(address)
        .then(res => {
            console.log(res);
            mapService.panTo(res.lat, res.lng);
            mapService.setCurrLoc(res.lat, res.lng);
            onAddLoc();
        })
}