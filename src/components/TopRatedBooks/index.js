import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBooks = props => {
  const {getTopRatedBooks} = props
  const {coverPic, id, authorName, title} = getTopRatedBooks
  return (
    <Link to={`/books/${id}`} className="link">
      <li className="slider-container">
        <img src={coverPic} alt={title} className="cover-img" />
        <h1 className="home-author-name">{title}</h1>
        <p className="home-book-title">{authorName}</p>
      </li>
    </Link>
  )
}
export default TopRatedBooks
