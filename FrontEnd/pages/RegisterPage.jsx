import React from 'react'

const RegisterPage = () => {
  return (
    <form className='register'>
    <h1>
      Register
    </h1>
    <input type="text" name='usernname'
    placeholder='username' />
    <input type="password" name='password'
    placeholder='password' />
    <button>Register</button>
  </form>
  )
}

export default RegisterPage