<template>
    <div class="orderCtrl">
    <el-tabs type="border-card">
        <div class="search-box">
           <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
          <el-button icon="el-icon-search" circle class="icon" size="small"></el-button>
          </div>
        <el-tab-pane label="已发货订单">
            <div class="table">
                 <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                      prop="code"
                      label="订单编号"
                      width="180">
                  </el-table-column>
                 <el-table-column
                     prop="name"
                     label="用户名"
                      width="180">
                 </el-table-column>
                    <el-table-column
                     prop="addresseeName"
                     label="收货人名"
                      width="180">
                 </el-table-column>
                 <el-table-column
                     prop="address"
                     label="收货地址">
                </el-table-column>
                 <el-table-column
                     prop="phone"
                     label="收货手机">
                </el-table-column>
                 <el-table-column
                     prop="realPay"
                     label="实际支付金额">
                </el-table-column>
                 <el-table-column
                     prop="totalPrice"
                     label="总价">
                </el-table-column>
                 <el-table-column
                     prop="discount"
                     label="优惠金额">
                </el-table-column>
                <el-table-column
                     prop="payTime"
                     label="下单时间">
                </el-table-column>
  </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="未发货订单">
                
             <el-table
    :data="tableData1"
    style="width: 100%">
    <el-table-column
      label="订单编号"
     >
      <template slot-scope="scope">
        <!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.code"></el-input> -->
        <span style="margin-left: 10px">{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
     >
      <template slot-scope="scope">
        <!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input> -->
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="收货人名"
     >
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.addresseeName"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.addresseeName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="收货地址"
       width="180"
     >
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.address"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="收货手机"
      >
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.phone"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="实际支付金额"
     >
      <template slot-scope="scope">
        <!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.realPay"></el-input> -->
        <span style="margin-left: 10px">{{ scope.row.realPay }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总价"
      >
      <template slot-scope="scope">
        <!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.totalPrice"></el-input> -->
        <span style="margin-left: 10px">{{ scope.row.totalPrice }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="优惠金额"
      >
      <template slot-scope="scope">
        <!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.discount"></el-input> -->
        <span style="margin-left: 10px">{{ scope.row.discount }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="下单时间"
      >
      <template slot-scope="scope">
        <!-- <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.payTime"></el-input> -->
        <span style="margin-left: 10px">{{ scope.row.payTime }}</span>
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
          @click="handleDelete(scope.$index, scope.row);sendOut=true">发货</el-button>
      <!-- 发货弹出框 -->
      <el-dialog
  title="请输入发货信息"
  :visible.sync="sendOut"
  width="30%"
  :before-close="handleSendOut">
  <!-- <span>这是一段信息</span> -->
  <el-form ref="formSendOut" :model="formSendOut" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="formSendOut.name"></el-input>
  </el-form-item>
  <!-- <el-form-item label="活动名称">
    <el-input v-model="formSendOut.expressCom"></el-input>
  </el-form-item> -->
  <el-form-item label="活动区域">
    <el-select v-model="formSendOut.expressCom" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="快递单号">
    <el-input v-model="formSendOut.expressNum"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="sendOut = false">取 消</el-button>
    <el-button type="primary" @click="sendOut = false">确 定</el-button>
  </span>
</el-dialog>
      </template>
    </el-table-column>
  </el-table>

        </el-tab-pane>
</el-tabs>
    </div>
</template>
<script>
export default {
    name:'orderCtrl',
    data(){
        return{
             tableData: [
        {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012'
        }, {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012'
        }, {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012'
        }, {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012'
        }],
         tableData1: [
        {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012',
          show:false
        }, {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012',
          show:false
        }, {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012',
          show:false
        }, {
          code: '2016-05-02',
          name: '王小虎',
          addresseeName:'elinor',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'15813360357',
          realPay:'1000',
          totalPrice:'2000',
          discount:'50',
          payTime:'2012',
          show:false
        }], 
        refuse:false,
        sendOut:false,
        formSendOut:{
          name:'',
          expressCom:'',
          expressNum:'',
        },
         input:'',
        }
    },
    methods: {
       handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      open2() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
       handle(index, row) {
        console.log(index, row);
      },
       handleD(index, row) {
        console.log(index, row);
      },
       handleC(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       handleSendOut(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>
<style scoped>
.orderCtrl .el-button+.el-button{
    margin-left:0;
    margin-top: 5px;
}
.orderCtrl  .search-box{
    position: relative;
    height: 70px;
}
.orderCtrl .search-box .search{
    display:inline-block;
    width: 350px;
    position: absolute;
    right: 0;
    line-height: 70px;
}
.orderCtrl .search-box .icon{
    position: absolute;
    right: 0;
    top: 20px;
}
</style>
