import {
    utilService
} from './util.service.js'

import {
    storageService
} from './storage.service.js';

export const locService = {
    getLocs,
    addNewLoc,
    deleteLoc
}


var locs = [];
const KEY = 'locationsDB';

function addNewLoc(loc, locName) {
    locs.push({
        id: utilService.makeId(5),
        locName,
        lat: loc.lat,
        lng: loc.lng,
        weather: 'tbd',
        createdAt: Date().slice(0, 24),
        updatedAt: 'tbd'
    })

    storageService.save(KEY, locs);
}

function getLocs() {
    locs = storageService.load(KEY) || [];

    if (locs.length) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (locs.length) {
                    resolve(locs);
                } else {
                    reject('no locations in storage');

                }
            }, 500)
        });
    }
}

function deleteLoc(locId) {
    locs.forEach((loc, idx) => {
        if (loc.id === locId) {
            locs.splice(idx, 1);
            return;
        }
    })

    storageService.save(KEY, locs);
}