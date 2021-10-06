import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import * as Yup from 'yup';
import { GROUP_ID } from '../../../../util/settings';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungActions';
export default function AddNewUser(props) {
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: '',
            maLoaiNguoiDung: '',
            maNhom: GROUP_ID
        },
        onSubmit: (values) => {
            console.log(values)
            dispatch(themNguoiDungAction(values));
        }
    })

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
        <div>
            <h1 className="text-center text-2xl mb-5">Thêm người dùng</h1>
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

                size={componentSize}
                onSubmitCapture={formik.handleSubmit}
            >

                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name="matKhau" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Họ tên">
                    <Input name="hoTen" onChange={formik.handleChange} />
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
                    <Button htmlType="submit">Thêm</Button>
                </Form.Item>

            </Form>
        </div>
    );
}
