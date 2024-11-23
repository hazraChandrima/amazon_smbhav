import { intents } from "./Intents";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (intents.greetings.some((word) => lowercase.includes(word))) {
      this.actionProvider.greet();
    }
    else if (
      intents.shipmentTracking.some((word) => lowercase.includes(word))
    ) {
      this.actionProvider.trackShipment();
    }
    else if (intents.help.some((word) => lowercase.includes(word))) {
      this.actionProvider.help();
    }
    else if (intents.returnPolicy.some((word) => lowercase.includes(word))) {
      this.actionProvider.returnPolicy();
    }
    else if (
      intents.weather.some((word) => lowercase.includes(word)) ||
      lowercase.includes("what's the weather") ||
      lowercase.includes("what is the weather") ||
      lowercase.includes("whats the weather") 
    ) {
      const cityMatch = lowercase.match(
        /(?:weather in|weather for|in|at|for)\s([a-z\s]+)/i
      );
      const cityName = cityMatch ? cityMatch[1].trim() : null; // Extract city name if present
      this.actionProvider.weather(cityName);
    } 
    else if (intents.billing.some((word) => lowercase.includes(word))) {
      this.actionProvider.billing();
    }
    else if (intents.supportContact.some((word) => lowercase.includes(word))) {
      this.actionProvider.supportContact();
    }
    else if (intents.productInquiry.some((word) => lowercase.includes(word))) {
      this.actionProvider.productInquiry();
    }
    else if (intents.feedback.some((word) => lowercase.includes(word))) {
      this.actionProvider.feedback();
    }
    else {
      this.actionProvider.defaultMessage();
    }
  }
}

export default MessageParser;
