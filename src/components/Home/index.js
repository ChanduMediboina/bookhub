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

class Home extends Component {
  state = {topRatedList: [], apiStatus: httpStatus.initial}

  componentDidMount() {
    this.getTopRated()
  }

  // API fetch
  getTopRated = async () => {
    this.setState({apiStatus: httpStatus.isLoading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
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

  // successful api call
  apiCallSuccess = () => {
    const {topRatedList} = this.state

    const settings = {
      infinite: true,
      speed: 10,
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

    return (
      <ul>
        <Slider {...settings}>
          {topRatedList.map(each => (
            <TopRatedBooks key={each.id} getTopRatedBooks={each} />
          ))}
        </Slider>
      </ul>
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
          <div className="top-rated-books-container">
            <div className="top-rating-find-btn-container">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <Link to="/shelf" className="link">
                <button type="button" className="find-more-btn">
                  Find Books
                </button>
              </Link>
            </div>
            {this.apiFetchResult()}
          </div>
        </div>
        <ContactUs />
      </>
    )
  }
}
export default Home
