import React, { useEffect, useState } from 'react'
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
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { GROUP_ID } from '../../../../util/settings';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';

export default function AddNew(props) {
    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('')
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        onSubmit: (values) => {
            console.log('values', values);
            values.maNhom = GROUP_ID;
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            //Gọi api gửi các giá trị formdata về backend xử lý
            dispatch(themPhimUploadHinhAction(formData));
        }
    })
    const handleChangeSwitch = (value, name) => {
        console.log(name, value)
        formik.setFieldValue(name, value)
    }
    const handleChangeDatePicker = (values) => {
        let ngayKhoiChieu = moment(values).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    }
    const handleChangeDanhGia = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);//Hình base 64

            }
            //Đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file);
        }
    }
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    }
    return <>
        <Form
            onSubmitCapture={formik.handleSubmit}
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
        >
            <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input name="tenPhim" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name="moTa" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch name="dangChieu" onChange={(value, e) => {
                    handleChangeSwitch(value, 'dangChieu')
                }} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch name="sapChieu" onChange={(value, e) => {
                    handleChangeSwitch(value, 'sapChieu')
                }} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch name="hot" onChange={(value, e) => {
                    handleChangeSwitch(value, 'hot')
                }} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeDanhGia('danhGia')} min={0} max={10} placeholder="1-10" />
            </Form.Item>
            <Form.Item label="Hình ảnh">
            <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                <br />
                <img width={100} height={100} src={imgSrc} alt="..." />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type="submit" className="bg-blue-400 text-white p-2" >Thêm phim</button>
            </Form.Item>
        </Form>
    </>
}
