import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer);

    return (
        <Fragment>
            {isLoading ?
                <div className="fixed bg-opacity-60 top-0 left-0 w-full h-full bg-gray-500 flex justify-center items-center z-50">
                    <div className="text-4xl text-white">LOADING...</div>
                </div>
                : ''
            }
        </Fragment>
    )
}
