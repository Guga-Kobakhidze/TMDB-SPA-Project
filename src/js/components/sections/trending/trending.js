import { fetchTrending } from "./trendingFetch";

export const Trending = () => {
  const trending = `<div class="trending container"></div>`;

  fetchTrending("day");

  return trending;
};
