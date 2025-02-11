import axios from 'axios'
import { getAccessToken } from '../../components/helper/helper'

export const config = {
    base_server : "http://localhost:8081/api/",
    image_path : ""
}

export const request = (url,param,method)=>{
    const access_token = getAccessToken()
   return axios({
     url: config.base_server + url  ,
     method : method,
     data  : param,
     headers : {
            Authorization : "Bearer " + access_token
     }
   }).then(res =>{
    return res.data;
   }).catch(error =>{
    console.log("error",error)
    return false;
   }).finally(final =>{
    console.log("final",final)

   })

}