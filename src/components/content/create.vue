<style lang="css">
.create {
  padding-top: 20px;
}
.ql-editor {
  height: 400px;
}
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.p-remark {
  margin-left: 20px;
  font-size: 14px;
}
.collapse {
  margin-left: 50px;
}
</style>
<template>
  <el-container>
    <el-header>
      <div class="block create">
        <el-date-picker
          v-model="content.date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="16">
          <quill-editor
            ref="myQuillEditor"
            v-model="content.contentText"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          />
          <div class="button-group">
            <el-button type="primary" plain style="width: 100px"
              >草稿</el-button
            >
            <el-button
              type="primary"
              style="width: 100px"
              @click="createContentByDate"
              >提交</el-button
            >
          </div>
        </el-col>
        <el-col :span="8">
          <div class="collapse">
            <el-collapse
              accordion
              v-for="history in historyContentList"
              :key="history.content_date"
            >
              <el-collapse-item>
                <template slot="title">
                  <p class="p-remark">{{ history.content_date }}</p>
                </template>
                <div class="ql-editor" v-html="history.content_text"></div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>

      <el-dialog :visible.sync="isDateReminder" width="500px">
        <div class="block create">
          <p>
            你确定是填写
            {{
              getYMDdate(this.content.date)
            }}
            的日报么？如果不是请选择日期，如果是请直接关闭对话框
          </p>
          <el-date-picker
            v-model="content.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            style="top: 10px"
            close-on-press-escape="true"
          >
          </el-date-picker>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isDateReminder: false,
      content: {
        date: 0,
        contentText: "",
        contentTag: 1,
        uid: parseInt(localStorage.getItem(process.env.NODE_ENV + "_uid")),
      },
      historyContentList: [],
      editorOption: {
        height: 400,
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    isDate() {
      if (this.content.date.getHours() - 12 < 0) {
        this.isDateReminder = true;
      }
    },

    getYMDdate(date) {
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return y + "" + m + "" + d;
    },

    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      var html =
        '<h2>今日完成</h2><ol><li><strong>工作方面：</strong></li><li class="ql-indent-1">...</li><li><strong>个人方面：</strong></li><li class="ql-indent-1">...</li></ol><h2>明日计划</h2><ol><li><strong>工作方面</strong></li><li class="ql-indent-1">...</li><li><strong>个人方面</strong></li><li class="ql-indent-1">...</li></ol><h2>TODOList</h2><ol><li>...</li></ol>';
      quill.root.innerHTML = html;
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    createContentByDate() {
      var params = {
        content_date: this.getYMDdate(this.content.date),
        content_tag: this.content.contentTag,
        content_text: this.content.contentText,
        uid: this.content.uid,
      };

      this.$api.createDaily(params).then((res) => {
        console.log(res);
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("提交成功");
        this.$router.push({ name: "PersonalView" });
      });
    },
    getContentByUid() {
      var params = {
        uid: this.content.uid,
        offset: 0,
        page_size: 7,
      };

      this.$api.getDailyListByUid(params).then((res) => {
        console.log(res);
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }
        this.historyContentList = res.data.list;
      });
    },
  },
  created() {
    this.content.date = new Date();
    this.isDate();
    this.getContentByUid();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>