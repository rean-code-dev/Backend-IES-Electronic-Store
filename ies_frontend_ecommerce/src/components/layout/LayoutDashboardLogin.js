import React from 'react'
import {Outlet} from "react-router-dom"
function LayoutDashboardLogin() {
  return (
    <div>
       <div style={{
      padding: 20,
      background:"#888"
    }}>
       <h1>CICkikoo</h1>
    </div>
    <div>
    <Outlet/>
    </div>
  
    </div>
   
  )
}

export default LayoutDashboardLogin
