<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝管理" name="list">
          <div class="fans-list">
            <div :key="item.id.toString()" v-for="item in fansList" class="fans-item">
              <el-avatar :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="picture">
            <div style="width:600px;height:400px" ref="dom"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "my-fans",
  data() {
    return {
      activeName: "list",
      reqParams: {
        page: 1,
        per_page: 24
      },
      fansList: [],
      total: 0
    };
  },
  created() {
    this.getFans();
  },
  mounted() {
    const myChart = echarts.init(this.$refs.dom)
    const option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    myChart.setOption(option)
  },
  methods: {
    changePage(newpage) {
      this.reqParams.page = newpage;
      this.getFans();
    },
    async getFans() {
      const res = await this.$http.get("followers", { params: this.reqParams });
      this.fansList = res.data.data.results;
      this.total = res.data.data.total_count;
    }
  }
};
</script>

<style scoped lang='less'>
.fans-item {
  padding-top: 10px;
  width: 100px;
  height: 140px;
  margin-right: 30px;
  margin-bottom: 10px;
  display: inline-block;
  border: 1px dashed #dddddd;
  text-align: center;
  p {
    padding: 0;
    font-size: 12px;
  }
}
</style>