import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchMovie } from "../actions";
import Loader from "../components/Loader";
import BackdropContainer from "../components/BackdropContainer";
import MovieInfo from "../components/MovieInfo";

import { isMovieFetching, getMovieInfo } from "../selectors";

const mapStateToProps = (state, ownProps) => ({
  movie: getMovieInfo(state),
  loading: isMovieFetching(state),
  movieId: ownProps.match.params.id
});

@connect(mapStateToProps, { fetchMovie })
export default class Movie extends Component {
  componentDidMount() {
    const { movieId, fetchMovie } = this.props;
    fetchMovie(movieId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieId !== this.props.movieId) {
      this.props.fetchMovie(nextProps.movieId);
    }
  }

  render() {
    const { movie, loading, children } = this.props;

    return (
      <Loader loading={loading}>
        <BackdropContainer backdropPath={movie.backdropPath}>
          <MovieInfo {...movie} />
        </BackdropContainer>
        {children}
      </Loader>
    );
  }
}
