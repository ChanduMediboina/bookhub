import {GrYoutube, GrInstagram} from 'react-icons/gr'
import {AiOutlineLinkedin} from 'react-icons/ai'
import {FiMail, FiPhone} from 'react-icons/fi'

import './index.css'

const ContactUs = () => (
  <div className="social-media-icons">
    <div>
      <div className="adjust-icons-to-side">
        <a className="anchor" href="https://www.linkedin.com/in/chandu9550/">
          <img
            src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1672723725/blue-color-white-background-linkedin-design-logo-sign-symbol-free-vector_gbkis6.webp"
            alt="youtube"
            className="google-icon"
          />
        </a>
        <a
          className="anchor"
          href="https://www.instagram.com/innocent_boy___chandu/"
        >
          <img
            src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1672723714/3Bg-2ZsT_400x400_kycnvd.jpg"
            alt="instagram"
            className="google-icon"
          />
        </a>
        <a className="anchor" href="https://www.youtube.com/">
          <img
            src="https://res.cloudinary.com/dxnk6ejnn/image/upload/v1672723701/red-youtube-logo-social-media-logo_197792-1803_kti1gc.webp"
            alt="linkedin"
            className="google-icon"
          />
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
