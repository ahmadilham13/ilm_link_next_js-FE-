import axios from "axios";
import api from "..";
import { FormData } from "formdata-node";

const ENDPOINT = {
  UPLOAD: "/upload",
  GETFILE: "/upload/files",
};

const uploadMedia = async (media) => {
  try {
    const form = new FormData();
    form.append("files", media, media.name);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.UPLOAD}`;

    const response = await axios.post(url, form);
    return {
      status: response.status,
      id: response.data[0].id,
    };
  } catch (err) {
    return {
      status: err.response.status,
      message: err.response.data.error.message,
    };
  }
};

const getAllMedia = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api${ENDPOINT.GETFILE}`;

    const response = await api.get(url);
    return response;
  } catch (err) {
    throw Error(err);
  }
};

export { uploadMedia, getAllMedia };
