import React from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Select, Menu, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Fragment } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TOKEN, USER_LOGIN } from '../../../../util/settings';
import "./Header.scss"
const { Option } = Select;

export default function Header() {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <NavLink rel="noopener noreferrer" to="/profile">
                    Thông tin cá nhân
                </NavLink>
            </Menu.Item>

            <Menu.Item danger onClick={() => {
                localStorage.removeItem(TOKEN);
                localStorage.removeItem(USER_LOGIN);
                window.location.reload();
            }}>Đăng xuất</Menu.Item>
        </Menu>
    );
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <div className="flex">
                    <img src="https://tix.vn/app/assets/img/avatar.png" className="rounded-full mr-2"  width={30}/>
                    <button onClick={() => {
                        history.push('/login')
                    }} className="self-center rounded text-gray-400">Đăng nhập</button>
                </div>
                {/* <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">{t('signup')}</button> */}

            </Fragment>
        }
        return <Dropdown overlay={menu}>
            <NavLink className="ant-dropdown-link self-center px-8 py-3 rounded text-black" to="/profile">
                {t('Hello')}  {userLogin.taiKhoan} <DownOutlined />
            </NavLink>
        </Dropdown>

    }

    return (
        <header className="header dark:bg-coolGray-800 dark:text-coolGray-100 bg-white bg-opacity-95 fixed z-10 w-full text-black">
            <nav className="container flex justify-between h-16 mx-auto px-4">
                <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <img width={50} src="https://tix.vn/app/assets/img/icons/web-logo.png" />
                </NavLink>
                <ul className="header__navItem mb-0 items-stretch hidden space-x-3 lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">

                    <li className="flex">
                        <a href="#lichChieu" activeClassName="" className="navLink">Lịch chiếu</a>
                    </li>
                    <li className="flex">
                        <a href="#cumRap" activeClassName="" className="navLink">Cụm rạp</a>
                    </li>

                    <li className="flex">
                        <a href="#" activeClassName="" className="navLink">Tin tức</a>
                    </li>
                    <li className="flex">
                        <a href="#ungDung" activeClassName="" className="navLink">Ứng dụng</a>
                    </li>
                    {userLogin.maLoaiNguoiDung === "QuanTri" ? <li className="flex">
                        <NavLink to="/admin" activeClassName="" className="navLink">Quản lý</NavLink>
                    </li> : <Fragment />}


                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

            </nav>
        </header>

    )
}
