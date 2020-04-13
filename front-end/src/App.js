import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import CardContainerPage from './components/CardContainer';
import FavoritesPage from './components/FavoritesPage';
import DetailedPage from './components/DetailedPage';
import SearchPage from './components/SearchPage';
import { Provider, Consumer } from './components/Context';

class App extends Component {
  state = {
    checked: localStorage.getItem('checked') !== "false"
  }

  callbackFunction = (childData) => {
    localStorage.setItem('checked', childData.toString());
    this.setState({checked : childData});
  }

  render() {
    return (
      <Provider>
        <Consumer>
          {(context) => (
            <BrowserRouter>
              <React.Fragment>
                <Navbar checked={this.state.checked} parentCallback={this.callbackFunction}></Navbar>
                <main className="main-content">
                  <Switch>
                    {<Redirect from="/" to="/home" exact />}
                    <Route path="/favorites" component={FavoritesPage} />
                    <Route path="/article" component={(props)=> <DetailedPage {...props} checked={this.state.checked} id={context.state.article}/>}/>
                    <Route path="/search" component={(props)=> <SearchPage {...props} checked={this.state.checked} searchItem={context.state.searchItem}/>}/>
                    <Route exact path="/:section" component={(props)=> <CardContainerPage {...props} checked={this.state.checked}  />}/>
                  </Switch>
                </main>
              </React.Fragment>
            </BrowserRouter>
          )}
        </Consumer>
      </Provider>
     
    );
  }
}

export default App;
