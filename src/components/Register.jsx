import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Register ({ currentUser, setCurrentUser, setUsers }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
    // manager: false
  })
  const [passwordCheck, setPasswordCheck] = useState('')

  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()    
    try {
      if(form.password === passwordCheck)  {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/users/register`,
          form
        )
        // get the token from the response
        const { token } = response.data
        // set the token in local storage
        localStorage.setItem('jwt', token)
        // decode the token
        const decoded = jwt_decode(token)
        // log the user in
        setCurrentUser(decoded)
        navigate('/dashboard');
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/users`)
        .then(response => setUsers(response.data))        
      } else {
        setMessage(`Passwords do not match.`)
      }
      
    } catch (err) {
      if (err.response.status === 409) {
        setMessage(err.response.data.msg)
      } else {
        console.log(err)
      }
    }
  }

  // if (currentUser) return <Navigate to='/' />
  return (
    <>            
    <div className='flex-container'>
      <div className='user-forms-card'>
      <h1><button className="lfg-button">Register An Account</button></h1>
      <h1 style={{fontWeight: 300,marginTop: 0,marginBottom: 0, fontSize:'20px', color:"white"}}>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'></label>
              <input
                style={{paddingLeft: "15px" , borderRadius: '20px', width: '250px', height:"40px", marginBottom:"10px"}}
                placeholder='enter username'
                type='text'
                id='username'
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor='email'></label>
              <input
                style={{paddingLeft: "15px" , borderRadius: '20px', width: '250px', height:"40px", marginBottom:"10px"}}
                placeholder='enter email'
                type='email'
                id='email'
                value={form.name}
                onChange={e => setForm({ ...form, email: e.target.value })}
                // placeholder='enter your email...'
              />
            </div>
            <div>
              <label htmlFor='password'></label>
              <input
                style={{paddingLeft: "15px" , borderRadius: '20px', width: '250px', height:"40px", marginBottom:"10px"}}
                placeholder='enter password'
                type='password'
                id='password'
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                // placeholder='enter your password...'
              />
            </div>
            <div>
              <label htmlFor='confirmpassword'></label>
              <input
                style={{paddingLeft: "15px" , borderRadius: '20px', width: '250px', height:"40px", marginBottom:"10px"}}
                placeholder='confirm password'
                type='password'
                id='confirmpassword'
                value={passwordCheck}
                onChange={e => setPasswordCheck(e.target.value)}                
              />
            </div>
            <button type="submit" className="enterButton">
            Sign Up
          </button>
          <p style={{fontSize: "14px", color: "white"}}>
            Already have an account?{" "}
            <Link style={{color: "white"}} to="/login" className="a-tag">
              Login
            </Link>
            </p>
          </form>
          {message ? <p style={{fontWeight:200, color: "red"}} className="error-message">{message}</p> : <></>}
        </div>
        </div>
    </>
  )
}
