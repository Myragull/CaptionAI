// components/Avatar.jsx
import { memo, useMemo } from "react";

// Color palette for avatars - predefined for performance
const COLORS = [
  "#4299E1", // blue-500
  "#48BB78", // green-500
  "#ED8936", // orange-500
  "#9F7AEA", // purple-500
  "#F56565", // red-500
  "#667EEA", // indigo-500
];

// Static cache for already computed initials
const initialsCache = new Map();

// Memoized Avatar component to prevent unnecessary re-renders
const Avatar = memo(function Avatar({ user, size = "md" }) {
  // Simple size mapping with static values
  const sizeStyles = useMemo(() => {
    switch (size) {
      case "sm":
        return { width: "2rem", height: "2rem", fontSize: "0.75rem" };
      case "lg":
        return { width: "3rem", height: "3rem", fontSize: "1rem" };
      default:
        return { width: "2.5rem", height: "2.5rem", fontSize: "0.875rem" };
    }
  }, [size]);

  // Calculate initials with caching for performance
  const initials = useMemo(() => {
    // Use userId as cache key if available
    const cacheKey = user?._id || JSON.stringify(user);

    // Return from cache if available
    if (initialsCache.has(cacheKey)) {
      return initialsCache.get(cacheKey);
    }

    // Calculate new initials
    let result = "...";
    if (user) {
      const first = user.firstname?.[0]?.toUpperCase() || "";
      const last = user.lastname?.[0]?.toUpperCase() || "";
      if (first || last) {
        result = first + last;
      }
    }

    // Cache the result
    initialsCache.set(cacheKey, result);
    return result;
  }, [user]);

  // Determine background color based on initials for consistent colors
  const backgroundColor = useMemo(() => {
    if (!user) return "#16171a"; // Default color

    // Use a simple hash function to get consistent color for same user
    const hash = (user._id || user.firstname + user.lastname)
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return COLORS[hash % COLORS.length];
  }, [user]);

  return (
    <div
      style={{
        ...sizeStyles,
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        color: "white",
        fontWeight: "bold",
        flexShrink: 0,
        overflow: "hidden",
      }}
      aria-label={`${user?.firstname || ""} ${user?.lastname || ""} profile`}
    >
      {initials}
    </div>
  );
});

// Ensure the cache doesn't grow too large
if (typeof window !== "undefined") {
  // Only run in browser environment
  setInterval(() => {
    if (initialsCache.size > 100) {
      initialsCache.clear();
    }
  }, 60000); // Clean every minute if needed
}

export default Avatar;
