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
</style>
<template>
  <div class="create">
    <quill-editor
      ref="myQuillEditor"
      v-model="contentText"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
    <div class="button-group">
      <el-button type="primary" style="width: 100px" @click="editContentById"
        >编辑日报</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentId: 0,
      uid: 0,
      contentTag: 1,
      contentText: "",
      editorOption: {
        height: 400,
      },
    };
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      quill.root.innerHTML = this.contentText;
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },

    editContentById() {
      var params = {
        id: this.contentId,
        uid: this.uid,
        content_tag: this.contentTag,
        content_text: this.contentText,
      };

      this.$api.editContentById(params).then((res) => {
        if (res.code == 0) {
          this.$message.success("提交成功");
          this.$router.push({ name: "PersonalView" });
        } else {
          this.$message.error(res.message);
        }
      });
    },

    getContentById(contentId) {
      this.$api.getDaily({ id: contentId }).then((res) => {
        if (res.code == 0) {
          this.modalVisible = true;
          this.contentText = res.data.content_text;

          this.uid = res.data.uid;
          this.contentId = res.data.id;
          this.contentTag = res.data.content_tag;
          this.contentText = res.data.content_text;
        }
      });
    },
  },
  created() {
    this.getContentById(this.$route.params.contentId);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>