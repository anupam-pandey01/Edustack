import api from "./api";
import { setAccessToken } from "./tokenService";

export const login = async (data) => {
  const res = await api.post("/login", data);

  setAccessToken(res.data.accessToken);

  return res;
};

export const signup = async (data) =>{
  console.log(data)
  const res = await api.post("/register", data);

  return res;
}