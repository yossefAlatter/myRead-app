import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home.js';
import Search from './views/Search.js';
import NotFound from './views/NotFound';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
  }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route component={NotFound} />
          </Switch>
      </div>
    )
  }
}

export default BooksApp
