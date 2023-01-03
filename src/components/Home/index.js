import {Component} from 'react'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

import Typewriter from 'typewriter-effect'

import 'slick-carousel/slick/slick.css'

import 'slick-carousel/slick/slick-theme.css'

import ContactUs from '../ContactUs'

import Header from '../Header'

import TopRatedBooks from '../TopRatedBooks'

import './index.css'

const httpStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  isLoading: 'ISLOADING',
  failure: 'FAILURE',
}

const settings = {
  infinite: true,
  speed: 10,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  responsive: [
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    topRatedList: [],
    apiStatus: httpStatus.initial,
    currentlyReadingList: [],
  }

  componentDidMount() {
    this.getTopRated()
    this.getCurrentlyReadingBooksData()
  }

  // API fetch
  getTopRated = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: httpStatus.isLoading})

    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)
    console.log(jwtToken)
    if (response.ok === true) {
      const updatedToCamelCase = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({
        topRatedList: [...updatedToCamelCase],
        apiStatus: httpStatus.success,
      })
    } else {
      this.setState({apiStatus: httpStatus.failure})
    }
  }

  getCurrentlyReadingBooksData = async () => {
    const jwtToken2 = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken2}`,
      },
    }
    const currentBookUrl =
      'https://apis.ccbp.in/book-hub/books?shelf=CURRENTLY_READING'
    const bookResponse = await fetch(currentBookUrl, option)
    const bookData = await bookResponse.json()
    if (bookResponse.ok === true) {
      const changingToCamelCase = bookData.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      this.setState({currentlyReadingList: [...changingToCamelCase]})
    }
  }

  // successful api call
  apiCallSuccess = () => {
    const {topRatedList} = this.state
    return (
      <Slider {...settings}>
        {topRatedList.map(each => (
          <TopRatedBooks key={each.id} getTopRatedBooks={each} />
        ))}
      </Slider>
    )
  }

  currentReadingBooksCarousel = () => {
    const {currentlyReadingList} = this.state
    return (
      <Slider {...settings}>
        {currentlyReadingList.map(each => (
          <TopRatedBooks key={each.id} getTopRatedBooks={each} />
        ))}
      </Slider>
    )
  }

  // API status loading status
  isLoading = () => (
    <div className="loading-container">
      <Loader type="TailSpin" color="#0284C7" height={60} width={60} />
    </div>
  )

  // When API call failed to retrieved the data
  apiCallFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670761985/Group_7522_fbxkh7.png"
      />
      <p className="failure-heading">Something went wrong, Please try again</p>
      <p className="failure-heading">Once Refresh your page</p>
      <button
        onClick={() => this.getTopRated()}
        type="button"
        className="try-again-btn"
      >
        Try Again
      </button>
    </div>
  )

  // This function display the status of API call
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
    return (
      <>
        <Header />
        <div className="home-page-container">
          <h1 className="home-heading">
            <Typewriter
              options={{
                strings: [
                  'Find Your Next Favorite Books?',
                  'Think before you speak. Read before you think.',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>

          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf" className="link">
            <button type="button" className="find-more-btn-outside-card">
              Find Books
            </button>
          </Link>
          <div className="top-rated-books-container">
            <div className="top-rating-find-btn-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <Link to="/shelf" className="link">
                <button type="button" className="find-more-btn-inside-card">
                  Find Books
                </button>
              </Link>
            </div>
            {this.apiFetchResult()}
          </div>

          <div className="top-rated-books-container">
            <div className="top-rating-find-btn-container">
              <h1 className="top-rated-heading">Your Favorite Books</h1>
              <Link to="/shelf" className="link">
                <button type="button" className="find-more-btn-inside-card">
                  Find Books
                </button>
              </Link>
            </div>
            {this.currentReadingBooksCarousel()}
          </div>
        </div>
        <ContactUs />
      </>
    )
  }
}
export default Home
