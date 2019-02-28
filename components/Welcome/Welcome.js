import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {PostData} from '../../services/PostData';
import './Welcome.css';
import axios from 'axios';
import {Link} from 'react-router-dom';




class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false,
      email:"",
      password:""
    };
    this.signup = this.signup.bind(this);
    //this.handlePassword = this.handlePassword.bind(this);
    //this.handleEmail = this.handleEmail.bind(this);
  }
  state={
      email: "",
    password: ""
  };

  handleEmail(e){
    this.setState({email:e.target.value});
    console.log(this.state.email);
  }

  handlePassword(e){
    this.setState({password:e.target.value});
    console.log(e.target.value);
    console.log(this.state.password);
  }

  async handleSubmit() {
    await axios.post("http://localhost:5000/login", {
          email: this.state.email,
          password: this.state.password

        },
    {
      headers: { "Content-Type": "application/json" }
    }).then(function (response) {
      if (response) {
        console.log("success", response);
          window.location.href ='http://localhost:3000/';
        return true;
      }
    })
        .catch(function (response) {
          console.log("error", response);
          return false;
        });
  }



  async signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
      };
      console.log("postdata", postData);
      await axios.post("http://localhost:5000/login",
          {
            id:postData.provider_id,
            token:postData.token,
            email: postData.email,
            name: postData.name

          },
          {
        headers: { "Content-Type": "application/json" }
      })
          .then(function (response) {
            if (response) {
              console.log("success", response);
              return true;
            }
          })
          .catch(function (response) {
            console.log("error", response);
            return false;
          });
    }

    // if (type === 'google' && res.w3.U3) {
    //   postData = {
    //     name: res.w3.ig,
    //     provider: type,
    //     email: res.w3.U3,
    //     provider_id: res.El,console.log(this.state.password);
    //     token: res.Zi.access_token,
    //     provider_pic: res.w3.Paa
    //   };
    // }

    if (postData) {
      PostData('signup', postData).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        console.log("data", responseJson);
        this.setState({redirect: true});
      });
    } else {
    }
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
          <h1 style={{marginLeft:"36%", color:"white"}}>Welcome to todo application</h1>
          <div style={{marginLeft:"39%",marginTop:"3%"}}>
          <FacebookLogin
              appId="2315322208703576"
              appSecret="21327610456339427bd1bc6a03a0b1f3"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook.bind(this)}/>
              <button type="button" className="btn  btn-fill">Login with email</button>


          </div>

          <br/><br/>

          <div className="content" id="content" style={{marginTop:"-5%"}}>
            <div className="card card-circle-chart" style={{borderRadius:"1px",marginTop:"5%",marginLeft:"39%"}}>
              <div className="col-md-12" style={{marginTop:"3%"}}>
                <div>
                  <div id='text'>
                    <p style={{color:"white"}}>USERNAME</p>
                    <input style={{width:"181%"}} type='text' value={this.state.email} placeholder='username' onChange={this.handleEmail.bind(this)} />
                  </div>
                  <div>
                    <p style={{color:"white"}}>PASSWORD</p>
                    <input style={{width:"27%"}} id='text' type='password' value={this.state.password} placeholder='password' onChange={this.handlePassword.bind(this)}/>
                  </div>
                </div>

                <button style={{color:"white"}} onClick={this.handleSubmit.bind(this)} >login</button>
                  <Link to={{pathname : "./signup"}}>
                <button style={{color:"white"}} >signup</button>
                  </Link>
              </div>
            </div>
          </div>

        </div>
    );
  }
}

export default Welcome;