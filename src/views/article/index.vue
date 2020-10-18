<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑结束 -->
      </div>
      <!-- 表单 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        size="mini"
        class="filter-card"
      >
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">草稿</el-radio>
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核失败</el-radio>
            <el-radio :label="5">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select placeholder="请选择活动区域" v-model="channelId">
            <el-option label="全部" :value="null"> </el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-time-picker
            is-range
            v-model="rangeDate"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadArticle(1)" :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据条件工筛选到{{ totalCount }}条结果</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        size="mini"
        class="list-table"
        v-loading="loading"
      >
        <!-- 封面图片 -->
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" class="f-image" alt="" /> -->
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <!-- 封面图片结束 -->

        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 1"
              >待审核</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 2"
              >审核通过</el-tag
            >
            <el-tag type="danger" v-else-if="scope.row.status === 3"
              >审核失败</el-tag
            >
            <el-tag type="info" v-else-if="scope.row.status === 4"
              >已删除</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="title" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              circle
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        background
        :disabled="loading"
        :current-page.sync="page"
        @current-change="currentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, getArticlechannel, deleteArticle } from "@/api/article";

export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      status: null,
      articles: [],
      totalCount: 0, //数据数量
      channels: [], //文章频道
      channelId: null,
      rangeDate: null,
      loading: true,
      page: 1
    };
  },
  created() {
    this.loadArticle(1);
    this.loadChannels();
  },
  methods: {
    onQuery() {
      console.log("submit!");
    },
    loadArticle(page = 1) {
      this.loading = true;
      getArticle({
        page,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null,
      }).then((res) => {
        const { results, total_count: totalcount } = res.data.data;
        // console.log(res.data)
        // this.articles = res.data.data.results;
        this.articles = results;
        this.totalCount = totalcount;
        this.loading = false;
      });
    },
    // 分页事件
    currentChange(page) {
      // console.log(page)
      this.loadArticle(page);
    },
    // 获取文章频道
    loadChannels() {
      getArticlechannel().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    // 删除文章
    handleDelete(articleId) {
      this.$confirm("确认删除吗？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认执行这里
          deleteArticle(articleId.toString()).then((res) => {
            this.loadArticle(this.page)
            console.log(1)
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped lang='less'>
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
.f-image {
  width: 80px;
  height: 80px;
}
</style>