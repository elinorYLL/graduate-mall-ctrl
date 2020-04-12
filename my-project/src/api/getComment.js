import axios from 'axios';
import {SUCC_CODE,COMMENT_PAGE_SIZE} from './config.js';


export const getCommentList=(currentPage=1,isShow,pageSize=COMMENT_PAGE_SIZE)=>{
    var json={
       "currentPage":currentPage,
       "pageSize":pageSize,
       "params":{
            "is_show":isShow
        }
}
    return axios({
        method:"POST",
        url:"http://localhost:8089/comment/commentPageCtrl",
        data:json
    })
    .then(res=>{
        console.log(res);
        if(res.data.code===SUCC_CODE){
            console.log('ok');
            return res.data;
        }
        throw new Error("没有成功获取评论数据");
    });
}