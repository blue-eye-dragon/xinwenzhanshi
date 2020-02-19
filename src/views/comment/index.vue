<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-comment",
  data() {
    return {
      comments: [],
      reqParams:{
          response_type:'comment',
          page:1,
          per_page:20
      },
      total:0,
    };
  },
  created(){
      this.getComments()
  },
  methods: {
      toggleStatus(row){
          const text1='您是否确定要关闭该文章的评论功能，关闭后用户无法对文章进行评论。'
          const text2 = '您是否确定要打开该文章的评论功能。'
          this.$confirm(row.comment_status?text1:text2, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            try {
                const res= await this.$http.put(`comments/status?article_id=${row.id}`,{allow_comment : !row.comment_status})
                this.$message.success(res.data.data.allow_comment?'打开成功':'关闭成功')
                row.comment_status = !row.comment_status  
            }  catch(e){
                this.$message.error('操作失败') 
            }
        }).catch(() => {
                 
        });
      },
      changePage(newpage){
          this.reqParams.page = newpage
          this.getComments()
      },
      async getComments(){
          const res = await this.$http.get('articles',{params:this.reqParams})
          this.comments = res.data.data.results
          console.log(this.comments)
          this.total = res.data.data.total_count
      }
  },
};
</script>

<style scoped lang='less'>
</style>