<template>
    <div class="comment-list">
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >

    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
           <el-form-item label="商品评论">
            <span>{{ props.row.comment }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="comment"
      label="商品名称"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
     >
      <template slot="header" slot-scope="scope">
        <!-- <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/> -->
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row);dialogVisible = true">回复</el-button>
          <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <!-- <span>这是一段信息</span> -->

  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="回复">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="onSubmit">立即回复</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
  <!-- <span class="demonstration">页数较少时的效果</span> -->
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>
    </div>
</template>
<script>
export default {
    name:"commentList",
     data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          comment:'珠海市香洲区',
         id: '12987122',
         shopId: '10333',
         category: '江浙小吃、小吃零食',
         desc: '荷兰优质淡奶，奶香浓而不腻',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          comment:'珠海市香洲区',
           id: '12987122',
            shopId: '10333',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          comment:'珠海市香洲区',
           id: '12987122',
            shopId: '10333',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          comment:'珠海市香洲区',
           id: '12987122',
            shopId: '10333',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
        }],
        dialogVisible: false,
       form:{
            desc: ''
       }
      }
     
    },
    methods: {
      formatter(row, column) {
        return row.name;
      },
        handleEdit(index, row) {
        console.log(index, row);
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
      }
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
</style>