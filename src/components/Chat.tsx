import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = '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';
const systemMessage = {
    role: 'system',
    content:
        "Explain things like you're talking to a software professional with 2 years of experience.",
};

export const Chat = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: 'just now',
            sender: 'ChatGPT',
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message: string) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: 'user',
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages: any[]) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = '';
            if (messageObject.sender === 'ChatGPT') {
                role = 'assistant';
            } else {
                role = 'user';
            }
            return { role: role, content: messageObject.message };
        });

        const apiRequestBody = {
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...apiMessages],
        };

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + API_KEY,
                'Content-Type': 'application/json',
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
                        sender: 'ChatGPT',
                    },
                ]);
                setIsTyping(false);
            });
    }

    return (
        <Container>
            <Box justifyContent="center" height="100%" pt={'15px'}>
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
                </ChatContainer>
                <Box position={'fixed'} bottom={'0px'} bgColor={'white'} p={'5px'} pb={'5px'} w={'95%'} >
                    <MessageInput
                        attachButton={false}
                        placeholder="Type message here"
                        onSend={handleSend}
                    />
                </Box>
            </Box>
        </Container>
    );
};