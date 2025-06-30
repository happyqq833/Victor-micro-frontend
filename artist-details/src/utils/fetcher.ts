import axios from "axios";

const api = axios.create({
  baseURL: 'https://reqres.in/',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
});

export const fetcher = async (url: string) => {
  const res = await api.get(url);
  return res.data.data;
};
