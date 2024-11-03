import { API_BASE } from "./constants";
import { headers } from "./headers";

class PostsAPI {
  constructor(apiBase = API_BASE) {
    this.apiBase = `${apiBase}/social/posts`;
  }

  // Utility method to handle responses and redirect on 401
  handleResponse = async (response) => {
    if (response.status === 401) {
      window.location.href = "/";
      throw new Error("Unauthorized - Redirecting to home page.");
    }
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} ${errorText}`);
    }
    return response.json();
  };

  post = {
    getPosts: async ({
      page = 1,
      limit = 12,
      sort = "created",
      sortOrder = "desc",
      following = false,
    } = {}) => {
      try {
        const endpoint = following ? `${this.apiBase}/following` : this.apiBase;
        const response = await fetch(
          `${endpoint}?_sort=${sort}&_order=${sortOrder}&page=${page}&limit=${limit}&_author=true&_comments=true&_reactions=true`,
          {
            method: "GET",
            headers: headers(),
          }
        );

        return await this.handleResponse(response);
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

        return await this.handleResponse(response);
      } catch (error) {
        console.error("Error fetching single post:", error);
        throw error;
      }
    },

    create: async ({ title, body, tags, media }) => {
      try {
        const requestBody = JSON.stringify({ title, body, tags, media });
        console.log("Request payload:", requestBody);

        const response = await fetch(this.apiBase, {
          headers: headers(),
          method: "POST",
          body: requestBody,
        });

        const data = await this.handleResponse(response);
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

        return await this.handleResponse(response);
      } catch (error) {
        console.log("Error liking post:", error);
        throw error;
      }
    },

    delete: async (id) => {
      try {
        const response = await fetch(`${this.apiBase}/${id}`, {
          headers: headers(),
          method: "DELETE",
        });

        if (response.status === 204) {
          alert("Post has been deleted");
          window.location.reload();
          return;
        }

        await this.handleResponse(response);
      } catch (error) {
        console.log("Error deleting post:", error);
        throw error;
      }
    },
  };
}

export default new PostsAPI(API_BASE);
