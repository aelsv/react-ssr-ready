import React from 'react';
import loadable from '@loadable/component';

const loadableOptions = { fallback: <div id="progress" /> };

export const LoadHomeView = loadable(() => import(/* webpackChunkName: "Home" */ 'views/Home'), loadableOptions);

export const LoadDocsView = loadable(() => import(/* webpackChunkName: "Docs" */ 'views/Docs'), loadableOptions);
