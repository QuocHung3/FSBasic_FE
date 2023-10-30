import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import {handleLogin} from '../../services/userService'
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      errMessage: ""
    };
  }

  handleChangeValueUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleChangeValuePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleTogglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleLogin =async () => {
    this.setState({
      errMessage: ''
    })
    try{
      let data = await handleLogin(this.state.username,this.state.password);
      if(data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage
        })
      }
      if(data && data.errCode == 0) {
        this.props.userLoginSuccess(data.user)
        console.log("login success")
      }

      

      
    }catch(error) {
      if(error.response) {
        if(error.response.data) {
          this.setState({
            errMessage: error.response.data.errMessage
          })
        }
      }
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center">Login</div>
            <div className="col-12 form-group">
              <label>User name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={(event) => this.handleChangeValueUserName(event)}
              />
            </div>

            <div className="col-12 form-group">
              <label>Password</label>
              <div className="passwordCont">
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) => this.handleChangeValuePassword(event)}
                />
                <span onClick={() => this.handleTogglePassword()}>
                  <i className="fa-solid fa-eye eye-icon"></i>
                </span>
              </div>
            </div>
            <div className="col-12">{this.state.errMessage}</div>
            <div className="col-12">
              <button onClick={() => this.handleLogin()}>Login</button>
            </div>
            <div className="col-12">
              <span>Forgot your password</span>
            </div>
            <div className="col-12"></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
