import axios from "axios";

const UNSPLASH_ACCESS_KEY = "Kz_WuseOMNMNr87Vo3cMK84tMggLfoPzYO8Y2r-c7rk";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const fetchImage = async (query) => {
  try {
    const response = await unsplashApi.get("/search/photos", {
      params: { query, per_page: 1 },
    });
    const imageUrl = response.data.results[0]?.urls?.small;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
