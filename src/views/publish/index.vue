<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articalForm.title" style="width:400px" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articalForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="articalForm.cover.images=[]" v-model="articalForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articalForm.cover.type === 1">
            <my-image v-model="articalForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articalForm.cover.type === 3">
            <my-image :key="i" v-for="i in 3" v-model="articalForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articalForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button @click="updata()" type="success">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="submit(false)" type="primary">发布文章</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "Publish",
  components: {
    quillEditor
  },
  data() {
    return {
      articalForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"]
          ]
        }
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.getArticle();
    }
  },
  watch: {
    "$route.query.id": function() {
      this.toggleFormInfo();
    }
  },
  methods: {
    async updata() {
      try {
        await this.$http.put(
          `articles/${this.articalForm.id}?draft=false`,
          this.articalForm
        );
        this.$message.success("修改文章成功");
        this.$router.push("/artical");
      } catch (e) {
        this.$message.error("修改文章失败");
      }
    },
    async getArticle() {
      const res = await this.$http.get(`articles/${this.$route.query.id}`);
      this.articalForm = res.data.data;
    },
    toggleFormInfo() {
      if (this.$route.query.id) {
        this.getArticle();
      } else {
        this.articalForm = {
          title: null,
          channel_id: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        };
      }
    },
    // 添加文章 draft===false 发布文章  draft===true  存入草稿
    async submit(draft) {
      try {
        // 请求
        await this.$http.post(`articles?draft=${draft}`, this.articalForm);
        // 提示
        this.$message.success(draft ? "存入草稿成功" : "发布文章成功");
        // 跳转
        this.$router.push("/artical");
      } catch (e) {
        this.$message.error("操作失败");
      }
    }
  }
};
</script>

<style scoped lang='less'></style>