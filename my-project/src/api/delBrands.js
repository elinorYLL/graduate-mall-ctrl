import axios from 'axios';
import {SUCC_CODE} from './config.js';
export const delBrsnds=(id)=>{
    var json={
        "brandId":id
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/brands/del",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功删除品牌数据");
    });
}