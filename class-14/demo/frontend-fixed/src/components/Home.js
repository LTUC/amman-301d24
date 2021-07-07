import React, { Component } from 'react';
import LoginButton from './Login';
import LogoutButton from './Logout';
import User from './User';
import { withAuth0 } from '@auth0/auth0-react';

export class Home extends Component {
    render() {
        return (
            <>
            {
                this.props.auth0.isAuthenticated?
                <>
                <LogoutButton/>
                <User/>
                </>
                :<LoginButton/>
            }

            </>
        )
    }
}

export default withAuth0(Home)
