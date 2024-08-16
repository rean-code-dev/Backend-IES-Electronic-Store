import axios from 'axios'
import {useEffect,useState} from 'react'
import {Table,Button,Modal,Form} from "react-bootstrap"
function EmployeePageDash (){
    const [result,setList] = useState([])
    useEffect(()=>{
        getlist_employee()
    },[])

    const server = "http://127.0.0.1:8081/api/"
    const getlist_employee = ()=>{
        axios({
            url: server + "employee",
            method : 'get',
            
        }).then(res=>{
            //api respone
            var data = res.data
            setList(data.result)
        

        }).catch(err =>{
            console.log(err)
        })

    }

    const onClick_edit =(item)=>{
        // setItem(item)
        // setNameEn(item.name_en)
        // setNameKh(item.name_kh)
        // setImage(item.image)
        // setDescription(item.description)
        // setStatus (item.status)
        // setShowFormCreate(true)

    }
    const onClick_Delete = (param)=>{
        // setItem(param)
        // setShow(true)

    }

    
    return (
        <div style={{padding:10}}>
            <div style={{padding:10, display:'flex', justifyContent: 'space-between'}}>
                <div>
                    <h3>Employee</h3>
                </div>
                <div>
                    <Button variant='primary' onClick={""}>New</Button>
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
                <th>SALARY</th>
                <th>ADDRESS</th>
                <th>PROVINCE</th>
                <th>COUNTRY</th>
                <th>STATUS</th>
                <th>CREATE</th>
                <th>ACTION</th>
                </tr>
                
            </thead>
                <tbody>
                    {result.map((item,index)=>{
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
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
                                    <Button onClick ={()=>onClick_edit(item)}variant="outline-success">Edit</Button>{' '}
                                    <Button onClick={()=>onClick_Delete(item)} variant="outline-danger">Delete</Button>
                                </td>
                               
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
        
        </div>
    );

}
export default EmployeePageDash;