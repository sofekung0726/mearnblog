import {useState,useContext} from 'react'
import {Navigate} from 'react-router-dom'
const baseURL = import.meta.env.VITE_BASE_URL
import {UserContext} from '../context/UserContext'
const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)
  const login = async (e) =>{
    e.preventDefault()
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials:"include"
    })
    if (response.ok) {
      response.json().then((userInfo) =>{
        setUserInfo(userInfo);
        setRedirect(true)
      })
    }
  }
  if (redirect) {
    return <Navigate to ="/"/>
  }
  return (
   
    <form className='login' onSubmit={login}>
    <h1>
      Login
    </h1>
    <input type="text" name='usernname'
    placeholder='username'  onChange={(e) => setUsername(e.target.value)} />
    <input type="password" name='password'
    placeholder='password'  onChange={(e) => setPassword(e.target.value)} />
    <button>Login</button>
  </form>
  
  )
}

export default LoginPage