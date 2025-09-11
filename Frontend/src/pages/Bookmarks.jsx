import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

function Bookmarks() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchSaved() {
      setIsLoading(true);
      try {
        const res = await api.get("/caption/getCaption"); // ✅ use api
        const saved = res.data.captions.filter((caption) => caption.isSaved);
        setSavedPosts(saved);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setIsLoading(false);
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
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading your bookmarks...</p>
        </div>
      ) : savedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-xl text-gray-400 mb-2">No bookmarks yet</p>
          <p className="text-gray-500">Save captions to view them here</p>
        </div>
      ) : (
        savedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onToggleSave={handleToggleSave}
          />
        ))
      )}
    </div>
  );
}

export default Bookmarks;
