import React, {Component} from 'react';
import './Welcome.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import FacebookLogin from "./Welcome";
import signup from "./signup";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        };
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
        await axios.post("http://localhost:5000/signup", {
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
    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {

            window.location.href ='http://localhost:3000/';

        }

        return (

            <div>
                <h1 style={{marginLeft:"36%", color:"white"}}>Welcome to todo application</h1>


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
                            <button style={{color:"white"}} onClick={this.handleSubmit.bind(this)}>Signup</button>
                            <Link to={{pathname : "/"}}>
                            <button style={{color:"white"}} >Login</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Signup;
