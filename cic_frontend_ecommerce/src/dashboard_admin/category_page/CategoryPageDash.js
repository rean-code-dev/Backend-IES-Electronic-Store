
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form } from "react-bootstrap"
import { FileInput, Label } from "flowbite-react";
import { request } from '../share/request';

import baseUrl from '../../server/server_route'
import  ImagePath  from '../../server/image_path';
function CategoryPageDash() {


    const [show, setShow] = useState(false)
    const [showFormCrate, setShowFormCreate] = useState(false)
    const [result, setList] = useState([])
    const [item, setItem] = useState({})

    const [name_en, setNameEn] = useState("")
    const [name_kh, setNameKh] = useState("")

    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")


    useEffect(() => {
        getlist_category()
    }, [])

    
    const getlist_category = () => {
        axios({
            url: baseUrl + "category",
            method: 'get',

        }).then(res => {
            //api respone
            var data = res.data
            setList(data.result)
        }).catch(err => {
            console.log(err)
        })

        request("category", "get").then(res => {
            //api respone
            var data = res.data
            setList(data.result)


        }).catch(err => {
            console.log(err)
        })

    }



    const onDelete_Category = () => {
        setShow(false)
        var category_id = item.category_id

        axios({
            url: baseUrl + "category/" + category_id,
            method: 'delete',

        }).then(res => {
            //api respone
            var data = res.data
            // setList(data.message)
            //getlist_category()
            var tmp_data = result.filter((item) => item.category_id != category_id)
            setList(tmp_data)


        }).catch(err => {
            console.log(err)
        })
    }
    const onClick_Delete = (param) => {
        setItem(param)
        setShow(true)

    }
    const onHideModal = () => {
        setShow(false)
        setItem(null)
    }
    const clearForm = () => {
        setNameEn("")
        setNameKh("")
        setImage("")
        setDescription("")
        setStatus("")
    }

    const onHideModalFromCreate = () => {
        setShowFormCreate(false)
        setItem({})
        clearForm()

    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!selectedFile) {
    //         alert("Please select an image to upload.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("image", selectedFile);
    //     formData.append("name_en", nameEn);
    //     formData.append("name_kh", nameKh);

    //     try {
    //         const response = await axios.post("http://localhost:5000/upload", formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });

    //         alert("Image uploaded successfully!");
    //         fetchCategories(); // Refresh category list
    //     } catch (error) {
    //         console.error("Upload error:", error);
    //         alert("Upload failed!");
    //     }
    // };


    //=============  save category ============
    const onSave_Category = () => {
        onHideModalFromCreate()
        var param = {
            "name_en": name_en,
            "name_kh": name_kh,
            "image": image,
            "description": description,
            "parent_id": null,
            "status": status
        }

        var url = baseUrl + "category"
        var method = 'post'
        //Case update
        if (item.category_id != null) {
            param.category_id = item.category_id   //add new key "category_id " to param 
            method = 'put'
        }

        axios({
            url: url,
            method: method,
            data: param
        }).then(res => {
            if (res) {
                getlist_category();

            }
        })
    }

    const onShowModalForm = () => {
        setShowFormCreate(true)
    }

    const onClick_edit = (item) => {
        setItem(item)
        setNameEn(item.name_en)
        setNameKh(item.name_kh)
        setImage(item.image)
        setDescription(item.description)
        setStatus(item.status)
        setShowFormCreate(true)

    }

    return (
        <div style={{ padding: 10 }}>
            <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h3>Category</h3>
                </div>
                <div>
                    <Button variant='primary' onClick={onShowModalForm}>New</Button>
                </div>
            </div>
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>NAME EN</th>
                        <th>NAME KH</th>
                        <th>IMAGE</th>
                        <th>DESCRIPTION</th>
                        <th>STATUS</th>
                        <th>CREATE</th>
                        <th>ACTION</th>
                    </tr>

                </thead>
                <tbody>
                    {result.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name_en}</td>
                                <td>{item.name_kh}</td>
                                <td>
                                    <img 
                                        src={`${ImagePath}/${item.image}`} 
                                        alt="Uploaded" 
                                        width="50" 
                                        height="50"
                                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                </td>
                                <td>{item.description}</td>
                                <td>{item.status}</td>
                                <td>{new Date(item.create_at).toLocaleDateString('en-GB')}</td>
                                <td>
                                    <Button onClick={() => onClick_edit(item)} variant="outline-success">Edit</Button>{' '}
                                    <Button onClick={() => onClick_Delete(item)} variant="outline-danger">Delete</Button>
                                </td>
                            </tr>
                        )
                    })}

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
                        <Button variant='primary' onClick={onDelete_Category}>Yes</Button>
                    </Modal.Footer>

                </Modal>

            </div>


            {/* Block  modal from insert/update*/}

            <div className='modal show' style={{ display: 'block', position: 'initial' }}>
                <Modal show={showFormCrate} onHide={onHideModalFromCreate} >
                    <Modal.Header closeButton>
                        <Modal.Title>{item.category_id == null ? "Create Category" : "Update Category"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name En</Form.Label>
                                <Form.Control
                                    value={name_en} //state Name En
                                    type="input"
                                    placeholder="Name En"
                                    onChange={(event) => {
                                        setNameEn(event.target.value)   //get value from user onchage => set value to name state 
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name Kh</Form.Label>
                                <Form.Control
                                    value={name_kh} //state Name Kh
                                    type="input"
                                    placeholder="Name kh"
                                    onChange={(event) => {
                                        setNameKh(event.target.value)   //get value from user onchage => set value to name state 
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
                        <Button variant='primary' onClick={onSave_Category}>{item.category_id == null ? "Save" : "Update"}</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        </div>
    );
}
export default CategoryPageDash;

