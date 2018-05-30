export const ROUTE_POST_LIST = 'ROUTE_POST_LIST';
export const ROUTE_POST_EDIT = 'ROUTE_POST_EDIT';
export const ROUTE_POST_CREATE = 'ROUTE_POST_CREATE';

// Routes are defined here, and consumed in `configureStore` via `redux-first-router`
// The keys in the routesMap will be defined as actions, which are dispatched to switch routes
const routesMap = {
  [ ROUTE_POST_LIST ]: '/',
  [ ROUTE_POST_EDIT ]: '/posts/:id/edit',
  [ ROUTE_POST_CREATE ]: '/posts',
};

export default routesMap;
