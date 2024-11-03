import { API_BASE } from "./constants";
import { headers } from "./headers";
import * as storage from "@/lib/utilities/storage";

/*
 * Class representing the API for profile-related actions
 */
export default class ProfileAPI {
  apiBase = "";
  apiProfile = "";

  /**
   * Creates an instance of ProfileAPI.
   * @param {string} [apiBase=API_BASE] - The base URL for the API.
   */
  constructor(apiBase = API_BASE) {
    this.apiBase = apiBase;
    this.apiProfile = `${apiBase}/social/profiles`;
  }

  /**
   * Handles API responses and redirects to "/" if a 401 Unauthorized error is encountered.
   * @param {Response} res - The fetch response object.
   * @returns {Promise<Object>} - The JSON data if response is ok.
   * @throws Will throw an error if the response is not ok and not a 401.
   */
  handleResponse = async (res) => {
    if (res.status === 401) {
      window.location.href = "/";
      throw new Error("Unauthorized - Redirecting to home page.");
    }
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} ${errorText}`);
    }
    return res.json();
  };

  /**
   * Generic method to handle API requests.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} [method="GET"] - The HTTP method for the request (GET, POST, PUT, DELETE).
   * @param {Object} [body=null] - The request body for POST/PUT requests.
   * @returns {Promise<Object>} - The JSON response from the API.
   * @throws Will throw an error if the request fails.
   */
  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      return await this.handleResponse(res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  profile = {
    // Returns data from a specific user based on its id (username)
    read: async (username) => {
      const endpoint = `${this.apiProfile}/${username}?_following=true&_followers=true`;
      return await this.fetchData(endpoint);
    },

    // Returns data for all users
    readAll: async () => {
      const endpoint = `${this.apiProfile}?_following=true&_followers=true`;
      return await this.fetchData(endpoint);
    },

    // Allows a logged-in user to update their profile
    update: async (username, formData) => {
      const endpoint = `${this.apiProfile}/${username}`;
      return await this.fetchData(endpoint, "PUT", formData);
    },

    // Returns all posts by a user based on the username
    readPosts: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/posts?_comments=true&_author=true&_reactions=true`;
      return await this.fetchData(endpoint);
    },

    // Allows a user to follow another user
    follow: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/follow`;
      return await this.fetchData(endpoint, "PUT");
    },

    // Allows a user to unfollow another user
    unfollow: async (username) => {
      const endpoint = `${this.apiProfile}/${username}/unfollow`;
      return await this.fetchData(endpoint, "PUT");
    },

    // Returns user data based on a search query
    search: async (query) => {
      const endpoint = `${this.apiProfile}/search?q=${query}`;
      return await this.fetchData(endpoint);
    },

    // Sign out the user by clearing storage and redirecting
    signOut: async () => {
      try {
        storage.remove("user");
        storage.remove("token");
      } catch (err) {
        console.error(err);
      } finally {
        window.location.href = "/";
      }
    },
  };
}
