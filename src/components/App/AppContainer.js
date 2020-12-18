import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';

/* @Selectors */
import { getLanguage } from 'reduxStore/app/selectors';

/* @Actions */
import { setLanguage } from 'reduxStore/app/actions';

/* @Components */
import AppComponent from './AppComponent';

const propTypes = {
  language: string,
  setLanguageAction: func,
};

const AppContainer = ({ language, setLanguageAction }) => {
  /* Handlers */
  const handleChangeLanguage = lang => setLanguageAction(lang);

  return <AppComponent language={language} onChangeLanguage={handleChangeLanguage} />;
};

AppContainer.propTypes = propTypes;

AppContainer.displayName = 'AppContainer';

AppContainer.defaultProps = {
  language: 'en',
};

const mapStateToProps = state => ({
  language: getLanguage(state),
});

const mapDispatchToProps = {
  setLanguageAction: setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
