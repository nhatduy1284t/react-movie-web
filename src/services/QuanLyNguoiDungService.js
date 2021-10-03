import { GROUP_ID } from "../util/settings";
import { baseService } from "./baseService";

class QuanLyNguoiDungService extends baseService {
    constructor(props) {
        super(props)
    }
    dangNhap = (thongTinDangNhap) => {

        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    
    dangKy = (thongTinDangKy) => {

        return this.post(`/api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }

    layThongTinNguoiDung =() => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    capNhatThongTinNguoiDung = (thongTinChinhSua) => {
        return this.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",thongTinChinhSua);
    }
    layDanhSachNguoiDung= () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
