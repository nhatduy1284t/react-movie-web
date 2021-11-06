/*eslint-disable*/ 
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { datGheAction, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import style from './Checkout.module.css';
import './Checkout.scss';
import { CloseOutlined, HomeOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import _ from 'lodash';
import { Tabs } from 'antd';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungActions';
import moment from 'moment';
import { connection } from '../../index';
import { history } from '../../App';


const { TabPane } = Tabs;


function Checkout(props) {
    //Trang đặt vé
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)
    const { thongTinPhim, danhSachGhe, } = chiTietPhongVe;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        dispatch(action);
        //Nếu 1 client đặt vé thành công thì load lại danh sách phòng vé
        connection.on('datVeThanhCong', () => {
            dispatch(action);
        });
        //Vừa vào trang thì load tất cả ghế khách đang đặt
        connection.invoke('loadDanhSachGhe', props.match.params.id)
        //Load danh sach ghe dang dat tu server(lắng nghe tín hiệu tu)
        connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
            //Bước 1: Loại mình ra khỏi danh sách 
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung 

            let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(JSON.parse(item.danhSachGhe));

                return [...result, ...arrGhe];
            }, []);

            // //Đưa dữ liệu ghế khách đặt cập nhật redux
            arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');

            //Đưa dữ liệu ghế khách đặt về redux
            dispatch({
                type: 'DAT_GHE',
                arrGheKhachDat
            })
            //Sự kiện khi reload trang
            // window.addEventListener('beforeunload',clearGhe)
            // return () => {
            //     clearGhe();
            //     window.removeEventListener('beforeunload',clearGhe);
            // }
        })
    }, [])
    const clearGhe = function (event) {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }

    const renderSeats = () => {

        return danhSachGhe.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            let classGheDaDuocDat = '';
            let indexGheDD = danhSachGheDangDat.findIndex(item => item.maGhe === ghe.maGhe);

            let classGheKhachDat = '';
            let indexGheKhachDat = danhSachGheKhachDat.findIndex(gheKhachDat => gheKhachDat.maGhe === ghe.maGhe);
            if (indexGheKhachDat !== -1) {
                classGheKhachDat = 'gheKhachDat';
            }
            if (indexGheDD !== -1) {
                classGheDangDat = 'gheDangDat';
            }

            if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            return <div className="gheWrapper" key={index}>
                <button onClick={() => {

                    const action = datGheAction(ghe, props.match.params.id);
                    dispatch(action);
                }} disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`} key={index}>

                    {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : classGheKhachDat !== '' ? <SmileOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : ghe.stt}

                </button>

            </div>

        })
    }
    return (
        <div className="contentWrapper container px-0 mx-auto" >
            <div className="content grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black w-4/5 h-5" >

                        </div>
                        <div className={`${style['trapezoid']} text-center pt`}>
                            <h1 className="mt-3 text-black font-bold">Màn hình</h1>
                        </div>
                        <div className="seats flex flex-wrap ">
                            {renderSeats()}
                        </div>
                    </div>
                    <table className="chuThich w-full">
                        <thead className="tieuDe w-full">
                            <th>Ghế chưa đặt</th>
                            <th>Ghế đang đặt</th>
                            <th>Ghế vip</th>
                            <th>Ghế đã đặt</th>
                            <th>Ghế mình đặt</th>
                            <th>Ghế khách đang đặt</th>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hinhMinhHoa text-center">
                                <td><button className="ghe text-center"> <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                <td><button className="ghe gheDangDat text-center"> <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                <td><button className="ghe gheVip text-center"><UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                <td><button className="ghe gheDaDat text-center"> <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                <td><button className="ghe gheDaDuocDat text-center"> <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                <td><button className="ghe gheKhachDat text-center"> <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>                          </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-3  px-6 flex flex-col">
                    <div>
                        <h3 className="text-green-700 text-center text-3xl">{danhSachGheDangDat.reduce((tong, ghe) => {
                            return tong += ghe.giaVe;
                        }, 0).toLocaleString()}Đ</h3>
                        <hr />
                        <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                        <p>Địa điểm: {thongTinPhim.diaChi}</p>
                        <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} {thongTinPhim.tenRap}</p>
                        <hr />
                        <div className="flex flex-col justify-between">
                            <div>
                                <span>Ghế :</span>
                                {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                    return <span className="text-green-500">{gheDD.stt}{index < danhSachGheDangDat.length - 1 ? ', ' : ''}</span>
                                })}
                            </div>
                            <span>Tổng tiền : {danhSachGheDangDat.reduce((tong, ghe) => {

                                return tong += ghe.giaVe;
                            }, 0)}VND</span>
                        </div>
                        <hr />
                        <div>
                            <h1 className="mb-0">E-mail</h1>
                            <p className="mb-0">abcde@gmail.com</p>
                        </div>
                        <hr />
                        <div>
                            <h1 className="mb-0">Phone</h1>
                            <p className="mb-0">113113113113</p>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <div>
                                <h1 className="mb-0">Mã giảm giá</h1>
                                <input className="focus:outline-none" placeholder="Nhập tại đây..." />
                            </div>
                            <div className="flex items-center   ">
                                <button type="button" className="px-2 py-2 text-white font-semibold rounded bg-gray-400 dark:text-coolGray-800">Áp dụng</button>
                            </div>
                        </div>
                        <hr />
                        <div>
                            <h1 className="mb-0">Hình thức thanh toán</h1>
                            <p className="mb-0 text-red-500">Vui lòng chọn ghế</p>
                        </div>

                    </div>
                    <div className="">
                        <button className="btnDatVe w-full font-bold bg-green-600 py-6" onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = thongTinPhim.maLichChieu;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            dispatch(datVeAction(thongTinDatVe));

                        }}>Đặt vé</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function KetQuaDatVe(props) {
    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    useEffect(() => {
        dispatch(layThongTinTaiKhoanAction());
    }, [])
    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm')} - Ngày chiếu {moment(ticket.ngayDat).format('DD-MM-YYYY')} </p>
                        <p>Địa điểm: {_.first(ticket.danhSachGhe).tenHeThongRap} - {_.first(ticket.danhSachGhe).tenCumRap}</p>
                        <p>Ghế : {_.orderBy([...ticket.danhSachGhe], ['tenGhe']).map((ghe, index) => {
                            return index < ticket.danhSachGhe.length - 1 ? ghe.tenGhe + ', ' : ghe.tenGhe;
                        })}</p>
                    </div>
                </div>
            </div>
        })
    }
    return <div className="lichSuDatVe">
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-700">Lịch sử đặt vé khách hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Chúc bạn xem phim vui vẻ</p>
                    <div>
                        <button onClick={() => {
                            history.push('/home');
                        }} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Quay về trang chủ</button>
                    </div>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}

export default (props) => {
    const { activeTab } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    return <div className="checkout px-4">
        <Tabs defaultActiveKey='1' activeKey={activeTab} onChange={(key) => {
            dispatch({
                type: 'CHUYEN_TAB_BINH_THUONG',
                number: key
            })

        }} tabBarExtraContent={
            <div style={{ cursor: 'pointer'}} onClick={() => { history.push('/home') }}>
                <HomeOutlined style={{ fontSize: '25px' }} />
            </div>}>


            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>

        </Tabs>
    </div >
}