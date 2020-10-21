<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="article" style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.collectStatus"
              @change="handleComment(scope.row)"
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getComment, handleCommentStatus } from "@/api/comment.js";
export default {
  name: "CommentIndex",
  data() {
    return {
      article: [],
      totalCount: 0,
      currentPage4: 1,
      pageSize: 10,
      page: 2
    };
  },
  created() {
    this.loadComment();
  },
  methods: {
    handleSizeChange() {
      this.loadComment(1);
    },
    handleCurrentChange(page) {
      this.loadComment(page);
    },

    loadComment(page = 1, pagesize) {
        this.page = page
      getComment({
        page,

        response_type: "comment",
        per_page: this.pageSize,
      }).then((res) => {
        const { results } = res.data.data;

        results.forEach((article) => {
          article.collectStatus = false;
        });
        this.article = res.data.data.results;
        this.totalCount = res.data.data.total_count;
      });
    },
    handleComment(article) {
      article.collectStatus = true;
      handleCommentStatus(article.id.toString(), article.comment_status).then(
        (res) => {
          article.collectStatus = false;
        }
      );
    },
  },
};
</script>

<style>
</style>