
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimTypes";
import { history } from '../../App';
export const layDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.layDanhSachPhim();
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrPhim: result.data.content
            })
        } catch (error) {

        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {


            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Thêm phim thành công!')
            console.log('result', result.data.content);



        } catch (errors) {
            console.log(errors.response?.data)
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })

        } catch (errors) {
            console.log(errors)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            alert('Cập nhật phim thành công!')
            await dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        } catch (errors) {
            console.log(errors.response?.data)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.xoaPhim(maPhim);
            dispatch(layDanhSachPhimAction());
        } catch (errors) {
            console.log(errors.response?.data)
        }
    }
}
