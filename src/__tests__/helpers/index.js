import React from 'react';
import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from 'redux/configureStore';
import { Provider as ReduxStoreProvider } from 'react-redux';


export function delay( ms ) {
  return new Promise((resolve /* , reject */) => {
    setTimeout(resolve, ms);
  });
}

export function wrapWithReduxProvider( Component, initialState = {}, initialUrl = '/') { // eslint-disable-line
  const history = createMemoryHistory({ initialEntries: [ initialUrl ] });
  const store = configureStore( initialState, history );

  return (
    <ReduxStoreProvider store={store} >
      { Component }
    </ReduxStoreProvider>
  );
}
