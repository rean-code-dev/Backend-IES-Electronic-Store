import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form } from "react-bootstrap"
import { SnackbarProvider, useSnackbar } from 'notistack';
import "../../server/server_route"
function EmployeePageDash() {
    const { enqueueSnackbar } = useSnackbar(); // Initialize notistack
    const [result, setList] = useState([])
    const [item, setItem] = useState({})
    const [show,setShow] = useState(false)
   


    const [showFormCrate, setShowFormCreate] = useState(false)
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [gender, setGender] = useState("")
    const [position, setPosition] = useState("")
    const [image, setImage] = useState(null);
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [base_salary, setBaseSalary] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("")
    const [country, setCountry] = useState("")
    const [status, setStatus] = useState("")



    useEffect(() => {
        getlist_employee()
    }, [])

    const server = "http://127.0.0.1:8081/api/"
    const getlist_employee = () => {
        axios({
            url: server + "employee",
            method: 'get',

        }).then(res => {
            //api respone
            var data = res.data
            setList(data.result)


        }).catch(err => {
            console.log(err)
        })

    }
    const onShowModalForm = () => {
        setShowFormCreate(true)
    }

    ///========================== Save Employee =========================
    const onSave_Employee = ()=>{
        onHideModalFromCreate()
        var param = {
            "firstname":firstname,
            "lastname" : lastname,
            "gender" : gender,
            "position":position,
            "image" : image,
            "dob" : dob,
            "phone":phone,
            "email" : email,
            "base_salary" : base_salary,
            "address":address,
            "province" : province,
            "country" : country,
            "status" : status
          }

          var url = server + "employee"
          var method  = 'post'
          //Case update
          if(item.employee_id != null){
            param.employee_id = item.employee_id   //add new key "category_id " to param 
            method = 'put'
          }
          
        axios({
            url: url,
            method : method,
            data : param
        }).then(res =>{
            // if(res){
            //     enqueueSnackbar('Employee saved successfully!', { variant: 'success' });
            //     getlist_employee();
             
            // }
            if (res) {
                enqueueSnackbar('Employee saved successfully!', { variant: 'success' });
                getlist_employee(); // Update your employee list
              }
            })
            .catch((error) => {
              enqueueSnackbar('Failed to save employee.', { variant: 'error' });
            
        })
    }

    const onClick_edit = (item) => {
        // setItem(item)
        // setNameEn(item.name_en)
        // setNameKh(item.name_kh)
        // setImage(item.image)
        // setDescription(item.description)
        // setStatus (item.status)
        // setShowFormCreate(true)

    }

    const onDelete_Employee  = ()=>{
        setShow(false)
        var employee_id = item.employee_id

        axios({
            url: server + "employee/"+employee_id,
            method : 'delete',
            
        }).then(res=>{
            //api respone
            var data = res.data
    
            var tmp_data = result.filter((item)=>item.employee_id != employee_id)
            setList(tmp_data)
        

        }).catch(err =>{
            console.log(err)
        })
    }
    const onClick_Delete = (param)=>{
        setItem(param)
        setShow(true)

    }

    const clearForm = ()=>{
        setFirstName("")
        setLastName("")
        setGender("")
        setPosition("")
        setImage("")
        setDob("")
        setPhone("")
        setEmail("")
        setBaseSalary("")
        setAddress("")
        setProvince("")
        setCountry("")
        setStatus("")

    }
    const onHideModal = ()=>{
        setShow(false)
        setItem(null)
    }
    const onHideModalFromCreate = () => {
        setShowFormCreate(false)
        setItem({})
        clearForm()

    }


    return (
        <div style={{ padding: 10 }}>
            <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h3>Employee</h3>
                </div>
                <div>
                    <Button variant='primary' onClick={onShowModalForm}>New</Button>
                </div>
            </div>
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME </th>
                        <th>GENDER</th>
                        <th>POSITION</th>
                        <th>IMAGE</th>
                        <th>DATE OF BIRTH</th>
                        <th>PHONE</th>
                        <th>EMAIL</th>
                        <th>SALARY ($)</th>
                        <th>ADDRESS</th>
                        <th>PROVINCE</th>
                        <th>COUNTRY</th>
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
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.gender}</td>
                                <td>{item.position}</td>
                                <td>{item.image}</td>
                                <td>{item.dob}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>{item.base_salary}</td>
                                <td>{item.address}</td>
                                <td>{item.province}</td>
                                <td>{item.country}</td>
                                <td>{item.status}</td>
                                <td>{item.create_at}</td>
                                <td>
                                    <Button onClick={() => onClick_edit(item)} variant="outline-success">Edit</Button>{' '}
                                    <Button onClick={() => onClick_Delete(item)} variant="outline-danger">Delete</Button>
                                </td>


                            </tr>
                        )
                    })}

                </tbody>
            </Table>

            {/* Bloc Delete employee */}
            <div className='modal show' style={{display:'block',position:'initial'}}>
                <Modal show ={show} onHide ={onHideModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure to remove?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={onHideModal}>No</Button>
                        <Button variant='primary' onClick={onDelete_Employee}>Yes</Button>
                    </Modal.Footer>

                </Modal>

            </div>

            {/* Block  modal from insert/update*/}
            <div className='modal show' style={{ display: 'block', position: 'initial' }}>
                <Modal show={showFormCrate} onHide={onHideModalFromCreate} >
                    <Modal.Header closeButton>
                        <Modal.Title>{item.category_id == null ? "Create Employee" : "Update Employee"}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* ===================== First Name ============== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        value={firstname}
                                        type="input"
                                        placeholder="First Name"
                                        onChange={(event) => {
                                            setFirstName(event.target.value);
                                        }}
                                    />
                                </Form.Group>

                                {/* ======================= Last Name =================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        value={lastname}
                                        type="input"
                                        placeholder="Last Name"
                                        onChange={(event) => {
                                            setLastName(event.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </div>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* ======================= Gender ======================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1" style={{ flex: 1 }}>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select
                                        value={gender} // state gender
                                        onChange={(event) => {
                                            setGender(event.target.value); // update gender state
                                        }}
                                    >
                                        <option value="">Select Gender</option> {/* Default option */}
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Form.Select>
                                </Form.Group>
                                {/* ========================= Position ===================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1" style={{ flex: 1 }}>
                                    <Form.Label>Position</Form.Label>
                                    <Form.Select
                                        value={position}
                                        onChange={(event) => {
                                            setPosition(event.target.value); // update gender state
                                        }}
                                    >
                                        <option value="">Select Position</option> {/* Default option */}
                                        <option value="supervisor">Supervisor</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="cashiers">Cashiers</option>
                                    </Form.Select>
                                </Form.Group>

                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>

                                {/* ===================== Dob ============== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control
                                        value={dob}
                                        type="date"  // Use type="date" to show calendar picker
                                        placeholder="Date of Birth"
                                        onChange={(event) => {
                                            setDob(event.target.value); // Update dob state
                                        }}
                                    />
                                </Form.Group>

                                {/* ======================= Phone =================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        value={phone}
                                        type="input"
                                        placeholder="Phone"
                                        onChange={(event) => {
                                            setPhone(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* ======================= Email ======================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 2 }}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={email}
                                        type="input"
                                        placeholder="Email"
                                        onChange={(event) => {
                                            setEmail(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                                {/* ========================= Base Salry ===================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Salary ($)</Form.Label>
                                    <Form.Control
                                        value={base_salary}
                                        type="input"
                                        placeholder="Salary"
                                        onChange={(event) => {
                                            setBaseSalary(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>

                            {/* ===================== Address ============== */}
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    value={address}
                                    type="input"
                                    placeholder="Address"
                                    onChange={(event) => {
                                        setAddress(event.target.value)
                                    }}
                                />
                            </Form.Group>

                            <div style={{ display: 'flex', gap: '16px' }}>
                                {/* ======================= Province =================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control
                                        value={province}
                                        type="input"
                                        placeholder="Province"
                                        onChange={(event) => {
                                            setProvince(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                                {/* ======================= Country ======================== */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ flex: 1 }}>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        value={country}
                                        type="input"
                                        placeholder="Country"
                                        onChange={(event) => {
                                            setCountry(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </div>


                            {/* ========================= Status ===================== */}
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    value={status} //state Name Kh
                                    type="input"
                                    placeholder="Status"
                                    onChange={(event) => {
                                        setStatus(event.target.value)
                                    }}
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formImageUpload">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                            
                                />
                                <Form.Text className="text-muted">
                                    Please upload a relevant image for the category.
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={""}>Cancel</Button>
                        <Button variant='secondary' onClick={""}>Clear</Button>
                        <Button variant='primary' onClick={onSave_Employee}>{item.employee_id == null ? "Save" : "Update"}</Button>
                    </Modal.Footer>

                </Modal>

            </div>

        </div>


    );

}
export default EmployeePageDash;