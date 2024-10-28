import { API_BASE } from "./constants";
import { headers } from "./headers";

class PostsAPI {
  constructor(apiBase = API_BASE) {
    this.apiBase = `${apiBase}/social/posts`;
  }

  post = {
    getPosts: async ({
      page = 1,
      limit = 12,
      sort = "created",
      sortOrder = "desc",
    } = {}) => {
      try {
        const response = await fetch(
          `${this.apiBase}?_sort=${sort}&_order=${sortOrder}&page=${page}&limit=${limit}&_author=true&_comments=true&_reactions=true`,
          {
            method: "GET",
            headers: headers(),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },

    readSinglePost: async (id) => {
      try {
        const response = await fetch(
          `${this.apiBase}/${id}?_author=true&_comments=true&_reactions=true`,
          {
            method: "GET",
            headers: headers(),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }
    },

    like: async (id) => {
      try {
        const response = await fetch(`${this.apiBase}/${id}/react/👍`, {
          headers: headers(),
          method: "PUT",
          body: id,
        });
        const data = response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  };
}

export default new PostsAPI(API_BASE);
