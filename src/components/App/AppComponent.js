import React from 'react';
import { string, func } from 'prop-types';

/* @Components */
import { Router } from 'components/Router';

/* @Styles */
import css from './App.scss';

const propTypes = {
  language: string,
  onChangeLanguage: func,
};

const AppComponent = ({ language, onChangeLanguage }) => (
  <div data-lang={language} className={css.wrapper}>
    <button type="button" onClick={() => onChangeLanguage(language)}>
      Change language
    </button>
    <Router />
  </div>
);

AppComponent.propTypes = propTypes;

AppComponent.displayName = 'AppComponent';

export default AppComponent;
