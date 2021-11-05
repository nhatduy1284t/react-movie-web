/*eslint-disable*/ 
import React, { useEffect, useState } from 'react'
import { Table, Input, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
const { Search } = Input;

export default function Films(props) {

    const { arrPhimDefault, arrPhimSearch,isSearching } = useSelector(state => state.QuanLyPhimReducer);
    const [state, setstate] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])

    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',

            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            width: '15%'
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {

                return <img src={film.hinhAnh} style={{ width: '50px', height: '50px' }} onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/50/50"

                }} />
            },
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            width: '15%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',

            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                return tenPhimA > tenPhimB;
            },
            width: '25%'
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, film) => {
                return <span>{text.length > 50 ? text.substr(0, 50) + "..." : text}</span>
            },

            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                return tenPhimA > tenPhimB;
            },
            width: '25%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, film) => {

                return <div>
                    <NavLink className="text-yellow-500 mr-2 text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
                    <button className="text-red-600 text-2xl" onClick={async () => {
                        //Gọi action delete
                        console.log(film.maPhim)
                        if (window.confirm(`Bạn có muốn xoá phim ${film.tenPhim}`)) {

                            await dispatch(xoaPhimAction(film.maPhim));
                            dispatch({
                                type: 'SEARCH_PHIM',
                                arrPhimSearch: arrPhimDefault
                            })
                        }
                    }}><DeleteOutlined /></button>
                    <NavLink className="text-blue-500 ml-2 text-2xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                        console.log(film)
                        localStorage.setItem("filmTaoLichChieu",JSON.stringify(film));
                    }}><CalendarOutlined /></NavLink>
                </div>
            },
            width: '25%'
        },
    ]

    let data = arrPhimDefault;
    if(isSearching) {
        data=arrPhimSearch;
    }
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    const onSearch = async (event) => {
        console.log(event.target.value);
        let tenPhimSearch = event.target.value;
        let arrPhimSearch = arrPhimDefault.filter((phim, index) => (phim.tenPhim.toLowerCase()).includes(tenPhimSearch.toLowerCase()));
        console.log(arrPhimSearch)
        await dispatch({
            type: 'SEARCH_PHIM',
            arrPhimSearch: arrPhimSearch,
            isSearching:true
        })

    };
   
    return (
        <div>
            <div>
                <Button onClick={() => {
                    history.push('/admin/films/addnew')
                }}>Thêm phim</Button>
            </div>
            <Search className="mb-5" placeholder="input search text " onChange={onSearch} enterButton={<SearchOutlined />} style={{ width: 200 }} />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />

        </div>
    )
}
