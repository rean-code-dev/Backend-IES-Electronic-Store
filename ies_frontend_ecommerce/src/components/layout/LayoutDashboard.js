import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Outlet,useNavigate} from "react-router-dom"
import { Avatar, Badge, Breadcrumb, Button, Dropdown, Input, Layout, Menu, Space, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Category', '/dashboard/category', <DesktopOutlined />),
  getItem('Employee', '/dashboard/employee', <DesktopOutlined />),
  getItem('Report', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Logout', '9', <FileOutlined />),
];

const LayoutDashboard = () => {

  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);

  useEffect(()=>{
    const isLogin = localStorage.getItem("isLogin")
    if(isLogin == "0"){ // not yet login
      navigate("/dashboard/login") //if not yet login
    }
  },[])

  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


    const onChangeMenuDash = (item)=>{
      navigate(item.key)
    
    }

    
  const handleLogout = ()=>{
    localStorage.setItem("isLogin","0")
    window.location.href=("/dashboard/login")
  }
   
    const itemsProfile = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            My Account
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Change password
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a onClick={handleLogout}>
            Logout
          </a>
        ),
      },
    ];

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu onSelect={onChangeMenuDash} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 10px",
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between'

          }}
          >
            <div className='logopage'>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDAMwKz8nncQbOkZH_KNlvryj8k9dZo6fSgjVLh7e33nYnAvhUE80lHVOgdr1XbpkTQw&usqp=CAU'} 
            style={{width:50, height:50, marginRight:10,marginLeft :10}}>

            </img>
            {/* <div>Creative Innovation Center</div> */}

        </div>
        <div>
          <Space>
            <Input.Search placeholder='Search'/>
            <Badge count={99}>
              <Avatar shape="square" size="small" />
            </Badge>
            {/* <Badge count={2}>
            
            </Badge> */}
            <Dropdown
                menu={{
                items:itemsProfile,
                }}
                placement="bottomRight"
                arrow
              >
                <Button style={{marginLeft: 10}}>Nget Sophun</Button>
              </Dropdown>
            </Space>
        </div>
        </Header>
        
        <Content
          style={{
            margin: '16px 16px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 5,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutDashboard;
















// import "./layoutDash.css"
// import {Outlet, useNavigate} from "react-router-dom"

// function LayoutDashboard(){

//     const navigate = useNavigate()

//     const onClickMenu= (routeName)=>{
//         //alert(routeName)
//         navigate(routeName)

//     }

//     return (
//         <div>
//             <div className="mainHeaderDash">
//                 <div>
//                     <img src="" style={{width: 60}}></img>
//                     <h1>Education</h1>
//                 </div>
//                 <div className="menuContain">
//                     <ul className="menu">
//                         <li onClick={()=>onClickMenu("/dashboard")} className="menuItem">Home</li>
//                         <li onClick={()=>onClickMenu("/dashboard/about")} className="menuItem" >About</li>
//                         <li onClick={()=>onClickMenu("/dashboard/product")} className="menuItem">Product</li>
//                         <li onClick={()=>onClickMenu("/dashboard/category")} className="menuItem">Category</li>
//                         <li onClick={()=>onClickMenu("/dashboard/login")} className="menuItem">Login</li>
//                         <li onClick={()=>onClickMenu("/")} className="menuItem">Website</li>
//                     </ul>
                    

//                 </div>
                
//             </div>
//             <Outlet/>
//         </div>
//     );
// }
 
// export default LayoutDashboard;