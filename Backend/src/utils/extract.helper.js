function extractCaptionAndHashtags(aiText) {
  // Match hashtags (words starting with #)
  const hashtags = aiText.match(/#\w+/g) || [];

  // Remove hashtags from the caption text
  const captionText = aiText.replace(/#\w+/g, "").trim();

  return {
    captionText,
    hashtags
  };
}

module.exports = extractCaptionAndHashtags;