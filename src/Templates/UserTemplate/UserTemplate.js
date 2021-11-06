import React from 'react'
import { Fragment } from 'react';
import { Route } from 'react-router-dom';



export const UserTemplate = (props) => {
    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {
        return <div style={{ backgroundImage: 'url(https://tix.vn/app/assets/img/icons/bg2.jpg)' }} className=" h-screen">
            <Component {...propsRoute} />
        </div>
    }} />
}
