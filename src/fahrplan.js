import { Skill, Launch, Intent, SessionEnded} from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import ssml from 'alexa-ssml-jsx';
import {TransportAPI} from './transport.api';
import fetch from 'isomorphic-fetch';

const API_ENDPOINT = 'http://transport.opendata.ch/v1/locations';

@Skill
export default class Fahrplan {

    constructor(api = new TransportAPI()) {
        this.api = api;
    }

    @Launch
    launch() {
        return ask('Hallo! Von wo möchtest du starten?');
    }

    @Intent('AMAZON.YesIntent', 'Station')
    stations() {
        return this.getStations('Basel').then(stations => {
            console.log("Bababa" + JSON.stringify(stations, null, 2));
            console.log("asdsad" + JSON.stringify(stations[0].name, null, 2));
            return say('Wow - schau mal welche Station ich gefunden habe: ' + stations[0].name)
        });
    }

    @Intent('AMAZON.HelpIntent')
    help() {
        return ask('Hallo! Von wo möchtest du starten?');
    }

    @SessionEnded
    @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent', 'AMAZON.NoIntent')
    stop() {
        return say('Gute Reise!');
    }

    getStations(city) {
        return fetch(API_ENDPOINT + '?query=' + city).then(res => {
            return res.status == 200 ? res.json() : Promise.reject();
        }).then(response => {
            return response.stations;
        });
    }

}
