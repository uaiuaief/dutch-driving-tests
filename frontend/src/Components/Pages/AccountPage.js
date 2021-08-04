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
        if (!this.state.profile) return
        
        switch (this.state.highlighted) {
            case 'dashboard':
                return <>
                    <InstructorDashboard
                        menuHeader="My Driving Test Dashboard"
                        className="menu-body"
                    />
                </>
            case 'account':
                return <>
                    <ProfileMenu
                        menuHeader={this.state.profile.driving_school_name}
                        className="menu-body"
                        parentState={this.state}
                        setParentState={state => this.setState(state)}
                    />
                </>
            case 'plan':
                return <>
                    <PlanMenu
                        menuHeader="My Plan"
                        profile={this.state.profile}
                        className="menu-body"
                    />
                </>
            case 'support':
                return <>
                    <SupportMenu
                        menuHeader="Support"
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
                    </div>
                </section>
        );
    }
}

export default AccountPage;
