<template>
  <div class='container-login'>
      <el-card class="my-card">
          <img src="../../assets/logo_index.png" alt="">
          <el-form ref="form" :model="form" :rules="Rules">
              <el-form-item prop="mobile">
                  <el-input v-model="form.mobile" placeholder="请输入手机号" ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="form.code" placeholder="请输入验证码" style="width:240px;margin-right:8px" ></el-input>
                  <el-button>发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>   
               <el-form-item>
                 <el-button @click="login()" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
      const checkmobile = (rule,value,callback) => {
          if(!/^1[3-9]\d{9}$/.test(value)){
              callback(new Error('手机号格式错误'))
          }else{
              callback()
          }
      }
      return {
          form:{
              mobile:'',
              code:'',

          },
          Rules:{
              mobile:[
                  {
                      required:true,message:'请输入手机号',trigger:'blur'
                  },
                  {
                      validator:checkmobile,trigger:'blur'
                  }
              ],
              code:[
                  {
                      required:true,message:'请输入验证码',trigger:'blur'
                  },
                  {
                      len:6,message:'验证码为6位数',trigger:'blur'
                  }
              ]
          }
      }
  },
  methods: {
      login(){
          //对整体表单进行验证
          //需要给整体的form元素添加ref属性，方便后续再vue中引用
          this.$refs.form.validate((valid)=>{
              //valid值为true时，验证成功
              if(valid){
                this.$http.post(
                    'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
                    this.form
                ).then(res=>{
                    this.$router.push('/')
                }).catch(()=>{
                    this.$message.error('手机号或验证码错误')
                })
              }
          })
      }
  },
}
</script>

<style lang="less">
    .container-login {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../../assets/login_bg.jpg) no-repeat;
        background-size: cover;
        .my-card {
            width: 400px;
            height: 350px;
            transform: translate(-50%,-60%);
            position: absolute;
            left: 50%;
            top: 50%;
            img {
                width: 200px;
                display: block;
                margin: 0 auto 20px;
            }
        }
    }

</style>