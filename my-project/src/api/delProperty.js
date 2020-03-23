import axios from 'axios';
import {SUCC_CODE} from './config.js';

export const delProperty=(id)=>{
    var json={
        "propertyId":id
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/property/del",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功删除属性数据");
    });
}