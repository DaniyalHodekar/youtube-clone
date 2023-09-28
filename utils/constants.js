export const YOUTUBE_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${
  import.meta.env.VITE_API_KEY
}&maxResults=20`;

export const VIDEO_INFO_API1 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=`;
export const VIDEO_INFO_API2 = `%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=${
  import.meta.env.VITE_API_KEY
}`;
export const SEARCH_SUGGEST_API =
  "https://corsproxy.io/?http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const RELATED_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=20&videoCategoryId=";

export const RELATED_VIDEOS_API_2 = `&key=${import.meta.env.VITE_API_KEY}`;

export const COMMENTS_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=relevance&maxResults=7";
export const LOCAL_STORAGE_KEY = "YOUTUBE_CLONE_69420";

export const YOUTUBE_SEARCH_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=`;

export const CATEGORY_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=15&chart=mostPopular&videoCategoryId=";

export const CHANNEL_API = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=${
  import.meta.env.VITE_API_KEY
}&id=`;

export const CHANNEL_DETAILS_API = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&key=${
  import.meta.env.VITE_API_KEY
}&id=`;

export const PLAYLIST_API =
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=";
