// 标签页切换
// https://blog.csdn.net/qq_35250826/article/details/87840595?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
<template>
    <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机" name="first" :key="'first'">
        <div class="search-box" v-if="isFirst">
           <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
          <el-button icon="el-icon-search" circle class="icon" size="small" @click="handleSearch()"></el-button>
            <el-button type="primary" @click="addProduct=true;addPaPC=true">新增<i class="el-icon-upload el-icon--right"></i></el-button>
            <el-dialog
            title="新增属性属性值"
            :visible.sync="addPaPC"
            width="30%"
            :before-close="handleClose">
            <!-- <span>这是一段信息</span> -->
            <el-form ref="formPC" :model="formPC" label-width="80px">
                <el-form-item label="属性名">
                 <el-input v-model="formPC.property"></el-input>
                </el-form-item>
                <el-form-item label="属性项">
                   <el-input v-model="formPC.pc"></el-input>  
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addPaPC = false">取 消</el-button>
            <el-button type="primary" @click="addPaPC = false;submit()">确 定</el-button>
  </span>
</el-dialog>

          </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :index="indexMethod">
    <!-- 序号 -->
     <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
 
    <el-table-column
      label="属性项"
      width="180">
      <template slot-scope="scope">
           <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
         <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

     <el-table-column 
      label="属性值"
      width="600" >
      <template slot-scope="scope">
   <div class="proChoi">
        <el-tag 
        v-for="item,index in scope.row.propertyChoices" 
        :key="item.name"  
        :closable=scope.row.show
        :disable-transitions="false"
        @close="handleDelePC(item)"
        >{{item.name}}
        </el-tag>
        <!-- 添加属性标志 -->
        <i class="el-icon-circle-plus-outline" @click="addPro=true" v-show="scope.row.show"></i>
        <!-- 新增属性的弹窗 -->
        <el-dialog
  title="提示"
  :visible.sync="addPro"
  width="50%"
  :before-close="handleClose">
  <!-- <span>这是一段信息</span> -->
   <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="新增的属性值">
    <el-input v-model="form.propertyChocie"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addPro = false">取 消</el-button>
    <el-button type="primary" @click="addPro = false;addPC(scope.row)">确 定</el-button>
  </span>
</el-dialog>
   </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);scope.row.show =true">编辑</el-button>
           <el-button
          size="mini"
          @click="handleSave(scope.$index, scope.row);scope.row.show =false">保存</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-tab-pane>
     <el-tab-pane label="周边" name="second" :key="'second'">
         <div class="another" v-if="isSecond"></div>
     </el-tab-pane>
    </el-tabs>
    </div>
</template>
<script>
let itemCount=0;
import {getProperty} from '../../api/getProperty.js';
import {addProperty} from '../../api/addProperty.js';
import {uuid} from '../../api/uuid.js';
import {addBrands} from '../../api/addBrands.js';
import {updateProperty} from '../../api/updateProperty.js';
import {delPropertyChoice} from '../../api/delPropertyChoice.js';
import {addPropertyChoice} from '../../api/addPropertyChoice.js';
import {delProperty} from '../../api/delProperty.js';
export default {
    name:'property',
    data(){
        return{
         tableData:[],
         inputVisible: false,
         inputValue: '',
         isA:true,
         addPro:false,
         form:{
             propertyChocie:''
         },
         input:'',
         addPaPC:false,
         formPC:{
            property:'',
            pc:''
         },
         activeName:"first",
         isFirst:true,
         isSecond:false,
         closeShow:false,
         id:''
        }
    },
    methods: {
         handleEdit(index, row) {
             console.log('www');
        console.log(index, row);
        this.id=row.id;
        console.log(this.id);
      },
      handleSave(index,row){
          console.log(index,row);
                  console.log(row.id);
                  console.log(row.name);
                  console.log(row.classificationId);
        var json={
            "property":{
                "id":row.id,
                "name":row.name,
                "classificationId":row.classificationId
            },
            "propertyChoices":row.propertyChoices
        }
          updateProperty(json).then(res=>{
              console.log("enter");
              if(res)
              {
                  console.log(res);
              }
          })
      },
      handleDelete(index, row) {
        console.log(index, row);
        delProperty(row.id).then(res=>{
            if(res)
            {
                console.log(res);
                this.getPropertyList();
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
     getPropertyList(){
         getProperty(1).then(res=>{
             if(res)
             {
                 console.log(res.data);
                 res.data.forEach(element=>{
                      console.log("e");
                    console.log(element);
                    element["show"]=false;
                  })
                 this.tableData=res.data;
             }
         })
     },
     phonePro(){
         var classificationId=1;
          getProperty(1).then(res=>{
             if(res)
             {
                 console.log("hhh"+res.data);
                  res.data.forEach(element=>{
                      console.log("ee");
                    console.log(element);
                    element["show"]=false;
                  })
                 this.tableData=res.data;
                //  console.log(this.tableData);
             }
         })
     },
     indexMethod(index){
         return index*1;
     },
     submit(){
         //新增的方法
         console.log(this.formPC.property);
         console.log(this.formPC.pc);
         var arr=this.formPC.pc.split(",");
         console.log(arr);
        //  propertyMap,procMap
        var id=uuid();
        var json={
            "id":id,
            "name":this.formPC.property,
            "classificationId":"1"
        }
        var arrPC=[];
         arr.forEach(element => {
             var pcId=uuid();
             var jsonPC={
                 "id":pcId,
                 "name":element,
                 "propertyId":id
             }
             arrPC.push(jsonPC);
         });
         console.log(arrPC);
         console.log(json);
        addProperty(json,arrPC).then(res=>{
            if(res)
            {
                console.log(res);
                this.getPropertyList();
            }
        })
     },
     handleClick(tab){
         if(tab.name=="first")
         {
             this.isFirst=true;
             this.isSecond=false;
         }else{
             this.isFirst=false;
             this.isSecond=true;
         }
     },
     handleDelePC(element){
        //  this.closeShow=true;
        console.log(element);
        this.closeShow=true;
        var propertyChoiceId=element.id;
        delPropertyChoice(propertyChoiceId).then(res=>{
            if(res)
            {
                console.log(res);
                this.getPropertyList();
            }
        })
     },
     addPC(row){
         console.log(this.form.propertyChocie);
        //  console.log(row);
         var json={
             "name":this.form.propertyChocie,
             "propertyId":this.id
         }
        addPropertyChoice(json).then(res=>{
            if(res)
            {
                console.log(res);
                this.getPropertyList();
            }
        })
     },
     handleSearch(){
         console.log(this.input);
          getProperty(1,this.input).then(res=>{
             if(res)
             {
                 console.log(res.data);
                 res.data.forEach(element=>{
                      console.log("e");
                    console.log(element);
                    element["show"]=false;
                  })
                 this.tableData=res.data;
             }
         })
     }
    },
     created () {
          this.getPropertyList();
    }
}
</script>
<style scoped>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .disable {
    pointer-events: none;
}
.search-box{
    position: relative;
    height: 70px;
}
.search-box .search{
    display:inline-block;
    width: 350px;
    position: absolute;
    right: 0;
    line-height: 70px;
}
.search-box .icon{
    position: absolute;
    right: 0;
    top: 20px;
}
</style>