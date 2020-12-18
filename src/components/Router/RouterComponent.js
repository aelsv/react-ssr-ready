import { renderRoutes } from 'react-router-config';

/* Helpers */
import RouterHelper from 'routes/RouteHelpers';

const RouterComponent = () => {
  const routers = new RouterHelper().getRoutes();

  return renderRoutes(routers);
};

RouterComponent.displayName = 'RouterComponent';

export { RouterComponent };
