import { addBlog } from "@/services/blog";

/*
  Fetching all DummyJSON's posts object & seeding to supabase's blogs table
*/
const fetchAllPostsLimit = async () => {
  const limit = 30;
  const totalPosts = 150;
  const fetchPromises = [];

  for (let skip = 0; skip < totalPosts; skip += limit) {
    fetchPromises.push(
      fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
    );
  }
  return Promise.all(fetchPromises)
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => {
      const posts = data.flat();
      return posts;
    })
    .catch((error) => {
      console.error("Error fetching posts :", error);
      throw error;
    });
};

const addPostsToBlogs = async () => {
  const postsLimit = await fetchAllPostsLimit();
  for (const postsData of postsLimit) {
    try {
      const { posts } = postsData;
      const supabasePosts = posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,
        tags: post.tags,
        reactions: post.reactions,
      }));

      for (const post of supabasePosts) {
        addBlog(post);
      }
      console.log("Successfully populated 30 posts");
    } catch (error) {
      console.log("Failed to populate 30 batches.", error);
    }
  }
};

addPostsToBlogs();
