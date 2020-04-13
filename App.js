import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import CardContainerPage from './components/CardContainer';
import FavoritesPage from './components/FavoritesPage';
import DetailedPage from './components/DetailedPage';

// const myContext = React.createContext();

// class MyProvider extends Component {
//   state = {
//     switch: true
//   }
//   reder() {
//     return (
//       <
//     )
//   }
// }

class App extends Component {
  state = {
    checked: true,
    switchShow: true
  }

  callbackFunction = (childData) => {
    this.setState({checked: childData})
  }

  callbackSwitchFunction = (childData) => {
    alert("APP: " + childData);
    this.setState({switchShow: childData});
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navbar parentCallback={this.callbackFunction} switchShow={this.state.switchShow}></Navbar>
          <main className="main-content">
            <Switch>
              {<Redirect from="/" to="/home" exact />}
              <Route exact path="/favorites" component={FavoritesPage} />
              <Route exact path="/:section" component={(props)=> <CardContainerPage {...props} checked={this.state.checked} parentSwitchCallback = {this.callbackSwitchFunction}/>}/>
              <Route path="/id/:id" component={(props)=> <DetailedPage {...props} checked={this.state.checked}/>}/>
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
