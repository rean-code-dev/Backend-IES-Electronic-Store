import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { request } from '../share/request';
import Select from "react-select";
import baseUrl from '../../server/server_route'
import  ImagePath  from '../../server/image_path';

function ProductPageDash() {
    const [result, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [showFormCrate, setShowFormCreateProduct] = useState(false)
    const [show, setShow] = useState(false)
    const [item, setItem] = useState({})

    const [name, setNameEn] = useState("")
    const [namekh, setNameKh] = useState("")

    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const [expiration_date, setExpriationDate] = useState("")

    const [status, setStatus] = useState("")
    const [price, setPrice] = useState("")
    const [barcode, setBarCode] = useState("")
 
    const [quantity, setQuantity] = useState("")
    const [discount, setDiscount] = useState("")
    const [category_id, setCategoryId] = useState("")
    const [categoryOptions, setCategoryOptions] = useState([]);

   

    const getlistProduct = () => {
        axios({
            url: `${baseUrl}product/getAll?page=${page}&perpage=${perPage}`,
            method: "get",
        })
            .then(res => {
                setList(res.data.result);
                setTotalPages(res.data.totalPages || 1); // Adjust based on API response
            })
            .catch(err => {
                console.log("API Error:", err);
            });
    };

    

    const onShowModalForm = () => {
        setShowFormCreateProduct(true)
    }

    const onHideModalFromCreate = () => {
        setShowFormCreateProduct(false)
        setItem({})
        clearForm()

    }
    const clearForm = () => {
        setNameEn("")
        setNameKh("")
        setImage("")
        setDescription("")
        setStatus("")
        setPrice("")
        setBarCode("")
        setCategoryId("")
        setQuantity("")
        setDiscount("")
    }

    const onDelete_Product = () => {
        setShow(false)
        var  id = item.product_id
        axios({
            url: `${baseUrl}/product/${id}`,
            method: 'delete',

        }).then(res => {
            //api respone
            var data = res.data
        
            var tmp_data = result.filter((item) => item.id != id)
            setList(tmp_data)


        }).catch(err => {
            console.log(err)
        })
    };

    const onClick_edit = (item) => { };
  
    const onClick_Delete = (param) => {
        setItem(param)
        setShow(true)

    }
    const onHideModal = () => {
        setShow(false)
        setItem(null)
    }


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


    const handleChange = (selectedOption) => {
        setCategoryId(selectedOption);
    };

    useEffect(() => {
        getlistProduct();
    }, [page, perPage]); // Fetch data when page or perPage changes

    
    return (
        <div style={{ padding: 10 }}>
            <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
                <h3>Product List</h3>
                <Button variant="primary" onClick={onShowModalForm}>Create New</Button>
            </div>

            {/* Per Page Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <span>Show page</span>
                <Form.Select
                    style={{ width: '70px' }}
                    value={perPage}
                    onChange={(e) => setPerPage(parseInt(e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </Form.Select>
            </div>


            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>BAR CODE</th>
                        <th>NAME EN</th>
                        <th>NAME KH</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>DISCOUNT</th>
                        <th>IMAGE</th>
                        {/* <th>DESCRIPTION</th> */}
                        <th>EXPIRATION DATE</th>
                        <th>STATUS</th>
                        <th>CREATE</th>
                        <th>CREATE BY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => (
                        <tr key={index}>
                            <td>{(page - 1) * perPage + index + 1}</td>
                            <td>{item.barcode}</td>
                            <td>{item.name}</td>
                            <td>{item.nameKh}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price}</td>
                            <td>
                                    <img 
                                        src={`${ImagePath}/${item.image}`} 
                                        alt="Uploaded" 
                                        width="50" 
                                        height="50"
                                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                </td>
                            {/* <td>{item.description}</td> */}
                            <td>{item.expiration_date}</td>
                            <td>{item.is_active}</td>
                            <td>{new Date(item.create_at).toLocaleDateString('en-GB')}</td>
                            <td>{item.create_by}</td>
                            <td>
                                <Button onClick={() => onClick_edit(item)} variant="outline-success">Edit</Button>{' '}
                                <Button onClick={() => onClick_Delete(item)} variant="outline-danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* <div className='modal show' style={{ display: 'block', position: 'initial' }}>
                <Modal show={show} onHide={onHideModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure to remove?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={onHideModal}>No</Button>
                        <Button variant='primary' onClick={onDelete_Product}>Yes</Button>
                    </Modal.Footer>

                </Modal>

            </div> */}

             {/* Block  modal from insert/update*/}

             <div className='modal show' style={{ display: 'block', position: 'initial' }}>
                <Modal show={showFormCrate} onHide={onHideModalFromCreate} >
                    <Modal.Header closeButton>
                        <Modal.Title>{item.product_id == null ? "Create Product" : "Update Product"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="categorySelect">
                            <Form.Label>Category</Form.Label>
                            <Select
                                value={category_id}
                                onChange={handleChange}
                                options={categoryOptions}
                                placeholder="Search Category"
                                isSearchable
                            />
                            </Form.Group>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* ===================== First Name ============== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Name EN</Form.Label>
                                    <Form.Control
                                        value={name}
                                        type="input"
                                        placeholder="name en"
                                        rules={[
                                            {
                                              required: true,
                                              message: 'Please input Name EN!',
                                            },
                                          ]}
                                        onChange={(event) => {
                                            setNameEn(event.target.value);
                                        }}
                                    />
                                </Form.Group>

                                {/* ======================= Last Name =================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Name KH</Form.Label>
                                    <Form.Control
                                        value={namekh}
                                        type="input"
                                        placeholder="Price"
                                        onChange={(event) => {
                                            setNameKh(event.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            
                         
                         
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* ===================== First Name ============== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        value={quantity}
                                        type="input"
                                        placeholder="First Name"
                                        onChange={(event) => {
                                            setQuantity(event.target.value);
                                        }}
                                    />
                                </Form.Group>

                                {/* ======================= Last Name =================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        value={price}
                                        type="input"
                                        placeholder="Price"
                                        onChange={(event) => {
                                            setPrice(event.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control
                                    value={expiration_date}
                                    type="input"
                                    placeholder="expiration date"
                                    onChange={(event) => {
                                        setExpriationDate(event.target.value)
                                    }}
                                />
                            </Form.Group>
                           
                            
                            
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    value={description}
                                    as="textarea"
                                    placeholder='Description'
                                    rows={3}
                                    onChange={(event) => {
                                        setDescription(event.target.value)

                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    value={status}
                                    type="input"
                                    placeholder="Status"
                                    onChange={(event) => {
                                        setStatus(event.target.value)
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formImageUpload">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={""} required />
                                <Form.Text className="text-muted">Please upload a relevant image for the category.</Form.Text>
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={onHideModalFromCreate}>Cancel</Button>
                        <Button variant='secondary' onClick={clearForm}>Clear</Button>
                        <Button variant='primary' onClick={""}>{item.category_id == null ? "Save" : "Update"}</Button>
                    </Modal.Footer>

                </Modal>

            </div>


            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
                <Button
                    variant="secondary"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span>Page {page} of {totalPages}</span>
                <Button
                    variant="primary"
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                >
                    Next
                </Button>
            </div>
        </div>

    );
}

export default ProductPageDash;

