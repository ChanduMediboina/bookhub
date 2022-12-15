import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCBnakHjSBNsWISRrmmAV3tmT8EFDb3B3c',
  authDomain: 'authentication-4e9fd.firebaseapp.com',
  databaseURL: 'https://authentication-4e9fd-default-rtdb.firebaseio.com',
  projectId: 'authentication-4e9fd',
  storageBucket: 'authentication-4e9fd.appspot.com',
  messagingSenderId: '527072916514',
  appId: '1:527072916514:web:41bd2a2f8bb4cbf9f3c67b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default auth
