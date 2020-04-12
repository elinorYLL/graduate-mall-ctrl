<template>
    <div class="comment-list">、
      <div class="header">
      <el-form label-width="80px">
      <el-form-item label="特殊资源">
      <el-radio-group v-model="isShow" @change="isShowRadioChange">
       <el-radio label="1">未评价</el-radio>
      <el-radio label="0">已评价</el-radio>
      </el-radio-group>
      </el-form-item>
      </el-form>
      </div>

  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.spu.name }}</span>
          </el-form-item>
          <el-form-item label="商品 编码">
            <span>{{ props.row.spu.code }}</span>
          </el-form-item>
          <el-form-item label="商品简介">
            <span>{{ props.row.spu.briefIntro }}</span>
          </el-form-item>
           <el-form-item label="商品评论">
            <span>{{ props.row.content }}</span>
          </el-form-item>
              <el-form-item label="评论时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
            <el-form-item label="评论分数">
            <span>{{ props.row.goodScore }}</span>
          </el-form-item>
          <el-form-item label="评论图">
            <!-- <img :src="{{props.row.pictures.url}}"> -->
            <img :src="item.url" v-for="(item,index) in props.row.pictures" class="comment-pic">
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="time"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="user.name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="orderNum"
      label="订单编号"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
     >
      <template slot="header" slot-scope="scope">
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);dialogVisible = true" v-if="isShow=='1'">回复</el-button>
          <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="回复">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;sure()">确 定</el-button>
  </span>
</el-dialog>

   <el-button
     size="mini"
     @click="handleEditReply(scope.$index, scope.row);checkReply = true" v-if="isShow=='0'">查看回复</el-button>
  <el-dialog
  title="提示"
  :visible.sync="checkReply"
  width="30%"
  :before-close="handleClose">
  <el-form ref="formReply" :model="formReply" label-width="80px">
      <el-form-item label="回复">
    <el-input type="textarea" v-model="formReply.desc"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="checkReply= false">取 消</el-button>
    <el-button type="primary" @click="checkReply = false;replyChange()">确 定</el-button>
  </span>
</el-dialog>



      </template>
    </el-table-column>
  </el-table>
  <div class="block">
 <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="pageSzie"
  @current-change="handleCurrentChange">
</el-pagination>
</div>
    </div>
</template>
<script>
import {getCommentList} from '../../api/getComment.js';
import {COMMENT_PAGE_SIZE} from '../../api/config.js';
import {updateComment} from '../../api/updateComment.js';
export default {
    name:"commentList",
     data() {
      return {
        isShow:'1',
        tableData: [],
        dialogVisible: false,
        checkReply:false,
       form:{
            desc: ''
       },
       formReply:{
         desc:''
       },
        curPage:1,
        totalPage:1,
        pageSzie:COMMENT_PAGE_SIZE,
        total:0,
        c:[],
        NewC:[]
      }
     
    },
    methods: {
      handleCurrentChange(cpage){
        this.curPage=cpage;
         this.getComment();
    },
      formatter(row, column) {
        return row.orderNum;
      },
      handleEditReply(index, row) {
        console.log(index, row);
        this.formReply.desc=row.replyContent;
        this.c[0]=JSON.parse(JSON.stringify(row));
      },
       handleEdit(index, row) {
        console.log(index, row);
        this.NewC[0]=JSON.parse(JSON.stringify(row));
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       onSubmit() {
        console.log('submit!');
      },
      getComment(){
     if(this.curPage>this.totalPage)
      {
        return;
      }
      getCommentList(this.curPage,this.isShow).then(res=>{
        if(res){
          console.log(res);
          console.log(res.data);
          this.totalPage=res.data.pages;
          this.total=res.data.total;
          this.tableData=res.data.records;
        }
      })
      },
      sure(){
        console.log(this.form.desc);
        let des=this.form.desc;
       let comment=[];
       console.log(this.NewC);
      this.NewC.forEach(function(item){
        comment.push({id:item.id,spuId:item.spuId,userId:item.userId,orderId:item.orderId,content:item.content,time:item.time,goodScore:item.goodScore,isShow:item.isShow,replyContent:des});
      })
        updateComment(comment[0]).then(res=>{
            if(res)
            {
              console.log(res);
            }
        })
      },
      isShowRadioChange(){
          this.getComment();
      },
      replyChange(){
        console.log(this.formReply.desc);

      let des=this.formReply.desc;
      let comment=[];
      this.c.forEach(function(item){
        comment.push({id:item.id,spuId:item.spuId,userId:item.userId,orderId:item.orderId,content:item.content,time:item.time,goodScore:item.goodScore,isShow:item.isShow,replyContent:des});
      })
      console.log(comment);
      updateComment(comment[0]).then(res=>{
          if(res)
            {
              console.log(res);
            }
        })
        console.log(this.c);
      }
    },
    created () {
       this.getComment();
    }
}
</script>
<style scoped>
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .comment-list{
     width: 100%;
    height: 100%;
    position: relative;
  }
.comment-list .block{
    position: absolute;
    bottom: 0;
}
.comment-pic{
  width:60px;
  height: 60px;
  margin:10px;
}

</style>