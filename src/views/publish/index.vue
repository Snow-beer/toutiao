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
      <el-form ref="form" :model="article" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="350"
            placeholder="请输入文章内容"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
  TextColor,
} from "element-tiptap";

export default {
  name: "publish",
  components: {
    "el-tiptap": ElementTiptap,
  },
  data() {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new HorizontalRule(),
        new Fullscreen(),
      ],
      //表单验证
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "长度在 5 到 30 个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === '"<p></p>"') {
                // 验证失败
                callback(new Error("请输入文章内容"));
              } else {
                // 验证成功
                callback();
              }
            },
          },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [{ required: true, message: "请选择文章频道" }],
      },
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
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return;
        }
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
      });
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
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