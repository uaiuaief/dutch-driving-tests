import './App.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import AccountPage from './Components/Pages/AccountPage'
import LoginPage from './Components/Pages/LoginPage'
import SignupPage from './Components/Pages/SignupPage'
import { Container } from '@material-ui/core'
import Navbar from './Components/Navbar'

const HomePage = () => (
  <div style={{
    textAlign: "center",
    marginTop: "150px",
    font: "20px sans-serif",
  }}>
    <h1>
      Welcome to Snel CBR Examen
    </h1>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <div id="main-content">
        <Navbar />
        <div id="navbar-filler"></div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignupPage} />
          <Route path="/account" exact component={AccountPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
