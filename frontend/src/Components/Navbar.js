import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/images/logo.png'
import '../Assets/navbar.css'


class Navbar extends Component {
    state = {
        user: null,
        isLoading: true
    }

    logout = () => {
        const endpoint = '/api/logout/'
        fetch(endpoint).then(() => {
            window.location = '/'
        })
    }

    componentDidMount() {
        window.fetchProfile().then(user => {
            this.setState({
                user: user,
                isLoading: false
            })
        })
    }

    render() {
        return (
            this.state.isLoading
                ?
                null
                :
                <div id="navbar">
                    <Link to="/">
                        <div className="logo-container">
                            <img src={logo} />
                        </div>
                    </Link>
                    <div>
                        {this.state.user
                            ?
                            <>
                                <Link to="/account">Account</Link>
                                <Link
                                    to="#"
                                    onClick={this.logout}
                                >
                                    Logout
                                </Link>
                            </>
                            :
                            <>
                                <Link to="/login">login</Link>
                                <Link to="/signup">Signup</Link>
                            </>
                        }
                    </div>
                </div>
        );
    }
}

export default Navbar;
