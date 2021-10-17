
import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimTypes";
import { history } from '../../App';
import axios from "axios";
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

// let promise =axios({
//     url :'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
//     method:'POST',
//     data:{s:'s'},
//     headers : {
//         TokenCybersoft : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIyOC8wMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDYwMDY0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0NjE1NDAwMH0.Aojk9-Qo5B5whL6jc8aZ4IOCm1RF9MrUhORXCrWBwEA'
//     }
// })

// promise.then(result =>console.log(result))
// promise.catch(result =>console.log(result.response))