import PostsAPI from "./postAPI"; // Consistent naming with class

export async function onCreatePost(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const postData = {
    title: formData.get("title"),
    body: formData.get("body"),
    tags: formData
      .get("tags")
      .split(/[\s,]+/)
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    media: formData.get("media-url")
      ? {
          url: formData.get("media-url"),
          alt: formData.get("media-alt"),
        }
      : null, // Ensures successful post creation without media
  };

  try {
    await PostsAPI.post.create(postData);
  } catch (error) {
    console.log("Error creating post:", error);
  }
}
