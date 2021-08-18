import {
    utilService
} from './util.service.js'

export const locService = {
    getLocs, //remove?
    addNewLoc
}


var locs = [];

function addNewLoc(loc) {
    locs.push({
        id: utilService.makeId(5),
        locName: 'temp name',
        lat: loc.lat,
        lng: loc.lng,
        weather: 'tbd',
        createdAt: Date().slice(0, 24),
        updatedAt: 'tbd'
    })

    console.log(locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}