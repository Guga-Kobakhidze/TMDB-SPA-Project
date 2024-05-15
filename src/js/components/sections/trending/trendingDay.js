import { fetchTrending } from "./trendingFetch";

export const TrendingDay = (key) => {
  const trendingDay = `
       <div class="trendingToday container">
       </div>
      `;

  fetchTrending(key, "trendingToday");

  return trendingDay;
};
