const API_ENDPOINT = 'http://transport.opendata.ch/v1/locations';

export class TransportAPI {

    getStations(city) {
        return fetch(API_ENDPOINT + '?query=' + city).then(res => res.json()).then(response => {
            const {type, value} = response;
            return type === 'success' ? value.stations : Promise.reject();
        });
    }
}