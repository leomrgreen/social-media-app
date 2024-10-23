// api/noroffAPI.js
import { API_BASE } from "./constants";
import { headers } from "./headers";
import * as storage from "../utilities/storage";

class NoroffAPI {
  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiLogin = `${apiBase}/auth/login`;
  }

  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });
      console.log("Body:", body); // keep for now
      try {
        const res = await fetch(this.apiLogin, {
          method: "POST",
          headers: headers(),
          body,
        });
        const data = await res.json();
        if (res.ok) {
          storage.save("token", data.data.accessToken);
          storage.save("user", data.data);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  };
}

export default NoroffAPI;
