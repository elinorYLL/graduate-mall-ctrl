import axios from 'axios';
import {SUCC_CODE} from './config.js';
export const addProduct=(map)=>{
    var json=map;
    return axios({
        method:"POST",
        url:"http://localhost:8089/spu/add",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功上传spu数据");
    })
}