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
import axios from "axios";
import { toast } from "react-toastify";

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
    setIsTyping(true);
    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/chat-with-ai`,
      {
        message,
      }
    );
    if (!res) {
      toast.error(
        language === "VN"
          ? "Có gì đó không đúng. Vui lòng thử lại"
          : "Something wrong. Please try again"
      );
    }
    if (res && res.data.errCode === 0) {
      setMessages([
        ...newMessages,
        {
          message: res.data.chatBotMessage,
          sender: "ChatGPT",
        },
      ]);
      setIsTyping(false);
    }
  };

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
