import React, { Fragment, memo, useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;
const HomeMenu = memo((props) => {


    const [state, setState] = useState({ tabPosition: 'left' })
    const { tabPosition } = state;
    const changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };
    useEffect(() => {
        console.log(props, 'thisprops123')
    }, [])

    const renderHeThongRap = () => {

        return props.heThongRapChieu?.map((heThongRap, index) => {
            return <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width={40} alt="img" />} key={index}>
                <Tabs tabPosition={tabPosition}>
                    {heThongRap.lstCumRap?.map((cumRap, index) => {
                        return <TabPane tab={
                            <div className="flex justify-start" style={{ width: '300px' }}>
                                <img src='https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png' width={40} alt="img" />
                                <div className="text-left">
                                    <h1 className="mb-0 ">{cumRap.tenCumRap}</h1>
                                    <p className="mb-0 ">{cumRap.diaChi}</p>

                                    {/* <p className=""><a href="#">Chi tiết</a></p> */}
                                </div>
                            </div>
                        } key={index}>
                            {/* content of TabPane */}
                            {cumRap.danhSachPhim.map((phim, index) => {
                                return <Fragment key={index} >
                                    <div className="flex" key={index}>
                                        <div>
                                            <img width={50} height={50} src={phim.hinhAnh} alt="..." />
                                        </div>
                                        <div className="ml-2">
                                            <h1>{phim.tenPhim}</h1>
                                            <p>{cumRap.diaChi}</p>
                                            <div className="grid grid-cols-6 gap-6">
                                                {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu, index) => {
                                                    return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="text-xl text-green-300">
                                                        {moment(lichChieu.ngayChieuGioChieu).format('hh:mm: A')}

                                                    </NavLink>
                                                })}
                                            </div>
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
            <Tabs tabPosition={tabPosition}>
                {renderHeThongRap()}
            </Tabs>
        </>
    )

})
export default HomeMenu;

