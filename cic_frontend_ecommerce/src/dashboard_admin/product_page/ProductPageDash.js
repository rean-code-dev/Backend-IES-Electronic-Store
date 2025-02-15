import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';


import baseUrl from '../../server/server_route'
import  ImagePath  from '../../server/image_path';

function ProductPageDash() {
    const [result, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const [show, setShow] = useState(false)
    const [item, setItem] = useState({})

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
        getlistProduct();
    }, [page, perPage]); // Fetch data when page or perPage changes

    return (
        <div style={{ padding: 10 }}>
            <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
                <h3>Product List</h3>
                <Button variant="primary">New</Button>
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
                        <th>CODE</th>
                        <th>NAME EN</th>
                        <th>NAME KH</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
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

            <div className='modal show' style={{ display: 'block', position: 'initial' }}>
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

