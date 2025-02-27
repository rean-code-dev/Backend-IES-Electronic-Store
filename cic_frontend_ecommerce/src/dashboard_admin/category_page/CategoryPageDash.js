import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Tag } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import baseUrl from '../../server/server_route';
import ImagePath from '../../server/image_path';
import Colors from '../../components/colors/web_colors';
import { Search, RefreshCw, Filter, Download, Eye } from "lucide-react";
import LoadingOverlay from '../../components/custom_loading';

function CategoryPageDash() {
    const [show, setShow] = useState(false);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [result, setList] = useState([]);
    const [item, setItem] = useState({});
    const [image, setImage] = useState(null);
    const [filteredData, setFilteredData] = useState([]); // For search functionality
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());

    const [form] = Form.useForm();


      useEffect(() => {
            const interval = setInterval(() => {
                setDateTime(new Date());
            }, 1000);
    
            return () => clearInterval(interval);
        }, []);
    
    useEffect(() => {
        
        getlist_category();
    }, []);

    const getlist_category = async () => {
        setLoading(true); // Show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const res = await axios.get(baseUrl + 'category');
            setList(res.data.result);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const onDelete_Category = async () => {
        setLoading(true); // Show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShow(false);
        try {
            await axios.delete(`${baseUrl}category/${item.category_id}`);
            setList(result.filter((i) => i.category_id !== item.category_id));
            message.success('Category deleted successfully');
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    const onClick_Delete = async(param) => {
        setLoading(true); // Show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setItem(param);
        setShow(true);
        setLoading(false);
    };

    const onHideModal = () => {
        setShow(false);
        setItem({});
    };

    const onHideModalFromCreate = () => {
        setShowFormCreate(false);
        setItem({});
        form.resetFields();
       
    };

    const onSave_Category = async () => {
        try {
            const values = await form.validateFields();
            setShowFormCreate(false);

            const param = {
                ...values,
                image: image,
                parent_id: null
            };

            const url = item.category_id ? `${baseUrl}category/${item.category_id}` : baseUrl + 'category';
            const method = item.category_id ? 'put' : 'post';

            await axios({ url, method, data: param });
            message.success(`Category ${item.category_id ? 'updated' : 'created'} successfully`);
            getlist_category();
        } catch (err) {
            console.log(err);
        }
    };

    const onClick_edit = async (category) => {
        setLoading(true); // Show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setItem(category);
        form.setFieldsValue(category);
        setShowFormCreate(true);
        setLoading(false);
    };


    const onSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = result.filter((category) =>
            category.name_en.toLowerCase().includes(value) ||
            category.name_kh.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };



    return (
        <div style={{ padding: 20 }}>

            {/* Loading Spinner */}
            <LoadingOverlay loading={loading} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between',}}>
                <h3>Category</h3>
                <span style={{ fontWeight: "bold" }}>{dateTime.toLocaleString()}</span>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <button
                    className="bg-[#b6823e] text-white px-3 py-2 rounded-md flex items-center gap-1"
                    onClick={async () => {
                        setLoading(true); // Show loading
                        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
                        setLoading(false); // Hide loading
                        setShowFormCreate(true); // Show form
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
                            onChange={onSearch}
                            className='w-[300px] h-9 text-lg px-4'
                        />
                        <Button icon={<SearchOutlined />} className='bg-[#c69651] text-white border-[#c69651] h-9 px-4 text-lg' />
                    </div>

                    {/* Select Dropdown */}
                    {/* <select className="border border-[#b6823e] rounded-md px-3 py-1">
                        <option>All</option>
                        <option>10</option>
                        <option>20</option>
                    </select> */}

                    {/* Eye Icon Button */}
                    {/* <button className="bg-[#b6823e] text-white px-3 py-1 rounded-md flex items-center">
                        <Eye size={16} />
                    </button> */}

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
            
            <Table dataSource={result} rowKey='category_id' bordered
                components={{
                    header: {
                        cell: (props) => (
                            <th {...props} style={{ backgroundColor: Colors.color_primary_red.bg_primary_red, color: 'white', textAlign: 'center' }} />
                        ),
                    },
                }}
            >
                <Table.Column title='No' render={(_, __, index) => index + 1} />
                <Table.Column title='Name EN' dataIndex='name_en' key='name_en' />
                <Table.Column title='Name KH' dataIndex='name_kh' key='name_kh' />
                <Table.Column title='Image' render={(text, record) => (
                    <img src={`${ImagePath}/${record.image}`} alt='Category' width='50' height='50' style={{ borderRadius: '5px' }} />
                )} />
                <Table.Column title='Description' dataIndex='description' key='description' />
                <Table.Column
                    title='Status'
                    dataIndex='status'
                    key='status'
                    render={(status) => (
                        <Tag
                            style={{
                                backgroundColor: status === 1 ? Colors.color_status_green.bg_green : Colors.color_status_red.bg_red,
                                color: status === 1 ? Colors.color_status_green.text_green : Colors.color_status_red.text_red, // text-green-500 / text-red-500
                                borderRadius: '20px',
                                padding: '5px 15px',
                                fontSize: '14px',
                                border: 'none'
                            }}
                        >
                            {status === 1 ? 'Active' : 'Inactive'}
                        </Tag>
                    )}
                />
                <Table.Column title='Created' render={(text, record) => new Date(record.create_at).toLocaleDateString('en-GB')} />

                {/* Button Edit and Delete */}
                <Table.Column
                    title="Action"
                    render={(text, record) => (
                        <div className="flex gap-2 ">
                            <Button
                                onClick={() => onClick_edit(record)}
                                style={{
                                    border: `1px solid ${Colors.color_button.button_green} `, // green Border
                                    color: Colors.color_button.button_green, // green Text
                                    backgroundColor: "white",
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => onClick_Delete(record)}
                                style={{
                                    border: `1px solid ${Colors.color_button.button_red} `, // Red Border
                                    color: Colors.color_button.button_red, // Red Text
                                    backgroundColor: "white",
                                }}
                            >Delete</Button>
                        </div>
                    )}
                />
            </Table>

            {/* Delete Modal */}
            <Modal open={show} onCancel={onHideModal} onOk={onDelete_Category} title='Delete Category'>
                <p>Are you sure you want to delete this category?</p>
            </Modal>

            {/* Create/Update Modal */}
            <Modal open={showFormCreate} onCancel={onHideModalFromCreate} onOk={onSave_Category} title={item.category_id ? 'Update Category' : 'Create Category'}>
                <Form form={form} layout='vertical'>
                    <Form.Item name='name_en' label='Name EN' rules={[{ required: true, message: 'Please enter name in English' }]}>
                        <Input placeholder='Name EN' />
                    </Form.Item>
                    <Form.Item name='name_kh' label='Name KH' rules={[{ required: true, message: 'Please enter name in Khmer' }]}>
                        <Input placeholder='Name KH' />
                    </Form.Item>
                    <Form.Item name='description' label='Description'>
                        <Input.TextArea placeholder='Description' />
                    </Form.Item>
                    <Form.Item name='status' label='Status'>
                        <Input placeholder='Status' />
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
        </div>
    );
}

export default CategoryPageDash;
