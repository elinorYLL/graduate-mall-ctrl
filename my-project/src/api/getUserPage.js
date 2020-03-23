import axios from 'axios';
import {SUCC_CODE,USER_PAGE_SIZE} from './config.js'
export const getUserPage=(currentPage=1,name,pageSize=USER_PAGE_SIZE)=>{
    var json={
        "currentPage":currentPage,
        "pageSize":pageSize,
        "params":{
        
        }
    }
    if(name){
        json.params["name"]=name;
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/user/getPage",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功获取用户数据");
    })
    .catch(err=>{
        console.log(err);
    })
}