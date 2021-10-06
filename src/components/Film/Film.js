
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
        <div className="film cursor-pointer">
            <div className="film__container h-full bg-gray-100 bg-opacity-75 px-2 rounded-lg overflow-hidden text-center relative">
                <div width={200} height={200} style={{ backgroundImage: `url(${phim.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                    <div className="film__img rounded-md relative" style={{ backgroundImage: `url(${phim.hinhAnh})` }}>
                        <div className="film__video absolute w-full h-full z-10 bg-gradient-to-t from-black to-transparent opacity-0 flex justify-center items-center ">
                            <PlayCircleOutlined className="text-4xl font-light hover:opacity-60" style={{color:'white',fontWeight:'300'}}/>
                        </div>
                    </div>
                    <div className="film__ratingWrapper rounded-lg  absolute top-2 right-5 px-2" style={{ height: '10%' }}>
                        <p className="text-white mb-0">10</p>
                        <div className="flex">
                            {renderStar()}
                        </div>

                    </div>
                </div>
                <h1 className="title-font lg:text-lg text-left  font-medium text-gray-900 mt-2 ">{phim.tenPhim}</h1>
                <p className="text-left text-xs">100 phút  </p>
                <div>
                    <button onClick={() => {
                        history.push(`/detail/${phim.maPhim}`)
                    }} className="bg-orange-300  text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold w-full">Đặt vé</button>
                </div>
            </div>

        </div>
    )
}
