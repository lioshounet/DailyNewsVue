<style scoped>
.p-remark {
  font-size: 12px;
}

.p-title {
  font-size: 16px;
}

.p-text {
  font-size: 12px;
}

.p-success {
  color: #67c23a;
  top: 10px;
  font-size: 12px;
}
</style>

<template>
  <el-row>
    <el-col :span="18">
      <div class="grid-content bg-purple">
        <el-calendar v-model="nowTimespace">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div @click="getListByDate(date)">
              <p class="p-title">
                {{ data.day.split("-").slice(1).join("-") }}
              </p>
              <div
                v-for="userDate in userDateList"
                :key="userDate.content_date"
              >
                <p
                  class="p-success"
                  v-if="userDate.content_date == getYMDdate(date)"
                >
                  完成：{{ userDate.people_num }} 人
                </p>
              </div>
            </div>
          </template>
        </el-calendar>
      </div></el-col
    >
    <el-container style="height: 630px; border: 1px solid #eee">
      <el-header>
      </el-header>
      <el-main>
        <el-col v-for="content in contentList" :key="content.id">
          <div
            class="grid-content bg-purple-light"
            @click="getContentById(content.id)"
          >
            <el-card class="box-card card">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="block">
                      <el-avatar :size="40" :src="content.avatar"></el-avatar>
                    </div>
                  </div>
                </el-col>
                <el-col :span="10"
                  ><div class="grid-content bg-purple-light">
                    <p class="p-remark">{{ content.user_name }}</p>
                    <p class="p-remark">
                      {{ historicalTime(content.m_time) }} 修改
                    </p>
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content bg-purple">
                    <el-tag size="mini"> {{ content.identity_text }} </el-tag>
                  </div></el-col
                >

                <el-col :span="2"
                  ><div class="grid-content bg-purple bottom-info">
                    <i
                      v-if="loginUid == content.uid"
                      class="el-icon-edit more-icon"
                      @click="editContent(content.id)"
                    ></i>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="isVisible">
      <div class="ql-editor" v-html="detailList.content_text"></div>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      nowTimespace: 0,
      loginUid: 0,
      isVisible: false,
      userDateList: [],
      contentList: [],
      detailList: [],
    };
  },
  methods: {
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
    historicalTime(dateTimeStamp) {
      if (dateTimeStamp > 0) {
        var result;
        dateTimeStamp = parseInt(dateTimeStamp) * 1000;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
          return;
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
          if (monthC <= 12) {
            result = "" + parseInt(monthC) + "月前";
          } else {
            result = "" + parseInt(monthC / 12) + "年前";
          }
        } else if (weekC >= 1) {
          result = "" + parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
          result = "" + parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
          result = "" + parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
          result = "" + parseInt(minC) + "分钟前";
        } else {
          result = "刚刚";
        }
        return result;
      } else {
        return "害~时间走丢了";
      }
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

    // 获取每天写日报的人数
    getUserDateCnt() {
      var params = {
        uid: this.loginUid,
      };

      this.$api.getUserDateCnt(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }
        this.userDateList = res.data.list;
      });
    },

    getListByDate(date) {
      var params = {
        date: parseInt(this.getYMDdate(date)),
        uid: this.loginUid
      };

      this.$api.getDailyListByDate(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }
        this.contentList = res.data.list;
      });
    },

    getContentById(contentId) {
      this.$api.getDaily({ id: contentId }).then((res) => {
        if (res.code == 0) {
          this.isVisible = true;
          this.detailList = res.data;
        }
      });
    },
  },

  created() {
    this.nowTimespace = new Date();
    this.loginUid = parseInt(
      localStorage.getItem(process.env.NODE_ENV + "_uid")
    );

    this.getUserDateCnt();
    this.getListByDate(this.nowTimespace);
  },
};
</script>