import axios from 'axios';
import {SUCC_CODE} from './config.js';

export const getProperty=(classificationId,name)=>{
    var json={
        "classificationId":classificationId,
        "params":{

        }
    }
    if(name){
        json.params["name"]=name;
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/property/list",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功获取属性数据");
    });
}