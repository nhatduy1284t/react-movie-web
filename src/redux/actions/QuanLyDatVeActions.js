import axios from "axios";
import { connection } from "../../index";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { TOKEN, TOKEN_CYBERSOFT } from "../../util/settings";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeTypes";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";


export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (error) {
            console.log(error);
            console.log(error.response?.data)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {

    return async (dispatch,getState) => {
        try {
            dispatch(displayLoadingAction);
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: DAT_VE_HOAN_TAT });
            await dispatch(hideLoadingAction);
            let userLogin=getState().QuanLyNguoiDungReducer.userLogin;
            await connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu);

            dispatch({ type: CHUYEN_TAB })

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error.response)
            console.log(error.response?.data)
        }
    }
}

export const datGheAction = (ghe, maLichChieu) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
        })
        //call api backend 

        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        console.log('danhSachGheDangDat', danhSachGheDangDat)


        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)

        
        //callApi signal R
        // connection.invoke('datGhe',taiKhoan, danhSachGheDangDat, Number(maLichChieu))
    }
}