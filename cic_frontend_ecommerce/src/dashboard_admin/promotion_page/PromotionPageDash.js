// import React from 'react'
// import { Table, Button, Form } from 'react-bootstrap';

// function PromotionPageDash() {
//     return (
//         <div style={{ padding: 10 }}>
//             <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
//                 <h3>Promotion</h3>
//                 <Button variant="primary">New</Button>
//             </div>

//             <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
//             <h3>Showing 1 to 2 of 2 entries</h3>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
//                 <span>Show page</span>
//                 <Form.Select
//                     style={{ width: '70px' }}
//                     // value={perPage}
//                     // onChange={(e) => setPerPage(parseInt(e.target.value))}
//                 >
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="50">50</option>
//                 </Form.Select>
//             </div>

//             </div>
//              {/* Per Page Selector */}
            
//             <Table striped bordered hover size='sm'>
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Promotion Type</th>
//                         <th>Start Date</th>
//                         <th>End Date</th>
//                         <th>Active</th>
//                         <th>Amount</th>
//                         <th>Percentage</th>
//                         <th>Max. Promotion Amount</th>
//                         <th>After Promotion</th>
//                         <th>Create Date</th>
//                         <th>Create By</th>
//                         <th>ACTION</th>
//                     </tr>

//                 </thead>
//                 <tbody>
//                     {/* {result.map((item, index) => {
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
//                     })} */}

//                 </tbody>
//             </Table>
//         </div>
        
//     )
// }   

// export default PromotionPageDash



// import React from 'react';
// import { Button, Form, Input, InputNumber } from 'antd';
// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };
// const onFinish = (values) => {
//   console.log(values);
// };
// const PromotionPageDash = () => (
//   <Form
//     {...layout}
//     name="nest-messages"
//     onFinish={onFinish}
//     style={{
//       maxWidth: 600,
//     }}
//     validateMessages={validateMessages}
//   >
//     <Form.Item
//       name={['user', 'name']}
//       label="Name"
//       rules={[
//         {
//           required: true,
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       name={['user', 'email']}
//       label="Email"
//       rules={[
//         {
//           type: 'email',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>
//     <Form.Item
//       name={['user', 'age']}
//       label="Age"
//       rules={[
//         {
//           type: 'number',
//           min: 0,
//           max: 99,
//         },
//       ]}
//     >
//       <InputNumber />
//     </Form.Item>
//     <Form.Item name={['user', 'website']} label="Website">
//       <Input />
//     </Form.Item>
//     <Form.Item name={['user', 'introduction']} label="Introduction">
//       <Input.TextArea />
//     </Form.Item>
//     <Form.Item label={null}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );
// export default PromotionPageDash;

import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const PromotionPageDash = () =>  {
  return (
    <Table columns={columns} dataSource={data} />
  );

} 
export default PromotionPageDash;