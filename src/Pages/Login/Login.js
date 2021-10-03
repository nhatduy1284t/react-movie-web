import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungActions";

export default function Login() {
    const dispatch = useDispatch();



    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {
            
            const action = dangNhapAction(values);
            dispatch(action);
        },
    });
  

    return (
        <form
            style={{
                maxWidth: "360px",
                backgroundImage:
                    "linear-gradient(to bottom,rgba(20,50,93,0.9),rgba(8,22,48,.9))",
            }}
            className="p-10 rounded-lg flex justify-center items-center flex-col shadow-md"
            onSubmit={formik.handleSubmit}
        >
            <img src="https://tix.vn/app/assets/img/login/group@2x.png" />
            <p className="mb-5 text-3xl uppercase text-gray-600 "></p>
            <input
                name="taiKhoan"
                className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none mt-20"
                placeholder="Tài khoản"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <input
                type="password"
                name="matKhau"
                className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
                placeholder="Mật khẩu"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <button
                className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80"
                id="login"
                type="submit"
            >
                <span>Đăng nhập</span>
            </button>
            <button
                className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80 mt-2"
                type="button"
            >
                <span>Đăng ký</span>
            </button>
        </form>
    );
}
