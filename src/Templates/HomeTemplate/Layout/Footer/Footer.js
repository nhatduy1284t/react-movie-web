import { AppleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import "./Footer.scss"

const Footer = memo((props) => {
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    let arrHeThongRap = heThongRapChieu.map((heThongRap) => {
        return _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo'])
    })

    return (<>
        <footer id="footer" className="footer  p-6 dark:text-coolGray-100  text-white">
            <div className="container mx-auto px-60 divide-y divide-gray-400 divide-opacity-70 divide-solid ">
                <div className="grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-5 mb-7 ">
                    <div className="flex flex-col space-y-4  ipadDisplayNone">
                        <h2 className="font-medium text-white">TIX</h2>
                        <div className="flex flex-col space-y-2 text-sm dark:text-coolGray-400" >
                            <a href="https://tix.vn/" className="text-white">FAQ</a>
                            <a href="https://tix.vn/" className="text-white">Brand Guidelines</a>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h2 className="font-medium opacity-0 ipadDisplayNone">{'space'}</h2>
                        <div className="flex flex-col space-y-2 text-sm dark:text-coolGray-400">
                            <a href="https://tix.vn/" >Thỏa thuận sử dụng</a>
                            <a href="https://tix.vn/" >Chính sách bảo mật</a>

                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 ipadDisplayNone">
                        <h2 className="font-medium text-white">Đối tác</h2>
                        <ul className="grid grid-cols-5 gap-2 text-sm dark:text-coolGray-400">
                            {arrHeThongRap.map((item, index) => {
                                return <li className="mt-0" style={{ width: "30px", height: '30px' }} key={index}>
                                    <img alt="img" src={item.logo} className=" hover:opacity-60 cursor-pointer duration-300" />
                                </li>
                            })}

                        </ul>
                    </div>
                    <div className="flex flex-col space-y-4 ml-8 ipadDisplayNone">
                        <h2 className="font-medium text-white" >MOBILE APP</h2>
                        <div className="flex space-y-2 text-sm dark:text-coolGray-400">
                            <NavLink to="/home" style={{ width: "30px", height: '30px', marginRight: '10px' }}>
                                <img alt="imgs" src="https://tix.vn/app/assets/img/icons/apple-logo.png" style={{ width: '100%' }} className="mr-2 w-full hover:opacity-60 cursor-pointer duration-300" />
                            </NavLink>
                            <a href="/home" style={{ width: "30px", height: '30px', marginTop: '0' }} className="mt-0">
                                <img alt="imgs" src="https://tix.vn/app/assets/img/icons/android-logo.png" style={{ width: '100%' }} className="w-full hover:opacity-60 cursor-pointer duration-300" />
                            </a>

                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 ">
                        <h2 className="font-medium text-white ipadDisplayNone">SOCIAL</h2>
                        <div className="flex space-y-2 text-sm dark:text-coolGray-400">
                            <NavLink to="/home" style={{ width: "30px", height: '30px', marginRight: '10px' }}>
                                <img alt="img" src="https://tix.vn/app/assets/img/icons/facebook-logo.png" style={{ width: '100%' }} className="mr-2 w-full hover:opacity-60 cursor-pointer duration-300" />
                            </NavLink>
                            <NavLink to="/home" style={{ width: "30px", height: '30px', marginTop: '0' }}>
                                <img alt="img" src="https://tix.vn/app/assets/img/icons/zalo-logo.png" style={{ width: '100%' }} className="mr-2 w-full hover:opacity-60 cursor-pointer duration-300" />
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="footer__companyInfo flex justify-center pt-6 lg:justify-between">
                    <div className="">
                        <img src="https://tix.vn/app/assets/img/icons/zion-logo.jpg" className="rounded-lg" width={80} alt="..."/>                      
                    </div>
                    <div>
                        <h1>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h1>
                        <p>Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.</p>
                        <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
                        <p>đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.</p>
                        <p>Số Điện Thoại (Hotline): 1900 545 436</p>
                        <p>Email: support@tix.vn</p>
                    </div>
                    <div className="">
                    <img src="https://s3img.vcdn.vn/123phim/2020/03/d1e6bd560daa9e20131ea8a0f62e87f8.png" className="rounded-lg w-32"  alt="..."/>
                    </div>
                    
                </div>
            </div>
        </footer>

    </>
    )
}
)
export default Footer;