export const locService = {
    getLocs
}


const locs = [{
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384
    },
    {
        name: 'Neveragain',
        lat: 32.047201,
        lng: 34.832581
    }
]

var LocationService = {
    id: 1,
    locName: 1,
    lat: 1,
    lng: 1,
    weather: 1,
    createdAt: 1,
    updatedAt: 1
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}