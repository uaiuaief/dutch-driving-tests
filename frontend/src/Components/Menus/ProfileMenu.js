import React, { Component } from 'react';
import UpdateProfileForm from '../Forms/UpdateProfileForm'
import { Redirect } from 'react-router-dom';
import "../../Assets/ProfileMenu.css"

class ProfileMenu extends Component {
    state = {
        redirect: false,
        isLoading: true,
        profile: null
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
                    profile: {...data.profile, email: data.email}
                })
            }
        })
    }

    render() {
        const {className=""} = this.props
        return (
            this.state.isLoading
                ?
                null
                :
                this.state.profile
                    ?
                    <section id="profile-menu" className={className} >
                        <UpdateProfileForm
                            profile={this.state.profile}
                        />
                    </section>
                    :
                    <Redirect to="/login" />
        );
    }
}

export default ProfileMenu;
