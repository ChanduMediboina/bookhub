import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {getItem} = props
  const {coverPic, id, authorName, rating, readStatus, title} = getItem

  return (
    <Link to={`/books/${id}`} className="link">
      <li className="book-item-container">
        <img className="book-item-cover-img" alt={title} src={coverPic} />
        <div className="book-content-container">
          <h1 className="book-item-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <p className="rating">
            Avg Rating {<BsFillStarFill className="star-icon" />} {rating}
          </p>
          <p className="status">
            Status: <span className="status-name">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default BookItem
