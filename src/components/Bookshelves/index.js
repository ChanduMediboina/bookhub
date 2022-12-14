import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import BooksItem from '../BookItem'

import ContactUs from '../ContactUs'

import SideNavbar from '../SideNavbar'

import Header from '../Header'

import './index.css'

const httpStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'ISLOADING',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    apiStatus: httpStatus.initial,
    bookStatus: 'ALL',
    userSearch: '',
    allBooksList: [],
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: httpStatus.isLoading})

    const {bookStatus, userSearch} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookStatus}&search=${userSearch}&limit=${10}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedToCamelCase = data.books.map(each => ({
        coverPic: each.cover_pic,
        authorName: each.author_name,
        id: each.id,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))

      this.setState({
        allBooksList: [...updatedToCamelCase],
        apiStatus: httpStatus.success,
      })
    } else {
      this.setState({apiStatus: httpStatus.failure})
    }
  }

  changePageHeading = () => {
    const {bookStatus} = this.state

    switch (bookStatus) {
      case 'ALL':
        return '  All Books'
      case 'READ':
        return ' Read Books'
      case 'CURRENTLY_READING':
        return 'Currently Reading Books'
      case 'WANT_TO_READ':
        return 'Want to Read Books'
      default:
        return null
    }
  }

  getBookStatus = value => {
    this.setState({bookStatus: value}, this.getBooks)
  }

  onChangeSearch = event => {
    this.setState({userSearch: event.target.value}, this.getBooks)
  }

  apiCallSuccess = () => {
    const {userSearch, allBooksList} = this.state

    return (
      <>
        {allBooksList.length > 0 ? (
          <ul className="ul-container">
            {allBooksList.map(each => (
              <BooksItem key={each.id} getItem={each} />
            ))}
          </ul>
        ) : (
          <div className="no-search-container">
            <img
              className="no-search-img"
              alt="no books"
              src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670752157/Asset_1_1_z22osz.png"
            />
            <p className="no-search-content">
              Your search for {userSearch} did not find any matches.
            </p>
          </div>
        )}
      </>
    )
  }

  isLoading = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#0284C7" height={60} width={60} />
    </div>
  )

  apiCallFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670761985/Group_7522_fbxkh7.png"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        onClick={() => this.getBooks()}
        type="button"
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  apiFetchResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.apiCallSuccess()
      case 'ISLOADING':
        return this.isLoading()
      case 'FAILURE':
        return this.apiCallFailure()
      default:
        return null
    }
  }

  render() {
    const {bookStatus} = this.state
    return (
      <>
        <Header />
        <div className="books-page-container">
          <SideNavbar
            bookStatus={bookStatus}
            getBookStatus={this.getBookStatus}
          />
          <div className="books-side-container">
            <div className="heading-search-container">
              <h1 className="all-books-heading">{this.changePageHeading()}</h1>
              <div className="search-container">
                <input
                  onChange={this.onChangeSearch}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                />
                <button type="button" className="search-btn">
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {this.apiFetchResult()}
          </div>
        </div>
        <ContactUs />
      </>
    )
  }
}

export default Bookshelves
