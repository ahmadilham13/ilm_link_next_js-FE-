import axios from "axios";
import api from "..";

const ENDPOINT = {
  REGISTER: "/auth/local/register",
  AUTH: "/auth/local",
  USER: "/users",
};

// for create new user
const createUser = async (data) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.REGISTER}`;

    const response = await axios.post(url, data);
    return {
      status: response.status,
      message: response.statusText,
    };
  } catch (err) {
    return {
      status: err.response.status,
      message: err.response.data.error.message,
    };
  }
};

// for login user
const authorizationUserLogin = async (data) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.AUTH}`;

    const response = await axios.post(url, data);
    return {
      status: response.status,
      message: response.statusText,
      jwt: response.data.jwt,
      id: response.data.user.id,
      username: response.data.user.username,
    };
  } catch (err) {
    return {
      status: err.response.status,
      message: err.response.data.error.message,
    };
  }
};

// get all user
const getAllUsers = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.USER}`;

    const response = await api.get(url);
    return response;
  } catch (err) {
    throw Error(err);
  }
};

// get user
const getUser = async (username) => {
  if (!username) {
    return;
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.USER}`;
    const params = `?filters[username][$eqi]=${username}&populate=*`;

    const response = await api.get(`${url}${params}`);

    return response;
  } catch (err) {
    throw Error(err);
  }
};

export { createUser, authorizationUserLogin, getUser, getAllUsers };
