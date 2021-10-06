import { quanLyRapService } from "../../services/QuanLyRapService"
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapTypes";

export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            let result = await quanLyRapService.layDanhSachHeThongRap();
            dispatch({
                type: SET_HE_THONG_RAP_CHIEU,
                heThongRapChieu: result.data.content
            })
        } catch (error) {
            console.log('error', error)
        }
    }
}

export const layThongTinChiTietPhimAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.layThongTinLichChieuPhim(id);
            dispatch({
                type: SET_CHI_TIET_PHIM,
                phimDetail: result.data.content
            })
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}