import { createSelector } from "reselect";

export const isLoggedIn = state => state.session.isLoggedIn;
export const isLogginIn = state => state.session.isLogginIn;
export const getAuthError = state => state.session.error;
export const getNextLocation = state =>
  state.router.location.state.nextLocation;

export const isMovieFetching = state => state.movie.isFetching;
export const getMovieInfo = state => state.movie.info;

export const isMoviesFetching = state => state.movies.isFetching;
export const getMovies = state => state.movies.items;

const getSearchParams = search => {
  const params = new URLSearchParams(search);
  return params.get("search");
};

export const getMoviesSearch = state => state.router.location.search;
export const getMoviesSearchQuery = state =>
  getSearchParams(getMoviesSearch(state));

export const getSearchMovieCount = createSelector(
  getMovies,
  movies => movies.length
);

export const getSearchMoviesVoteAverage = createSelector(
  getMovies,
  getSearchMovieCount,
  (movies, count) =>
    movies.reduce((sum, movie) => sum + movie.voteAverage, 0) / count
);
