import axios from "axios";

const BASE = "https://face-recognation-robot-api.onrender.com";

async function handleResponse(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  } else {
    const message = res.data?.message || `Error ${res.status}`;
    const error = new Error(message);
    error.response = res; 
    throw error;
  }
}

export const signIn = async (email, password) => {
  const res = await axios.post(
    `${BASE}/signin`,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return handleResponse(res);
};

export const registerUser = async (name, email, password) => {
  const res = await axios.post(
    `${BASE}/register`,
    { name, email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  // const res = await fetch(`${BASE}/register`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name, email, password }),
  // });
  return handleResponse(res);
};

export const getProfile = async (userId) => {
  const res = await fetch(`${BASE}/profile/${encodeURIComponent(userId)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};

/*
  POST /image
  - body: { imageUrl }  OR you can adapt to your backend shape (e.g. { id } )
  - typical server returns updated user or entries count
*/
export const submitImage = async (id) => {
  const res = await axios.put(
    `${BASE}/image`,
    { id },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  // const res = await fetch(`${BASE}/image`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ imageUrl }),
  // });
  return handleResponse(res);
};

export default {
  signIn,
  registerUser,
  getProfile,
  submitImage,
};
