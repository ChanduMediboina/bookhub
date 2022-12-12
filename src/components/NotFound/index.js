import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      alt="not found"
      src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1670760878/Group_7484_dc0ju1.png"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="go-back-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
