import {GrYoutube, GrInstagram} from 'react-icons/gr'
import {AiOutlineLinkedin} from 'react-icons/ai'
import {FiMail, FiPhone} from 'react-icons/fi'

import './index.css'

const ContactUs = () => (
  <div className="social-media-icons">
    <div>
      <div className="adjust-icons-to-side">
        <a className="anchor" href="https://www.linkedin.com/in/chandu9550/">
          <AiOutlineLinkedin className="google-icon" />
        </a>
        <a
          className="anchor"
          href="https://www.instagram.com/natural_star_chandu81/"
        >
          <GrInstagram className="google-icon" />
        </a>
        <a className="anchor" href="https://www.youtube.com/">
          <GrYoutube className="google-icon" />
        </a>
      </div>
      <p className="used-technologies">Contact us</p>
      <div className="mail-container">
        <FiMail />
        <p className="address">chandumediboina95@gmail.com</p>
      </div>
      <div className="call-container">
        <FiPhone />
        <p className="phone-num"> +91 9550980192</p>
      </div>
    </div>
    <div>
      <h1 className="used-technologies">Used Technologies</h1>
      <p className="languages">
        React JS, JavaScript <br /> CSS, Bootstrap <br />
        Routing, REST API Calls
        <br /> Local Storage, JWT Token
        <br />
        Authorization, Authentication
      </p>
    </div>
  </div>
)
export default ContactUs
