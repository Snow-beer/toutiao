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
        <el-radio-group v-model="collect" size="mini" @change="onCollectChange">
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
        </el-col>
      </el-row>
    </el-card>
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
        :headers='uploadHeader'
        name="image"
        :on-success='onUploadSucess'
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
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('user')).token}`
      }
    };
  },
  created() {
    this.loadImage();
  },
  methods: {
    loadImage(collect = false) {
      getImage({
        collect,
      }).then((res) => {
        this.image = res.data.data.results;
      });
    },
    onCollectChange(value) {
      this.loadImage(value);
    },
    onUploadSucess(){
      this.dialogVisible = false
      this.loadImage(false)
    }
  },
};
</script>

<style scoped lang='less'>
.img-boder {
  padding: 15px;
  border: 1px dashed;
}
.flex-box {
  display: flex;
  justify-content: space-between;
}
</style>