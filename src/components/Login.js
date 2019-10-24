import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

const Login = () => {
    return (
        <div style={{marginTop: '10px'}}>
            <NavLink exact to="/login">
                <Button primary name='sign_in'>Sign In</Button>
            </NavLink>
            <NavLink exact to="/register">
                <Button secondary name='sign_up'>Sign Up</Button>
            </NavLink>
        </div>
    )
}

export default Login