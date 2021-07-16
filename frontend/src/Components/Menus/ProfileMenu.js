import React, { Component } from 'react';
import UpdateProfileForm from '../Forms/UpdateProfileForm'
import { Redirect } from 'react-router-dom';
import "../../Assets/update_profile_page.css"

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
                    profile: data.profile
                })
            }
        })
    }

    render() {
        console.log(this.state.profile)
        const {className=""} = this.props
        return (
            this.state.isLoading
                ?
                null
                :
                this.state.profile
                    ?
                    <section id="profile-menu" className={className} >
                        <h1>Update your profile</h1>

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
