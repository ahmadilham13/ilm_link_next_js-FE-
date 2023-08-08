import axios from "axios";
import api from "..";

const ENDPOINT = {
  LINK: "/links",
  USER: "/users",
};

const getAllLinks = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.LINK}?populate=*`;

    const response = await api.get(url);
    return response;
  } catch (err) {
    throw Error(err);
  }
};

const updateLinkUser = async (userId, userData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.USER}/${userId}`;

    const response = await axios.put(url, userData);
    return {
      status: response.status,
      message: response.statusText,
      data: response,
    };
  } catch (err) {
    return {
      status: err.response.status,
      message: err.response.data.error.message,
    };
  }
};

export { getAllLinks, updateLinkUser };
