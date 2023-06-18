import { Box, Container } from '@chakra-ui/react';
import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useTranslation } from 'react-i18next';

const API_KEY = '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';
const systemMessage = {
    role: 'system',
    content:
        "Explain things like you're talking to a software professional with 2 years of experience.",
};

export const Chat = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        {
            message: t('gpt.message'),
            sentTime: 'just now',
            sender: 'ChatGPT',
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
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

    async function processMessageToChatGPT(chatMessages) {
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
                <ChatContainer
                    style={{
                        background: "transparent",
                    }}
                >
                    <MessageList
                        scrollBehavior="smooth"
                        style={{
                            background: "transparent",
                            maxHeight: '73vh'
                        }}
                        typingIndicator={
                            isTyping ? (
                                <TypingIndicator content="ChatGPT is typing" style={{
                                    background: "transparent",
                                }} />
                            ) : null
                        }
                    >
                        {messages.map((message, i) => {
                            console.log(message);
                            return <Message key={i} model={message} style={{
                                background: "transparent",
                                marginTop: "10px",
                                marginBottom: "10px",
                            }} />;
                        })}
                    </MessageList>
                </ChatContainer>
                <Box position={'fixed'} bottom={'0px'} bgColor={'opacity'} pb={'20px'} w={'95%'} >
                    <MessageInput
                        attachButton={false}
                        placeholder={t('gpt.placeholder')}
                        onSend={handleSend}
                        style={{
                            backgroundColor: "transparent",
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
};