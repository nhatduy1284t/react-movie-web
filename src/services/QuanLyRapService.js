
import { GROUP_ID } from "../util/settings";
import { baseService } from "./baseService";

class QuanLyRapService extends baseService {
  
    layDanhSachHeThongRap = () => {

        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);
    }
    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }

    layThongTinHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }
    layThongTinCumRapTheoHeThong = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    }
}

export const quanLyRapService = new QuanLyRapService();
