import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import MultipleRowsMobile from '../../components/RSlick/MultipleRowSlickMobile';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions'
import HomeMenu from './HomeMenu/HomeMenu'
import HomeCarousel from '../../Templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import "./Home.scss"

export default function Home() {
    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction());
        dispatch(layDanhSachHeThongRapAction());
    }, [])
    console.log(window.innerWidth)
    return (
        <div className="home">
            <div className="home__carousel">
                <HomeCarousel />
            </div>
            <div className="home__phimNoiBat container mx-auto pt-10 pb-28">
                <section className="text-gray-600 body-font">
                    <div className=" ">
                        {window.innerWidth>414? <MultipleRows arrPhim={arrPhim} /> :<MultipleRowsMobile arrPhim={arrPhim}/>}
                    </div>
                </section>

            </div>
            <div id="cumRap" className="homeMenuWrapper container mx-auto mb-40">
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
            <div className="appMobile">
                <div id="ungDung" className="ungDung container mx-auto px-64 pt-32 pb-20 text-white" >
                    <div className="flex mx-auto">
                        <div className="w-1/2">
                            <h1 className="text-white text-4xl ">Ứng dụng tiện lợi dành cho người yêu điện ảnh</h1>
                            <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                            <button className="text-lg font-medium mb-2">App miễn phí - Tải về ngay!</button>
                            <p>TIX có hai phiên bản
                                <a className="text-white border-b-2"> iOS</a> &
                                <a className="text-white border-b-2"> Android</a>
                            </p>
                        </div>
                        <div className="w-1/2 flex justify-end">
                            <div>
                                <img width={195} src="https://tix.vn/app/assets/img/icons/slide/slide6.jpg" alt="phone" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
