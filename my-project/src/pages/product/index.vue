<template>
<!-- https://blog.csdn.net/weixin_43216105/article/details/89156166?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task -->
   <!-- 改表格为可编辑状态 -->
      <el-tabs type="border-card">
  <el-tab-pane label="产品信息">
      <el-form label-width="80px">
      <el-form-item label="特殊资源">
      <el-radio-group v-model="saleStatus" @change="saleStatusRadioChange">
      <el-radio label="0">已上架</el-radio>
      <el-radio label="1">未上架</el-radio>
      </el-radio-group>
      </el-form-item>
      </el-form>
    <!-- 已经上架的商品 -->
     <div class="product">
        <div class="header">   
                <el-input v-model="input" placeholder="请输入内容" class="search"></el-input>
                 <el-button icon="el-icon-search" circle class="icon" size="small" @click="searchSpuPageList"></el-button>
                 <!-- 用于新增商品的按钮 -->
                 <el-button type="primary" @click="addProduct=true;getSpuIdA()">新增<i class="el-icon-upload el-icon--right"></i></el-button>
                 <el-dialog
  title="新增商品"
  :visible.sync="addProduct"
  width="70%"
  :before-close="handleClose">
  <!-- 这里面是新增商品的表单 -->
     <el-form :label-position="labelPosition" label-width="120px" :model="formAdd">
         <p>spu</p>
   <el-form-item label="商品分类">
    <el-select v-model="formAdd.region" placeholder="请选择新增的分类">
      <el-option label="手机" value="1"></el-option>
      <el-option label="周边" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="名称">
    <el-input v-model="formAdd.name"></el-input>
  </el-form-item>
  <el-form-item label="大类编码">
    <el-input v-model="formAdd.code"></el-input>
  </el-form-item>
  <el-form-item label="简介">
    <el-input v-model="formAdd.briefIntro"></el-input>
  </el-form-item>
   <el-form-item label="详细介绍">
    <el-input v-model="formAdd.detailIntro"></el-input>
  </el-form-item>
   <el-form-item label="门店价">
    <el-input v-model="formAdd.shopPrice"></el-input>
  </el-form-item>
   <el-form-item label="上架时间">
    <el-input v-model="formAdd.saleTime"></el-input>
  </el-form-item>
    <el-form-item label="是否为新品">
    <el-radio-group v-model="formAdd.isNew">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="是否为店内推荐">
    <el-radio-group v-model="formAdd.isRecom">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
      </el-form-item>
     <el-form-item label="是否上架">
    <el-radio-group v-model="formAdd.saleStatus">
      <el-radio label="0">是</el-radio>
      <el-radio label="1">否</el-radio>
    </el-radio-group>
  </el-form-item>
     <el-form-item label="商品品牌">
    <el-select v-model="formAdd.brand" placeholder="请选择商品品牌" @change="getBrandId">
      <el-option v-for="item,index in brands" :key="index" :label="item.name" :value="item.id"></el-option>
      <!-- 到时候请求brand 里面的内容-->
    </el-select>
  </el-form-item>
    <el-form-item label="上传商品主图">
        <el-upload
  class="upload-demo"
  action="http://localhost:8089/spu/pic"
  :on-preview="handlePreview"
  :on-remove="handleRemoveAddMain"
  :on-success="AddMainSuccess"
  :file-list="AddMain"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
     <el-form-item label="上传商品banner图">
        <el-upload
  class="upload-demo"
  action="http://localhost:8089/spu/pic"
  :on-preview="handlePreview"
  :on-remove="handleRemoveAddBanner"
  :on-success="AddBannerSuccess"
  :file-list="AddBanner"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
     <el-form-item label="上传商品广告图">
        <el-upload
  class="upload-demo"
  action="http://localhost:8089/spu/pic"
  :on-preview="handlePreview"
  :on-remove="handleRemoveAddAd"
  :on-success="AddAdSuccess"
  :file-list="AddAd"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
    <!-- 新增sku  -->
    <!-- <p>sku</p> -->
    <el-form-item>
         <el-button type="primary" plain @click="addSku=true;AddSkuAllNew()">新增sku</el-button>
  <el-dialog
  title="详细型号新增"
  :visible.sync="addSku"
  width="50%"
  :before-close="handleClose">
  <!-- <span>这是一段信息</span> -->
     <el-form :model="skuFormAdd">
     <el-form-item v-for="item,index in skuFormAdd.property" :label="item.name" :key="index">
          <el-radio-group v-model="pcIdAnother[index]">
           <el-radio v-for="pc,indexPc in item.propertyChoices" :label="pc.id" :key="indexPc">{{pc.name}}</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="库存">
           <el-input v-model="skuFormAdd.store"></el-input>
    </el-form-item>
    <el-form-item label="价格">
             <el-input v-model="skuFormAdd.price"></el-input>
    </el-form-item>
     <el-form-item label="编码">
             <el-input v-model="skuFormAdd.code"></el-input>
    </el-form-item>
    <el-form-item label="是否上架">
    <el-radio-group v-model="skuFormAdd.isSale">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
    </el-form-item>
     </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addSku = false">取 消</el-button>
    <el-button type="primary" @click="addSku = false;SkuSure()">确 定</el-button>
  </span>
</el-dialog>
    </el-form-item>
</el-form>
 <!-- 这里面是新增商品的表单的结束-->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addProduct = false">取 消</el-button>
    <el-button type="primary" @click="addProduct = false;addSpuAllNew()">确 定</el-button>
  </span>
</el-dialog>
        </div>
    <div>
      <!-- 这里表格对应的数值是由prop对应的。 -->
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="createTime"
      label="日期"
      sortable
      width="180"
      column-key="date"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="商品名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="briefIntro"
      label="简介"
      >
    </el-table-column>
 <!-- :formatter="formatter" -->
     <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEditSpu(scope.$index, scope.row);dialogVisible = true">编辑</el-button>
      <!-- 编辑spu信息 -->
      <el-dialog title="更改商品信息" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
         <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
            <el-form-item label="商品分类">
             <el-select v-model="formLabelAlign.region" placeholder="请选择新增的分类" @change="selectGetClassificationId">
             <el-option label="手机" value="1"></el-option>
            <el-option label="周边" value="2"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="名称">
           <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
         <el-form-item label="大类编码">
    <el-input v-model="formLabelAlign.code"></el-input>
  </el-form-item>
  <el-form-item label="简介">
    <el-input v-model="formLabelAlign.briefIntro"></el-input>
  </el-form-item>
   <el-form-item label="详细介绍">
    <el-input v-model="formLabelAlign.detailIntro"></el-input>
  </el-form-item>
   <el-form-item label="门店价">
    <el-input v-model="formLabelAlign.shopPrice"></el-input>
  </el-form-item>
   <el-form-item label="上架时间">
    <el-input v-model="formLabelAlign.saleTime"></el-input>
  </el-form-item>
    <el-form-item label="是否为新品">
    <el-radio-group v-model="formLabelAlign.isNew" @change="editIsNew">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否为店内推荐">
    <el-radio-group v-model="formLabelAlign.isRecom" @change="editIsRecom">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="是否上架">
        <!-- 0是在售 -->
    <el-radio-group v-model="formLabelAlign.saleStatus" @change="editSaleStatus">
      <el-radio label="0">是</el-radio>
      <el-radio label="1">否</el-radio>
    </el-radio-group>
  </el-form-item>
    <!-- 到时候请求brand 里面的内容-->
   <el-form-item label="商品品牌">
    <el-select v-model="formLabelAlign.brands" placeholder="请选择商品品牌" @change="selectGetBrand">
      <el-option v-for="item,index in brands" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
   <!-- 包含商品主图 商品详情图 介绍图等等.... -->
  <!-- MainPicEditList是编辑商品图的图片存储 非新增的  原有图的增删查改 -->
  <!-- 单图上传 -->
  <!-- http://blog.sina.com.cn/s/blog_e8da9aea0102xmg7.html -->
  <!-- https://blog.csdn.net/xcbbqcl/article/details/97037301 -->
    <el-form-item label="编辑商品主图">
  <el-upload
  class="upload-demo"
  action="http://localhost:8089/spu/pic"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="MainPicEditList"
  :on-success="uploadMainSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>

      <el-form-item label="编辑商品banner图">
        <el-upload
  class="upload-demo"
  action="http://localhost:8089/spu/pic"
  :on-preview="handlePreview"
  :on-remove="handleRemoveBannerPic"
  :file-list="BannerPicEditList"
  :on-success="uploadBannerSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>

    <el-form-item label="编辑商品广告图">
    <el-upload
  class="upload-demo"
  action="http://localhost:8089/spu/pic"
  :on-preview="handlePreview"
  :on-remove="handleRemoveAdPic"
  :file-list="AdPicEditList"
  :on-success="uploadAdSuccess"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
    <!-- <p>sku</p> -->
         </el-form>
         <!-- 更改spu结束 -->
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;editSpuChange()">确 定</el-button>
  </span>

      </el-dialog>

      <!-- 更改sku sku的展示和更改 -->
       <el-button
          size="mini"
          @click="handleCheck(scope.$index, scope.row);checkProduct= true">查看</el-button>
           <el-dialog
  title="提示"
  :visible.sync="checkProduct"
  width="70%"
  :before-close="handleClose">
    <div>
    <!-- 更改sku -->
  <el-table
    :data="skuData"
    style="width: 100%">
    <el-table-column
      label="编码"
      width="130">
      <template slot-scope="scope">    
        <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.code"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.code }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="100">
      <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.price"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="库存"
      width="100">
      <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.store"></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.store }}</span>
      </template>
    </el-table-column>
       <el-table-column
      label="上架否"
      width="100">
      <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="yes" ></el-input>
        <span style="margin-left: 10px" v-show="!scope.row.show">{{ scope.row.isSale?'是':'否'}}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="属性"
      width="250">
      <template slot-scope="scope">
        <div v-for="item,index in scope.row.propertyChoices" :key="index" class="property">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.propertyChoices[index].name"></el-input>
            <el-tag v-show="!scope.row.show">{{item.name}}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEditSku(scope.$index, scope.row);scope.row.show=true">编辑</el-button>
           <el-button
          size="mini"
          @click="handleSaveSku(scope.$index, scope.row);scope.row.show=false">保存</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDeleteSku(scope.$index, scope.row);delSkuSuccess()">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 更改sku结束 -->
</div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="checkProduct = false">取 消</el-button>
    <el-button type="primary" @click="checkProduct = false">确 定</el-button>
  </span>
</el-dialog>
        
          <el-button
          size="mini"
          @click="handleAddOuterSku(scope.$index, scope.row);OuterAddSku=true">新增sku</el-button>
          <el-dialog
  title="提示"
  :visible.sync="OuterAddSku"
  width="60%"
  :before-close="handleCloseOuterAddSku">
  <!-- <span>这是一段信息</span> -->
  <!-- 外部新增sku -->

     <el-form :model="skuOuterFormAdd">
    <el-form-item v-for="item,index in skuOuterFormAdd.property" :label="item.name" :key="index">
          <el-radio-group v-model="pcId[index]">
           <el-radio v-for="pc,indexPc in item.propertyChoices" :label="pc.id" :key="indexPc">{{pc.name}}</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="库存">
           <el-input v-model="skuOuterFormAdd.store"></el-input>
    </el-form-item>
    <el-form-item label="价格">
             <el-input v-model="skuOuterFormAdd.price"></el-input>
    </el-form-item>
     <el-form-item label="编码">
             <el-input v-model="skuOuterFormAdd.code"></el-input>
    </el-form-item>
    <el-form-item label="是否上架">
    <el-radio-group v-model="skuOuterFormAdd.isSale">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
    </el-form-item>
     </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="OuterAddSku = false">取 消</el-button>
    <el-button type="primary" @click="OuterAddSku = false;submitSkuAdd()">确 定</el-button>
  </span>
</el-dialog>

        <el-button
          size="mini"
          type="danger"
          @click="handleDeleteSpu(scope.$index, scope.row);successDelSpu()">删除</el-button>
      </template>
    </el-table-column>

    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '新品', value: '新品' }, { text: '热卖推荐', value: '热卖推荐' },{ text: '新品&热卖推荐', value: '新品&热卖推荐' },{ text: '其他', value: '其他' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '新品' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>

  </el-table>
</div>
    <div class="footer">
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
  </el-tab-pane>
  <!-- <el-tab-pane label="未上架">
    未上架</el-tab-pane> -->
</el-tabs>

 
</template>
<script>
import {getSpu} from "../../api/getSpu.js";
import {SPU_RECOMMENT_PAGE_SIZE} from '../../api/config.js';
import {getBrandsNoPage} from '../../api/getBrandsNoPage.js';
import {uuid} from '../../api/uuid.js';
import {updateSpu} from '../../api/updateSpu.js';
import {updateSku} from '../../api/updateSku.js';
import {getSkuById} from '../../api/getSkuById.js';
import {delSku} from '../../api/delSku.js';
import {getPropertyChoiceIdByNames} from '../../api/getPropertyChoiceId.js';
import {getProperty} from '../../api/getProperty.js';
import {addSku} from '../../api/addSku.js';
import {delSpu} from '../../api/delSpu.js';
import {getDate} from '../../api/date.js';
import {addProduct} from '../../api/addProduct.js';
export default {
    name:"product",
    data(){
        return{
          addBrandId:'',
          outerSkuAdd:[],
          pcId:[],
          pcIdAnother:[],
          OuterAddSku:false,
          yes:'是',
          picUrl:'',
          isNew:'',
          isRecom:'',
          saleStatusForm:'',
          brandId:'',
          classificationId:'',
          spu:[],
          getspuId:'',
        //商品分类
        classification:[],
          //品牌列表
        brands:[],
        saleStatus:'0',
        //切换tab的时候更换 商品上架 下架 状态
        tableData: [],
        skuData: [],
        dialogVisible: false,
        checkProduct:false,
        labelPosition: 'right',
        formLabelAlign: {name: '',code: '',briefIntro: '',detailIntro:'',shopPrice:'',isNew:'',isRecom:'',saleTime:'',saleStatus:'',brands:'',region:''},
        formAdd:{name: '',code: '',briefIntro: '',detailIntro:'',shopPrice:'',isNew:'',isRecom:'',saleTime:'',saleStatus:'',brand:'',region:''},
        skuFormAdd:{code:'',price:'',store:'',isSale:'',color:'',net:'',property:'',propertyChoice:''},
        skuOuterFormAdd:{code:'',price:'',store:'',isSale:'',property:'',propertyChoice:''},
        curPage:1,
        adOrder:0,
        adOrderS:0,
        totalPage:1,
        pageSzie:SPU_RECOMMENT_PAGE_SIZE,
        total:0,
        addProduct:false,
        input: '',
        addSku:false,
        a:'苹果',
        MainPicEditList:[],
        AddMain:[],
        AddBanner:[],
        AddAd:[],
        BannerPicEditList:[],
        AdPicEditList:[],
        picList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
        },
    // },
    methods: {
      handleCloseOuterAddSku(done) {this.$confirm('确认关闭？').then(_ => {done();}).catch(_ => {});},
      formatter(row, column) {return row.address;},
      filterTag(value, row) {return row.tag === value;},
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
       handleEditSpu(index, row) {
        console.log("hh");
        console.log(index, row);
        this.spu=JSON.parse(JSON.stringify(row));
        this.formLabelAlign.name=row.name;
        this.formLabelAlign.code=row.code;
        this.formLabelAlign.briefIntro=row.briefIntro;
        this.formLabelAlign.detailIntro=row.detailIntro;
        this.formLabelAlign.shopPrice=row.shopPrice;
        this.isNew=row.isNew;
        this.isRecom=row.isRecom;
        this.saleStatusForm=row.saleStatus;
        if(row.isNew==1){this.formLabelAlign.isNew='1';}
        else{ this.formLabelAlign.isNew='0';}
        if(row.isRecom==1){this.formLabelAlign.isRecom='1';}
        else{this.formLabelAlign.isRecom='0';}
        this.formLabelAlign.saleTime=row.saleTime;
        if(row.saleStatus==0){this.formLabelAlign.saleStatus='0';}
        else{ this.formLabelAlign.saleStatus='1';}
        this.formLabelAlign.brands=row.brands[0].name;
        this.formLabelAlign.region=row.classification.name;
        var allPic=[];
        allPic=row.pictures;
        console.log(allPic);
        var main=[], banner=[],ad=[];
        allPic.forEach(function(element){
          if(element.isMaster=="1"){//  this.MainPicEditList.push(element);
              main.push(element);}
          if(element.pictureStatus=="01"){banner.push(element);}      
          if(element.pictureStatus=="02"){ad.push(element);}      })
          this.MainPicEditList=JSON.parse(JSON.stringify(main));
          this.BannerPicEditList=JSON.parse(JSON.stringify(banner));
          this.AdPicEditList=JSON.parse(JSON.stringify(ad));
          this.brandId=row.brandId;
          this.classificationId=row.classificationId;
          console.log("id:"+this.brandId);//改变时品牌id 
          console.log("id:"+this.classificationId);//改变时分类id 
      },
       handleEditSku(index, row) {
         if(row.isSale){
            this.yes='是'
         }
         else{
           this.yes='否';
         }
         console.log(index, row);
      },
      handleSaveSku(index,row){
        //这里的是没有解决....查看的修改那
          console.log("什么鬼拉");
          console.log(row);
          let isSale;
          let yes=this.yes;
          let propertyChoiceNames=[];
          let pcIdRes=[];
          row.propertyChoices.forEach(function(item){
          propertyChoiceNames.push(item.name)
          var spc=[];
          getPropertyChoiceIdByNames(propertyChoiceNames).then(res=>{
            if(res)
            {
            pcIdRes=JSON.parse(JSON.stringify(res.data));
          for(var i=0;i<propertyChoiceNames.length;i++)
          {
            var propertyChoiceId=pcIdRes[propertyChoiceNames[i]];
            var id=uuid();
            var json={
              "id":id,
              "skuId":row.id,
              "propertyChoiceId":propertyChoiceId
            }
            spc.push(json);
          }
            console.log(yes);
           if(yes=='是')
              isSale="1";
          else
          isSale="0";
          console.log("iiiiii");
          console.log(isSale);
          row.isSale=isSale;
         console.log("row");
          console.log(row);
          var json={
            "sku":{
              "id":row.id,
              "code":row.code,
              "price":row.price,
              "store":row.store,
              "spuId":row.spuId,
              "delFlag":row.delFlag,
              "isSale":isSale
            },
            "skuPropertyChoice":spc
          }
          console.log('我发送的数据');
          console.log(json);
          updateSku(json).then(res=>{
            if(res)
            {
              console.log(res);
            }
          })
            }
          })
          })     
      },
      handleAddOuterSku(index,row){
          console.log(index,row);
          this.outerSkuAdd=row;
          getProperty(1).then(res=>{
            if(res)
            {
              console.log(res);
              this.skuOuterFormAdd.property=res.data;
              
              console.log(this.skuOuterFormAdd.property);
            }
          })
      },
      handleSave(index, row) {console.log(index, row);},
      handleDeleteSpu(index, row) {

        // delSpu(row.id).then(res=>{
        //   if(res)
        //   {
        //     console.log(res);
        //   }
        // })
        console.log(row.id);
        delSpu(row.id).then(res=>{
          if(res)
          {
            console.log(res);
          }
        })
        console.log(index, row);
        // 删除spu之后没实时更新
      },
      handleDeleteSku(index,row){
        console.log("o");
        console.log(index,row);
        delSku(row.id).then(res=>{
            if(res){
              console.log(res);
              //删除后未达到同步显示
              //这里spu的sku
              // getSkuById(this.spu.id).then(res=>{
              //   if(res){
              //   res.data.skuList.forEach(element=>{
              //     console.log(element);
              //     element["show"]=false;
              //   })
              //   this.skuData=res.data.skuList;
              //   console.log("sku");
              //   console.log(this.skuData);
              // }
              // })
            }
        })
      },
      handleCheck(index,row)
      {
        //查看sku
        let spuId=row.id;
           getSkuById(spuId).then(res=>{
              if(res){
                res.data.skuList.forEach(element=>{
                  console.log(element);
                  element["show"]=false;
                })
                this.skuData=res.data.skuList;
                console.log("sku");
                console.log(this.skuData);
              }
           })
          console.log(index,row);
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
       handleRemove(file, MainPicEditList) {
        for(var i in this.MainPicEditList){
          for(var k in this.MainPicEditList[i]){
            if(this.MainPicEditList[i][k]==file.uid)
            {
              // delete this.MainPicEditList[i];
              //delect删除长度是不会变的 需要使用splice删除
              this.MainPicEditList.splice(i,1);
              break;
            }
          }
        }
        console.log(this.MainPicEditList);
      },
      handleRemoveBannerPic(file,BannerPicEditList){
         for(var i in this.BannerPicEditList){
          for(var k in this.BannerPicEditList[i]){
            if(this.BannerPicEditList[i][k]==file.uid)
            {
              // delete this.MainPicEditList[i];
              //delect删除长度是不会变的 需要使用splice删除
              this.BannerPicEditList.splice(i,1);
              break;
            }
          }
        }
        console.log(file, BannerPicEditList);
      },
      handleRemoveAdPic(file, AdPicEditList){
        for(var i in this.AdPicEditList){
          for(var k in this.AdPicEditList[i]){
            if(this.AdPicEditList[i][k]==file.uid)
            {
              // delete this.MainPicEditList[i];
              //delect删除长度是不会变的 需要使用splice删除
              this.AdPicEditList.splice(i,1);
              break;
            }
          }
        }
        console.log(file, AdPicEditList);
      },
       handleRemoveAddMain(file, AddMain) {
        for(var i in this.AddMain){
            for(var k in this.AddMain[i]){
            if(this.AddMain[i][k]==file.uid)
            {
              // delete this.MainPicEditList[i];
              //delect删除长度是不会变的 需要使用splice删除
              this.AddMain.splice(i,1);
              break;
            }
          } 
        }
      },
      handleRemoveAddBanner(file,AddBanner){
        for(var i in this.AddBanner){
            for(var k in this.AddBanner[i]){
            if(this.AddBanner[i][k]==file.uid)
            {
              // delete this.MainPicEditList[i];
              //delect删除长度是不会变的 需要使用splice删除
              this.AddBanner.splice(i,1);
              break;
            }
          } 
        }
      },
       handleRemoveAddAd(file,AddAd){
        for(var i in this.AddAd){
            for(var k in this.AddAd[i]){
            if(this.AddAd[i][k]==file.uid)
            {
              // delete this.MainPicEditList[i];
              //delect删除长度是不会变的 需要使用splice删除
              this.AddAd.splice(i,1);
              break;
            }
          } 
        }
      },
      handlePreview(file) {
        console.log(file);
        this.picUrl=file.url;
      },
       successDelSpu() {

        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },
      delSkuSuccess(){
         this.$message({
          message: '删除成功',
          type: 'success'
        });
      },
      getSpuPage(){
         if(this.curPage>this.totalPage)
      {
        return;
      }
      //在售
      getSpu(this.curPage,this.saleStatus,{}).then(res=>{
        if(res){
          // console.log(res);
          console.log(res.data);
          this.totalPage=res.data.pages;
          this.total=res.data.total;
           res.data.records.forEach(element=>{
            console.log(element);
            element["tag"]="";
            if(element.isNew=="1"&&element.isRecom!="1")
            {
              element["tag"]="新品";
            }
            if(element.isNew!="1"&&element.isRecom=="1")
            {
              element["tag"]="热卖推荐";
            }
            if(element.isRecom!="1"&&element.isNew!="1"){
              element["tag"]="其他";
            }
            if(element.isNew=="1"&&element.isRecom=="1"){
              element["tag"]="新品&热卖推荐"
            }
          })
          this.tableData=res.data.records;
        }
      })
      },
      handleCurrentChange(cpage){
        this.curPage=cpage;
        this.getSpuPage();
    },
    getBrands(){
      getBrandsNoPage().then(res=>{
        if(res)
        {
           this.brands=res.data;
           console.log("我是brands");
           console.log(this.brands);
        }
      })
    },
    selectGetBrand(vId){  
      this.brandId=vId;
       console.log("id:"+this.brandId);//改变时品牌id
    },
    selectGetClassificationId(vId){    

      this.classificationId=vId;
       console.log("id:"+this.classificationId);//改变时分类id
    },
    editSpuChange(){
      // console.log(this.formLabelAlign);
      console.log("spu");
      console.log(this.spu);
      var picList=[];
      console.log(this.MainPicEditList);
      //这个数组需要删除 status uid 这两个字段。。
      var Marr=[];
      this.MainPicEditList.forEach(function(item){
        Marr.push({id:item.id,url:item.url,isMaster:item.isMaster,pictureOrder:item.pictureOrder,pictureStatus:item.pictureStatus,spuId:item.spuId});
      })
      var Barr=[];
       this.BannerPicEditList.forEach(function(item){
        Barr.push({id:item.id,url:item.url,isMaster:item.isMaster,pictureOrder:item.pictureOrder,pictureStatus:item.pictureStatus,spuId:item.spuId});
      })
      var Aarr=[];
      this.AdPicEditList.forEach(function(item){
        Aarr.push({id:item.id,url:item.url,isMaster:item.isMaster,pictureOrder:item.pictureOrder,pictureStatus:item.pictureStatus,spuId:item.spuId});
      })
      // picList.push(Marr,Barr,Aarr);
      picList=[...Marr,...Barr,...Aarr];
      console.log('-----------');
      console.log(picList);
      var json={
        "spu":{
          "id":this.spu.id,
          "code":this.formLabelAlign.code,
          "name":this.formLabelAlign.name,
          "briefIntro":this.formLabelAlign.briefIntro,
          "detailIntro":this.formLabelAlign.detailIntro,
          "shopPrice":this.formLabelAlign.shopPrice,
          "brandId":this.brandId,
          "classificationId":this.classificationId,
          "saleStatus":this.saleStatusForm,
          "isNew":this.isNew,
          "isRecom":this.isRecom,
          "hotStatus":this.spu.hotStatus,
          "saleTime":this.formLabelAlign.saleTime,
          "createTime":this.spu.createTime,
          "delFlag":this.spu.delFlag
         },
         "picList":picList
      }
      // console.log(this.MainPicEditList);
      updateSpu(json).then(res=>{
        if(res){
          console.log(res);
          this.getSpuPage();
        }
      })
    },
    editIsNew(value){
      this.isNew=value;
      console.log(value);
    },
    editIsRecom(value){
      this.isRecom=value;
      console.log(value);
    },
    editSaleStatus(value){
      this.saleStatusForm=value;
      console.log(value);
    },
    uploadMainSuccess(response, file, fileList){
      let id=uuid();
      let files={
          "id":id,
          "url":response.data,
          "isMaster":"1",
          "pictureOrder":"0",
          "pictureStatus":"1",
          "spuId":this.spu.id
      };
      this.MainPicEditList.push(files);
      console.log(this.MainPicEditList);
    },
    // banner图不需要顺序
    uploadBannerSuccess(response,file,fileList){
      let id=uuid();
      let files={
          "id":id,
          "url":response.data,
          "isMaster":"0",
          "pictureOrder":"0",
          "pictureStatus":"01",
          "spuId":this.spu.id
      };
      this.BannerPicEditList.push(files);
      console.log(this.BannerPicEditList);
    },
    uploadAdSuccess(response,file,fileList){
      this.adOrder++;
      let order=this.adOrder.toString();
       let id=uuid();
      let files={
          "id":id,
          "url":response.data,
          "isMaster":"0",
          "pictureOrder":order,
          "pictureStatus":"02",
          "spuId":this.spu.id
      };
      this.AdPicEditList.push(files);
      console.log(this.AdPicEditList);
    },
    AddMainSuccess(response,file,fileList){

      let id=uuid();
      let files={
          "id":id,
          "url":response.data,
          "isMaster":"1",
          "pictureOrder":"0",
          "pictureStatus":"1",
          "spuId":this.getSpuId
      };
      this.AddMain.push(files);
      console.log(this.AddMain);
    },
     AddBannerSuccess(response,file,fileList){
      let id=uuid();
      let files={
          "id":id,
          "url":response.data,
          "isMaster":"0",
          "pictureOrder":"0",
          "pictureStatus":"01",
          "spuId":this.getSpuId
      };
      this.AddBanner.push(files);
      console.log(this.AddBanner);
    },
    AddAdSuccess(response,file,fileList){
      this.adOrderS++;
      let order=this.adOrderS.toString();
       let id=uuid();
      let files={
          "id":id,
          "url":response.data,
          "isMaster":"0",
          "pictureOrder":order,
          "pictureStatus":"02",
          "spuId":this.getSpuId
      };
      this.AddAd.push(files);
      console.log(this.AddAd);
    },
    submitSkuAdd(){
      //提交新增的sku
      console.log('ssssssssssss');
      console.log(this.outerSkuAdd);
      console.log(this.skuOuterFormAdd);
      let spuId=this.outerSkuAdd.id;
      let skuId=uuid();
      let isSale;
      if(this.skuOuterFormAdd.isSale=="是"){
          isSale="1";
      }else{
        isSale="0";
      }
      let skuPropertyChoice=[];
      this.pcId.forEach(element=>{
        let id=uuid();
           let json={
             "id":id,
             "skuId":skuId,
             "propertyChoiceId":element
           }
           skuPropertyChoice.push(json);
      })
      console.log('lll');
      console.log(skuPropertyChoice);
      var json={
        "sku":{
            "id":skuId,
            "code":this.skuOuterFormAdd.code,
            "price":this.skuOuterFormAdd.price,
            "store":this.skuOuterFormAdd.store,
            "spuId":spuId,
            "isSale":isSale,
            "delFlag":"0"
        },
        "skuPropertyChoice":skuPropertyChoice
      }
      // console.log(this.skuOuterFormAdd);
      console.log(json);
      addSku(json).then(res=>{
        if(res){
          console.log(res);
        }
      })
      // console.log(skuPropertyChoice);
    },
    getSpuIdA(){
        let id=uuid();
        this.getSpuId=id;
    },
    addSpuAllNew(){
      console.log(this.formAdd);
      // let time=getDate();
      let id=this.getSpuId;
      // console.log(time);
      let picList=[];
       let Marr=[];
      this.AddMain.forEach(function(item){
        Marr.push({id:item.id,url:item.url,isMaster:item.isMaster,pictureOrder:item.pictureOrder,pictureStatus:item.pictureStatus,spuId:item.spuId});
      })
      let Barr=[];
       this.AddBanner.forEach(function(item){
        Barr.push({id:item.id,url:item.url,isMaster:item.isMaster,pictureOrder:item.pictureOrder,pictureStatus:item.pictureStatus,spuId:item.spuId});
      })
      let Aarr=[];
      this.AddAd.forEach(function(item){
        Aarr.push({id:item.id,url:item.url,isMaster:item.isMaster,pictureOrder:item.pictureOrder,pictureStatus:item.pictureStatus,spuId:item.spuId});
      })
      // picList.push(Marr,Barr,Aarr);
      picList=[...Marr,...Barr,...Aarr];
      var json={
        "spu":{
          "code":this.formAdd.code,
          "name":this.formAdd.name,
          "briefIntro":this.formAdd.briefIntro,
          "detailIntro":this.formAdd.detailIntro,
          "shopPrice":this.formAdd.shopPrice,
          "delFlag":"0",
          "isNew":this.formAdd.isNew,
          "isRecom":this.formAdd.isRecom,
          "brandId":this.formAdd.brand,
          "classificationId":this.formAdd.region,
          "saleStatus":this.formAdd.saleStatus,
          "hotStatus":"0",
          "id":id,
          "saleTime":this.formAdd.saleTime
        },
        "picture":picList
      }
      console.log(json);
      addProduct(json).then(res=>{
        if(res)
        {
          console.log(res);
        }
      })
      },
      getBrandId(vId){
        this.addBrandId=vId;
        console.log(this.addBrandId);
      },
    AddSkuAllNew(){
       getProperty(1).then(res=>{
            if(res)
            {
              console.log(res);
              this.skuFormAdd.property=res.data;
              console.log("emmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
              console.log(this.skuFormAdd.property);
            }
          })
    },
    SkuSure(){

      // let spuId=this.outerSkuAdd.id;
      // let skuId=uuid();
      // let isSale;
      // if(this.skuOuterFormAdd.isSale=="是"){
      //     isSale="1";
      // }else{
      //   isSale="0";
      // }
      // let skuPropertyChoice=[];
      // this.pcId.forEach(element=>{
      //   let id=uuid();
      //      let json={
      //        "id":id,
      //        "skuId":skuId,
      //        "propertyChoiceId":element
      //      }
      //      skuPropertyChoice.push(json);
      // })
      // console.log('lll');
      // console.log(skuPropertyChoice);
      // var json={
      //   "sku":{
      //       "id":skuId,
      //       "code":this.skuOuterFormAdd.code,
      //       "price":this.skuOuterFormAdd.price,
      //       "store":this.skuOuterFormAdd.store,
      //       "spuId":spuId,
      //       "isSale":isSale,
      //       "delFlag":"0"
      //   },
      //   "skuPropertyChoice":skuPropertyChoice
      // }
      // // console.log(this.skuOuterFormAdd);
      // console.log(json);
      // addSku(json).then(res=>{
      //   if(res){
      //     console.log(res);
      //   }
      // })

        let spuId=this.getSpuId;
        let skuId=uuid();
        let skuPropertyChoice=[]; 
        this.pcIdAnother.forEach(element=>{
        let id=uuid();
           let json={
             "id":id,
             "skuId":skuId,
             "propertyChoiceId":element
           }
           skuPropertyChoice.push(json);
      })
        console.log(this.pcIdAnother);
        console.log(skuPropertyChoice);
        console.log(this.skuFormAdd);
         var json={
        "sku":{
            "id":skuId,
            "code":this.skuFormAdd.code,
            "price":this.skuFormAdd.price,
            "store":this.skuFormAdd.store,
            "spuId":spuId,
            "isSale":this.skuFormAdd.isSale,
            "delFlag":"0"
        },
        "skuPropertyChoice":skuPropertyChoice
      }
      console.log("json");
      console.log(json);
      addSku(json).then(res=>{
        if(res){
          console.log(res);
        }
      })
      // addSku(json).then(res=>{
      //   if(res){
      //     console.log(res);
      //   }
      // })
    },
    //按名字查询spu分页列表
    searchSpuPageList(){
      console.log("sss")
      let params={};
      if(this.input!=""){params["name"]=this.input}
      getSpu(this.curPage,this.saleStatus,params).then(res=>{
        if(res){
          // console.log(res);
          console.log(res.data);
          this.totalPage=res.data.pages;
          this.total=res.data.total;
           res.data.records.forEach(element=>{
            console.log(element);
            element["tag"]="";
            if(element.isNew=="1"&&element.isRecom!="1")
            {
              element["tag"]="新品";
            }
            if(element.isNew!="1"&&element.isRecom=="1")
            {
              element["tag"]="热卖推荐";
            }
            if(element.isRecom!="1"&&element.isNew!="1"){
              element["tag"]="其他";
            }
            if(element.isNew=="1"&&element.isRecom=="1"){
              element["tag"]="新品&热卖推荐"
            }
          })
          this.tableData=res.data.records;
        }
      })
    },
    saleStatusRadioChange(val){
      console.log(val)
      var params={}
        getSpu(this.curPage,this.saleStatus,params).then(res=>{
        if(res){
          // console.log(res);
          console.log(res.data);
          this.totalPage=res.data.pages;
          this.total=res.data.total;
           res.data.records.forEach(element=>{
            console.log(element);
            element["tag"]="";
            if(element.isNew=="1"&&element.isRecom!="1")
            {
              element["tag"]="新品";
            }
            if(element.isNew!="1"&&element.isRecom=="1")
            {
              element["tag"]="热卖推荐";
            }
            if(element.isRecom!="1"&&element.isNew!="1"){
              element["tag"]="其他";
            }
            if(element.isNew=="1"&&element.isRecom=="1"){
              element["tag"]="新品&热卖推荐"
            }
          })
          this.tableData=res.data.records;
        }
      })
    }
    },
     created () {
      this.getSpuPage();
      this.getBrands();
   
}
}
// ctrl f快速跳转
</script>
<style>
.product .property{
    display: inline-block;
}
.product{
    width: 100%;
    height: calc(100vh - 120px);
    position: relative;
}
.product .footer{
    position: absolute;
    bottom: 0;
}
.product .search{
    display:inline-block;
    width: 350px;
    position: absolute;
    right: 0;
    height: 60px;
}
.product .icon{
    position: absolute;
    right: 0;
    top: 19px;
}
.product .header{
    position: relative;
    height: 70px;
    line-height: 70px;
}
.product .v-model{
    background:none !important;
}
.product div.el-dialog{
 margin:0 auto !important;
}
.el-dialog{
  margin: 0 auto !important;
}
div.v-modal{
  background:none !important;
}
</style>