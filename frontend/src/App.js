import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import AccountPage from './Components/Pages/AccountPage'
import LoginPage from './Components/Pages/LoginPage'
import SignupPage from './Components/Pages/SignupPage'
import ForgotPasswordPage from './Components/Pages/ForgotPasswordPage'
import ResetPasswordPage from './Components/Pages/ResetPasswordPage'
import HomePage from './Components/Pages/HomePage'
import Navbar from './Components/Navbar'


function App() {
  return (
    <BrowserRouter>
      <div id="main-content">
          <Navbar />
          <div id="navbar-filler"></div>
          <Switch>
            {/* <Route path="/" exact component={HomePage} /> */}
            <Route path="/" exact component={LoginPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/account" exact component={AccountPage} />
            <Route path="/forgot-password" exact component={ForgotPasswordPage} />
            <Route path="/reset-password" exact component={ResetPasswordPage} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
