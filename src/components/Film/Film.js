
import { PlayCircleOutlined } from '@ant-design/icons';
import React from 'react'
import { history } from '../../App';
import "./Film.scss"
export default function Film(props) {
    const { phim } = props;
    const renderStar = () => {
        let arrStar = [];
        for (let i = 0; i < Number(phim.danhGia) / 2; i++) {
            arrStar.push(<img src="https://tix.vn/app/assets/img/icons/star1.png" width={8} />);
        }
        return arrStar;
    }
    return (
        // <div className="p-4 lg:w-1/4">
        <div className="film cursor-pointer mb-10">
            <div className="film__container h-full px-2 rounded-lg overflow-hidden text-center relative">
                <div >
                    {/* style={{ backgroundImage: `url(${phim.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }} */}
                    <div className="film__img rounded-md relative" style={{ backgroundImage: `url(${phim.hinhAnh})` }}>
                        <div className="film__video absolute w-full h-full z-10 bg-gradient-to-t from-black to-transparent opacity-0 flex justify-center items-center ">
                            <PlayCircleOutlined onClick={() => {
                                // props.setTrailer({
                                //     srcTrailer:phim.trailer,
                                //     visible:true
                                // })

                                props.setTrailerSrc(phim.trailer)
                                props.setVisible(true);

                            }} className="text-4xl font-light hover:opacity-60" style={{ color: 'white', fontWeight: '300' }} />
                        </div>

                    </div>
                    <div className="film__ratingWrapper rounded-lg  absolute top-2 right-5 px-2" style={{ height: '10%' }}>
                        <p className="text-white mb-0">10</p>
                        <div className="flex">
                            {renderStar()}
                        </div>

                    </div>

                </div>
                <div className="film__detail duration-300">
                    <h1 className="title-font lg:text-base text-left  font-medium text-gray-900 mt-2 h-10">{phim.tenPhim}</h1>
                    <p className="text-left text-xs mb-0">100 phút  </p>
                </div>
                <div className="relative">
                    <div className="film__btnBuyTicket absolute bottom-4 left-0 w-full opacity-0 invisible duration-300">
                        <button onClick={() => {
                            history.push(`/detail/${phim.maPhim}`)
                        }} className="text-center cursor-pointer py-2 text-white my-2 font-bold w-full" style={{
                            background:'#fb4226'
                        }}>Đặt vé</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
