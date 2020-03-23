<template>
 <div class="brands">
     <div class="header">
          <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
          <el-button icon="el-icon-search" circle class="icon" size="small" @click="searchBrands()"></el-button>
           <el-button type="primary" @click="addBrands=true" class="button">新增<i class="el-icon-upload el-icon--right"></i></el-button>
            <!-- 新增品牌 -->
      <el-dialog
            title="提示"
           :visible.sync="addBrands"
            width="30%"
           :before-close="handleClose">
  <!-- <span>这是一段信息</span> -->

  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
    <el-form-item label="编码">
    <el-input v-model="formLabelAlign.code"></el-input>
  </el-form-item>
  <el-form-item label="品牌名">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addBrands = false">取 消</el-button>
    <el-button type="primary" @click="addBrands = false;submit()">确 定</el-button>
  </span>
</el-dialog>
        <!-- 新增品牌结束 -->
     </div>
        <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="编码"
      width="180">
      <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.code"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="品牌名"
      width="180">
      <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);scope.row.show =true">编辑</el-button>
          <el-button
          size="mini"
          @click="scope.row.show =false;handleSave(scope.$index,scope.row)">保存</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row);">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="footer">
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
import {addBrands} from '../../api/addBrands.js';
import {getBrands} from '../../api/getBrands.js';
import {updateBrands} from '../../api/updateBrands.js';
import {delBrands, delBrsnds} from '../../api/delBrands.js';
import {BRANDS_RECOMMENT_PAGE_SIZE} from '../../api/config.js';
  export default {
    data() {
      return {
        formD:[],
        tableData:[],
        input:'',
        addBrands:false,
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          code:''
        },
        curPage:1,
        totalPage:1,
        pageSzie:BRANDS_RECOMMENT_PAGE_SIZE,
        total:0
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log("hhh"+index, row.code);
      },
      handleSave(index,row){
        var dataBrands=JSON.stringify(row);
        dataBrands=JSON.parse(dataBrands);
        delete dataBrands['show'];
        console.log(row);
         console.log(dataBrands);
         updateBrands(dataBrands).then(res=>{
           if(res){
             console.log(res);
             this.getBrandsList();
           }
         })
      },
      handleDelete(index, row) {
        console.log("page"+this.curPage);
        console.log(index, row);
        console.log(row.id);
        delBrsnds(row.id).then(res=>{
          if(res){
            console.log(res);
            this.getBrandsList();
          }
        })
        
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      submit(){
        var name=this.formLabelAlign.name;
        var code=this.formLabelAlign.code;
        addBrands(name,code)
        .then(result=>{
        if(result)
        {
         console.log(result);
         this.getBrandsList();
        }
      })
    },
    getBrandsList(){
      if(this.curPage>this.totalPage)
      {
        return;
      }
      getBrands(this.curPage).then(res=>{
        if(res){
          console.log(res);
          console.log(res.data);
          this.totalPage=res.data.pages;
          this.total=res.data.total;
          res.data.records.forEach(element=>{
            element["show"]=false;
          })
          this.tableData=res.data.records;
        }
      })
    },
    handleCurrentChange(cpage){
        this.curPage=cpage;
        this.getBrandsList();
    },
    searchBrands(){
      console.log(this.input);
       getBrands(1,this.input).then(res=>{
        if(res){
          console.log(res);
          console.log(res.data);
          this.totalPage=res.data.pages;
          // this.tableData=res.data.records;
          this.total=res.data.total;
          res.data.records.forEach(element=>{
            element["show"]=false;
          })
          this.tableData=res.data.records;
        }
      })
    }
    },
    created () {
        this.getBrandsList();
    }
    
  }
</script>
<style scoped>
.brands{
  position: relative;
  height: calc(100vh - 50px);
}
.brands .header{
    position: relative;
    height: 70px;
}
.brands .search{
    display:inline-block;
    width: 350px;
    position: absolute;
    right: 0;
    line-height: 70px;
}
.brands .icon{
    position: absolute;
    right: 0;
    top: 20px;
}
.brands .button{
    position: absolute;
    top: 10px;
}
.brands .footer{
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>