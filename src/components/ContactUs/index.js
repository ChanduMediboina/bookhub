import {GrGoogle, GrYoutube, GrInstagram, GrTwitter} from 'react-icons/gr'

import './index.css'

const ContactUs = () => (
  <div className="social-media-icons">
    <div>
      <div className="adjust-icons-to-side">
        <GrGoogle className="google-icon" />
        <GrTwitter className="google-icon" />
        <GrInstagram className="google-icon" />
        <GrYoutube className="google-icon" />
      </div>
      <p className="used-technologies">Contact us</p>
      <p className="address">chandumediboina95@gmail.com</p>
      <p className="address"> +91 9550980192</p>
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
