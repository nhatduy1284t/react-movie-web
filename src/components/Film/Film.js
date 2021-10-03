
import React from 'react'
import { history } from '../../App';
export default function Film(props) {
    const { phim } = props;

    return (
        // <div className="p-4 lg:w-1/4">
        <div className="cursor-pointer">
            <div className="h-full bg-gray-100 bg-opacity-75 px-2 rounded-lg overflow-hidden text-center relative"   >
                <div width={200} height={200} style={{ backgroundImage: `url(${phim.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                    <img src={phim.hinhAnh} className="opacity-0 w-full" style={{ height: '200px' }} alt="..." />
                </div>
                <h1 className="title-font lg:text-lg text-left  font-medium text-gray-900 mb-3 mt-2 h-16">{phim.tenPhim}</h1>
                <p className="text-left">100 phút  </p>
                <div>
                    <button onClick={() => {
                        history.push(`/detail/${phim.maPhim}`)
                    }} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold w-full">Đặt vé</button>
                </div>
         </div>
        </div>
    )
}
