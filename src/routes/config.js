/* @Chunks */
import { LoadHomeView, LoadDocsView } from './ChunkImporter';

/* @Constants */
import { ROUTERS_PATHS } from './paths';

/* @Views */
import NotFoundView from 'views/NotFound';
/* TODO: Add <InternalServerError /> */

export default () => [
  {
    component: LoadHomeView,
    path: ROUTERS_PATHS.HOME,
    getInitialProps: () => console.log('init action for Home View'),
    exact: true,
  },
  {
    component: LoadDocsView,
    path: ROUTERS_PATHS.DOCS,
    getInitialProps: () => console.log('init action for Docs View'),
  },
  {
    component: NotFoundView,
  },
];
