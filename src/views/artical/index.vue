<template>
  <div class="container-artical">
    <el-card>
      <div slot="header">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态 ：">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 ：">
          <el-select v-model="filterData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channel_options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期 ：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <el-table :data="articals" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">标签三</el-tag>
            <el-tag v-if="scope.row.status===1">标签一</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">标签二</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">标签四</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">标签五</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <el-button plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
//局部插入的MyBread，由于已经全局插入，所以删除
// import MyBread from '@/components/my-bread'
export default {
  name: "app-artical",
  // components:{
  //   MyBread
  // },
  data() {
    return {
      // 声明筛选条件数据，筛选条件数据提交给后台，数据的字段名称，由后台接口决定。
      // 筛选数据是由多个表单元素组成，需要收集所有数据，应该使用对象来进行绑定
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channel_options: [],
      // dataArr:{},
      // 日期范围数据 [起始日期,结束日期]
      // 但是选择完成日期范围后，可以根据这个数据给 begin_pubdate end_pubdate 赋值。
      dataArr: [],
      articals: []
    };
  },
  created() {
    this.getChannels();
    this.getArticals();
  },
  methods: {
    async getChannels() {
      const res = await this.$http.get("channels");
      this.channel_options = res.data.data.channels;
    },
    async getArticals() {
      const res = await this.$http.get("articles", { params: this.filterData });
      this.articals = res.data.data.results;
    }
  }
};
</script>

<style lang="less">
</style>