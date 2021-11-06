import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { history } from '../../App';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { GROUP_ID } from '../../util/settings';
import "./Register.scss";
export default function Register() {
    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: '',
            maNhom: GROUP_ID
        },

        onSubmit: values => {
            console.log(values);
            dispatch(dangKyAction(values));
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(4, 'Tài khoản phải từ 4 - 32 ký tự !').max(32, 'Tài khoản phải từ 4 - 32 ký tự !'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(4, 'Tài khoản phải từ 4 - 32 ký tự !').max(32, 'Tài khoản phải từ 4 - 32 ký tự !'),
            email: Yup.string().required('Email không được bỏ trống').email('Email không đúng định dạng !'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(/^\d+$/, 'Số điện thoại phải là số !').min(9, 'Số điện thoại phải từ 9-10 số').max(10, 'Số điện thoại phải từ 9-10 số'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống').matches(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u, 'Họ tên phải là ký tự !')
        })
    });
    const displayError = (field) => {
        return formik.touched[field] && formik.errors[field] ?
            <div className="flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <ExclamationCircleOutlined className="mr-2" />
                <span className="block sm:inline">{formik.errors[field]}</span>

            </div>
            : null;
    }
    return (
        <div className="register">
            <form
                style={{

                    backgroundImage:
                        "linear-gradient(to bottom,rgba(20,50,93,0.9),rgba(8,22,48,.9))",
                }}
                className="p-10 rounded-lg flex justify-center items-center flex-col shadow-md"
                onSubmit={formik.handleSubmit}
            >
                <img className="cursor-pointer" src="https://tix.vn/app/assets/img/login/group@2x.png" onClick={() =>{history.push("/home")}}/>
                <p className="mb-5 text-3xl uppercase text-gray-600 "></p>
                <div className="mt-5">
                    <h1 className="text-red-500">Tài khoản</h1>
                    <input
                        name="taiKhoan"
                        className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
                        placeholder="Tài khoản"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {displayError('taiKhoan')}
                </div>
                <div>
                    <h1 className="text-red-500">Mật khẩu</h1>
                    <input
                        type="password"
                        name="matKhau"
                        className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
                        placeholder="Mật khẩu"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {displayError('matKhau')}
                </div>
                <div>
                    <h1 className="text-red-500">Email</h1>
                    <input
                        name="email"
                        className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {displayError('email')}
                </div>
                <div>
                    <h1 className="text-red-500">Số điện thoại</h1>
                    <input
                        name="soDt"
                        className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
                        placeholder="Số điện thoại"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {displayError('soDt')}
                </div>
                <div>
                    <h1 className="text-red-500">Họ tên</h1>
                    <input
                        name="hoTen"
                        className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
                        placeholder="Họ tên"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {displayError('hoTen')}
                </div>


                <button
                    className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80 mt-2"
                    type="submit"
                >
                    <span>Đăng ký</span>
                </button>
            </form>
        </div>

    );
}
