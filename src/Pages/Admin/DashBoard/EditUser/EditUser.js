import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { GROUP_ID } from '../../../../util/settings';
import { capNhatThongTinNguoiDungAdminAction, layThongTinNguoiDungAdminAction } from "../../../../redux/actions/QuanLyNguoiDungActions";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import axios from 'axios';

export default function EditUser(props) {

    const dispatch = useDispatch();
    const { userLogin, userEdit } = useSelector(state => state.QuanLyNguoiDungReducer);
    useEffect(() => {

        dispatch(layThongTinNguoiDungAdminAction(props.match.params.taiKhoan))
    }, [])
    console.log('userEdit', userEdit)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userEdit.taiKhoan,
            matKhau: userEdit.matKhau,
            email: userEdit.email,
            soDt: userEdit.soDT,
            hoTen: userEdit.hoTen,
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
            maNhom: GROUP_ID
        },

        onSubmit: values => {
            console.log('submmited')
            dispatch(capNhatThongTinNguoiDungAdminAction(values));
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
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onSubmitCapture={formik.handleSubmit}
        >

            <Form.Item label="Tài khoản">
                <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item label="Mật khẩu">
                <Input name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
            </Form.Item>
            <Form.Item label="Email">
                <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
            </Form.Item>
            <Form.Item label="Số điện thoại">
                <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt} />
            </Form.Item>
            <Form.Item label="Họ tên">
                <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
            </Form.Item>
            <Form.Item label="Loại người dùng">
                <Select onChange={(value) => {
                    formik.setFieldValue('maLoaiNguoiDung', value)
                }} value={formik.values.maLoaiNguoiDung}>
                    <Select.Option value="KhachHang">Khách hàng</Select.Option>
                    <Select.Option value="QuanTri">Quản trị</Select.Option>
                </Select>
            </Form.Item>



            <Form.Item label={"Chức năng"} >
                <Button htmlType="submit"
                >Cập nhật</Button>
            </Form.Item>

        </Form>

    );
}
