import {Redirect, Route} from 'react-router-dom'

import Cookies from 'js-cookie'
// This function is used to know the user is authenticated or not
const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute
