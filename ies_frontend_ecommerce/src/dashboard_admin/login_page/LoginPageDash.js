import React from 'react'
import "./LoginPageDash.css"

function LoginDashboard() {
    const onLogin =  ()=>{
        localStorage.setItem("isLogin","1")
        window.location.href="/dashboard"
    }
  return (
    <div>
      <div className='LoginDashboard'>
        <div>Login</div>
        <input  placeholder='Username'/> <br/>
        <input  placeholder='Password'/> <br/>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  )
}

export default LoginDashboard
