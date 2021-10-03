const stateDefault = {
    arrImg: [
        {
            maBanner: 1,
            "maPhim": 1282,
            'hinhAnh': 'https://picsum.photos/id/237/1000/1000',

        },
        {
            maBanner: 1,
            "maPhim": 1282,
            'hinhAnh': 'https://picsum.photos/id/237/1000/1000',

        },
        {
            maBanner: 1,
            "maPhim": 1282,
            'hinhAnh': 'https://picsum.photos/id/237/1000/1000',

        },
    ]
}

export const CarouselReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'SET_CAROUSEL': {
            state.arrImg =[...action.arrImg];
           
            return {...state};
        }
        default: {
            return state;
        }
    }
}