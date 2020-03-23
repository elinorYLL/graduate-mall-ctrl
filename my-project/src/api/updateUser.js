import axios from 'axios';
import {SUCC_CODE} from './config.js';

export const updateUser=(map)=>{
        var json=map;
        return axios({
            method:"POST",
            url:"http://localhost:8089/user/update",
            data:json
        })
        .then(res=>{
            console.log(res);
            if(res.data.code===SUCC_CODE){
                console.log('ok');
                return res.data;
            }
            throw new Error("没有成功更新用户数据");
        });
}