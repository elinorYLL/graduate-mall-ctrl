import axios from 'axios';
import {SUCC_CODE} from './config.js';
export const updateSpu=(map)=>{
    var json=map;
    console.log("enter");
    console.log(json);
    return axios({
        method:"POST",
        url:"http://localhost:8089/spu/update",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功更新spu数据");
    });
}