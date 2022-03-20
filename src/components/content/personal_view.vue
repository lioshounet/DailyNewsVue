<style scoped>
.p-remark {
  font-size: 12px;
}

.p-title {
  font-size: 16px;
}

.p-text {
  font-size: 1px;
}

.p-success {
  color: #67c23a;
  top: 10px;
  font-size: 12px;
}

.top {
  margin-top: 20px;
}

.card {
  height: 600px;
}

.card-content {
  height: 480px;
  overflow: auto;
}
</style>

<template>
  <el-container>
    <el-header>
      <el-row class="top">
        <el-col :offset="22">
          <el-button type="primary" size="medium" @click="authDaily()"
            >日报授权</el-button
          >
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="8" v-for="content in contentList" :key="content.date">
          <el-card class="card">
            <div slot="header" class="clearfix">
              <p class="p-title">
                {{ historicalTime(content.content_date) }}
                <i
                  v-if="!content.isEdit"
                  style="float: right; padding: 3px 0"
                  class="el-icon-edit"
                  @click="editContent(content.id)"
                ></i>
              </p>
            </div>
            <div class="card-content">
              <p class="text" v-if="content.isEdit">
                今日没有日报，点击创建日报
                <el-button type="primary" size="mini">
                  <i class="el-icon-edit-outline" @click="createDaily()"></i>
                </el-button>
              </p>
              <p
                class="ql-editor"
                v-if="!content.isEdit"
                v-html="content.content_text"
              ></p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      nowTimespace: 0,
      loginUid: 0,
      isVisible: false,
      contentList: [],
    };
  },
  methods: {
    createDaily() {
      this.$router.push({ name: "Create" });
    },
    // 授权日报
    authDaily() {
      this.$prompt("请输入姓名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\w?/,
        inputErrorMessage: "姓名格式不正确",
      })
        .then(({ value }) => {
          var params = {
            uid: this.loginUid,
            auth_user_name: value,
          };

          this.$api.authuDaily(params).then((res) => {
            if (res.code != 0 || res.data.succ_cnt < 1) {
              this.$message({
                type: "error",
                message: "日报授权失败" + res.message,
              });
              return;
            }

            this.$message({
              type: "success",
              message: "你将已将日报授权给: " + value,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消授权",
          });
        });
    },

    // 编辑日报
    editContent(contentId) {
      this.$router.push({
        name: "Edit",
        params: {
          contentId: contentId,
        },
      });
    },

    // 历史距离时间（刚刚，几分钟前）
    historicalTime(date) {
      if (date < 1) {
        return "害！时间走丢了";
      }

      date = date.toString();
      var nowDate = this.getYMDdate(this.nowTimespace);

      var nowDateY = nowDate.substr(0, 4);
      var dateY = date.substr(0, 4);
      var nowDateM = nowDate.substr(4, 2);
      var dateM = date.substr(4, 2);
      var nowDateD = nowDate.substr(6, 2);
      var dateD = date.substr(6, 2);

      if (nowDateY - dateY > 0) {
        return nowDateY - dateY + "年前";
      }

      if (nowDateM - dateM > 0) {
        return nowDateM - dateM + "月前";
      }

      if (nowDateD - dateD > 0) {
        return nowDateD - dateD + "天前";
      }

      return "今天";
    },

    // 获取20210810格式时间
    getYMDdate(date) {
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return y + "" + m + "" + d;
    },

    // 根据当前登录用户获取日报数据
    getContentByUid() {
      var params = {
        uid: this.loginUid,
        offset: 0,
        page_size: 3,
      };

      var nowDate = parseInt(this.getYMDdate(this.nowTimespace));

      this.$api.getDailyListByUid(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }

        if (res.data.length < 1){
           this.contentList.push({ content_date: nowDate, isEdit: true });
        }

        var isNowDateFlag = true;
        res.data.list.forEach((element) => {
          if (element.content_date == nowDate) {
            isNowDateFlag = false;
          }
        });

        res.data.list.forEach((element) => {
          if (element.content_date != nowDate && isNowDateFlag) {
            this.contentList.push({ content_date: nowDate, isEdit: true });
            isNowDateFlag = false;
          }

          if (this.contentList.length < 3) {
            this.contentList.push(element);
          }
        });
      });
    },
  },

  created() {
    this.nowTimespace = new Date();
    this.loginUid = parseInt(
      localStorage.getItem(process.env.NODE_ENV + "_uid")
    );

    this.getContentByUid();
  },
};
</script>