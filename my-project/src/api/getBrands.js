import axios from 'axios';
import {SUCC_CODE,BRANDS_RECOMMENT_PAGE_SIZE} from './config.js'
export const getBrands=(currentPage=1,name,pageSize=BRANDS_RECOMMENT_PAGE_SIZE)=>{
    var json={
        "currentPage":currentPage,
        "pageSize":pageSize,
        "params":{
            "del_flag":"0"
        }
    }
    if(name){
        json.params["name"]=name;
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/brands/getPage",
        data:json
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