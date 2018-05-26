import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  container: {
    width: "100%"
  },
  spinner: {
    margin: "70px auto",
    display: "block"
  }
};

const Loader = ({ loading, children }) => (
  <div style={styles.container}>
    {loading ? (
      <CircularProgress style={styles.spinner} size={60} thickness={5} />
    ) : (
      children
    )}
  </div>
);

export default Loader;
