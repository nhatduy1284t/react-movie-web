import React from 'react'
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';


export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        return <Fragment>        
            <Header />
            <Component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}
