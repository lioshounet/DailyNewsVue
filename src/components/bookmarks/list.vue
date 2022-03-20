<style lang="css">
.more-icon:hover {
  color: #2196fb;
}

.box-card {
  position: relative;

  margin-top: 25px;
  margin-left: 5px;
  background-color: rgb(253, 253, 253);
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.p-remark {
  font-size: 14px;
  color: #909399;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="8" v-for="book in bookmarks" :key="book.id">
          <el-card class="box-card">
            <span>{{ book.link_title }}</span>
            <div style="float: right; padding: 3px 0">
              <i
                v-if="book.is_audit == 1"
                @click="auditBookmake(book.id, audit.success)"
                class="el-icon-check"
              ></i>
              <i
                v-if="book.is_audit == 1"
                @click="auditBookmake(book.id, audit.close)"
                class="el-icon-close"
              ></i>
              <i class="el-icon-link" @click="openUrl(book.link)"></i>
            </div>
            <p class="p-remark">{{ book.link_overview }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row :gutter="20">
        <el-col :offset="9">
          <el-pagination
            layout="prev, pager, next, total"
            :current-page="pagination.offset"
            :page-size="pagination.limit"
            :total="pagination.total"
            @size-change="changeSize"
            @current-change="changePage"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      audit: {
        success: 1,
        close: 2,
      },
      bookmarks: [],
      pagination: {
        offset: 1,
        limit: 24,
        total: 0,
        isHide: true,
      },
      userInfo: {
        uid: 0,
      },
    };
  },
  methods: {
    auditBookmake(id, status) {
      console.log(id);
      var params = {
        id: id,
        status: status,
      };

      this.$api.auditBookmarksById(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }
        this.$message.success("审核成功");
        this.getAllBookmarks();
      });
    },

    changeSize(pageSize) {
      this.pagination.limit = pageSize;
      this.getAllBookmarks();
    },
    changePage(offset) {
      this.pagination.offset = offset;
      this.getAllBookmarks();
    },
    openUrl(url) {
      window.open(url, "_blank");
    },
    getAllBookmarks() {
      var params = {
        uid: this.userInfo.uid,
        offset: (this.pagination.offset - 1) * this.pagination.limit,
        page_size: this.pagination.limit,
      };

      this.$api.getAllBookmarks(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }

        this.bookmarks = res.data.list;
        this.pagination.total = res.data.total;
        this.pagination.isHide = this.total > 1 ? false : true;
      });
    },
  },

  created() {
    this.userInfo.uid = parseInt(
      localStorage.getItem(process.env.NODE_ENV + "_uid")
    );
    this.getAllBookmarks();
  },
};
</script>