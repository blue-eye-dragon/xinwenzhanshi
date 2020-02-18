<template>
  <div class="container-image">
    <div class="img_btn" @click="openDialog">
      <img :src="value||imageBtn" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="list">
            <div v-loading="loading">
              <!-- 按钮 -->
              <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <!-- 图片列表 -->
              <div class="img-list">
                <div
                  @click="selectImage(item.url)"
                  :class="{selected:selectedImage===item.url}"
                  class="img-item"
                  v-for="item in images"
                  :key="item.id"
                >
                  <img :src="item.url" alt />
                </div>
              </div>
              <!-- 分页 -->
              <el-pagination
                background
                layout="prev, pager, next"
                hide-on-single-page
                @current-change="changePage"
                :current-page="reqParams.page"
                :page-size="reqParams.per_page"
                :total="total"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
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
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="configImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/auth'
import defaultImage from '@/assets/default.png'
export default {
  name: "my-image",
  props: ['value'],
  data() {
    return {
      reqParams: {
        collect: "false",
        page: 1,
        per_page: 8
      },
      loading: false,
      dialogVisible: false,
      activeName: "list",
      images: [],
      total: 0,
      selectedImage: null,
      uploadHeader: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      imageUrl: null,
      imageBtn: defaultImage
    };
  },
  methods: {
    configImage(){
      if(this.activeName === 'list'){
        if(!this.selectedImage) return this.$message.warning('请从素材中选择一张图片')
        // this.imageBtn = this.selectedImage
        this.$emit('input',this.selectedImage)
      }else{
        if(!this.imageUrl) return this.$message.warning('请上传一张图片')
        // this.imageBtn = this.imageUrl
        this.$emit('input',this.imageUrl)
      }
      this.dialogVisible = false
    },
    handleSuccess(res){
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    selectImage(url) {
      this.selectedImage = url;
    },
    changePage(newpage) {
      this.reqParams.page = newpage;
      this.getImage();
    },
    changeCollect() {
      this.reqParams.page = 1;
      this.getImage();
    },
    openDialog() {
      this.dialogVisible = true;
      this.getImage();
      this.activeName = 'list';
      this.selectedImage = null;
      this.imageUrl = null
    },
    async getImage() {
      this.loading = true;
      const res = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.loading = false;
      this.images = res.data.data.results;
      console.log(this.images);
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.img-list {
  padding-top: 20px;
  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after {
      // .img-item 的后伪元素
      // &符号 less语法，连接符，连接 上一级选择和当前的选择器。
      // 此时不加&：.img-item ::after{}  解析后：后代选择器
      // 加上&符后：.img-item::after{}   解析后：交集选择器
      // .img-item.selected::after{} 满足这个选择器样式生效
      // 当你想选中效果：给.img-item加上selected类即可。
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center/ 50px auto;
    }
  }
}
.container-image {
  display: inline-block;
  margin-right: 20px;
}
.img_btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>