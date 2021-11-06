import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Route } from 'react-router';
import { history } from "../../App"
export default function AdminTemplate(props) {
  const { Component, ...restProps } = props;
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;

  const [state, setState] = useState({
    collapsed: false,
  })

  const onCollapse = collapsed => {
    console.log(collapsed);
    setState({ collapsed });
  };
  const { collapsed } = state;
  if (window.innerWidth <= 414) {
    return (<Route {...restProps} render={(propsRoute) => {
      return <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo absolute top-2 left-0"  >
            <img onClick={() => {
              history.push("/");
            }} className="w-full cursor-pointer" alt="img" src="https://tix.vn/app/assets/img/icons/web-logo.png" style={{ width: '50px' }} />
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

            <SubMenu key="sub2" icon={<FileOutlined />} title="User">
              <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => {
                history.push('/admin/dashboard');
              }}>
                User
              </Menu.Item>
              <Menu.Item key="5" icon={<DesktopOutlined />} onClick={() => {
                history.push('/admin/dashboard/addnewuser');
              }}>
                Add new user
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" icon={<FileOutlined />} title="Film">
              <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => {
                history.push('/admin/films');
              }}>
                Films
              </Menu.Item>
              <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => {
                history.push('/admin/films/addnew');
              }}>
                Add new
              </Menu.Item>
            </SubMenu>

          </Menu>
        </Header>
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            <Component {...propsRoute} />
          </div>
        </Content>

      </Layout>
    }}>

    </Route>
    )
  }
  return (<Route {...restProps} render={(propsRoute) => {
    return <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo flex flex-row justify-center"  >
          <img alt="img" onClick={() => {
            history.push("/");
          }} className="w-full cursor-pointer" src="https://tix.vn/app/assets/img/icons/web-logo.png" style={{ width: '50px' }} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub2" icon={<FileOutlined />} title="User">
            <Menu.Item key="4" icon={<DesktopOutlined />} onClick={() => {
              history.push('/admin/dashboard');
            }}>
              User
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined />} onClick={() => {
              history.push('/admin/dashboard/addnewuser');
            }}>
              Add new user
            </Menu.Item>
          </SubMenu>


          <SubMenu key="sub1" icon={<FileOutlined />} title="Film">
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => {
              history.push('/admin/films');
            }}>
              Films
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />} onClick={() => {
              history.push('/admin/films/addnew');
            }}>
              Add new
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'white' }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Component {...propsRoute} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  }}>

  </Route>
  )
}