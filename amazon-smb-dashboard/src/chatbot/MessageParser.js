import { intents } from "./Intents";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (intents.greetings.some((word) => lowercase.includes(word))) {
      this.actionProvider.greet();
    } else if (intents.shipmentTracking.some((word) => lowercase.includes(word))) {
      this.actionProvider.trackShipment();
    } else if (intents.help.some((word) => lowercase.includes(word))) {
      this.actionProvider.help();
    } else if (intents.returnPolicy.some((word) => lowercase.includes(word))) {
      this.actionProvider.returnPolicy();
    } else if (intents.weather.some((word) => lowercase.includes(word))) {
      this.actionProvider.weather();
    } else {
      this.actionProvider.defaultMessage();
    }
  }
}

export default MessageParser;
