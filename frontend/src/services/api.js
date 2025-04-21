import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5005/api/chatbot',
});

export const startChatbot = async () => {
  const res = await API.get('/start');
  return res.data;
};

export const sendMessage = async (deviceId, userInput) => {
  const res = await API.post('/message', { deviceId, userInput });
  return res.data;
};
