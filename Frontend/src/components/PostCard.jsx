// components/PostCard.jsx
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { useState, memo } from "react";
import Avatar from "./Avatar";

// Memoized PostCard component to prevent unnecessary re-renders
const PostCard = memo(function PostCard({ post, onToggleSave }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    createdBy,
    captionText,
    hashtags = [],
    imageUrl,
    createdAt,
    isSaved,
  } = post;

  return (
    <div className="flex gap-3 p-4 border-b">
      {/* Left column: user avatar - using optimized component */}
      <Avatar user={createdBy} size="md" />

      {/* Right column */}
      <div className="flex-1">
        {/* Name */}
        <p className="font-semibold">
          {createdBy?.firstname} {createdBy?.lastname}
        </p>

        {/* Caption */}
        <p className="mt-1">{captionText}</p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 text-blue-500 mt-1">
          {hashtags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>

        {/* Uploaded image - further optimized loading */}
        {imageUrl && (
          <div className="mt-2 rounded-lg max-h-80 relative overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
            )}
            <img
              src={imageUrl}
              alt="Post"
              loading="lazy"
              width="100%"
              height="auto"
              decoding="async"
              fetchPriority="low"
              className={`rounded-lg max-h-80 object-cover ${
                imageLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
              onLoad={() => {
                window.requestAnimationFrame(() => {
                  setImageLoaded(true);
                });
              }}
            />
          </div>
        )}

        {/* Footer: date + bookmark */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>{new Date(createdAt).toLocaleDateString()}</span>

          <button onClick={() => onToggleSave(post._id)}>
            {isSaved ? (
              <MdBookmark className="text-xl text-blue-600" />
            ) : (
              <MdBookmarkBorder className="text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
