import axios from 'axios';
import {SUCC_CODE,SPU_RECOMMENT_PAGE_SIZE} from './config.js'
export const getSpu=(currentPage=1,saleStatus,params,isNew,isRecom,pageSize=SPU_RECOMMENT_PAGE_SIZE)=>{
    console.log("0000")
    console.log(saleStatus);
    params["del_flag"]='0';
    var json={
        "currentPage":currentPage,
        "pageSize":pageSize,
    }
    json["params"]=params;
    if(isNew!=null)
    {
        json.params["is_new"]=isNew;
    }
    if(isRecom!=null)
    {
        json.params["is_recom"]=isRecom;
    }
    if(saleStatus!=null)
    {
        json.params["sale_status"]=saleStatus;
    }
    return axios({
        method:"POST",
        url:"http://localhost:8089/spu/getPage",
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