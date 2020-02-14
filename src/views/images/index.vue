<template>
  <div class="container-images">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-radio-group @change="changeCollect" v-model="reqParams.collect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              class="el-icon-star-off"
              :class="{red: item.is_collected}"
              @click="toggleStatue(item)"
            ></span>
            <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changPage"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <span>上传组件</span>
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="uploadHeader"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/auth'
export default {
  name: "Images",
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      dialogVisible: false,
      imageUrl: null,
      uploadHeader: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    handleSuccess(res) {
        this.$message.success('上传成功')
        this.imageUrl = res.data.url
        window.setTimeout(() => {
            this.dialogVisible = false
            this.getImages();
        }, 3000);
    },
    openDialog() {
        this.imageUrl = null
      this.dialogVisible = true;
    },
    deleteImage(id) {
      this.$confirm("是否要删除该图片素材?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`user/images/${id}`);
            this.$message.success("删除成功");
            this.getImages();
          } catch (e) {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
    async toggleStatue(item) {
      try {
        const res = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        });
        this.$message.success(
          res.data.data.collect ? "添加收藏成功" : "删除收藏成功"
        );
        item.is_collected = res.data.data.collect;
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    changPage(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    async getImages() {
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.images = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.img-list {
  margin-bottom: 20px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    margin-right: 30px;
    margin-top: 20px;
    display: inline-block;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .option {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      span {
        color: #dddddd;
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>