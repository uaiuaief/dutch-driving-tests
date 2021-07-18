import React, { Component } from 'react';

class SupportMenu extends Component {
    render() {
        const { className = "" } = this.props

        return (
            <div id="plan-menu" className={className}>
                <p>
                    Send us an email at <strong>support@snelcbrexamen.nl</strong> if you need anything
                </p>
            </div>
        );
    }
}

export default SupportMenu;
