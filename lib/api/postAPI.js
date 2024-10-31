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

    create: async ({ title, body, tags, media }) => {
      try {
        const requestBody = JSON.stringify({ title, body, tags, media });
        console.log("Request payload:", requestBody); // Log payload for debugging

        const response = await fetch(this.apiBase, {
          headers: headers(),
          method: "POST",
          body: requestBody,
        });

        if (!response.ok) {
          // Log response status and text for more detail on server error
          const errorText = await response.text();
          console.error("Error response:", response.status, errorText);
          throw new Error(`Failed to create post: ${response.status}`);
        }

        const data = await response.json();
        window.location.href = `/post/${data.data.id}`;
        return data;
      } catch (error) {
        console.error("Error creating post:", error);
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
