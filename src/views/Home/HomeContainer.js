import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'connected-react-router';
import { func } from 'prop-types';

/* @Components */
import HomeComponent from './HomeComponent';

const propTypes = {
  push: func,
};

const HomeContainer = ({ push }) => {
  /* Handlers */
  const handleGoToDocsView = () => push({ pathname: '/docs' });

  return <HomeComponent onGoToDocsView={handleGoToDocsView} />;
};

HomeContainer.propTypes = propTypes;

HomeContainer.displayName = 'HomeContainer';

const mapDispatchToProps = {
  push: pushAction,
};

export default connect(null, mapDispatchToProps)(HomeContainer);
