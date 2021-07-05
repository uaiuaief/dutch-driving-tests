import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import AccountPage from './Components/Pages/AccountPage'
import LoginPage from './Components/Pages/LoginPage'
import SignupPage from './Components/Pages/SignupPage'
import { Container } from '@material-ui/core'

function App() {
  return (
    <BrowserRouter>
      <Container id="main-content">
        <div>
          <Link to="/">home</Link>
          <Link to="/account">account</Link>
          <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
        </div>
        <Switch>
          <Route path="/" exact component={LoginPage}/>
          <Route path="/login" exact component={LoginPage}/>
          <Route path="/signup" exact component={SignupPage}/>
          <Route path="/account" exact component={AccountPage}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
