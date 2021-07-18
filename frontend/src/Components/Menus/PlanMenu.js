import React, { Component } from 'react';

class PlanMenu extends Component {
    render() {
        const { profile, className = "" } = this.props

        return (
            <div id="plan-menu" className={className}>
                <p>
                    {profile.student_limit} students
                </p>
                <p>
                    £ 49,00
                </p>
                <p>
                    Contact us through: support@snelcbrexamen.nl if you need more students
                </p>
            </div>
        );
    }
}

export default PlanMenu;
