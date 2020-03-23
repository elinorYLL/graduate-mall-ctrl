<template>
  <div class="userEdit">
      <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      type="index"
      width="180">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);dialogVisible=true">编辑</el-button>
     <el-dialog
  title="编辑用户信息"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<!-- 
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span> -->
</el-dialog>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row);open2()">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
  <!-- <span class="demonstration">页数较少时的效果</span> -->
  <!-- 分页 -->
<el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="pageSzie"
  @current-change="handleCurrentChange"
  >
</el-pagination>
</div>
  </div>
</template>

<script>
import {getUserPage} from '../../api/getUserPage.js';
import {USER_PAGE_SIZE} from '../../api/config.js';
import {updateUser} from '../../api/updateUser.js';
import {delUser} from '../../api/delUser.js'
  export default {
      name:"userEdit",
    data() {
         var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],
        search: '',
         dialogVisible: false,

        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        curPage:1,
        totalPage:1,
        pageSzie:USER_PAGE_SIZE,
        total:0,
        user:{}
              };

      },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.user=JSON.parse(JSON.stringify(row));
        console.log('我是user')
        console.log(this.user)
      },
      handleDelete(index, row) {
        console.log(index, row);
        delUser(row.id).then(res=>{
          if(res)
          {
            console.log(res);
            this.getUserList();
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
       open2() {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
    },
     handleCurrentChange(cpage){
        this.curPage=cpage;
        this.getBrandsList();
    },
    getUserList(){
      if(this.curPage>this.totalPage)
      {
        return;
      }
      getUserPage(this.curPage).then(res=>{
        if(res){
          console.log(res);
          // console.log(res.data);
          this.totalPage=res.data.pages;
          this.total=res.data.total;
          // res.data.records.forEach(element=>{
          //   element["show"]=false;
          // })
          this.tableData=res.data.records;
          console.log(this.tableData);
        }
      })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
   },
   submitForm(formName) {
        console.log(this.ruleForm.pass);
        console.log(this.ruleForm.checkPass);

        if(this.ruleForm.pass==this.ruleForm.checkPass){
          console.log('hhh')
          // console.log(this.tableData);
          let json={
            "id":this.user.id,
            "name":this.user.name,
            "sex":this.user.sex,
            "version":this.user.version,
            "pictureId":this.user.pictureId,
            "phone":this.user.phone,
            "password":this.ruleForm.pass
          }
          console.log("json");
          console.log(json);
            updateUser(json).then(res=>{
              if(res)
              {
                console.log(res);
              }
            })
        }
      }
  },
  created () {
    this.getUserList();
  }
  }
</script>
<style>
.el-table td.is-right, .el-table th.is-right{
    text-align: left !important;
    /* 无效 */
}
.userEdit tbody {
     text-align: left !important;
}
.userEdit{
    width: 100%;
    height: 100%;
    position: relative;
}
.userEdit .block{
    position: absolute;
    bottom: 0;
}
.userEdit.el-table td.is-right, .userEdit.el-table th.is-right{
  text-align:left !important;
}
</style>