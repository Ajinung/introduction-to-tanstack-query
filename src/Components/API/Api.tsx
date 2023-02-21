import axios from "axios";

interface postData {
  title: string;
  description: string;
}

const endpoint = "http://localhost:3400/api/post";

export const getAll = async () => {
  return await axios.get(`${endpoint}/getposts`).then((res) => res.data);
};

export const newPost = async ({ title, description }: postData) => {
  return await axios
    .post(`${endpoint}/createpost`, { title, description })
    .then((res) => res.data);
};
