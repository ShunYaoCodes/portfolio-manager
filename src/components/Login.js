import React from 'react'
import { Button } from 'semantic-ui-react'

const Login = props => {
    const {signIn} = props;

    const handleClick = event => {
        signIn(event.target.name);
    }

    return (
        <div style={{marginTop: '10px'}}>
            <Button primary name='sign_in' onClick={handleClick}>Sign In</Button>
            <Button secondary name='sign_up' onClick={handleClick}>Sign Up</Button>
        </div>
    )
}

export default Login