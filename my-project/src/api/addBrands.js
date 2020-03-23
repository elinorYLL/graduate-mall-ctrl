import axios from 'axios';
import {SUCC_CODE} from './config.js';
import {uuid} from './uuid.js'
export const addBrands=(name,code)=>{
    var id=0;
    const delFlag=0;
    id=uuid();
    var json={
        "brands":{
        "id":id,
        "name":name,
        "delFlag":delFlag,
        "code":code
        }
    };
    return axios({
        method:"POST",
        url:"http://localhost:8089/brands/add",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功上传品牌数据");
    });
}
