import { Skill, Launch, Intent } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import ssml from 'alexa-ssml-jsx';

@Skill
export default class Fahrplan {

    @Launch
    launch() {
        return say('said on launch');
    }

    @Intent('hello')
    hello({ name = 'world' }) {
        return say(`Hello ${name}`).card({ title: 'Alexabla', content: `Hello ${name}` });
    }

    @Intent('AMAZON.HelpIntent')
    help() {
        return ask('I say hello to people. Who should I say hello to?').reprompt('Who should I say hello to?');
    }

    @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
    stop() {
        return say(<speak>ALLTER DU NERVST</speak>);
    }

}
