import { Box, Container } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import govData from './govData';
import stringSimilarity from 'string-similarity';

const API_KEY = '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';

interface MessageData {
  message: string;
  direction: 'incoming' | 'outgoing';
  sentTime: string;
  sender: string;
  position: 0 | 1 | 2 | 3 | 'single' | 'first' | 'normal' | 'last';
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const initialResponse = "Hello, I'm ChatGPT! Ask me anything!";
    setMessages([
      {
        message: initialResponse,
        direction: 'incoming',
        sentTime: 'just now',
        sender: 'ChatGPT',
        position: 'single',
      },
    ]);
  };

  const handleSend = async (message: string) => {
    const newMessage: MessageData = {
      message,
      direction: 'outgoing',
      sentTime: 'just now',
      sender: 'user',
      position: 'last',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true);
    await processMessageToChatGPT([...messages, newMessage]);
  };

  async function processMessageToChatGPT(chatMessages: MessageData[]) {
    const apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const userMessage = apiMessages[apiMessages.length - 1].content;

    const matches = stringSimilarity.findBestMatch(userMessage, Object.keys(govData));

    if (matches.bestMatch.rating > 0.5) {
      const responseMessage = govData[matches.bestMatch.target];
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: responseMessage,
          sender: 'ChatGPT',
          direction: 'incoming',
          sentTime: 'just now',
          position: 'last',
        },
      ]);
      setIsTyping(false);
    } else {
      makeAPICall(apiMessages, API_KEY).then((data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.choices[0].message.content,
            sender: 'ChatGPT',
            direction: 'incoming',
            sentTime: 'just now',
            position: 'last',
          },
        ]);
        setIsTyping(false);
      });
    }
  }

  async function makeAPICall(apiMessages: any, API_KEY: string) {
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: apiMessages,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <Container>
      <Box justifyContent="center" height="100%" pt={'15px'}>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
        </ChatContainer>
        <Box position={'fixed'} bottom={'0px'} bgColor={'white'} p={'5px'} pb={'5px'} w={'95%'}>
          <MessageInput attachButton={false} placeholder="Type message here" onSend={handleSend} />
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
