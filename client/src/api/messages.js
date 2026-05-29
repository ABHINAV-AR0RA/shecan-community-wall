import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMessages = async () => {
  const response = await api.get('/messages');
  // Backend returns { success, count, data } — extract the messages array
  return response.data?.data || response.data;
};

export const createMessage = async (data) => {
  const response = await api.post('/messages', data);
  return response.data?.data || response.data;
};

export const likeMessage = async (id) => {
  const response = await api.patch(`/messages/${id}/like`);
  // Backend returns { success, data } — extract the message object
  return response.data?.data || response.data;
};

export default api;
