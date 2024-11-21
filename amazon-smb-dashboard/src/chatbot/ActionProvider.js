class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet() {
    const message = this.createChatBotMessage(
      "Hello! How can I assist you today?"
    );
    this.addMessageToState(message);
  }

  trackShipment() {
    const message = this.createChatBotMessage(
      "Please provide your shipment ID to proceed."
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      awaitingInput: "shipmentID",
    }));
  }

  handleInput(input) {
    if (this.state.awaitingInput === "shipmentID") {
      const message = this.createChatBotMessage(
        `Thank you! Tracking details for shipment ID ${input}: Your package is currently in transit and will arrive tomorrow.`
      );
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
        awaitingInput: null, // Reset awaiting input
      }));
    }
  }

  help() {
    const message = this.createChatBotMessage(
      "I can assist with:\n1. Tracking shipments\n2. FAQs\n3. Weather updates\n4. General inquiries"
    );
    this.addMessageToState(message);
  }

  returnPolicy() {
    const message = this.createChatBotMessage(
      "Our return policy allows returns within 30 days of purchase. Please contact customer support for further assistance."
    );
    this.addMessageToState(message);
  }

  weather() {
    const message = this.createChatBotMessage(
      "Today's weather is sunny with a high of 25°C. Do you want more details?"
    );
    this.addMessageToState(message);
  }

  defaultMessage() {
    const message = this.createChatBotMessage(
      "Sorry, I didn't get that. Did you mean:\n1. Track shipment\n2. Return policy\n3. Weather updates?"
    );
    this.addMessageToState(message);
  }

  addMessageToState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
