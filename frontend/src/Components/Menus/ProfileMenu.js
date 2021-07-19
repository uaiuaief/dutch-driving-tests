import React, { Component } from 'react';
import UpdateProfileForm from '../Forms/UpdateProfileForm'
import ChangePasswordForm from '../Forms/ChangePasswordForm'
import ChangeEmailForm from '../Forms/ChangeEmailForm'
import { Redirect } from 'react-router-dom';
import "../../Assets/ProfileMenu.css"


const ChangeEmailMenu = ({setParentState}) => {
    return (
        <>
            <h1 className="menu-header">Change Email</h1>
            <ChangeEmailForm
                setParentState={setParentState}
            />
        </>
    )
}


const ChangePasswordMenu = ({setParentState}) => {
    return (
        <>
            <h1 className="menu-header">Change Password</h1>
            <ChangePasswordForm
                setParentState={setParentState}
            />
        </>
    )
}

const DefaultMenu = ({ className, profile, menuHeader, setParentState }) => {
    return (
        <section id="profile-menu" className={className} >
            <h1 className="menu-header">{menuHeader}</h1>
            <UpdateProfileForm
                profile={profile}
                setParentState={setParentState}
            />
        </section>
    )
}

class ProfileMenu extends Component {
    state = {
        redirect: false,
        isLoading: true,
        profile: null,

        subMenu: false,
        // subMenu: "change-password",
        // subMenu: "change-email",
    }

    componentDidMount() {
        window.fetchProfile().then((data) => {
            if (data === null) {
                this.setState({
                    isLoading: false,
                    redirect: true
                })
                return
            }
            else {
                this.setState({
                    isLoading: false,
                    profile: { ...data.profile, email: data.email }
                })
            }
        })
    }

    getSubMenu() {
        const { className = "" } = this.props

        switch (this.state.subMenu) {
            case false:
                return (
                    <DefaultMenu
                        className={className}
                        profile={this.state.profile}
                        menuHeader={this.props.menuHeader}
                        setParentState={state => this.setState(state)}
                    />
                )
            case 'change-password':
                return (
                    <ChangePasswordMenu
                        setParentState={state => this.setState(state)}
                    />
                )

            case 'change-email':
                return (
                    <ChangeEmailMenu
                        setParentState={state => this.setState(state)}
                    />
                )
        }
    }

    render() {
        const { className = "" } = this.props
        return (
            this.state.isLoading
                ?
                null
                :
                this.state.profile
                    ?
                    // <DefaultMenu
                    //     className={className}
                    //     profile={this.state.profile}
                    //     menuHeader={this.props.menuHeader}
                    // />
                    this.getSubMenu()
                    :
                    <Redirect to="/login" />
        );
    }
}

export default ProfileMenu;
