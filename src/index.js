import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const middleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    router: routerReducer,
  }),
  composeEnhancers(
    applyMiddleware(middleware)
  )
)

const Home = () => (
  <div>
    Home
  </div>
)

const About = () => (
  <div>
    About
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr/>

        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
