import React, { useState } from "react";
import "./ChatBotIcon.scss";
import { useSelector } from "react-redux";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
// const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
//   "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
// }

const ChatbotIcon = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const language = useSelector((state) => state.language.language);

  const [messages, setMessages] = useState([
    {
      message:
        language === "VN"
          ? "Xin chào, tôi là ChatGPT. Tôi có thể giúp gì cho bạn?"
          : "Hello, I'm ChatGPT. May I help you?",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        // systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  const ShowHideChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <>
      {showChatBot === true ? (
        <div className="chat_bot_system">
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  console.log(message);
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder={
                  language === "VN"
                    ? "Nhập tin nhắn vào đây"
                    : "Type message here"
                }
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      ) : (
        <></>
      )}

      <div className="chat_bot_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className=""
          style={{
            fill: "#f28123",
            height: "100%",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={ShowHideChatBot}
        >
          <path d="M192 408h64v-48h-64zm384-216h-32a96 96 0 00-96-96H344V24a24 24 0 00-48 0v72H192a96 96 0 00-96 96H64a48 48 0 00-48 48v128a48 48 0 0048 48h32a96 96 0 0096 96h256a96 96 0 0096-96h32a48 48 0 0048-48V240a48 48 0 00-48-48zM96 368H64V240h32zm400 48a48.14 48.14 0 01-48 48H192a48.14 48.14 0 01-48-48V192a48 48 0 0148-48h256a48 48 0 0148 48zm80-48h-32V240h32zM240 208a48 48 0 1048 48 47.996 47.996 0 00-48-48zm160 0a48 48 0 1048 48 47.996 47.996 0 00-48-48zm-16 200h64v-48h-64zm-96 0h64v-48h-64z"></path>
        </svg>
      </div>
    </>
  );
};

export default ChatbotIcon;
