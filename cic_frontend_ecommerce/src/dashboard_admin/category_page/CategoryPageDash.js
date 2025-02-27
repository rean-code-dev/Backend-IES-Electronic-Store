
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { Table, Button, Modal, Form } from "react-bootstrap"
// import { request } from '../share/request';
// import baseUrl from '../../server/server_route'
// import  ImagePath  from '../../server/image_path';


// function CategoryPageDash() {


//     const [show, setShow] = useState(false)
//     const [showFormCrate, setShowFormCreate] = useState(false)
//     const [result, setList] = useState([])
//     const [item, setItem] = useState({})

//     const [name_en, setNameEn] = useState("")
//     const [name_kh, setNameKh] = useState("")

//     const [image, setImage] = useState("")
//     const [description, setDescription] = useState("")
//     const [status, setStatus] = useState("")


//     useEffect(() => {
//         getlist_category()
//     }, [])


//     const getlist_category = () => {
//         axios({
//             url: baseUrl + "category",
//             method: 'get',

//         }).then(res => {
//             //api respone
//             var data = res.data
//             setList(data.result)
//         }).catch(err => {
//             console.log(err)
//         })

//         request("category", "get").then(res => {
//             //api respone
//             var data = res.data
//             setList(data.result)


//         }).catch(err => {
//             console.log(err)
//         })

//     }

//     const onDelete_Category = () => {
//         setShow(false)
//         var category_id = item.category_id

//         axios({
//             url: baseUrl + "category/" + category_id,
//             method: 'delete',

//         }).then(res => {
//             //api respone
//             var data = res.data
//             // setList(data.message)
//             //getlist_category()
//             var tmp_data = result.filter((item) => item.category_id != category_id)
//             setList(tmp_data)


//         }).catch(err => {
//             console.log(err)
//         })
//     }
//     const onClick_Delete = (param) => {
//         setItem(param)
//         setShow(true)

//     }
//     const onHideModal = () => {
//         setShow(false)
//         setItem(null)
//     }
//     const clearForm = () => {
//         setNameEn("")
//         setNameKh("")
//         setImage("")
//         setDescription("")
//         setStatus("")
//     }

//     const onHideModalFromCreate = () => {
//         setShowFormCreate(false)
//         setItem({})
//         clearForm()

//     }
//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     if (!selectedFile) {
//     //         alert("Please select an image to upload.");
//     //         return;
//     //     }

//     //     const formData = new FormData();
//     //     formData.append("image", selectedFile);
//     //     formData.append("name_en", nameEn);
//     //     formData.append("name_kh", nameKh);

//     //     try {
//     //         const response = await axios.post("http://localhost:5000/upload", formData, {
//     //             headers: { "Content-Type": "multipart/form-data" },
//     //         });

//     //         alert("Image uploaded successfully!");
//     //         fetchCategories(); // Refresh category list
//     //     } catch (error) {
//     //         console.error("Upload error:", error);
//     //         alert("Upload failed!");
//     //     }
//     // };


//     //=============  save category ============
//     const onSave_Category = () => {
//         onHideModalFromCreate()
//         var param = {
//             "name_en": name_en,
//             "name_kh": name_kh,
//             "image": image,
//             "description": description,
//             "parent_id": null,
//             "status": status
//         }

//         var url = baseUrl + "category"
//         var method = 'post'
//         //Case update
//         if (item.category_id != null) {
//             param.category_id = item.category_id   //add new key "category_id " to param 
//             method = 'put'
//         }

//         axios({
//             url: url,
//             method: method,
//             data: param
//         }).then(res => {
//             if (res) {
//                 getlist_category();

//             }
//         })
//     }

//     const onShowModalForm = () => {
//         setShowFormCreate(true)
//     }

//     const onClick_edit = (item) => {
//         setItem(item)
//         setNameEn(item.name_en)
//         setNameKh(item.name_kh)
//         setImage(item.image)
//         setDescription(item.description)
//         setStatus(item.status)
//         setShowFormCreate(true)

//     }

//     return (
//         <div style={{ padding: 10 }}>
//             <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
//                 <div>
//                     <h3>Category</h3>
//                 </div>
//                 <div>
//                     <Button variant='primary' onClick={onShowModalForm}> CreateNew</Button>
//                 </div>
//             </div>
//             <Table striped bordered hover size='sm'>
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>NAME EN</th>
//                         <th>NAME KH</th>
//                         <th>IMAGE</th>
//                         <th>DESCRIPTION</th>
//                         <th>STATUS</th>
//                         <th>CREATE</th>
//                         <th>ACTION</th>
//                     </tr>

//                 </thead>
//                 <tbody>
//                     {result.map((item, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.name_en}</td>
//                                 <td>{item.name_kh}</td>
//                                 <td>
//                                     <img 
//                                         src={`${ImagePath}/${item.image}`} 
//                                         alt="Uploaded" 
//                                         width="50" 
//                                         height="50"
//                                         style={{ objectFit: 'cover', borderRadius: '5px' }}
//                                     />
//                                 </td>
//                                 <td>{item.description}</td>
//                                 <td>{item.status}</td>
//                                 <td>{new Date(item.create_at).toLocaleDateString('en-GB')}</td>
//                                 <td>
//                                     <Button onClick={() => onClick_edit(item)} variant="outline-success">Edit</Button>{' '}
//                                     <Button onClick={() => onClick_Delete(item)} variant="outline-danger">Delete</Button>
//                                 </td>
//                             </tr>
//                         )
//                     })}

//                 </tbody>
//             </Table>
//             <div className='modal show' style={{ display: 'block', position: 'initial' }}>
//                 <Modal show={show} onHide={onHideModal} >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Delete </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>Are you sure to remove?</p>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant='secondary' onClick={onHideModal}>No</Button>
//                         <Button variant='primary' onClick={onDelete_Category}>Yes</Button>
//                     </Modal.Footer>

//                 </Modal>

//             </div>


//             {/* Block  modal from insert/update*/}

//             <div className='modal show' style={{ display: 'block', position: 'initial' }}>
//                 <Modal show={showFormCrate} onHide={onHideModalFromCreate} >
//                     <Modal.Header closeButton>
//                         <Modal.Title>{item.category_id == null ? "Create Category" : "Update Category"}</Modal.Title>
//                     </Modal.Header>

//                     <Modal.Body>
//                         <Form>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Label>Name En</Form.Label>
//                                 <Form.Control
//                                     value={name_en} //state Name En
//                                     type="input"
//                                     placeholder="Name En"
//                                     onChange={(event) => {
//                                         setNameEn(event.target.value)   //get value from user onchage => set value to name state 
//                                     }}

//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Label>Name Kh</Form.Label>
//                                 <Form.Control
//                                     value={name_kh} //state Name Kh
//                                     type="input"
//                                     placeholder="Name kh"
//                                     onChange={(event) => {
//                                         setNameKh(event.target.value)   //get value from user onchage => set value to name state 
//                                     }}
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                                 <Form.Label>Description</Form.Label>
//                                 <Form.Control
//                                     value={description}
//                                     as="textarea"
//                                     placeholder='Description'
//                                     rows={3}
//                                     onChange={(event) => {
//                                         setDescription(event.target.value)

//                                     }}
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Label>Status</Form.Label>
//                                 <Form.Control
//                                     value={status}
//                                     type="input"
//                                     placeholder="Status"
//                                     onChange={(event) => {
//                                         setStatus(event.target.value)
//                                     }}
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3" controlId="formImageUpload">
//                                 <Form.Label>Upload Image</Form.Label>
//                                 <Form.Control type="file" accept="image/*" onChange={""} required />
//                                 <Form.Text className="text-muted">Please upload a relevant image for the category.</Form.Text>
//                             </Form.Group>

//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant='danger' onClick={onHideModalFromCreate}>Cancel</Button>
//                         <Button variant='secondary' onClick={clearForm}>Clear</Button>
//                         <Button variant='primary' onClick={onSave_Category}>{item.category_id == null ? "Save" : "Update"}</Button>
//                     </Modal.Footer>

//                 </Modal>

//             </div>
//         </div>
//     );
// }
// export default CategoryPageDash;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Tag, Spin} from 'antd';
import { PlusOutlined, SearchOutlined, LoadingOutlined} from '@ant-design/icons';
import baseUrl from '../../server/server_route';
import ImagePath from '../../server/image_path';
import Colors from '../../components/colors/web_colors';
import { Search, RefreshCw, Filter, Download, Eye } from "lucide-react";

function CategoryPageDash() {
    const [show, setShow] = useState(false);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [result, setList] = useState([]);
    const [item, setItem] = useState({});
    const [image, setImage] = useState(null);
    const [filteredData, setFilteredData] = useState([]); // For search functionality
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        getlist_category();
    }, []);

    const getlist_category = async () => {
        try {
            const res = await axios.get(baseUrl + 'category');
            setList(res.data.result);
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete_Category = async () => {
        setShow(false);
        try {
            await axios.delete(`${baseUrl}category/${item.category_id}`);
            setList(result.filter((i) => i.category_id !== item.category_id));
            message.success('Category deleted successfully');
        } catch (err) {
            console.log(err);
        }
    };

    const onClick_Delete = (param) => {
        setItem(param);
        setShow(true);
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

    const onClick_edit = async  (category) => {
        
        setLoading(true); // Show loading
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setItem(category);
        form.setFieldsValue(category);
        setShowFormCreate(true);
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

             {/* Full-Screen Loading Spinner */}
             {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(255, 255, 255, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <Spin
                        indicator={<LoadingOutlined style={{ fontSize: 48, color: "#C60925" }} spin />}
                    />
                </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3>Category</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Button type="primary" onClick={() => setShowFormCreate(true)} style={{ backgroundColor: '#c69651', borderColor: '#c69651' }}>
                    + Add New
                </Button>
               
                <div className="flex items-center gap-2">
                    {/* Search Input */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Input
                        placeholder="Search..."
                        value={searchText}
                        onChange={onSearch}
                        style={{ width: 250 }}
                    />
                    <Button icon={<SearchOutlined />} style={{ backgroundColor: '#c69651', color: 'white', borderColor: '#c69651' }} />
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
                    <button className="bg-[#b6823e] text-white px-3 py-1 rounded-md flex items-center gap-1">
                        <RefreshCw size={16} />
                        Refresh
                    </button>

                    {/* Filter Button */}
                    <button className="bg-[#b6823e] text-white px-3 py-1 rounded-md flex items-center gap-1">
                        <Filter size={16} />
                        Filter
                    </button>

                    {/* Export Button */}
                    <button className="bg-[#b6823e] text-white px-3 py-1 rounded-md flex items-center gap-1">
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
                <Table.Column
                    title="Action"
                    render={(text, record) => (
                        <div className="flex gap-2">
                         <Button
                            onClick={() => onClick_edit(record)}
                            style={{
                            border: `1px solid ${Colors.color_button.button_red} `, // Red Border
                            color: Colors.color_button.button_red, // Red Text
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
                        >
                            Delete
                        </Button>
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
