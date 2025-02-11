import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Dropdown, Input, Layout, Menu, Space } from 'antd';

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
  getItem('Product', '/dashboard/product', <DesktopOutlined />),
  getItem('Category', '/dashboard/category', <DesktopOutlined />),
  getItem('Sale', '/dashboard/sale', <DesktopOutlined />),
  getItem('Invoice', '/dashboard/invoice', <DesktopOutlined />),
  getItem('Report', 'sub1', <UserOutlined />, [
    getItem('Sale Report', '3'),
    getItem('Transaction Report', '4'),
    getItem('Product Report', '5'),
  ]),
  getItem('People', 'sub2', <TeamOutlined />, [
    getItem('Customer', 'customer'),
    getItem('Employee', 'employee'),
  ]),
  getItem('Logout', 'logout', <FileOutlined />),
];

const LayoutDashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "0") {
      navigate("/dashboard/login");
    }
  }, [navigate]);

  const onChangeMenuDash = (item) => {
    navigate(item.key);
  };

  const handleLogout = () => {
    localStorage.setItem("isLogin", "0");
    window.location.href = "/dashboard/login";
  };

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop:0.4,paddingLeft:0.4,paddingRight: 0.515 }}>
        <img 
            src={'https://cdn2.f-cdn.com/contestentries/392089/3249793/57192d913e1c7_thumb900.jpg'} 
            alt="Logo" 
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <Menu onSelect={onChangeMenuDash} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 10px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Input.Search placeholder='Search' style={{ width: 200 }} />
          </div>
          <div>
            <Space>
              <Badge count={99}>
                <Avatar shape="square" size="small" />
              </Badge>
              <Dropdown menu={{ items: itemsProfile }} placement="bottomRight" arrow>
                <Button style={{ marginLeft: 10 }}>Nget Sophun</Button>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content style={{ margin: '16px 16px' }}>
          <div style={{ padding: 24, background: '#fff', borderRadius: '8px', minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          IES Electronic Store ©{new Date().getFullYear()} Created by Rean Code
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