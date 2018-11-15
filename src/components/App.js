import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fireAuth} from '../shared/firebase';
import HeaderPrimary from './HeaderPrimary/index';
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import '../shared/css/App.css';
import {userAuthStateChanged} from '../shared/reducers/user';

const mapStateToProps = state => state;
const mapDispatchToProps = {userAuthStateChanged};

class App extends Component {

  componentWillMount() {
    this.removeAuthListener = fireAuth.onAuthStateChanged(this.props.userAuthStateChanged);
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    return (
      <div className="App">
        <HeaderPrimary/>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);