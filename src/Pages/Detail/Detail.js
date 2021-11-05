/*eslint-disable*/
import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'

import { Tabs, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { layThongTinChiTietPhimAction } from "../../redux/actions/QuanLyRapActions"
import moment from 'moment';
import "../../assets/styles/reset.css";
import "./Detail.scss"
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;

export default function Detail(props) {

    const phimDetail = useSelector(state => state.QuanLyPhimReducer.phimDetail);
    const dispatch = useDispatch();
    const getTabPositionResponsive=() => {
        if(window.innerWidth>414) {
            return 'left';
        }
  
    }
    useEffect(() => {
        //Lấy thông tin param từ url
        let { id } = props.match.params;
        dispatch(layThongTinChiTietPhimAction(id))
    }, [])

    return (
        <div className="detail" style={{ backgroundImage: `url(${phimDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                style={{minHeight: '100vh', boxShadow: 'none', paddingLeft: '0', paddingRight: '0' }}
                effectColor="#C780FF" // required
                color="#fff" // default color is white
                blur={20} // default blur value is 10px
                borderRadius={10} // default border radius value is 10px

            >
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(to top, black, transparent 100%)' }}></div>
                <div className="upper container mx-auto px-0 flex justify-between relative">
                    <div className="w-2/3">
                        <div className="flex">
                            <div className="hinhAnhPhimWrapper flex justify-start w-1/2">
                                {/* <img className="col-span-1" src={phimDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt="123" /> */}
                                <div className="hinhAnhPhim" style={{ backgroundImage: `url(${phimDetail.hinhAnh})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                            </div>
                            <div className="col-span-2 flex flex-col justify-center " >
                                <p className="text-sm mb-0">{moment(phimDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-2xl leading-9 font-semibold">{phimDetail.tenPhim}</p>
                                <div>
                                    <a href="#menuDatVe" className="py-1 px-7 text-xl duration-150 rounded-md text-white hover:text-white hover:bg-opacity-75 transition-all" 
                                    style={{background:'#fb4226'}}
                                    >
                                        Mua vé</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="text-center flex justify-end">
                        <div className="flex flex-col justify-center">
                            <h1 className="m-0 text-white" style={{ fontWeight: 'bold', fontSize: 15 }}></h1>

                            <div class="set-size charts-container">

                                <div class={`pie-wrapper progress-${phimDetail.danhGia * 10} tyle-2`}>
                                    <span class="label">{phimDetail.danhGia}</span>
                                    <div class="pie">
                                        <div class="left-side half-circle"></div>
                                        <div class="right-side half-circle"></div>
                                    </div>
                                    <div class="shadow"></div>
                                </div>

                            </div>

                            <h1 className="text-green-400 text-2xl m-0"><Rate disabled allowHalf value={phimDetail.danhGia / 2} style={{ color: '#FF3232', fontSize: 30 }} /></h1>
                            <br />
                        </div>
                    </div>
                </div>
                <div className="menuDatVe relative">
                    <div id="menuDatVe" className="container mx-auto px-0" >
                        <Tabs defaultActiveKey="1" centered className="rounded-md">
                            <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
                                <div >
                                    <Tabs className="tabDatVe" tabPosition={'left'} >
                                        {phimDetail.heThongRapChieu?.map((htr, index) => {
                                            return <TabPane
                                                className="overflow-y-scroll" style={{ height: '450px' }}
                                                tab={<div className="flex flex-row items-center justify-center">
                                                    <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                                    <div className="text-center ml-2">
                                                        {htr.tenHeThongRap}
                                                    </div>
                                                </div>}
                                                key={index}>
                                                {htr.cumRapChieu?.map((cumRap, index) => {
                                                    return <div className="mt-5" key={index}>
                                                        <div className="flex flex-row mb-5">
                                                            <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                                                            <div className="ml-2 mt-auto mb-auto">
                                                                <p className="m-0" style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                                <p className="mb-0 text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                            </div>
                                                        </div>
                                                        <div className="thong-tin-lich-chieu grid grid-cols-4 gap-4 pr-5">
                                                            {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="button-30">
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            })}
                                                        </div>
                                                    </div>
                                                })}



                                            </TabPane>
                                        })}


                                    </Tabs>
                                </div>
                            </TabPane>
                            <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
                                <div className="px-5 pt-5">
                                    <h1 className="text-center font-semibold">Nội dung</h1>
                                    <p>{phimDetail.moTa}</p>
                                </div>
                            </TabPane>

                        </Tabs>
                    </div>
                </div>
            </CustomCard>

        </div>

    )
}

