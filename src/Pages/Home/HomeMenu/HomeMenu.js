import React, { Fragment, memo, useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import "../../../assets/styles/button.css"
const { TabPane } = Tabs;
const HomeMenu = memo((props) => {


    const [state, setState] = useState({ tabPosition: 'left' })
    const { tabPosition } = state;

    useEffect(() => {

    }, [])

    const renderHeThongRap = () => {

        return props.heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width={40} alt="img" />} key={index}>

                <Tabs className="tabDiaDiem overflow-y-scroll" style={{ height: '450px', width: '100%' }} tabPosition={tabPosition} >
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane key={index} className="overflow-y-scroll" style={{ height: '450px' }} tab={
                            <div className="flex justify-start" style={{ width: '300px' }}>
                                <img src='https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png' className="mr-2" width={40} alt="img" />
                                <div className="text-left">

                                    <h1 id="h1tenCumRap" className="tenCumRap mb-0" style={{ color: '#8bc541' }}>{cumRap.tenCumRap}</h1>
                                    <p className="diaChi">{cumRap.diaChi}</p>
                                </div>
                            </div>
                        } >
                            {/* {noi dung tab } */}
                            {cumRap.danhSachPhim.map((phim, index) => {

                                return <Fragment key={index} >
                                    <div key={index}>
                                        <div className="flex">
                                            <img style={{ width: "50px", height: '50px' }} className="mr-2" src={phim.hinhAnh} alt="..." />
                                            <div className="flex flex-col">
                                                <h1 className="mb-0">{phim.tenPhim}</h1>
                                                <p className="text-xs text-gray-400">
                                                    {cumRap.diaChi}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-5 gap-6 my-5 pr-10">
                                            {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                return <NavLink key={index} to={`/checkout/${lichChieu.maLichChieu}`} className="button-30 font-bold hover:text-green-500">
                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm:A')}
                                                </NavLink>
                                            })}
                                        </div>

                                    </div>
                                </Fragment>
                            })}
                        </TabPane>
                    })}

                </Tabs>
            </TabPane>
        })
    }
    return (
        <>
            <Tabs className="homeMenu" tabPosition={tabPosition}>
                {renderHeThongRap()}
            </Tabs>
        </>
    )

})
export default HomeMenu;

