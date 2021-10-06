import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { DANG_NHAP, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_USER_EDIT } from "../types/QuanLyNguoiDungTypes";
import { history } from "../../App";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            console.log(result)
            dispatch({
                type: DANG_NHAP,
                thongTinDangNhap: result.data.content
            })
            history.goBack();
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinTaiKhoan();
            console.log("laythongTIn")
            dispatch({
                type: SET_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result.data.content
            })

        } catch (error) {
            console.log(error)
        }
    }
}
export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            history.goBack();

        } catch (error) {
            console.log(error.response)
        }
    }
}

export const capNhatThongTinNguoiDung = (thongTinChinhSua) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinChinhSua);
            dispatch(layThongTinTaiKhoanAction());
            alert("Cập nhật thành công !");

        } catch (error) {
            console.log(error.response)
        }
    }
}

export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
            dispatch({
                type: SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung: result.data.content
            })

        } catch (error) {
            console.log(error.response)
        }
    }
}
export const layThongTinNguoiDungAdminAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDungAdmin(taiKhoan);
            console.log(result.data.content)
            dispatch({
                type: SET_USER_EDIT,
                userEdit: result.data.content
            })

        } catch (error) {
            console.log(error.response)
        }
    }
}

export const capNhatThongTinNguoiDungAdminAction = (thongTinChinhSua) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinNguoiDungAdmin(thongTinChinhSua);
            alert("Cập nhật thành công !");

        } catch (error) {
            console.log(error.response)
        }
    }
}
export const xoaNguoiDungAction = (thongTinXoa) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(thongTinXoa);
            dispatch(layDanhSachNguoiDungAction());
            console.log(result)
            alert("Xoá thành công !");


        } catch (error) {
            console.log(error.response)
        }
    }
}
export const themNguoiDungAction = (thongTin) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.themNguoiDung(thongTin);
            console.log(result)
            alert("Thêm thành công !");


        } catch (error) {
            console.log(error.response)
            alert(error.response.data.content);
        }
    }
}
export const timKiemNguoiDungAction = (thongTin) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.timKiemNguoiDung(thongTin);
            console.log(result)
            dispatch({
                type:SET_DANH_SACH_NGUOI_DUNG,
                danhSachNguoiDung:result.data.content
            })

        } catch (error) {
            console.log(error.response)
        }
    }
}