import React from 'react'
import { Fragment } from 'react';
import { Route } from 'react-router-dom';



export const UserTemplate = (props) => {
    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        return <div style={{ backgroundImage: 'url(https://tix.vn/app/assets/img/icons/bg2.jpg)' }} className="w-full h-screen flex justify-center items-center">
            <Component {...propsRoute} />
        </div>
    }} />
}
