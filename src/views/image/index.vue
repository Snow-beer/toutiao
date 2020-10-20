<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <!--  -->
      <div style="padding-bottom: 20px" class="flex-box">
        <el-radio-group v-model="collect" size="mini" @change="loadImage(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" type="success" @click="dialogVisible = true"
          >上传素材</el-button
        >
      </div>
      <!--  -->
      <el-row :gutter="20">
        <el-col
          class="img-boder"
          v-for="(item, index) in image"
          :key="index"
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
        >
          <el-image
            style="height: 100px"
            :src="item.url"
            fit="cover"
          ></el-image>
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-pagination background 
    :total='totalCount'
    @current-change	='handlepage'
    :current-page	='this.page'
    layout="prev, pager, next" >
    </el-pagination>
    <!-- 上传对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        multiple
        :headers="uploadHeader"
        name="image"
        :on-success="onUploadSucess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage } from "@/api/image.js";

export default {
  name: "imageIdex",
  data() {
    return {
      collect: "false",
      image: [],
      dialogVisible: false,
      uploadHeader: {
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem("user")).token
        }`,
      },
      page: 1,
      totalCount: 0
    };
  },
  created() {
    this.loadImage(1);
  },
  methods: {
    loadImage( page) {
      this.page = page
      getImage({
        collect:this.collect ,
        page,
        per_page: 10,
      }).then((res) => {
        this.image = res.data.data.results;
        // console.log(res)
        this.totalCount = res.data.data.total_count;
      });
    },
    // 上传时的更新
    onUploadSucess() {
      this.dialogVisible = false;
      this.loadImage(false);
    },
    // 翻页时的更新
    handlepage(value){
      console.log(value)
      this.loadImage(value)
    }
  },
};
</script>

<style scoped lang='less'>
.img-boder {
  padding: 15px;
  position: relative;
  // border: 1px dashed;
}
.flex-box {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.image-action{
  position: absolute;
  display: flex;
  justify-content: space-between;
}
// .action-head {
//   padding-bottom: 20px;
//   display: flex;
//   justify-content: space-between;
// }

.image-item {
  position: relative;
}

// .image-action {
//   font-size: 25px;
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
//   color: #fff;
//   height: 40px;
//   background-color: rgba(204, 204, 204, .5);
//   position: absolute;
//   bottom: 4px;
//   left: 5px;
//   right: 5px;
// }
</style>