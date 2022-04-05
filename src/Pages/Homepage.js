import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    navigate('/search')
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center' >
      <GoogleLogin
        clientId="760797940951-evrhkgci6qotf9ubncpg3hfi35mcejsr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={() => console.log('login again')}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Homepage