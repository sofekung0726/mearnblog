import React from 'react'

const LoginPage = () => {
  
  return (
    <div className='content'>
    <div className='card'>
    <form className='login'>
    <h1>
      Login
    </h1>
    <input type="text" name='usernname'
    placeholder='username' />
    <input type="password" name='password'
    placeholder='password' />
    <button>Login</button>
  </form>
  </div>
  </div>
  )
}

export default LoginPage