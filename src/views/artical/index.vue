<template>
  <div class="container-artical">artical</div>
</template>

<script>
export default {
    name:'app-artical',
    created () {
    // 发请求进行测试
    this.$http.get('articles')
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less">
</style>