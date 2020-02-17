<template>
  <el-select @change="changeChannel" :value="value" placeholder="请选择" clearable>
    <el-option v-for="item in channel_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
    props: ['value'],
  name: "my-channel",
  data() {
    return {
        channel_options:[]
    };
  },
  created() {
    this.getChannels();
  },
  methods: {
    changeChannel(value) {
      if (value === "") value = null
      this.$emit('input',value)
    },
    async getChannels() {
      const res = await this.$http.get("channels");
      this.channel_options = res.data.data.channels;
    }
  }
};
</script>

<style scoped lang='less'></style>