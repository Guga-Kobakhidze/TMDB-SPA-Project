import { fetchTrending } from "./trendingFetch";

export const TrendingDay = () => {
  const TrendingDay = `<div class="trending container"></div>`;

  fetchTrending("day");

  return TrendingDay;
};
