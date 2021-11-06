import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { GROUP_ID } from '../../../../util/settings';
import { useFormik } from 'formik';
import { themNguoiDungAction } from '../../../../redux/actions/QuanLyNguoiDungActions';
import "./AddNewUser.scss";
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


    const [componentSize, setComponentSize] = useState('default');

    return (
        <div className="addnewuser">
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
