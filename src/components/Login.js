import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {facebookAuthProvider, fireAuth} from '../shared/firebase';

const loginStyles = {
  width: '90%',
  maxWidth: '315px',
  margin: '20px auto',
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px',
};

export default class Login extends Component {

  state = {
    redirect: false,
  };

  authWithFacebook = () => {
    fireAuth.signInWithPopup(facebookAuthProvider)
      .then((result, error) => {
        if (error) {
          console.log(error);
          // this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
        } else {
          this.setState({redirect: true});
        }
      });
  };

  authWithEmailPassword = (event) => {
    event.preventDefault();
    console.table([{
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }]);
  };

  render() {
    const {from} = this.props.location.state || {from: {pathname: '/'}};
    const {redirect} = this.state;

    if (redirect) {
      return (
        <Redirect to={from}/>
      );
    }

    return (
      <div style={loginStyles}>
        <button style={{width: '100%'}} className="pt-button pt-intent-primary" onClick={this.authWithFacebook}>Log In
          with Facebook
        </button>
        {/*<hr style={{marginTop: "10px", marginBottom: "10px"}} />*/}
        {/*<form onSubmit={this.authWithEmailPassword}*/}
        {/*ref={(form) => { this.loginForm = form }}>*/}
        {/*<div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">*/}
        {/*<h5>Note</h5>*/}
        {/*If you've never logged in, this will create your account.*/}
        {/*</div>*/}
        {/*<label className="pt-label">*/}
        {/*Email*/}
        {/*<input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"></input>*/}
        {/*</label>*/}
        {/*<label className="pt-label">*/}
        {/*Password*/}
        {/*<input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password"></input>*/}
        {/*</label>*/}
        {/*<input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>*/}
        {/*</form>*/}
      </div>
    );
  }
}