import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Film from '../../components/Film/Film'
import MultipleRows from '../../components/RSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions'
import { layDanhSachHeThongRapAction } from '../../redux/actions/QuanLyRapActions'
import HomeMenu from './HomeMenu/HomeMenu'
import HomeCarousel from '../../Templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
export default function Home() {
    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction());
        dispatch(layDanhSachHeThongRapAction());
    }, [])

    return (
        <div >
            <HomeCarousel/>
            <div className="container">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <MultipleRows arrPhim={arrPhim} />
                    </div>
                </section>
            </div>
            <div className="mx-36">
                <HomeMenu heThongRapChieu={heThongRapChieu}/>
            </div>
        </div>
    )
}
