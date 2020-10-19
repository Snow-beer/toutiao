<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章发布</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="article.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="2">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发布</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticlechannel,
  addArticle,
  getArticles,
  updataArticle,
} from "@/api/article";

export default {
  name: "publish",
  data() {
    return {
      channels: [], //文章列表
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        channel_id: null,
      },
    };
  },
  created() {
    const channelid = this.$route.query.id;
    if (channelid) {
      this.loadArticle();
    }
    this.loadChannels();
  },

  methods: {
    loadChannels() {
      getArticlechannel().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onPublish(draft = false) {
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
      const channelid = this.$route.query.id;
      if (channelid) {
        updataArticle(channelid, this.article, draft).then((res) => {
          console.log(res);
          this.$message({
            message: `${draft ? "存入草稿" : "发布"}成功`,
            type: "success",
          });
          this.$router.push("/article");
        });
      } else {
        addArticle(this.article, draft).then((res) => {
          // 处理响应结果
          // console.log(res)
          this.$message({
            message: "发布成功",
            type: "success",
          });
        });
      }
    },
    //获取指定文章
    loadArticle() {
      // console.log(this.$route.query.id)
      getArticles(this.$route.query.id).then((res) => {
        this.article = res.data.data;
      });
    },
  },
};
</script>

<style scope lang='less'>
</style>