import React from 'react'
import { Button } from 'semantic-ui-react'

const Login = props => {
    const {signIn} = props;

    const handleClick = event => {
        signIn('sign in');
    }

    return (
        <div style={{marginTop: '10px'}}>
            <Button primary onClick={handleClick}>Sign In</Button>
            <Button secondary>Sign Up</Button>
        </div>
    )
}

export default Login