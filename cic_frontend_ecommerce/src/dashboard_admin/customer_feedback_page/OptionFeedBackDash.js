import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Table} from "react-bootstrap"
import { request } from '../share/request';

import baseUrl from '../../server/server_route'
import  ImagePath  from '../../server/image_path';



function OptionFeedBackDash() {

  const [result, setList] = useState([])
  const [item, setItem] = useState({})



  useEffect(() => {
    getOptionFeedback()
  }, [])
  
  
  const getOptionFeedback = () => {
    axios({
        url: baseUrl + "feedback",
        method: 'get',
  
    }).then(res => {
        //api respone
        var data = res.data
        setList(data.result)
    }).catch(err => {
        console.log(err)
    })
  
    request("feedback", "get").then(res => {
        //api respone
        var data = res.data
        setList(data.result)
  
  
    }).catch(err => {
        console.log(err)
    })
  
  }
  
  return (
    <div style={{ padding: 10 }}>
      <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h3>Customer FeedBack</h3>
        </div>
        <div>
          {/* <Button variant='primary' onClick={onShowModalForm}>New</Button> */}
        </div>
      </div>
      <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>FeedBack</th>
                        <th>IMAGE</th>
                        <th>CREATE</th>
                    </tr>

                </thead>
                <tbody>
                    {result.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.feedback}</td>
                                <td>
                                    <img 
                                        src={`${ImagePath}/${item.image}`} 
                                        alt="Uploaded" 
                                        width="50" 
                                        height="50"
                                        style={{ objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                </td>
                                <td>{new Date(item.created_at).toLocaleDateString('en-GB')}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>

    </div>
  )
}

export default OptionFeedBackDash
