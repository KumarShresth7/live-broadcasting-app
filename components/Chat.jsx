import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function Chat({ streamId, username }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for messages from the server
        socket.on('chat-message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('chat-message');
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const chatMessage = { streamId, username, content: message };
            socket.emit('chat-message', chatMessage); // Send message to the server
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
            setMessage(''); // Clear input field
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{msg.username}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button type="submit" className="chat-send-button">Send</button>
            </form>
        </div>
    );
}
