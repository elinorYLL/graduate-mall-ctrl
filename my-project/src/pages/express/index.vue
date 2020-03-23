<template>
    <div class="express">
        <div class="header">
             <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
          <el-button icon="el-icon-search" circle class="icon" size="small"></el-button>
           <el-button type="primary" @click="addBrands=true;addExpress=true" class="button">新增<i class="el-icon-upload el-icon--right"></i></el-button>

            <el-dialog
        title="提示"
        :visible.sync="addExpress"
        width="50%"
       :before-close="handleClose">
        <!-- <span>这是一段信息</span> -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="快递公司名">
                <el-input v-model="form.name"></el-input>
             </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addExpress = false">取 消</el-button>
        <el-button type="primary" @click="addExpress = false">确 定</el-button>
  </span>
</el-dialog>

        </div>
       <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="序号"
      width="180">
      <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.num"></el-input>
        <span v-show="!scope.row.show" style="margin-left: 10px">{{ scope.row.num }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="快递公司名"
      width="180">
      <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.expressCom"></el-input>
       <span v-show="!scope.row.show" style="margin-left: 10px">{{ scope.row.expressCom }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);scope.row.show =true">编辑</el-button>
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);scope.row.show =false">保存</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
export default {
    name:'express',
    data(){
        return{
            tableData: [
        {
          num: '2016-05-02',
          expressCom: '王小虎',
          show:false
        },  {
          num: '2016-05-02',
          expressCom: '王小虎',
           show:false
        },  {
          num: '2016-05-02',
          expressCom: '王小虎',
           show:false
        },  {
          num: '2016-05-02',
          expressCom: '王小虎',
          show:false
        }],
        input:'',
        addExpress:false,
        form:{
            name:''
        }
        }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClose(done) {
         this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>
<style  scoped>
.express .search{
    display:inline-block;
    width: 350px;
    position: absolute;
    right: 0;
    line-height: 70px;
}
.express .header{
     position: relative;
    height: 70px;

}
.express .icon{
    position: absolute;
    right: 0;
    top: 20px;
}
.express .button{
    position: absolute;
    top: 10px;
}
.express .el-form-item__content{
    margin-left: 100px !important;
}
.express .el-form-item__label{
    /* display: inline-block; */
    width: 157px !important;
}
</style>