import axios from 'axios';
import {SUCC_CODE} from './config.js';

export const updateComment=(map)=>{
    var json={
        "comment":map
    }
    console.log("enter");
    console.log(json);
    return axios({
        method:"POST",
        url:"http://localhost:8089/comment/update",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功更新评论数据");
    });
}