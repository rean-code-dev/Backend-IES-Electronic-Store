import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Upload, Pagination, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import baseUrl from '../../server/server_route';
import ImagePath from '../../server/image_path';
import SelectComponent from 'react-select';
import Colors from '../../components/colors/web_colors';
import { Search, RefreshCw, Filter, Download, Eye } from "lucide-react";
import LoadingOverlay from '../../components/custom_loading';

const { Option } = Select;
const { TextArea } = Input;

function ProductPageDash() {
    const [result, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [showFormCreate, setShowFormCreateProduct] = useState(false);
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());


    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getlistProduct = async () => {
        setLoading(true); // Show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        axios({
            url: `${baseUrl}product/getAll?page=${page}&perpage=${perPage}`,
            method: "get",
        })
            .then(res => {
                setList(res.data.result);
                setTotalPages(res.data.totalPages || 1);
            })
            .catch(err => {
                console.log("API Error:", err);
            });

        setLoading(false); // Hide loading  
    };


    const onHideModalFromCreate = () => {
        setShowFormCreateProduct(false);
        setItem({});
        form.resetFields();
    };
    const onClick_edit = async (category) => {
        // setLoading(true); // Show loading
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // setLoading(false);
    };

    const onDelete_Product = () => {
        setShow(false);
        const id = item.product_id;
        axios({
            url: `${baseUrl}/product/${id}`,
            method: 'delete',
        })
            .then(res => {
                const tmp_data = result.filter((item) => item.id !== id);
                setList(tmp_data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onClick_Delete = (param) => {
        setItem(param);
        setShow(true);
    };

    const onHideModal = () => {
        setShow(false);
        setItem({});
    };

    useEffect(() => {
        const getListCategory = () => {
            axios.get(baseUrl + 'category')
                .then(res => {
                    const data = res.data.result.map(item => ({ value: item.id, label: item.name }));
                    setCategoryOptions(data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        getListCategory();
    }, []);

    useEffect(() => {
        getlistProduct();
    }, [page, perPage]);

    return (
        <div style={{ padding: 20 }}>
            {/* Loading Spinner */}
            <LoadingOverlay loading={loading} />
            <div style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}>
                <h3>Product List</h3>
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
            <Table
                dataSource={result}
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
                }}
            >
                <Table.Column
                    title="No"
                    render={(_, __, index) => (page - 1) * perPage + index + 1}
                />
                <Table.Column title="BAR CODE" dataIndex="barcode" />
                <Table.Column title="NAME EN" dataIndex="name" />
                <Table.Column title="NAME KH" dataIndex="nameKh" />
                <Table.Column title="QUANTITY" dataIndex="quantity" />
                <Table.Column title="PRICE" dataIndex="price" />
                <Table.Column title="DISCOUNT" dataIndex="price" />
                <Table.Column
                    title="IMAGE"
                    dataIndex="image"
                    render={(text) => (
                        <img
                            src={`${ImagePath}/${text}`}
                            alt="Uploaded"
                            style={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: 5,
                            }}
                        />
                    )}
                />
                <Table.Column title="EXPIRATION DATE" dataIndex="expiration_date" />
                <Table.Column
                    title="STATUS"
                    dataIndex="is_active"
                    render={(is_active) => (
                        <Tag
                            style={{
                                backgroundColor: is_active ? Colors.color_status_green.bg_green : Colors.color_status_red.bg_red,
                                color: is_active ? Colors.color_status_green.text_green : Colors.color_status_red.text_red,
                                borderRadius: '20px',
                                padding: '5px 15px',
                                fontSize: '14px',
                                border: 'none',
                            }}
                        >
                            {is_active ? 'Active' : 'Inactive'}
                        </Tag>
                    )}
                />
                <Table.Column
                    title="CREATE"
                    dataIndex="create_at"
                    render={(text) => new Date(text).toLocaleDateString('en-GB')}
                />
                <Table.Column title="CREATE BY" dataIndex="create_by" />
                <Table.Column
                    title="ACTION"
                    render={(_, record) => (
                        <div className="flex gap-2">
                            <Button
                                onClick={() => onClick_edit(record)}
                                style={{
                                    border: `1px solid ${Colors.color_button.button_green}`,
                                    color: Colors.color_button.button_green,
                                    backgroundColor: "white",
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => onClick_Delete(record)}
                                style={{
                                    border: `1px solid ${Colors.color_button.button_red}`,
                                    color: Colors.color_button.button_red,
                                    backgroundColor: "white",
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                />
            </Table>


            <Modal
                title="Delete"
                open={show}
                onCancel={onHideModal}
                footer={[
                    <Button key="no" onClick={onHideModal}>No</Button>,
                    <Button key="yes" type="primary" onClick={onDelete_Product}>Yes</Button>,
                ]}
            >
                <p>Are you sure to remove?</p>
            </Modal>

            <Modal
                title={item.product_id == null ? "Create Product" : "Update Product"}
                open={showFormCreate}
                onCancel={onHideModalFromCreate}
                footer={[
                    <Button key="cancel" danger onClick={onHideModalFromCreate}>Cancel</Button>,
                    <Button key="clear" onClick={() => form.resetFields()}>Clear</Button>,
                    <Button key="submit" type="primary" onClick={() => { }}>
                        {item.product_id == null ? "Save" : "Update"}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Category" name="category_id">
                        <SelectComponent
                            value={form.getFieldValue('category_id')}
                            onChange={(selected) => form.setFieldsValue({ category_id: selected })}
                            options={categoryOptions}
                            placeholder="Search Category"
                            isSearchable
                        />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item label="Name EN" name="name" style={{ flex: 1 }} rules={[{ required: true }]}>
                            <Input placeholder="Name EN" />
                        </Form.Item>
                        <Form.Item label="Name KH" name="nameKh" style={{ flex: 1 }}>
                            <Input placeholder="Name KH" />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item label="Quantity" name="quantity" style={{ flex: 1 }}>
                            <Input placeholder="Quantity" />
                        </Form.Item>
                        <Form.Item label="Price" name="price" style={{ flex: 1 }}>
                            <Input placeholder="Price" />
                        </Form.Item>
                    </div>

                    <Form.Item label="Expiration Date" name="expiration_date">
                        <Input placeholder="Expiration Date" />
                    </Form.Item>

                    <Form.Item label="Description" name="description">
                        <TextArea rows={3} placeholder="Description" />
                    </Form.Item>

                    <Form.Item label="Status" name="status">
                        <Input placeholder="Status" />
                    </Form.Item>

                    <Form.Item label='Upload Image'>
                        <Upload
                            listType='picture-card'
                            showUploadList={false}
                            beforeUpload={(file) => {
                                setImage(file);
                                return false;
                            }}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <Pagination
                    current={page}
                    pageSize={perPage}
                    total={totalPages * perPage}
                    onChange={(newPage) => setPage(newPage)}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}

export default ProductPageDash;