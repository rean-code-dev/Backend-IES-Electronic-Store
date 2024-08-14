
function CategoryPageDash(){
    return (
        <h1>CategoryPageDash</h1>
    )
}
export default CategoryPageDash;



// import axios from 'axios'
// import {useEffect, useState} from 'react'
// import {Table,Button,Modal,Form} from "react-bootstrap"
// function CategoryPageDashboard (){

    
//     const [show,setShow] = useState(false)
//     const [showFormCrate,setShowFormCreate] = useState(false)
//     const [list,setList] = useState([])
//     const [item,setItem] = useState({})

//     const [category_name,setCategoryName] = useState("")
//     const [description, setDescription] = useState("")
//     const [status,setStatus] = useState("")

    
//     useEffect(()=>{
//         getlist_category()
//     },[])

//     const server = "http://localhost:8081/api/"
//     const getlist_category = ()=>{
//         axios({
//             url: server + "category",
//             method : 'get',
            
//         }).then(res=>{
//             //api respone
//             var data = res.data
//             setList(data.list)
        

//         }).catch(err =>{
//             console.log(err)
//         })

//     }

//     const onDelete_Category  = ()=>{
//         setShow(false)
//         var category_id = item.category_id

//         axios({
//             url: server + "category/"+category_id,
//             method : 'delete',
            
//         }).then(res=>{
//             //api respone
//             var data = res.data
//             // setList(data.message)
//             //getlist_category()
//             var tmp_data = list.filter((item)=>item.category_id != category_id)
//             setList(tmp_data)
        

//         }).catch(err =>{
//             console.log(err)
//         })
//     }
//     const onClick_Delete = (param)=>{
//         setItem(param)
//         setShow(true)

//     }
//     const onHideModal = ()=>{
//         setShow(false)
//         setItem(null)
//     }
//     const clearForm = ()=>{
//         setCategoryName("")
//         setDescription("")
//         setStatus("")
//     }

//     const onHideModalFromCreate = () =>{
//         setShowFormCreate(false)
//         setItem({})
//         clearForm()

//     }

   
   
//     const onSave_Category = ()=>{
//         onHideModalFromCreate()
//         var param = {
//             "category_name":category_name,
//             "description":description,
//             "parent_id" : null,
//             "status" : status
//           }

//           var url = server + "category"
//           var method  = 'post'
//           //Case update
//           if(item.category_id != null){
//             param.category_id = item.category_id   //add new key "category_id " to param 
//             method = 'put'
//           }
          
//         axios({
//             url: url,
//             method : method,
//             data : param
//         }).then(res =>{
//             if(res){
//                 getlist_category();
             
//             }
//         })
//     }

//     const onShowModalForm = ()=>{
//         setShowFormCreate(true)
//     }

//     const onClick_edit =(item)=>{
//         setItem(item)
//         setCategoryName(item.category_name)
//         setDescription(item.description)
//         setStatus (item.status)
//         setShowFormCreate(true)

//     }



//     return (
//         <div style={{padding:10}}>
//             <div style={{padding:10, display:'flex', justifyContent: 'space-between'}}>
//                 <div>Category</div>
//                 <div>
//                     <Button variant='primary' onClick={onShowModalForm}>New</Button>
//                 </div>
//             </div>
//             <Table striped bordered hover size='sm'>
//             <thead>
//                 <tr>
//                 <th>No</th>
//                 <th>NAME</th>
//                 <th>DESCRIPTION</th>
//                 <th>STATUS</th>
//                 <th>CREATE</th>
//                 <th>ACTION</th>
//                 </tr>
                
//             </thead>
//                 <tbody>
//                     {list.map((item,index)=>{
//                         return (
//                             <tr key={index}>
//                                 <td>{index+1}</td>
//                                 <td>{item.category_name}</td>
//                                 <td>{item.description}</td>
//                                 <td>{item.status}</td>
//                                 <td>{item.create_at}</td>
//                                 <td>
//                                     <Button onClick ={()=>onClick_edit(item)}variant="outline-success">Edit</Button>{' '}
//                                     <Button onClick={()=>onClick_Delete(item)} variant="outline-danger">Delete</Button>
//                                 </td>

//                             </tr>
//                         )
//                     })}
                    
//                 </tbody>
//             </Table>
//             <div className='modal show' style={{display:'block',position:'initial'}}>
//                 <Modal show ={show} onHide ={onHideModal} >
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

//             <div className='modal show' style={{display:'block',position:'initial'}}>
//                 <Modal show ={showFormCrate} onHide ={onHideModalFromCreate} >
//                     <Modal.Header closeButton>
//                         <Modal.Title>{item.category_id == null ? "Create Category" : "Update Category"}</Modal.Title>
//                     </Modal.Header>

//                     <Modal.Body>
//                         <Form>
                           
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Label>Category Name</Form.Label>
//                                 <Form.Control 
//                                 value={category_name} //state Name
//                                     type="input" 
//                                     placeholder="name" 
//                                     onChange={(event)=>{
//                                         setCategoryName(event.target.value)   //get value from user onchage => set value to name state 
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
//                                     onChange={(event)=>{
//                                         setDescription(event.target.value)

//                                     }}
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                                 <Form.Label>status</Form.Label>
//                                 <Form.Control
//                                     value={status} 
//                                     type="input" 
//                                     placeholder="status" 
//                                     onChange={(event)=>{
//                                         setStatus(event.target.value)
//                                     }}
//                                 />
//                             </Form.Group>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant='secondary' onClick={onHideModalFromCreate}>Cancel</Button>
//                         <Button variant='secondary' onClick={clearForm}>Clear</Button>
//                         <Button variant='primary' onClick={onSave_Category}>{item.category_id == null ? "Save" : "Update"}</Button>
//                     </Modal.Footer>

//                 </Modal>

//             </div>
//         </div>
//     );
// }
 
// export default CategoryPageDashboard;