import { TOKEN, USER_LOGIN } from "../../util/settings";
import { DANG_NHAP, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_USER_EDIT } from "../types/QuanLyNguoiDungTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {

    },
    danhSachNguoiDung: [
    ],
    userEdit: ''
    
}


export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP: {
            state.userLogin = action.thongTinDangNhap;
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
            localStorage.setItem(TOKEN, JSON.stringify(action.thongTinDangNhap.accessToken));
            return { ...state }
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }
        case SET_DANH_SACH_NGUOI_DUNG: {
            state.danhSachNguoiDung = action.danhSachNguoiDung;
            return { ...state };
        }
        case SET_USER_EDIT: {
            state.userEdit = action.userEdit;
            return { ...state };
        }
        default: {
            return state;
        }
    }
}

