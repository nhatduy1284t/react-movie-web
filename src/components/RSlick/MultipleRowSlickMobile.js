import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
import styleSlick from './MultipleRowSlick.module.css';
import Film from "../Film/Film";
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimTypes";
import { Modal } from "antd";


export default function MultipleRowSlick(props) {
    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);
    const [xemThemClick, setXemThemClick] = useState(false);
    const [visible, setVisible] = useState(false);
    const [trailerSrc, setTrailerSrc] = useState('');
    const [trailer, setTrailer] = useState({
        srcTrailer: "https://www.youtube.com/embed/tgbNymZ7vqY",
        visible: false
    });

    const renderPhim = () => {
        if (xemThemClick) {
            return props.arrPhim.map((item, index) => {
                return <Film phim={item} key={index} setTrailer={setTrailer} setTrailerSrc={setTrailerSrc} setVisible={setVisible} />

            })
        }
        else
            return props.arrPhim.splice(0, 8).map((item, index) => {
                return <Film phim={item} key={index} setTrailer={setTrailer} setTrailerSrc={setTrailerSrc} setVisible={setVisible} />

            })
    }
    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';
    console.log(props.arrPhim.length)
    return (
        <div className="multipleRowMobile" id="lichChieu">
            <div className="flex justify-center text-center mb-10" style={{padding:'0 10px'}}>
                <button style={{fontSize:'12px'}}className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`} onClick={() => {
                    const action = { type: SET_PHIM_DANG_CHIEU }
                    dispatch(action);
                }}>PHIM ĐANG CHIẾU</button>
                <button style={{fontSize:'12px'}} className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={() => {
                    const action = { type: SET_PHIM_SAP_CHIEU }
                    dispatch(action);
                }}>PHIM SẮP CHIẾU</button>
            </div>
            <div className="flex flex-wrap">
                {renderPhim()}
            </div>
            {xemThemClick === false && <div className="text-center">

                <button onClick={() => {
                    setXemThemClick(true);
                }} className="border-2 rounded-lg border-gray-200 px-2 py-1">Xem thêm</button>
            </div>}

            <Modal
                title=" "
                centered
                visible={visible}

                onCancel={() => {
                    document.querySelector('#video').src = "";
                    setTrailerSrc('');
                    setVisible(false);

                }}
                width={1000}
                footer={null}
                className="p-0"
            >
                <iframe title="This is a unique titles"  id="video" className={`w-full`} height={500} src={trailerSrc}>
                </iframe>
            </Modal>
        </div>
    );
}
