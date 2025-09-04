import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import api from '../utils/api'


function Bookmarks() {
  const [savedPosts, setSavedPosts] = useState([]);
  const { user } = useAuth();

   useEffect(() => {
    async function fetchSaved() {
      try {
        const res = await api.get("/caption/getCaption"); // ✅ use api
        const saved = res.data.captions.filter((caption) => caption.isSaved);
        setSavedPosts(saved);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    }
    fetchSaved();
  }, []);

  // ✅ toggle save from bookmarks
  async function handleToggleSave(postId) {
    try {
      const res = await api.patch(`/caption/save/${postId}`); // ✅ use api
      const updated = res.data.captionDoc;

      setSavedPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, isSaved: updated.savedBy.includes(user._id) }
            : p
        )
      );
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  }

  return (
    <div className="p-4 space-y-4">
      {savedPosts.length === 0 && <p>No bookmarks yet</p>}
      {savedPosts.map(post => (
        <PostCard 
          key={post._id} 
          post={post} 
          onToggleSave={handleToggleSave} // now defined
        />
      ))}
    </div>
  );
}

export default Bookmarks;
