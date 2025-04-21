import axios from 'axios';

const API = axios.create({
  baseURL: 'https://restaurant-chatbot-rv0m.onrender.com',
});

export const startChatbot = async () => {
  const res = await API.get('/start');
  return res.data;
};

export const sendMessage = async (deviceId, userInput) => {
  const res = await API.post('/message', { deviceId, userInput });
  return res.data;
};
