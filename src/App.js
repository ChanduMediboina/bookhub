import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import Home from './components/Home'

import Bookshelves from './components/Bookshelves'

import NotFound from './components/NotFound'

import LoginPage from './components/LoginPage'

import BookDetailedView from './components/DetailedView'

import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/shelf" component={Bookshelves} />
        <ProtectedRoute exact path="/books/:id" component={BookDetailedView} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
