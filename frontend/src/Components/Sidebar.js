import React, { Component } from 'react';
import dashboardIcon from '../Assets/images/dashboard-icon.png';
import profileIcon from '../Assets/images/profile-icon.png';
import planIcon from '../Assets/images/plan-icon.png';
import supportIcon from '../Assets/images/support-icon.png';


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
                            {/* <img src={dashboardIcon} /> */}
                            <img src={dashboardIcon} />
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
                            <img src={profileIcon} />
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
                            <img src={planIcon} />
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
                            <img src={supportIcon} />
                        </div>
                        Support
                    </div>


                </div>
            </div>
        );
    }
}

export default Sidebar;