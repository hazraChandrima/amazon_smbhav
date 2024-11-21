import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm here to assist you. How can I help?"),
  ],
  botName: "Alexa",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#004aad",
    },
    chatButton: {
      backgroundColor: "#004aad",
    },
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
