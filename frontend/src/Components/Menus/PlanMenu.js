import React, { Component } from 'react';

class PlanMenu extends Component {
    render() {
        const { profile, className = "" } = this.props

        return (
            <div id="plan-menu" className={className}>           
                <h1 className="menu-header">{this.props.menuHeader}</h1>
                <p>
                    {profile.student_limit} students
                </p>
                <p>
                    £ {profile.student_limit * 10}.00
                </p>
                <p>
                    Contact us through: support@snelcbrexamen.nl if you need more students
                </p>
            </div>
        );
    }
}

export default PlanMenu;
