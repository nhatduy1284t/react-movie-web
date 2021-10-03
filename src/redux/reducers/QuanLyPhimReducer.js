import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimTypes";
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapTypes";

const stateDefault = {
    arrPhim: [
    ],
    dangChieu: true,
    sapChieu: true,
    arrPhimDefault: [],
    phimDetail: {

    },
    thongTinPhim: {},
    arrPhimSearch:[],
    isSearching:false
}


export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            // state.arrPhim = action.arrPhim.filter(phim => phim.dangChieu === state.dangChieu && phim.sapChieu === state.sapChieu);
            state.arrPhim = action.arrPhim;
            state.arrPhimDefault = [...state.arrPhim];

            state.isSearching=false;
            return { ...state }
        }
        case SET_PHIM_SAP_CHIEU: {
            state.sapChieu = !state.sapChieu;
            state.arrPhim = state.arrPhimDefault.filter(phim => phim.sapChieu === state.sapChieu);
            console.log('sapChieu', state.arrPhim)
            return { ...state }
        }
        case SET_PHIM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrPhim = state.arrPhimDefault.filter(phim => phim.dangChieu === state.dangChieu);
            console.log('dangChieu', state.arrPhim)
            return { ...state }
        }
        case SET_CHI_TIET_PHIM: {
            state.phimDetail = action.phimDetail;
            return { ...state };
        }
        case SET_THONG_TIN_PHIM: {
            state.thongTinPhim = action.thongTinPhim;
            return { ...state }
        }
        case 'SEARCH_PHIM' : {
            state.arrPhimSearch=action.arrPhimSearch;
            state.isSearching=action.isSearching;
            console.log(state.isSearching)
            return {...state};
        }
        default: {
            return state;
        }
    }
}