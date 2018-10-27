import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import rootReducer from './rootReducer';
import App from './App';
import {userLoggedIn} from "./actions/auth";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);
    const user = {
        token: localStorage.bookwormJWT,
        email: payload.email,
        confirmed: payload.confirmed
    };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
