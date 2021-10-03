import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film from "../Film/Film";
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimTypes";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block", width: 50, height: 100 }}
            onClick={onClick}
        ></div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", width: 50, height: 100 }}
            onClick={onClick}
        />
    );
}

export default function MultipleRowSlick(props) {
    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);

    const renderPhim = () => {
    
        return props.arrPhim.slice(0,12).map((item, index) => {
            return <div key={index}>
                <Film phim={item} />
            </div>
        })
    }

    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

    const settings = {
        className: "center",
        centerMode: false,
        infinite: true,
        centerPadding: "2px",
        slidesToShow: 1,
        speed: 500,
        rows: 2,
        slidesPerRow: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    
    return (
        <div>
      <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`} onClick={()=> {
          const action = {type:SET_PHIM_DANG_CHIEU}
          dispatch(action);
      }}>PHIM ĐANG CHIẾU</button>
      <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={()=>{
        const action = {type:SET_PHIM_SAP_CHIEU}
        dispatch(action);
      }}>PHIM SẮP CHIẾU</button>
      <Slider {...settings}>
        {renderPhim()}
      </Slider>
    </div>
    );
}
