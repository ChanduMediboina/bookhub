import {Component} from 'react'

import {Link} from 'react-router-dom'

import {createUserWithEmailAndPassword} from 'firebase/auth'
import auth from '../Firebase'

import './index.css'

class SignInForm extends Component {
  state = {
    username: '',
    gender: '',
    location: '',
    password: '',
  }

  onSubmitBtn = async event => {
    event.preventDefault()

    const {username, gender, location, password} = this.state
    const userDetails = {username, gender, location, password}
    createUserWithEmailAndPassword(auth, username, password)
      .then(userCredentials => {
        alert('User Created Successfully')
      })
      .catch(error => {
        alert('Invalid Email or Password')
        console.log(error)
      })
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userDetails),
    // }
    // const url = 'https://sekharslogin.onrender.com/register/'
    // const response = await fetch(url, options)
    // const data = await response.json()
    // // console.log(data)
    // if (response.ok === true) {
    //   this.setState({successMsg: data.user_msg, errorMsg: ''})
    // } else {
    //   this.setState({errorMsg: data.error_msg, successMsg: ''})
    // }
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getGender = event => {
    this.setState({gender: event.target.value})
  }

  getLocation = event => {
    this.setState({location: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      username,
      successMsg,
      errorMsg,
      gender,
      location,
      password,
    } = this.state

    return (
      <div className="sign-in-container">
        <form onSubmit={this.onSubmitBtn} className="card-container">
          <label htmlFor="username">Username</label>
          <input
            placeholder="Email"
            onChange={this.getUsername}
            type="text"
            id="username"
            value={username}
          />
          <label htmlFor="gender">gender</label>
          <select
            placeholder="Enter Gender"
            value={gender}
            onChange={this.getGender}
            id="gender"
          >
            <option defaultValue value="Male">
              Male
            </option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          <label htmlFor="location">Location</label>
          <input
            placeholder="Enter Location"
            onChange={this.getLocation}
            type="text"
            id="location"
            value={location}
          />
          <label htmlFor="password">Create Password</label>
          <input
            placeholder="Enter Password"
            onChange={this.getPassword}
            type="text"
            id="password"
            value={password}
          />
          <button type="submit" className="sign-in-button">
            Create
          </button>
          <Link to="/login">
            <button type="button" className="login-to-btn">
              Login
            </button>
          </Link>
          <p className="success">{successMsg}</p>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default SignInForm
