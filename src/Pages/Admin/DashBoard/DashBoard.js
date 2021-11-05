/*eslint-disable*/ 
import React, { useEffect } from 'react'
import { Table, Input, Button } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { layDanhSachNguoiDungAction, timKiemNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungActions';
const { Search } = Input;

export default function Dashboard(props) {

    const { arrPhimDefault, arrPhimSearch, isSearching } = useSelector(state => state.QuanLyPhimReducer);
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
    
            dispatch(layDanhSachNguoiDungAction());
        

    }, [])

    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: '20%'
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            render: (text, film) => {

                return text;
            },

            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',

            onFilter: (value, record) => record.address.indexOf(value) === 0,

            width: '20%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, film) => {
                return text;
            },


            width: '15%'
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, film) => {
                return text === "KhachHang" ? <span key={film.maLoaiKhacHang}>Khách hàng</span> : <span className="text-red-600">Quản trị</span>
            },


            width: '20%'
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            render: (text, item) => {

                return <div>
                    <NavLink key={item.taiKhoan} className="text-yellow-500 mr-2 text-2xl" to={`/admin/dashboard/edit/${item.taiKhoan}`}><EditOutlined /></NavLink>
                    <button className="text-red-600 text-2xl" onClick={async () => {
                        //Gọi action delete

                        if (window.confirm(`Bạn có muốn xoá tài khoản ${item.taiKhoan}`)) {
                            dispatch(xoaNguoiDungAction(item.taiKhoan))
                        }
                    }}><DeleteOutlined /></button>

                </div>
            },
            width: '25%'
        },
    ]

    let data = danhSachNguoiDung;
    if (isSearching) {
        data = arrPhimSearch;
    }
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }
    const onSearch = async (e) => {


    };

    return (
        <div>
            <div>
                <Button onClick={() => {
                    history.push('/admin/films/addnew')
                }}></Button>
            </div>
            <Search className="mb-5" placeholder="input search text" onChange={onSearch} onPressEnter={(e) => {
                dispatch(timKiemNguoiDungAction(e.target.value));
            }} enterButton={<SearchOutlined />} />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />

        </div>
    )
}
