import { fetchTrending } from "./trendingFetch";

export const TrendingWeek = (key) => {
  const TrendingWeek = `
       <div class="trendingWeek container">
       </div>
      `;

  fetchTrending(key, "trendingWeek");

  return TrendingWeek;
};
