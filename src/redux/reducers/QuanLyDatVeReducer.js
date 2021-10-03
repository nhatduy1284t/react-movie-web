import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeTypes"

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [], //danh sách ghế đang đặt
    danhSachGheKhachDat: [],
    // [{maGhe:48041},{maGhe:48042}],
    tabActive: '1'
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state }
        }
        case DAT_VE: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex((item) => item.maGhe === action.gheDuocChon.maGhe);
            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1);
            }
            else {
                danhSachGheCapNhat.push(action.gheDuocChon);
            }
            state.danhSachGheDangDat = [...danhSachGheCapNhat];
            return { ...state }
        }
        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = [];
            return { ...state };
        }
        case CHUYEN_TAB: {
            state.activeTab = "2";
            return { ...state };
        }
        case 'CHUYEN_TAB_BINH_THUONG': {
            state.activeTab = action.number;
            return { ...state };
        }
        case 'DAT_GHE': {
            
            state.danhSachGheKhachDat = action.arrGheKhachDat;
            console.log('redcuer danhsachghekhacdat',state.danhSachGheKhachDat)
            return {...state}
        }
        default: {
            return { ...state }
        }
    }
}