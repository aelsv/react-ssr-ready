import React from 'react';
import { func } from 'prop-types';

const propTypes = {
  onGoToDocsView: func,
};

const HomeComponent = ({ onGoToDocsView }) => (
  <div>
    <h1>Hello from Home view!!</h1>
    <button type="button" onClick={onGoToDocsView}>
      Go to docs
    </button>
  </div>
);

HomeComponent.propTypes = propTypes;

HomeComponent.displayName = 'HomeComponent';

export default HomeComponent;
