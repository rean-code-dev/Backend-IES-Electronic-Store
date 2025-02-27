
import React, { useEffect, useState } from 'react';
import Colors from '../../components/colors/web_colors';
import { Table, Button, Modal, Form, Input, Select, Upload, Pagination, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Search, RefreshCw, Filter, Download, Eye } from "lucide-react";


const { Option } = Select;


const onClick_edit = async (category) => {
  // setLoading(true); // Show loading
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // setLoading(false);
};
const onClick_Delete = (param) => {
  // setItem(param);
  // setShow(true);
};
function PromotionPageDash() {
   const [dateTime, setDateTime] = useState(new Date());
      const [showFormCreate, setShowFormCreateProduct] = useState(false);
      const [page, setPage] = useState(1);
      const [perPage, setPerPage] = useState(5);
      const [show, setShow] = useState(false);
      const [item, setItem] = useState({});
      const [searchText, setSearchText] = useState("");
      const [loading, setLoading] = useState(false);
      const [form] = Form.useForm();

    useEffect(() => {
           const interval = setInterval(() => {
               setDateTime(new Date());
           }, 1000);
   
           return () => clearInterval(interval);
       }, []);



    return (
        <div style={{ padding: 10 }}>
            {/* Header Section */}
            <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Promotion</h3>
                <span style={{ fontWeight: "bold" }}>{dateTime.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <button
                    className="bg-[#b6823e] text-white px-3 py-2 rounded-md flex items-center gap-1"
                    onClick={async () => {
                        setLoading(true); // Show loading
                        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
                        setLoading(false); // Hide loading
                        setShowFormCreateProduct(true); // Show form
                    }}
                >
                    + Add New
                </button>
                <div className="flex items-center gap-2 py-2 px-4 rounded-md bg-white shadow-md">
                    {/* Search Input */}
                    <div className="flex items-center gap-2 py-2">
                        <Input
                            placeholder="Search..."
                            value={searchText}
                            onChange={""}
                            className='w-[300px] h-9 text-lg px-4'
                        />
                        <Button icon={<SearchOutlined />} className='bg-[#c69651] text-white border-[#c69651] h-9 px-4 text-lg' />
                    </div>

                    <div className="flex items-center gap-2 py-2">
                        {/* Custom Select Dropdown */}
                        <select
                            value={perPage}
                            onChange={(e) => setPerPage(Number(e.target.value))}
                            className="border border-[#b6823e] rounded-md px-3 py-2"
                        >
                            <option value="all">All</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>

                        {/* Eye Icon Button */}
                        <Button icon={<Eye />} className='bg-[#c69651] text-white border-[#c69651] h-9 px-4 text-lg' />
                    </div>


                    {/* Refresh Button */}
                    <button className="bg-[#b6823e] text-white px-3 py-2 rounded-md flex items-center gap-1">
                        <RefreshCw size={16} />
                        Refresh
                    </button>

                    {/* Filter Button */}
                    <button className="bg-[#b6823e] text-white px-3 py-2 rounded-md flex items-center gap-1">
                        <Filter size={16} />
                        Filter
                    </button>

                    {/* Export Button */}
                    <button className="bg-[#b6823e] text-white px-3 py-2 rounded-md flex items-center gap-1">
                        <Download size={16} />
                        Export
                    </button>
                </div>


            </div>

           
            

            {/* Table */}
            <Table
                pagination={false}
                rowKey="product_id"
                bordered
                components={{
                    header: {
                        cell: (props) => (
                            <th
                                {...props}
                                style={{
                                    backgroundColor: Colors.color_primary_red.bg_primary_red,
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            />
                        ),
                    },
                }}>
                <Table.Column title="No" dataIndex="no" key="no" />
                <Table.Column title="Promotion Type" dataIndex="promotion_type" key="promotion_type" />
                <Table.Column title="Start Date" dataIndex="start_date" key="start_date" />
                <Table.Column title="End Date" dataIndex="end_date" key="end_date" />
                <Table.Column title="Active" dataIndex="active" key="active" />
                <Table.Column title="Amount" dataIndex="amount" key="amount" />
                <Table.Column title="Percentage" dataIndex="percentage" key="percentage" />
                <Table.Column title="Max. Promotion Amount" dataIndex="max_promotion" key="max_promotion" />
                <Table.Column title="After Promotion" dataIndex="after_promotion" key="after_promotion" />
                <Table.Column title="Create Date" dataIndex="create_date" key="create_date" />
                <Table.Column title="Create By" dataIndex="create_by" key="create_by" />
                <Table.Column
                    title="ACTION"
                    key="action"
                    render={(_, record) => (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button type="link" onClick={() => onClick_edit(record)} style={{ color: 'green' }}>
                                Edit
                            </Button>
                            <Button type="link" onClick={() => onClick_Delete(record)} style={{ color: 'red' }}>
                                Delete
                            </Button>
                        </div>
                    )}
                />
            </Table>
        </div>
    );
}

export default PromotionPageDash;
