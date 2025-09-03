// components/PostCard.jsx
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

function PostCard({ post, onToggleSave }) {
  const {
    createdBy,
    captionText,
    hashtags = [],
    imageUrl,
    createdAt,
    isSaved
  } = post;

    // if (!createdBy) return null; // or a placeholder/skeleton

  // safeguard in case createdBy is missing
  const initials = createdBy
  ? `${createdBy.firstname?.[0]?.toUpperCase() || ""}${createdBy.lastname?.[0]?.toUpperCase() || ""}` || "..."
  : "...";
console.log(createdBy)

  return (
    <div className="flex gap-3 p-4 border-b">
      {/* Left column: user initials */}
      <div className="w-10 h-10 flex items-center justify-center bg-[#16171a] rounded-full font-bold text-white border border-[#2c2e33]">
        {initials}
      </div>

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

        {/* Uploaded image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="uploaded"
            className="mt-2 rounded-lg max-h-80 object-cover"
          />
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
}


export default PostCard