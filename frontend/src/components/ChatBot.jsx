import React, { useEffect, useState } from 'react';
import { startChatbot, sendMessage } from '../services/api';
import { toast } from 'react-toastify';
import './ChatBot.css'; // External CSS for animated background and button

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    let existingDeviceId = localStorage.getItem('deviceId');
    if (!existingDeviceId) {
      existingDeviceId = Math.random().toString(36).substring(2);
      localStorage.setItem('deviceId', existingDeviceId);
    }
    setDeviceId(existingDeviceId);

    const init = async () => {
      const data = await startChatbot();
      setMessages([{ from: 'bot', text: data.message }]);
    };
    init();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    const response = await sendMessage(deviceId, input.trim());

    if (response.message.includes('Click Here to Pay')) {
      toast.success('Redirecting to Payment...');
      const paymentUrlMatch = response.message.match(/\((.*?)\)/);
      if (paymentUrlMatch) {
        setTimeout(() => {
          window.open(paymentUrlMatch[1], '_blank');
        }, 1500);
      }
    }

    setMessages((prev) => [...prev, { from: 'bot', text: response.message }]);
    setInput('');
  };

  const formatBotMessage = (text) => {
    if (text.includes('Select:')) {
      const lines = text.split('\n').filter(line => line.trim() !== '');
      return (
        <div className="space-y-2">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="bg-purple-50 border border-purple-200 text-gray-700 p-2 rounded-md shadow-sm"
            >
              {line}
            </div>
          ))}
        </div>
      );
    }

    if (text.includes('🍽️ Menu:')) {
      const lines = text.split('\n').filter(line => line.trim() !== '');
      return (
        <div className="space-y-2">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className="bg-blue-50 border border-blue-200 text-gray-700 p-2 rounded-md shadow-sm"
            >
              {line}
            </div>
          ))}
        </div>
      );
    }

    return text.split('\n').map((line, idx) => <div key={idx}>{line}</div>);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animated-gradient">
      {/* Chat Area */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-lg shadow-2xl p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-[70vh]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-2xl max-w-[80%] whitespace-pre-line ${
                msg.from === 'bot'
                  ? 'bg-gray-200 text-gray-800 self-start'
                  : 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white self-end'
              } shadow-md`}
            >
              {msg.from === 'bot' ? formatBotMessage(msg.text) : msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Type your choice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="gradient-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
