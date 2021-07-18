import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DeactivatedAccountNotification from "../DeactivatedAccountNotification"
import Sidebar from "../Sidebar"
import InstructorDashboard from "../Menus/InstructorDashboard"
import ProfileMenu from "../Menus/ProfileMenu"
import PlanMenu from "../Menus/PlanMenu"
import SupportMenu from "../Menus/SupportMenu"
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
                    <h1 className="menu-header">{this.state.profile.first_name} {this.state.profile.last_name}</h1>
                    <ProfileMenu
                        className="menu-body"
                        parentState={this.state}
                        setParentState={state => this.setState(state)}
                    />
                </>
            case 'plan':
                return <>
                    <h1 className="menu-header">My Plan</h1>
                    <PlanMenu
                        profile={this.state.profile}   
                        className="menu-body"
                    />
                </>
            case 'support':
                return <>
                    <h1 className="menu-header">Support</h1>
                    <SupportMenu
                        className="menu-body"
                    />
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
