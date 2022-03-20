
<style>
.container_top {
  margin-top: 50px;
}
</style>

<template>
  <el-container class="container_top">
    <el-header>
      <h2>添加书签</h2>
    </el-header>
    <el-main>
      <el-form
        :model="bookmarks"
        :rules="rules"
        ref="bookmarks"
        label-width="100px"
      >
        <div style="width: 1000px; height: 1160px">
          <el-form-item label="书签名:" prop="linkTitle">
            <el-input v-model.trim="bookmarks.linkTitle"></el-input>
          </el-form-item>
          <el-form-item label="书签url：" prop="link">
            <el-input v-model.trim="bookmarks.link"></el-input>
          </el-form-item>
          <el-form-item label="书签介绍:" prop="linkOverview">
            <el-input
              type="textarea"
              v-model.trim="bookmarks.linkOverview"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createBookmarks">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      bookmarks: {
        link: "",
        linkTitle: "",
        linkOverview: "",
      },

      userInfo: {
        uid: 0,
      },

      rules: {
        linkTitle: [
          { required: true, message: "必填" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        linkOverview: [{ required: true, message: "必填" }],
        link: [
          { required: true, message: "必填" },
          {
            validator: function (rule, value, callback) {
              if (
                /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/.test(
                  value
                ) == false
              ) {
                return callback(new Error("请输入正确的Url"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    createBookmarks() {
      if (!this.$util.validateURL(this.bookmarks.link)) {
        this.$message.error("url有问题");
        return;
      }

      var params = {
        uid: this.userInfo.uid,
        url: this.bookmarks.link,
        title: this.bookmarks.linkTitle,
        overview: this.bookmarks.linkOverview,
      };

      this.$api.createBoolmarks(params).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$message.success("提交成功");
          this.$router.push({ path: "/bookmarks/list" });
        } else {
          this.$message.error("创建失败，其他项未填" + res.message);
        }
      });
    },
  },
  created() {
    this.userInfo.uid = parseInt(
      localStorage.getItem(process.env.NODE_ENV + "_uid")
    );
  },
};
</script>
