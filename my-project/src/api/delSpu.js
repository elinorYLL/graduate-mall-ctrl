import axios from 'axios';
import {SUCC_CODE} from './config.js';

export const delSpu=(spuId)=>{
    var json={
        "spuId":spuId
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/spu/del",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功删除spu数据");
    });
}