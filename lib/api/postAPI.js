import { API_BASE } from "./constants";
import { headers } from "./headers";

class PostsAPI {
  constructor(apiBase = API_BASE) {
    this.apiBase = `${apiBase}/social/posts`;
  }

  async getPosts({
    page = 1,
    limit = 12,
    sort = "created",
    sortOrder = "desc",
  }) {
    try {
      const response = await fetch(
        `${this.apiBase}?_sort=${sort}&_order=${sortOrder}&page=${page}&limit=${limit}&_author=true`,
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
  }
}

export default new PostsAPI(API_BASE);
