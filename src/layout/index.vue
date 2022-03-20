<style scoped>
.app-main {
  width: 80%;
  margin: 0 auto;
}
.header {
  display: flex;
  width: 100%;
}
.el-menu {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.el-menu .name {
  display: inline-block;
}
.el-menu .nav-right {
  align-self: flex-end;
}
</style>
<template>
  <div class="app-main">
    <div class="header">
      <el-menu class="el-menu" mode="horizontal">
        <el-menu-item class="name" style="justify-self: flex-start">
          FLYYAHA
        </el-menu-item>
        <div style="flex: 1"></div>
        <el-menu-item v-for="menu in menuList" :key="menu.menu_id">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ menu.menu_name }}
              <i
                v-if="menu.children && menu.children.length > 0"
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>

            <el-dropdown-menu v-if="menu.children" slot="dropdown">
              <el-dropdown-item
                v-for="m in menu.children"
                :key="m.id"
                @click.native="redirect(m.menu_url)"
                >{{ m.menu_name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item>
          <el-dropdown>
            <span class="el-dropdown-link">
              个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="profile()"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item @click.native="signout()"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {
      menuList: [
        {
          menu_id: 1,
          menu_name: "书签",
          menu_url: "",
          children: [
            {
              menu_id: 8,
              menu_name: "书签列表",
              menu_url: "/bookmarks/list",
            },
            {
              menu_id: 9,
              menu_name: "添加书签",
              menu_url: "/bookmarks/add",
            },
          ],
        },

        {
          menu_id: 2,
          menu_name: "日报",
          menu_url: "",
          children: [
            {
              menu_id: 3,
              menu_name: "个人日报",
              menu_url: "/daily/personalview",
            },
            {
              menu_id: 4,
              menu_name: "团队日报",
              menu_url: "/daily/teamview",
            },
            {
              menu_id: 5,
              menu_name: "创建日报",
              menu_url: "/daily/create",
            },
          ],
        },
      ],
    };
  },
  methods: {
    redirect(url) {
      if (url != "" && this.$route.path != url) {
        this.$router.push({ path: url });
      }
    },
    profile() {
      this.$router.push({ name: "Profile" });
    },
    signout() {
      localStorage.clear();
      this.$message.success("退出登录成功");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>