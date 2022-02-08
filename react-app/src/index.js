import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from "./store/session";
import * as projectActions from "./store/projects";
import * as stepActions from "./store/steps";
import * as categoryActions from "./store/categories";
import * as commentActions from "./store/comments";
import * as draftActions from "./store/draft";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	window.store = store;
	window.sessionActions = sessionActions;
	window.projectActions = projectActions;
	window.stepActions = stepActions;
	window.categoryActions = categoryActions;
	window.commentActions = commentActions;
	window.draftActions = draftActions;
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
