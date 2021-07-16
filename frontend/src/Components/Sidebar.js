import React, { Component } from 'react';
// import dashboardIcon from '../Assets/images/dashboard-icon.svg';
// import profileIcon from '../Assets/images/profile-icon.svg';
import planIcon from '../Assets/images/plan-icon.svg';
import supportIcon from '../Assets/images/support-icon.svg';

import { DashboardIcon, ProfileIcon, PlanIcon, SupportIcon } from './Icons'


class Sidebar extends Component {
    render() {
        const { highlighted, setParentState } = this.props

        return (
            <div id="sidebar">
                <div className="inner-container">
                    <div
                        className={highlighted === 'dashboard'
                            ?
                            "sidebar-button highlighted"
                            :
                            "sidebar-button"
                        }

                        onClick={() => setParentState({ highlighted: 'dashboard' })}
                    >
                        <div className="img-wrapper">
                            <DashboardIcon
                                className="sidebar-icon"
                                id="dashboard-icon"
                            />
                        </div>
                        My Dashboard
                    </div>
                    <div
                        className={highlighted === 'account'
                            ?
                            "sidebar-button highlighted"
                            :
                            "sidebar-button"
                        }

                        onClick={() => setParentState({ highlighted: 'account' })}
                    >
                        <div className="img-wrapper">
                            {/* <img src={profileIcon} /> */}
                            <ProfileIcon
                                id="profile-icon"
                                className="sidebar-icon"
                            />
                        </div>
                        Account
                    </div>
                    <div
                        className={highlighted === 'plan'
                            ?
                            "sidebar-button highlighted"
                            :
                            "sidebar-button"
                        }

                        onClick={() => setParentState({ highlighted: 'plan' })}
                    >
                        <div className="img-wrapper">
                            <PlanIcon
                                id="plan-icon"
                                className="sidebar-icon"
                            />
                        </div>
                        My Plan
                    </div>
                    <div
                        className={highlighted === 'support'
                            ?
                            "sidebar-button highlighted"
                            :
                            "sidebar-button"
                        }

                        onClick={() => setParentState({ highlighted: 'support' })}
                    >
                        <div className="img-wrapper">
                            <SupportIcon
                                id="support-icon"
                                className="sidebar-icon"
                            />
                        </div>
                        Support
                    </div>


                </div>
            </div>
        );
    }
}

export default Sidebar;