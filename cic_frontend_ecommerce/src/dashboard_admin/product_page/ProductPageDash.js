// import React from 'react'
// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { Table, Button } from "react-bootstrap"
// import { request } from '../share/request';


// function ProductPageDash() {

//     const [show, setShow] = useState(false)
//     const [showFormCrate, setShowFormCreate] = useState(false)
//     const [result, setList] = useState([])
//     const getlistProduct = () => {
//         axios({
//             url: "http://127.0.0.1:8081/api/product/getAll?page=1&perpage=12",
//             method: "get",
//         })
//         .then(res => {
//             console.log("API Response:", res.data); // Log full response data
//             setList(res.data.result); // Set the list data
//         })
//         .catch(err => {
//             console.log("API Error:", err);
//         });
//     };
    
//     useEffect(() => {
//         getlistProduct();
//     }, []);
    

//     request("product/getAll?page=1&perpage=12", "get")
//     .then(res => {
//         setList(res.data.result);
//     })
//     .catch(err => {
//         console.log(err);
//     });


//     return (
//         <div style={{ padding: 10 }}>
//             <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
//                 <div>
//                     <h3>Product List</h3>
//                 </div>
//                 <div>
//                     <Button variant='primary' onClick={""}>New</Button>
//                 </div>
//             </div>
//             <Table striped bordered hover size='sm'>
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>CODE</th>
//                         <th>NAME EN</th>
//                         <th>NAME KH</th>
//                         <th>QUANTITY</th>
//                         <th>PRICE</th>
//                         <th>IMAGE</th>
//                         <th>DESCRIPTION</th>
//                         <th>EXPIRATION DATE</th>
//                         <th>STATUS</th>
//                         <th>CREATE</th>
//                         <th>CREATE BY</th>
//                         <th>ACTION</th>
//                     </tr>

//                 </thead>
//                 <tbody>
//                     {result.map((item, index) => {
//                         return (
//                             <tr key={index}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.barcode}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>{item.price}</td>
//                                 <td>{item.image}</td>
//                                 <td>{item.description}</td>
//                                 <td>{item.expiration_date}</td>
//                                 <td>{item.is_active}</td>
//                                 <td>{new Date(item.create_at).toLocaleDateString('en-GB')}</td>
//                                 <td>{item.create_by}</td>
                               
//                                 {/* <td>
//                                     <Button onClick={() => onClick_edit(item)} variant="outline-success">Edit</Button>{' '}
//                                     <Button onClick={() => onClick_Delete(item)} variant="outline-danger">Delete</Button>
//                                 </td> */}
//                             </tr>
//                         )
//                     })}

//                 </tbody>
//             </Table>

//         </div>
//     )
// }

// export default ProductPageDash

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { request } from '../share/request';

import baseUrl from '../../server/server_route'

function ProductPageDash() {
    const [result, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

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

    const onClick_edit = (item) => {};
    const onClick_Delete = (item) => {};        

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
            <Form.Select 
                style={{ width: '150px', marginBottom: '10px' }} 
                value={perPage} 
                onChange={(e) => setPerPage(parseInt(e.target.value))}
            >
            
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
                <option value="50">50 per page</option>
            </Form.Select>

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
                            <td>{item.image}</td>
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

