import axios from 'axios';
import {SUCC_CODE} from './config.js';

export const getBrandsNoPage=()=>{
    return axios({
        method:"GET",
        url:"http://localhost:8089/brands/list"
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功获取品牌数据");
    })
    .catch(err=>{
        console.log(err);
    })
}