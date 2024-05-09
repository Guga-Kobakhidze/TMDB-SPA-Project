export const modules = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGIyODM4YjUyMmQwNGQ3ZTZkZjFlYzJhZDMyMjlhNCIsInN1YiI6IjY2M2IzMTI0YzMwYzM1MjUxYjY3YWQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kGk_nDxUp27QPdgZokkfYCy5VQzeqInGhJlfTT4ZG-0",
  },
};

export const Fetching = async (category, title) =>
  fetch(`https://api.themoviedb.org/3/${category}/${title}`, modules).then(
    (response) => response.json()
  );
