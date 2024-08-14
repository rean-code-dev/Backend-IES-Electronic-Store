
import { Col, Row, Space } from "antd"
import "./layout.css"
import {Outlet, useNavigate} from "react-router-dom"
import logo from '../../assets/image/lock.png'
import {BsTelegram} from 'react-icons/bs'
import { FaFacebook } from "react-icons/fa";

function Layout({}){

    const navigate = useNavigate()

    const onClickMenu= (routeName)=>{
        //alert(routeName)
        navigate(routeName)

    }

    return (
        <div>
            <div className="mainHeader">
                <div>
                    <img src="" style={{width: 60}}></img>
                    <h1>Education</h1>
                </div>
                <div className="menuContain">
                    <ul className="menu">
                        <li onClick={()=>onClickMenu("/")} className="menuItem">Home</li>
                        <li onClick={()=>onClickMenu("/about")} className="menuItem" >About</li>
                        <li onClick={()=>onClickMenu("/product")} className="menuItem">Product</li>
                        <li onClick={()=>onClickMenu("/category")} className="menuItem">Category</li>
                        <li onClick={()=>onClickMenu("/login")} className="menuItem">Login</li>
                        <li onClick={()=>onClickMenu("/dashboard")}  className="menuItem">Backend</li>
                    </ul>
                </div>
               
            </div>
            <Outlet/>   
            <div style={{marginTop: 20, backgroundColor: '#FFE4C4', padding:'50px 10%'}}>
                <Row>
                    <Col xs={{span:24}} md={{span:8}}>
                        <img src={logo} 
                        width={140} 
                        height={130}
                        />
                        <div className="textTitle">Creative Innovation Center</div>
                    </Col>
                    <Col xs={{span:24}} md={{span:8}}>
                        <div className="textTitle">Our Serice</div>
                        <div className="textNomal">MakerSpace</div>
                        <div className="textNomal">Innovation Robot</div>
                    </Col>
                    <Col xs={{span:24}} md={{span:8}} style={{padding:20}}>
                        <div className="textTitle">Follow US</div>
                        <Space>
                            <FaFacebook /><div className="textNomal">Facebook</div>
                        </Space><br/>

                        <a href="https://www.youtube.com/watch?v=b2Am06dvd-M&list=PLl3j4yf5ATl-hXJAYS_gFbx7pC3dS6xnu&index=28" target="_blank"><Space>
                         <BsTelegram /><div className="textNomal">Telegram</div>
                        </Space></a>

                        
                        
                    </Col>
                </Row>

            </div>
        </div>
        
    )
}
 
export default Layout;