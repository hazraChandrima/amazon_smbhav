import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const chatbot = new ChatBot({
  messageParser: new MessageParser(actionProvider, state),
  actionProvider: new ActionProvider(),
  state: initialState,
});
