<template>
    <div class="searchOut">
          <el-tabs type="border-card">
        <div class="search-box">
           <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
          <el-button icon="el-icon-search" circle class="icon" size="small"></el-button>
          </div>
        <el-tab-pane label="退货未审核的订单">
           <el-table
    :data="cancle"
    style="width: 100%">
    <el-table-column
      label="订单编号"
      width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      width="180">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="退货商品"
      width="180">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.product }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="退货理由"
      width="180">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.reason }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="申请退货时间"
      width="180">
      <template slot-scope="scope">
         <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handle(scope.$index, scope.row);open2()">同意退货</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleD(scope.$index, scope.row);refuse=true">拒绝退货</el-button>
          <!-- 拒绝退货的弹框 -->
          <el-dialog
  title="请输入拒绝退货的理由"
  :visible.sync="refuse"
  width="30%"
  :before-close="handleC">
  <!-- <span>这是一段信息</span> -->
   <el-input type="textarea" v-model="form.desc"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="refuse = false">取 消</el-button>
    <el-button type="primary" @click="refuse = false">确 定</el-button>
  </span>
</el-dialog>
      </template>
    </el-table-column>
  </el-table>
        </el-tab-pane>

            <el-tab-pane label="退货已审核订单">
              <!-- <el-tab-pane label="退货已审核订单"> -->
            <div class="table">
                 <el-table
                    :data="cancleData"
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
                     label="退货商品"
                      width="180">
                 </el-table-column>
                 <el-table-column
                     prop="address"
                     label="退货理由">
                </el-table-column>
                 <el-table-column
                     prop="phone"
                     label="申请退货时间">
                </el-table-column>
  </el-table>
            </div>
    </el-tab-pane>

          </el-tabs>
    </div>
</template>
<script>
export default {
    name:'sendOut',
    data(){
        return{
            cancle: [
        {
          date: '2016-05-02',
          name: '王小虎',
          reason: '上海市普陀区金沙江路 1518 弄',
          code:'111',
          product:'100000',
        }, 
       {
          date: '2016-05-02',
          name: '王小虎',
          reason: '上海市普陀区金沙江路 1518 弄',
          code:'111',
          product:'100000',
        }, 
        {
          date: '2016-05-02',
          name: '王小虎',
          reason: '上海市普陀区金沙江路 1518 弄',
          code:'111',
          product:'100000',
        }, 
        {
          date: '2016-05-02',
          name: '王小虎',
          reason: '上海市普陀区金沙江路 1518 弄',
          code:'111',
          product:'100000',
        }
        ],
        refuse:false,
        form:{
          desc:''
        },
        cancleData: [
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
        input:''
        }
    },
    methods: {
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
      }
    }
}
</script>
<style scoped>
.searchOut  .search-box{
    position: relative;
    height: 70px;
}
.searchOut  .search-box .search{
    display:inline-block;
    width: 350px;
    position: absolute;
    right: 0;
    line-height: 70px;
}
.searchOut  .search-box .icon{
    position: absolute;
    right: 0;
    top: 20px;
}
</style>