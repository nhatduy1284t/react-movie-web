import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { capNhatThongTinNguoiDung, layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { GROUP_ID, USER_LOGIN } from '../../util/settings'
import { Tabs } from 'antd';
import { ExclamationCircleOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { Table, Modal } from 'antd';
import moment from 'moment';
import "./Profile.scss";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
export default function Profile(props) {
    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [matKhauThayDoi, setMatKhauThayDoi] = useState({
        matKhauCu: '',
        matKhauMoi: '',
        matKhauMoiXacNhan: ''
    });
    const { thongTinDatVe } = thongTinNguoiDung;
    useEffect(() => {

        dispatch(layThongTinTaiKhoanAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

    const columns = [
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            width: '25%'
        },
        {
            title: 'Số ghế',
            render: (text, item) => {
                return item.danhSachGhe.map((ghe, index) => {
                    if (index < item.danhSachGhe.length - 1)
                        return <span>{ghe.tenGhe}, </span>
                    return <span>{ghe.tenGhe}</span>
                })
            },
            width: '25%'
        },
        {
            title: "Địa chỉ rạp",
            dataIndex: 'diaChiRap',

            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, item) => {

                return item.danhSachGhe[0].tenRap + " - " + item.danhSachGhe[0].tenHeThongRap;
            },
            width: '25%'
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'ngayDat',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => {
                return 1;
            },

            render: (text) => {
                return moment(text).format('DD/MM/YY - hh:mm:ss');
            },
            width: '25%'
        },
    ];
    const data = thongTinDatVe;

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDT,
            hoTen: thongTinNguoiDung.hoTen,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
            maNhom: GROUP_ID
        },
        onSubmit: values => {
            console.log("change", values)
            dispatch(capNhatThongTinNguoiDung(values));
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(4, 'Tài khoản phải từ 4 - 32 ký tự !').max(32, 'Tài khoản phải từ 4 - 32 ký tự !'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(4, 'Tài khoản phải từ 4 - 32 ký tự !').max(32, 'Tài khoản phải từ 4 - 32 ký tự !'),
            email: Yup.string().required('Email không được bỏ trống').email('Email không đúng định dạng !'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(/^\d+$/, 'Số điện thoại phải là số !').min(9, 'Số điện thoại phải từ 9-10 số').max(10, 'Số điện thoại phải từ 9-10 số'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống').matches(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u, 'Họ tên phải là ký tự !')
        })
    })
    const formikChangeInfo = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            matKhau: thongTinNguoiDung.matKhau,
            email: thongTinNguoiDung.email,
            soDt: thongTinNguoiDung.soDT,
            hoTen: thongTinNguoiDung.hoTen,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
            maNhom: GROUP_ID,
        },
        onSubmit: values => {
            if (matKhauThayDoi.matKhauCu === values.matKhau) {
                if (matKhauThayDoi.matKhauMoi === matKhauThayDoi.matKhauMoiXacNhan) {
                    dispatch(capNhatThongTinNguoiDung({ ...values, matKhau: matKhauThayDoi.matKhauMoi }));
                }
            }
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(4, 'Tài khoản phải từ 4 - 32 ký tự !').max(32, 'Tài khoản phải từ 4 - 32 ký tự !'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(4, 'Tài khoản phải từ 4 - 32 ký tự !').max(32, 'Tài khoản phải từ 4 - 32 ký tự !'),
            email: Yup.string().required('Email không được bỏ trống').email('Email không đúng định dạng !'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(/^\d+$/, 'Số điện thoại phải là số !').min(9, 'Số điện thoại phải từ 9-10 số').max(10, 'Số điện thoại phải từ 9-10 số'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống').matches(/[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u, 'Họ tên phải là ký tự !')
        })
    })
    const displayError = (field) => {
        return formik.touched[field] && formik.errors[field] ?
            <div className="flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <ExclamationCircleOutlined className="mr-2" />
                <span className="block sm:inline">{formik.errors[field]}</span>

            </div>
            : null;
    }
    function onChange(pagination, filters, sorter, extra) {
        // console.log('params', pagination, filters, sorter, extra);
        console.log('page', pagination)
    }
    const renderTabModal = () => {
        return <Tabs defaultActiveKey="1" >
            <TabPane tab="Thông tin cá nhân" key="1">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-5">
                        <h1 className="text-red-500">Tài khoản</h1>
                        <input
                            name="taiKhoan"
                            className="mb-5 bg-gray-200 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            placeholder="Tài khoản"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={thongTinNguoiDung.taiKhoan}
                            disabled={true}
                        />
                        {displayError('taiKhoan')}
                    </div>
                    <div>
                        <h1 className="text-red-500">Email</h1>
                        <input
                            name="email"
                            className="mb-5 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {displayError('email')}
                    </div>
                    <div>
                        <h1 className="text-red-500">Số điện thoại</h1>
                        <input
                            name="soDt"
                            className="mb-5 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            placeholder="Số điện thoại"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.soDt}
                        />
                        {displayError('soDt')}

                    </div>
                    <div>
                        <h1 className="text-red-500">Họ tên</h1>
                        <input
                            name="hoTen"
                            className="mb-5 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            placeholder="Họ tên"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.hoTen}
                        />
                        {displayError('hoTen')}
                    </div>
                    <div className="text-right">
                        <button
                            className="bg-blue-600 hover:bg-blue-900 text-white font-bold p-2 rounded mt-2"
                            type="submit"
                        >
                            <span>Cập nhật</span>
                        </button>
                    </div>
                </form>
            </TabPane>

            <TabPane tab="Đổi mật khẩu" key="2">
                <form onSubmit={formikChangeInfo.handleSubmit}>
                    <div className="mt-5">
                        <h1 className="text-red-500">Mật khẩu cũ</h1>
                        <input
                            name="matKhau"
                            className="mb-5 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            placeholder="Mật khẩu cũ"
                            onChange={(e) => {
                                setMatKhauThayDoi({
                                    ...matKhauThayDoi,
                                    matKhauCu: e.target.value
                                })
                            }}
                        />

                    </div>
                    <div>
                        <h1 className="text-red-500">Mật khẩu mới</h1>
                        <input
                            name="matKhauMoi"
                            className="mb-5 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            placeholder="Mật khẩu mới"
                            onChange={(e) => {
                                setMatKhauThayDoi({
                                    ...matKhauThayDoi,
                                    matKhauMoi: e.target.value
                                })
                            }}

                        />
                        {displayError('email')}
                    </div>
                    <div>
                        <h1 className="text-red-500">Xác nhận mật khẩu mới</h1>
                        <input
                            name="matKhauMoiXacNhan"
                            className="mb-5 p-3 w-full focus:border-purple-700 rounded border-2 outline-none"
                            onChange={(e) => {
                                setMatKhauThayDoi({
                                    ...matKhauThayDoi,
                                    matKhauMoiXacNhan: e.target.value
                                })
                            }}
                        />
                        {matKhauThayDoi.matKhauMoi !== matKhauThayDoi.matKhauMoiXacNhan ? <p className="">Mật khẩu mới không trùng nhau</p> : null}
                    </div>
                    <div className="text-right">
                        <button
                            className="bg-blue-600 hover:bg-blue-900 text-white font-bold p-2 rounded mt-2"
                            type="submit"
                        >
                            <span>Cập nhật</span>
                        </button>
                    </div>
                </form>
            </TabPane>

        </Tabs>
    }
    console.log(matKhauThayDoi)
    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn phải đăng nhập mới được vào trang này !');
        return <Redirect to="/login" />
    }
    return (
        <div className="profile container mx-auto relative">
            <div>
                <NavLink to="/home" className="homeBtn absolute top-4 left-6 z-50">
                    <HomeOutlined style={{ color: 'white' }} className="text-3xl hover:opacity-60 transition-all duration-200" />
                </NavLink>
            </div>
            <Tabs defaultActiveKey="1" className="w-full">
                <TabPane
                    className="text-white"
                    style={{ color: 'white' }}
                    tab={
                        <div className="text-white text-2xl">
                            <span>Thông Tin Tài khoản</span>

                        </div>
                    }
                    key="1"
                >
                    <div style={{
                        backgroundImage:
                            "linear-gradient(to bottom,rgba(20,50,93,0.9),rgba(8,22,48,.9))"
                    }} className="p-6 sm:p-12 dark:bg-coolGray-900 dark:text-coolGray-100 text-white w-full rounded-xl">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                            <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/84587/preview.svg" alt="img" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-coolGray-500 dark:border-coolGray-700" />
                            <div className="flex flex-col">
                                <div className="flex">
                                    <h4 className=" text-3xl font-semibold text-white text-center relative">
                                        Thông tin tài khoản
                                        <button className="flex items-center text-blue-600 absolute top-1 -right-4 transform translate-x-full translate-y-1/2 text-lg">
                                            <SettingOutlined onClick={showModal} className="" />
                                        </button>
                                    </h4>



                                    <Modal title={renderTabModal()} visible={isModalVisible} footer={null} onCancel={handleCancel}>
                                    </Modal>
                                </div>
                                <p className="dark:text-coolGray-400">Tài khoản: {thongTinNguoiDung.taiKhoan}</p>
                                <p className="dark:text-coolGray-400">Họ tên: {thongTinNguoiDung.hoTen}</p>
                                <p className="dark:text-coolGray-400">Email: {thongTinNguoiDung.email}</p>
                                <p className="dark:text-coolGray-400">Số điện thoại: {thongTinNguoiDung.soDT}</p>
                                <p className="dark:text-coolGray-400">Mã loại người dùng: {thongTinNguoiDung.maLoaiNguoiDung === "KhachHang" ? "Khách hàng" : 'Quản trị'}</p>
                            </div>
                        </div>

                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <span className="text-white text-2xl">
                            Thông tin đặt vé
                        </span>
                    }
                    key="2"
                >
                    <Table pagination={{ pageSize: 6 }}
                        columns={columns} dataSource={data} onChange={onChange} className="rounded-full " />
                </TabPane>
            </Tabs>

        </div>

    )
}
