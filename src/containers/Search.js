import { connect } from "react-redux";
import { push } from "react-router-redux";
import React, { Component, Fragment } from "react";

import { searchMovies } from "../actions";
import {
  isMoviesFetching,
  getMovies,
  getMoviesSearchQuery,
  getSearchMovieCount,
  getSearchMoviesVoteAverage
} from "../selectors";

import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import MovieGrid from "../components/MovieGrid";

const styles = {
  contaner: {
    height: "100%",
    maxWidth: 800,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    margin: "0 auto"
  }
};

const mapStateToProps = state => ({
  movies: getMovies(state),
  movieCount: getSearchMovieCount(state),
  voteAverage: getSearchMoviesVoteAverage(state),
  loading: isMoviesFetching(state),
  search: getMoviesSearchQuery(state)
});

@connect(mapStateToProps, { searchMovies, push })
export default class Search extends Component {
  componentDidMount() {
    const { search, searchMovies } = this.props;

    if (search) {
      searchMovies(search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search) {
      this.props.searchMovies(nextProps.search);
    }
  }

  handleSearch = search => {
    const { location } = this.props;

    this.props.push({
      pathname: location.pathname,
      search: `?search=${search}`
    });
  };

  render() {
    return (
      <Fragment>
        <SearchBox search={this.props.search} onSearch={this.handleSearch} />
        <div style={styles.contaner}>
          <Loader loading={this.props.loading}>
            {this.props.movieCount && (
              <p style={{ marginTop: 70 }}>
                Found {this.props.movieCount} movies
                <br />
                Av. vote {Math.round(this.props.voteAverage * 100) / 100}
              </p>
            )}
            <MovieGrid movies={this.props.movies} />
          </Loader>
        </div>
      </Fragment>
    );
  }
}
