import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component, useState } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film from "../Film/Film";
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimTypes";
import { Button, Modal } from "antd";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block", width: 50, height: 100 ,right:'-20px',transform:'translate(100%,-50%)'}}
            onClick={onClick}
        ></div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", width: 50, height: 100,left:'-20px',transform:'translate(-100%,-50%)' }}
            onClick={onClick}
        />
    );
}

export default function MultipleRowSlick(props) {
    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
    const [visible, setVisible] = useState(false);
    const [trailerSrc,setTrailerSrc]=useState('');
    const [trailer, setTrailer] = useState({
        srcTrailer: "https://www.youtube.com/embed/tgbNymZ7vqY",
        visible: false
    });
    const renderPhim = () => {

        return props.arrPhim.map((item, index) => {
            return <div key={index}>
                <Film phim={item} setTrailer={setTrailer} setTrailerSrc={setTrailerSrc}  setVisible={setVisible}/>
            </div>
        })
    }

    console.log(document.querySelector("#ahihi"))

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
    console.log(trailer)
    return (
        <div id="lichChieu">
            <div className="text-center mb-10">
                <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`} onClick={() => {
                    const action = { type: SET_PHIM_DANG_CHIEU }
                    dispatch(action);
                }}>PHIM ĐANG CHIẾU</button>
                <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={() => {
                    const action = { type: SET_PHIM_SAP_CHIEU }
                    dispatch(action);
                }}>PHIM SẮP CHIẾU</button>
            </div>
            <Slider {...settings} style={{boxShadow:'0px 12px 70px -46px rgba(0,0,0,0.5)'}}>
                {renderPhim()}
            </Slider>
            
            <Modal
                title=" "
                centered
                visible={visible}

                onCancel={() => {
                    // document.querySelector("#ahihi").src=null;
                    // setTrailer({
                    //     srcTrailer: null,
                    //     visible: false
                    // })
                    document.querySelector('#video').src="";
                    setTrailerSrc('');
                    setVisible(false);
                    
                }}
                width={1000}
                footer={null}
                className="p-0"
            >
                <iframe id="video" className={`w-full`} height={500} src={trailerSrc}>
                </iframe>
            </Modal>
        </div>
    );
}
