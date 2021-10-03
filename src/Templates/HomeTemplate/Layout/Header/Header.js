import React from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Select } from 'antd';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Fragment } from 'react';
import { USER_LOGIN } from '../../../../util/settings';

const { Option } = Select;
export default function Header() {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value);
    }
    console.log()
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">{t('signup')}</button>

            </Fragment>
        }
        return <button onClick={() => {
            history.push('/profile')
        }} className="self-center px-8 py-3 rounded">{t('Hello')} {userLogin.taiKhoan}</button>
    }
    return (
        <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 fixed z-10 w-full text-white">
            <div className="container flex justify-between h-16 mx-auto">
                <a href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img width={50} src="https://i.imgur.com/lC22izJ.png" />
                </a>
                <ul className="items-stretch hidden space-x-3 lg:flex ">

                    <li className="flex">
                        <NavLink to="/home" activeClassName="border-b-2" className="flex items-center -mb-0.5 px-4 dark:border-transparent text-white">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" activeClassName="border-b-2" className="flex items-center -mb-0.5 px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white">contact</NavLink>
                    </li>

                    <li className="flex">
                        <NavLink to="/news" activeClassName="border-b-2" className="flex items-center -mb-0.5 px-4 dark:border-transparent text-white">news</NavLink>
                    </li>
                    {userLogin.maLoaiNguoiDung === "QuanTri" ? <li className="flex">
                        <NavLink to="/admin" activeClassName="border-b-2" className="flex items-center -mb-0.5 px-4 dark:border-transparent text-white">Quản lý</NavLink>
                    </li> : <Fragment/>}


                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* <Select defaultValue="en" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="en">Eng</Option>
                    <Option value="chi">Cn</Option>
                    <Option value="vi">Vi</Option>
                </Select> */}
            </div>
        </header>

    )
}
