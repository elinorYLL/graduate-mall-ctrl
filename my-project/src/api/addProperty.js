import axios from 'axios';
import {SUCC_CODE} from './config.js';
// import {uuid} from './uuid.js';
export const addProperty=(propertyMap,procMap)=>{
    var json={
        "property":propertyMap,
        "propertyChoices":procMap
    };
    return axios({
        method:"POST",
        url:"http://localhost:8089/property/add",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功上传属性数据");
    })
}