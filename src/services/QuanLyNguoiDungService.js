import { GROUP_ID } from "../util/settings";
import { baseService } from "./baseService";

class QuanLyNguoiDungService extends baseService {

    dangNhap = (thongTinDangNhap) => {

        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    
    dangKy = (thongTinDangKy) => {

        return this.post(`/api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }

    layThongTinTaiKhoan =() => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    capNhatThongTinNguoiDung = (thongTinChinhSua) => {
        return this.put("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",thongTinChinhSua);
    }
    capNhatThongTinNguoiDungAdmin = (thongTinChinhSua) => {
        return this.post("/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",thongTinChinhSua);
    }
    layDanhSachNguoiDung= () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
    }
    layThongTinNguoiDungAdmin=(taiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
    }
    xoaNguoiDung=(taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }
    themNguoiDung=(thongTin) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,thongTin);
    }
    timKiemNguoiDung=(tuKhoa) => {
        if(tuKhoa==='') {
            return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01`);
        }
        return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`,tuKhoa);
    }
    

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
