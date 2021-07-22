import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import "../../Assets/HomePage.css"


class HomePage extends Component {
    render() {
        return (
            <section id="home-page">
                <div className="banner">
                    <h1>Lorem Ipsum</h1>
                    <p>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </p>
                    <Button
                        className="btn"
                        size="large"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Register Now
                    </Button>
                </div>
                <div className="content">
                    <div className="flex">
                        <div className="block">
                            <h1>Lorem Ipsum</h1>
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>
                        <div className="block">
                        <h1>Lorem Ipsum</h1>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        </div>
                        <div className="block">
                            <h1>Lorem Ipsum</h1>
                            <p>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>
                    </div>
                    <div className="footer">
                        © Snel CBR Examen Copyright 2021
                    </div>
                </div>
            </section>
        )
    }
}

export default HomePage