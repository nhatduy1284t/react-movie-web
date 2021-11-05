/*eslint-disable*/ 
import React, { useEffect, useState } from "react";
import { Form, Button, Cascader, DatePicker, InputNumber } from 'antd';
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function ShowTime(props) {
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                const result = await quanLyDatVeService.taoLichChieu(values);
                alert('Tạo lịch chiếu thành công');
            } catch (error) {
                console.log(error.response)
            }
        }
    })
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    })

    useEffect(async () => {
        try {
            let result = await quanLyRapService.layThongTinHeThongRap();
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })

        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleChangeHeThongRap = async (values, option) => {

        try {
            let result = await quanLyRapService.layThongTinCumRapTheoHeThong(option[0].maHeThongRap);
            setState({
                ...state,
                cumRapChieu: result.data.content
            })

        } catch (error) {
            console.log('error', error);
        }
    }
    const handleChangeCumRap = (values, option, a) => {

        formik.setFieldValue('maRap', option[0].maCumRap);

    }
    const onOk = (values) => {
        formik.setFieldValue("ngayChieuGioChieu", moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onChangeDate = (values) => {

        formik.setFieldValue("ngayChieuGioChieu", moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onChangeInputNumber = (values) => {
        formik.setFieldValue('giaVe', values);
    }

    let film = JSON.parse(localStorage.getItem("filmTaoLichChieu"));
    return (
        <Form
            name="basic"

            initialValues={{
                remember: true,
            }}

            onSubmitCapture={formik.handleSubmit}
            autoComplete="off"
        >
            <h3 className="text-center">Tạo lịch chiếu  - {props.match.params.tenPhim}  </h3>
            <div className="flex justify-center">
                <img src={film.hinhAnh} width={250} />
            </div>
            <div className="flex justify-center">
                <div>
                    <Form.Item label="Hệ thống rạp">
                        <Cascader options={state.heThongRapChieu.map((htr, index) => {

                            return {
                                label: htr.tenHeThongRap,
                                value: htr.tenHeThongRap,
                                maHeThongRap: htr.maHeThongRap
                            }
                        })} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
                    </Form.Item>

                    <Form.Item label="Cụm rạp">
                        <Cascader options={state.cumRapChieu.map((rapChieu, index) => {
                            return {
                                label: rapChieu.tenCumRap,
                                value: rapChieu.tenCumRap,
                                maCumRap: rapChieu.maCumRap
                            }
                        })} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                    </Form.Item>
                    <Form.Item label="Ngày chiếu, giờ chiếu">
                        <DatePicker showTime onChange={onChangeDate} onOk={onOk} format={"DD/MM/YYYY hh:mm:ss"} />
                    </Form.Item>
                    <Form.Item label="Giá vé">
                        <InputNumber onChange={onChangeInputNumber} />
                    </Form.Item>
                    <Form.Item label="Chức năng">
                        <Button htmlType="submit">Tạo lịch chiếu</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
}
