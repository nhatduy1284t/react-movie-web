/*eslint-disable*/ 
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
import { useDispatch, useSelector } from 'react-redux';
import { GROUP_ID } from '../../../../util/settings';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimActions';

export default function Edit(props) {
    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    const [imgSrc, setImgSrc] = useState('');
    const dateFormat = 'DD/MM/YYYY';

    useEffect(() => {
        let maPhim = props.match.params.id;
        dispatch(layThongTinPhimAction(maPhim));

    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            maNhom: GROUP_ID,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            hinhAnh: null

        },
        onSubmit: (values) => {
            console.log(values)
            values.maNhom = GROUP_ID;
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                }
                else {
                    if (values.hinhAnh !== null) {
                        console.log("da vao hinh anh")
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            console.log("abc")
            for (var value of formData.values()) {
                console.log(value);
            }
            dispatch(capNhatPhimUploadAction(formData));
            //Gọi api gửi các giá trị formdata về backend xử lý

        }
    })
    const handleChangeSwitch = (value, name) => {

        formik.setFieldValue(name, value)
    }
    const handleChangeDatePicker = (values) => {

        let ngayKhoiChieu = moment(values);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeDanhGia = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = async (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
          //Đem dữ liệu file lưu vào formik
          await formik.setFieldValue('hinhAnh', file);
          //Tạo đối tượng để đọc file
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {

            setImgSrc(e.target.result);//đọc ra base 64 để load hình
          }
    
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
                <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker onChange={handleChangeDatePicker} format="DD/MM/YYYY" value={moment(formik.values.ngayKhoiChieu)} />

            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch name="dangChieu" onChange={(value, e) => {
                    handleChangeSwitch(value, 'dangChieu')
                }} defaultChecked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch name="sapChieu" onChange={(value, e) => {
                    handleChangeSwitch(value, 'sapChieu')
                }} defaultChecked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch name="hot" onChange={(value, e) => {
                    handleChangeSwitch(value, 'hot')
                }} defaultChecked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber onChange={handleChangeDanhGia('danhGia')} min={0} max={10} placeholder="1-10" value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" onChange={handleChangeFile} accept="image/jpg, image/png, image/jpeg" />
                <br />
                <img width={100} height={100} src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button type="submit" className="bg-blue-400 text-white p-2" >Cập nhật</button>
            </Form.Item>
        </Form>
    </>
}
