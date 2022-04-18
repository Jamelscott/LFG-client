import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"
// import "../layout/Login.css"

export default function Login({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const [msg, setMessage] = useState("")

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      // post to the backend with the form data to login
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/login`,
        form
      )

      // decode the token that is sent to use
      const { token } = response.data
      const decoded = jwt_decode(token)

      // save the token in the localStorage
      localStorage.setItem("jwt", token)

      // set the state to the logged in user
      console.log(decoded)
      setCurrentUser(decoded)
    } catch (err) {
      // handle errors such as wrong credentials
      if (err.response.status === 400) {
        console.log(err.response.data)
        setMessage(err.response.data.msg)
      }
      console.log(err)
    }
  }

  // navigate to the user's profile if currentUser is NOT null
  if (currentUser) return <Navigate to="/" />
  return (
       <div className="user-forms-card">
         <h1><button className="lfg-button">Looking for Group</button></h1>
          <h1 style={{fontWeight: 300,marginTop: 0,marginBottom: 0, fontSize:'20px', color:"white"}}>Sign In</h1>
          {/* <h5 style={{margin:0}}>sign in required to view parties</h5> */}
          {/* <h5 className="error-msg">{msg ? `${msg}` : ""}</h5> */}
        <form style={{display: 'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}} onSubmit={handleFormSubmit}>
          {/* Email Input */}
          <div>
            <label hidden htmlFor="username"></label>
            <input
              style={{paddingLeft: "15px" , borderRadius: '20px', width: '250px', height:"40px", marginBottom:"10px"}}
              placeholder=" enter username"
              type="text"
              id="username"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              value={form.username}
            />
          </div>
          <div>
            {/* Password Input */}
            <label hidden htmlFor="password"></label>
            <input
              style={{paddingLeft: "15px" ,borderRadius: '20px', width: '250px', height:"40px", marginBottom:"10px"}}
              placeholder=" enter password"
              type="password"
              id="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}              
              className="passwordInput"
            />
          </div>
          <button type="submit" className="enterButton">
            Sign In
          </button>
          <p style={{fontSize: "14px", color: "white"}}>
            Don't have an account?{" "}
            <Link style={{color: "white"}} to="/signup" className="a-tag">
              Create one
            </Link>
          </p>
        </form>

        {msg ? <p style={{fontWeight:200, color: "red"}} className="error-message">{msg}</p> : <></>}
      </div>    
  )
}