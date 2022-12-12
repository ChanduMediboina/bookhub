import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import ContactUs from '../ContactUs'

import Header from '../Header'

import './index.css'

const httpStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'ISLOADING',
  failure: 'FAILURE',
}

class BookDetailedView extends Component {
  state = {detailedViewObj: '', apiStatus: httpStatus.initial}

  componentDidMount() {
    this.getBookContent()
  }

  getBookContent = async () => {
    this.setState({apiStatus: httpStatus.isLoading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedToCamelCase = {
        aboutBook: data.book_details.about_book,
        aboutAuthor: data.book_details.about_author,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        detailedViewObj: updatedToCamelCase,
        apiStatus: httpStatus.success,
      })
    } else {
      this.setState({apiStatus: httpStatus.failure})
    }
  }

  apiCallSuccess = () => {
    const {detailedViewObj} = this.state
    const {
      aboutBook,
      aboutAuthor,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = detailedViewObj
    return (
      <>
        <Header />
        <div className="detailed-page-container">
          <div className="card-container">
            <div className="book-cover-container">
              <img
                className="book-detailed-view-cover-img"
                alt={title}
                src={coverPic}
              />
              <div className="book-content-container">
                <h1 className="book-detailed-view-item-title">{title}</h1>
                <p className="book-detailed-view-author">{authorName}</p>
                <p className="detailed-view-rating">
                  Avg Rating {<BsFillStarFill className="star-icon" />} {rating}
                </p>

                <p className="detailed-view-status">
                  Status:{' '}
                  <span className="detailed-view-status-name">
                    {readStatus}
                  </span>
                </p>
              </div>
            </div>
            <hr className="hr-line" />
            <h1 className="about-author-heading">About Author</h1>
            <p className="about-para">{aboutAuthor}</p>
            <h1 className="about-author-heading">About Book</h1>
            <p className="about-para">{aboutBook}</p>
          </div>
          <ContactUs />
        </div>
      </>
    )
  }

  isLoading = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#0284c7" height={60} width={60} />
    </div>
  )

  apiCallFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670761985/Group_7522_fbxkh7.png"
      />
      <h1 className="failure-heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={() => this.getBookContent()}
        type="button"
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  render() {
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
}
export default BookDetailedView
