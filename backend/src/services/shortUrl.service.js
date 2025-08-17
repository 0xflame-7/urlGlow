import { saveShortUrl } from "../dao/shortUrl.js";
import { generateNanoId } from "../utils/helper.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = await generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL not generated");
  saveShortUrl(shortUrl, url, null);
  return shortUrl;
};

export const createShortUrlWithUser = async (url, userId) => {
  const shortUrl = await generateNanoId(7);
  saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
