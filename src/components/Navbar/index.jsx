import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {AuthContext} from "../../context/auth.context"
import { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom"
import Logo from "../../assets/break.png"

const items = [
  {
    label: <NavLink to ="/dashboard">
    <img
    style={{ width: 60, marginRight: 1240, marginLeft: 40, opacity: 1, textDecoration: "none"}}
    className="Crop"
    src={Logo}
    
    />
    </NavLink>,
    key: 'home',
    
  },
  {
    label: <Link 
    style={{color: "#8d6e63"}}
    to ="/dashboard">Dashboard</Link>,
    key: 'dashboard',
    
  },
    {
      label: <Link 
      style={{color: "#8d6e63"}}
      to ="/profile">Profile</Link>,
      key: 'profile',
      icon: <UserOutlined />,
      
    },
    {
      label: <Link 
      style={{color: "#8d6e63"}}
      to ="/logout">Log out</Link>,
      key: 'logout'
      
    }
  ];

  const itemsLoggedOut = [
    {
      label: <NavLink to ="/">
      <img
      style={{ width: 60, marginRight: 1350, marginLeft: 40, textDecoration: "none"}}
      className="Crop"
      src={Logo}
      />
      </NavLink>,
      key: 'home',
      
    },
    {
      label: <Link 
      style={{color: "#8d6e63"}}
      to ="/signup">Signup</Link>,
      key: 'signup'
    },
    {
      label: <Link 
      style={{color: "#8d6e63"}}
      to ="/login">Log In</Link>,
      key: 'login'
    }
  ];

function Navbar(){
  const {isLoggedIn} = useContext(AuthContext)
    const [ current, setCurrent ] = useState("mail")
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    }

    return(
      <Menu
        style={{ height: 80, alignItems: "center", justifyItems: "flex-start", display: "flex"}}
        onClick={onClick} 
        selectedKeys={[current]}
        mode="horizontal" 
        items={isLoggedIn ? items : itemsLoggedOut} />
    )
}

export default Navbar;