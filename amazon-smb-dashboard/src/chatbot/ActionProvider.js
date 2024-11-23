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
    if (this.state.awaitingInput === "cityName") {
      const cityName = input; // Assume input is the city name
      this.weather(cityName); 
      this.setState((prevState) => ({
        ...prevState,
        awaitingInput: null, 
      }));
    } else if (this.state.awaitingInput === "shipmentID") {
      const message = this.createChatBotMessage(
        `Thank you! Tracking details for shipment ID ${input}: Your package is currently in transit and will arrive tomorrow.`
      );
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
        awaitingInput: null,
      }));
    } else if (this.state.awaitingInput === "productID") {
      const message = this.createChatBotMessage(
        `Fetching details for Product ID: ${input}. Please wait...`
      );
      // Simulate API call or fetch details
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
        awaitingInput: null, 
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





  weather(cityName = null) {
    if (!cityName) {
      const message = this.createChatBotMessage(
        "Could you please provide the name of the city you want the weather information for?"
      );
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
        awaitingInput: "cityName",
      }));
      return;
    }

    // Proceed with fetching weather details if cityName is provided
    const apiKey = "8103527a238780ba065cc570db6bd49f";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          const message = this.createChatBotMessage(
            `The current temperature in ${data.name} is ${data.main.temp}°C with ${data.weather[0].description}, having a current sea level of ${data.main.sea_level}.`
          );
          this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
            awaitingInput: null, 
          }));
        } else {
          const errorMsg = this.createChatBotMessage(
            "Sorry, I couldn't find the weather details for the city you mentioned. Please try another city."
          );
          this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, errorMsg],
            awaitingInput: null, 
          }));
        }
      })
      .catch((error) => {
        const message = this.createChatBotMessage(
          "Sorry, there was an issue fetching the weather details. Please try again later."
        );
        this.setState((prevState) => ({
          ...prevState,
          messages: [...prevState.messages, message],
          awaitingInput: null,
        }));
      });
  }




  billing() {
    const message = this.createChatBotMessage(
      "For billing-related queries, please provide your order ID or reach out to our billing team at billing@yourapp.com."
    );
    this.addMessageToState(message);
  }

   

  supportContact() {
    const message = this.createChatBotMessage(
      "You can contact support at support@yourapp.com or call +123-456-7890."
    );
    this.addMessageToState(message);
  }



  productInquiry() {
    const message = this.createChatBotMessage(
      "Please share the product name or ID to get detailed information."
    );
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      awaitingInput: "productID", 
    }));
  }



  feedback() {
    const message = this.createChatBotMessage(
      "We value your feedback! Please share your thoughts or suggestions."
    );
    this.addMessageToState(message);
  }



  defaultMessage() {
    const message = this.createChatBotMessage(
      "Sorry, I didn't get that. Did you mean:Track shipment/Return policy/Weather updates/Billing inquiries/Product inquiries/Feedback or support contact?"
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
