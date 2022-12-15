import {Component} from 'react'

import {Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaUser} from 'react-icons/fa'

import {RiLockPasswordFill} from 'react-icons/ri'

import {signInWithEmailAndPassword} from 'firebase/auth'

import auth from '../Firebase'

import SignInForm from '../SignUp'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  successfulLogin = jwtToken => {
    Cookies.set(
      'jwt_token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU',
      {expires: 2},
    )
    const {history} = this.props
    history.replace('/')
  }

  onSubmitBtn = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        this.successfulLogin()
      })
      .catch(error => {
        alert('Invalid Email or Password')
      })

    // const url = 'https://apis.ccbp.in/login'
    // const options = {
    //   method: 'POST',
    //   body: JSON.stringify(userDetails),
    // }

    // const url = 'https://sekharslogin.onrender.com/login'
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userDetails),
    // }

    // const response = await fetch(url, options)
    // const data = await response.json()

    // if (response.ok === true) {
    //   this.successfulLogin(data.jwt_token)
    // } else {
    //   this.setState({errorMsg: data.error_msg})
    //   //   this.setState({errorMsg: data.user_msg})
    // }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <img
          className="side-img"
          alt="website login"
          src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670585883/Rectangle_1467_1_x1oqzd.png"
        />
        <div className="side-container">
          <form onSubmit={this.onSubmitBtn} className="form-container">
            <img
              className="logo-img"
              alt="login website logo"
              src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670586896/Group_7731_hekhuj.png"
            />
            <div className="user-input-container">
              <label htmlFor="username" className="login-label">
                Username*
              </label>
              <div className="input-icon-container">
                <FaUser className="user-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={this.getUsername}
                  id="username"
                  className="login-input"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="user-input-container">
              <label htmlFor="password" className="login-label">
                Password*
              </label>
              <div className="input-icon-container">
                <RiLockPasswordFill className="user-icon" />
                <input
                  value={password}
                  onChange={this.getPassword}
                  type="password"
                  id="password"
                  className="login-input"
                  placeholder="password"
                />
              </div>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <Link to="/sign-up">
              <button type="button" className="sign-up-btn">
                SignUp
              </button>
            </Link>
            <p className="error-msg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage
