import { fetchTrending } from "./trendingFetch";

export const TrendingDay = (key) => {
  const TrendingDay = `<div class="trendingToday container"></div>`;

  fetchTrending(key, "trendingToday");

  return TrendingDay;
};
