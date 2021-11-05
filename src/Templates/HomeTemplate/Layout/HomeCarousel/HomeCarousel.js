import { Carousel } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import "./HomeCarousel.css";
export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer)
    const contentStyle = {
        lineHeight: '160px',
        textAlign: 'center',
        backgroundSize:'cover',
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
            return <div key={index} className="w-full">
                <div className="carousel__item" style={{...contentStyle,backgroundImage:`url("${item.hinhAnh}")`}}>
                    <img className="opacity-0" src={arrImg.hinhAnh} />
                </div>
            </div>
        })
    }
    return (
        <Carousel effect="scrollx" autoplay >
            {renderImg()}
        </Carousel>
       
       
    )
}
