import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware  from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import * as reducers from './reducers';
import { watchItems } from './sagas';

// import DevTools from './DevTools'; // decide about folder

import { composeWithDevTools } from 'redux-devtools-extension';

//const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const composeEnhancers = null || compose;

const rootReducer = combineReducers({
    item: reducers.itemReducer,
    // something: somethingReducer,
});

const sagaMiddleware = new createSagaMiddleware();

//const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer, 
    //composeEnhancers(
        composeWithDevTools(
            applyMiddleware(thunk, sagaMiddleware),
            //DevTools.instrument()
        )
    //)
);

sagaMiddleware.run(watchItems);
// sagaMiddleware.run(watchSomething);


export default store;