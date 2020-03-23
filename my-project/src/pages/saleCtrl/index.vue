<template>
    <div>
        <el-tabs type="border-card">
  <el-tab-pane label="手机销售统计">
      <div class="block">
    <span class="demonstration">从</span>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
   <div class="table">
       <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
     <el-table-column
      prop="date"
      sortable
      label="时间"
     >
      </el-table-column>
    <el-table-column
      prop="oddNum"
      label="单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="商品编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      >
    </el-table-column>
     <el-table-column
      prop="number"
      label="数量"
      >
    </el-table-column>
     <el-table-column
      prop="onePrice"
      label="单价"
     >
    </el-table-column>
     <el-table-column
              k  prop="allPrice"
      label="合计"
     >
    </el-table-column>
  </el-table>
   </div>
   <div class="block1">
  <!-- <span class="demonstration">大于 7 页时的效果</span> -->
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  
  </el-tab-pane>
  <el-tab-pane label="手机销售排行榜">
    <p>销售排行榜</p>
    <div class="table">
       <el-table
    :data="saleSort"
    style="width: 100%"
    :default-sort = "{prop: 'saleNum', order: 'descending'}"
    >
    <el-table-column
      prop="code"
      label="商品编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="商品名"
      width="180">
    </el-table-column>
    <el-table-column
    prop="skuSale"
    label="型号销量"
    width="180"
    >
    </el-table-column>
    <el-table-column
      prop="saleNum"
      sortable
      label="销售量"
      >
    </el-table-column>
  </el-table>
   <div class="block1">
  <!-- <span class="demonstration">大于 7 页时的效果</span> -->
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
   </div>
  </el-tab-pane>
  <el-tab-pane label="周边销售统计">
       <div class="block">
    <span class="demonstration">从</span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
      <div class="table">
       <el-table
    :data="tableData2"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
     <el-table-column
      prop="date"
      sortable
      label="时间"
     >
      </el-table-column>
    <el-table-column
      prop="oddNum"
      label="单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="商品编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      >
    </el-table-column>
     <el-table-column
      prop="number"
      label="数量"
      >
    </el-table-column>
     <el-table-column
      prop="onePrice"
      label="单价"
     >
    </el-table-column>
     <el-table-column
      prop="allPrice"
      label="合计"
     >
    </el-table-column>
  </el-table>
   </div>

    <div class="block1">
  <!-- <span class="demonstration">大于 7 页时的效果</span> -->
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
  </el-tab-pane>
  <el-tab-pane label="周边销售排行榜">
    
    <p>销售排行榜</p>
    <div class="table">
       <el-table
    :data="saleSort1"
    style="width: 100%"
    :default-sort = "{prop: 'saleNum', order: 'descending'}"
    >
    <el-table-column
      prop="code"
      label="商品编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="商品名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="saleNum"
      sortable
      label="销售量"
      >
    </el-table-column>
  </el-table>
   <div class="block1">
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
   </div>

  </el-tab-pane>
</el-tabs>
    </div>
</template>
<script>
export default {
    name:'saleCtrl',
    data(){
        return{
    tableData: [
        {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000',

        },
         {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        }, 
        {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        },
         {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        }
        ],
        tableData2: [
        {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        },
         {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        }, 
        {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        },
         {
          date: '2016-05-02',
          oddNum:'1111',
          code:'000',
          name: '王小虎',
          number:'1',
          onePrice:'10000',
          allPrice:'20000'
        }
        ],
         saleSort: [
        {
         
          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        },
         {
         
          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        }, 
       {
         
          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        },
         {

          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        }
        ],
         saleSort1: [
        {
         
          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        },
         {
         
          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        }, 
       {
         
          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        },
         {

          code:'000',
          name: '王小虎',
          saleNum:'1',
          skuSale:'1'
        }
        ],
        value1:'',
        value2:''
        }
    },
    methods: {
        formatter(row, column) {
        return row.address;
      }
    }
}
</script>
<style scoped>

</style>