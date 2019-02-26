import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {PostData} from '../../services/PostData';
import './Welcome.css';

import {Redirect} from 'react-router-dom';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false
    };
    this.signup = this
      .signup
      .bind(this);
  }

  signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    if (postData) {
      PostData('signup', postData).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({redirect: true});
      });
    } else {}
  }

  render() {

    if (this.state.redirect || sessionStorage.getItem('userData')) {

      window.location.href ='http://localhost:3000/';

    }

    const responseFacebook = (response) => {
      console.log("facebook console");
      console.log(response);
      this.signup(response, 'facebook');
    }

    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.signup(response, 'google');
    }

    return (

      <div>
        <h1>Welcome to todo application</h1>
            <FacebookLogin
              appId="2315322208703576"
              appSecret="21327610456339427bd1bc6a03a0b1f3"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}/>
            <br/><br/>

            <GoogleLogin

              buttonText="Login with email"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}/>
<div>
        <div>
          <p>USERNAME</p>
          <input id='text' type='text' placeholder='username'/>
        </div>
        <div>
          <p>PASSWORD</p>
          <input id='text' type='text' placeholder='password'/>
        </div>
</div>
        <button>login</button>
        <button>signup</button>

      </div>
    );
  }
}

export default Welcome;