import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../Sidebar"
import InstructorDashboard from "../Menus/InstructorDashboard"
import ProfileMenu from "../Menus/ProfileMenu"
import DeactivatedAccountNotification from "../DeactivatedAccountNotification"
import "../../Assets/AccountPage.css"


class AccountPage extends Component {
    state = {
        profile: null,
        highlighted: 'dashboard',
        redirect: false,
    }

    componentDidMount() {
        window.fetchProfile().then((data) => {
            if (data === null) {
                this.setState({
                    redirect: true
                })
                return
            }
            else {
                this.setState({
                    profile: data.profile
                })
            }
        })
    }


    getCurrentMenu = () => {
        switch (this.state.highlighted) {
            case 'dashboard':
                return <>
                    <h1 className="menu-header">My Driving Test Dashboard</h1>
                    <InstructorDashboard
                        className="menu-body"
                    />
                </>
            case 'account':
                return <>
                    <h1 className="menu-header">Instructor's name</h1>
                    <ProfileMenu
                        className="menu-body"
                        parentState={this.state}
                        setParentState={state => this.setState(state)}
                    />
                </>
            case 'support':
                return <>
                    <h1 className="menu-header">Support</h1>
                </>
            case 'plan':
                return <>
                    <h1 className="menu-header">My Plan</h1>
                </>
        }
    }

    render() {
        return (
            this.state.redirect
                ?
                <Redirect to="/" />
                :
                <section id="account-page"
                >
                    <Sidebar
                        setParentState={state => this.setState(state)}
                        highlighted={this.state.highlighted}
                    />
                    <div id="current-menu">
                        {
                            this.state.profile && this.state.profile.status == 1
                                ?
                                <DeactivatedAccountNotification />
                                :
                                null
                        }
                        {this.getCurrentMenu()}
                        {/* <InstructorDashboard/> */}
                    </div>
                </section>
        );
    }
}

export default AccountPage;
