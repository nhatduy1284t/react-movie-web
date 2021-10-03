import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../types/QuanLyNguoiDungTypes";
import {history} from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result =await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            console.log(result)
            dispatch({
                type:DANG_NHAP,   
                thongTinDangNhap:result.data.content
            })
            history.goBack();
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result =await quanLyNguoiDungService.layThongTinNguoiDung();
            console.log("laythongTIn")
            dispatch({
                type:SET_THONG_TIN_NGUOI_DUNG,   
                thongTinNguoiDung:result.data.content
            })
           
        } catch (error) {
            console.log(error)
        }
    }
}
export const dangKyAction=(thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result =await quanLyNguoiDungService.dangKy(thongTinDangKy);
            history.goBack();
       
        } catch (error) {
            console.log(error.response)
        }
    }
}

export const capNhatThongTinNguoiDung=(thongTinChinhSua) => {
    return async (dispatch) => {
        try {
            const result =await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinChinhSua);
            dispatch(layThongTinNguoiDungAction());
            alert("Cập nhật thành công !");
           
        } catch (error) {
            console.log(error.response)
        }
    }
}
export const layDanhSachNguoiDungAction=(thongTinChinhSua) => {
    return async (dispatch) => {
        try {
            const result =await quanLyNguoiDungService.layDanhSachNguoiDung(thongTinChinhSua);
            dispatch({
                type:SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung:result.data.content
            })
           
        } catch (error) {
            console.log(error.response)
        }
    }
}