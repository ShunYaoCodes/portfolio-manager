import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

const Login = props => {
    const {signIn} = props;

    const handleClick = event => {
        signIn(event.target.name);
    }

    return (
        <div style={{marginTop: '10px'}}>
            <NavLink exact to="/login">
                <Button primary name='sign_in' onClick={handleClick}>Sign In</Button>
            </NavLink>
            <NavLink exact to="/register">
                <Button secondary name='sign_up' onClick={handleClick}>Sign Up</Button>
            </NavLink>
        </div>
    )
}

export default Login