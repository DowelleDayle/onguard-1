import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../lib/firebase"; // Firestore instance
import styles from "../css/PostsList.module.css"; // Custom CSS file

const PostsList = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    try {
      const postsCollection = collection(firestore, "posts");
      const q = query(postsCollection, orderBy("createdAt", "desc")); // Order by date (newest first)
      const snapshot = await getDocs(q);

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.PostsList}>
      <h2>Recent Posts</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className={styles.Post}>
              <h3>{post.headline}</h3>
              <p>{post.description}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.headline}
                  className={styles.Image}
                />
              )}
              <span className={styles.Date}>
                {new Date(post.createdAt.seconds * 1000).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
