import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import "./HomeCarousel.css";
export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer)
    const contentStyle = {
        height: '720px',
        lineHeight: '160px',
        textAlign: 'center',
        backgroundSize:'cover',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        marginTop:'64px'
    };
    const dispatch = useDispatch();
    
    useEffect(() => {   
        const action = getCarouselAction();
        dispatch(action);

    },[])
    const renderImg = () => {

        return arrImg.map((item, index) => {
            return <div className="w-full">
                <div style={{...contentStyle,backgroundImage:`url("${item.hinhAnh}")`}}>
                    <img className="opacity-0" src={arrImg.hinhAnh} />
                </div>
            </div>
        })
    }
    return (
        <Carousel effect="fade">
            {renderImg()}
        </Carousel>
       
       
    )
}
