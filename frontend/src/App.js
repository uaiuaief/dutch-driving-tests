import './App.css';
import AccountPage from './Components/Pages/AccountPage'
import LoginPage from './Components/Pages/LoginPage'
import SignupPage from './Components/Pages/SignupPage'
import { Container } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Container id="main-content">
        <LoginPage/>
        {/* <SignupPage/> */}
        {/* <AccountPage/> */}
      </Container>
    </div>
  );
}

export default App;
