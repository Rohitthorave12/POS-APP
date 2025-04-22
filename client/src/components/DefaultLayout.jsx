import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, ConfigProvider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/DefaultLayout.css";
import "antd/dist/reset.css"; 
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate(); 
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const menuItems = [
    { key: "/", label: <Link to="/">Home</Link>, icon: <HomeOutlined /> },
    { key: "/bills", label: <Link to="/bills">Bills</Link>, icon: <CopyOutlined /> },
    { key: "/items", label: <Link to="/items">Items</Link>, icon: <UnorderedListOutlined /> },
    { key: "/customers", label: <Link to="/customers">Customers</Link>, icon: <UserOutlined /> },
    { key: "/logout", label: <span onClick={handleLogOut}>Logout</span>, icon: <LogoutOutlined /> }, // ✅ Now works!
  ];

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ConfigProvider theme={{ token: { colorBgContainer: "#f0f2f5", borderRadiusLG: 8 } }}>
      <Layout>
        {loading && <Spinner />}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical">
            <h1 className="text-center text-light font-weight-bold mt-4">POS</h1>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]} items={menuItems} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "#f0f2f5" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
            <div className="cart-item" onClick={() => navigate("/cart")}>
              <p>{cartItems.length}</p>
              <ShoppingCartOutlined />
            </div>
          </Header>
          <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280, background: "#f0f2f5", borderRadius: 8 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
