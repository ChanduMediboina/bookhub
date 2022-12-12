import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'

import {AiOutlineClose} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {isToggle: false}

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamburgerBtn = () => {
    this.setState(prevState => ({isToggle: !prevState.isToggle}))
  }

  render() {
    const {isToggle} = this.state
    return (
      <>
        <div className="header-page-container">
          {/* website logo image */}
          <Link className="link" to="/">
            <img
              className="header-logo-img"
              alt="website logo"
              src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670586896/Group_7731_hekhuj.png"
            />
          </Link>

          <div className="home-logout-container">
            <Link to="/" className="link">
              <p className="header-home-name">Home</p>
            </Link>
            <Link to="/shelf" className="link">
              <p className="header-home-name">Bookshelves</p>
            </Link>
            <button
              onClick={this.onClickLogoutBtn}
              type="button"
              className="logout-btn"
            >
              Logout
            </button>
          </div>
          {/* For mobile View  */}
          <div className="hamburger-container">
            <button
              onClick={this.onClickHamburgerBtn}
              type="button"
              className="hamburger-btn"
            >
              {isToggle ? <AiOutlineClose /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>

        {/* Based user action it will display the drop down */}

        <div
          className={isToggle ? 'invisible-drop-down' : ' drop-down-container'}
        >
          <Link to="/" className="link">
            <p className="header-home-name">Home</p>
          </Link>
          <Link to="/shelf" className="link">
            <p className="header-home-name">Bookshelves</p>
          </Link>
          <button
            onClick={this.onClickLogoutBtn}
            type="button"
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </>
    )
  }
}
export default withRouter(Header)
