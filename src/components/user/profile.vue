<style lang="css">
.el-form-item {
  position: relative;
  top: 100px;
  left: 400px;
}
h4 {
  position: relative;
  top: 80px;
  left: 550px;
}
/*.el-button {
  position: relative;
  left: 400px;
  top: 100px;
}*/
.sure {
  position: relative;
  left: 530px;
  top: 103px;
}
</style>
<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <div style="margin: 20px"></div>
        <h4>个人信息</h4>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="userInfo"
      >
          <el-form-item label="用户名:">
            <el-input v-model="userInfo.user_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱:">
            <el-input v-model="userInfo.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone"
           >
            <el-input v-model.number="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="身份信息：">
            <el-select v-model="userInfo.identity" placeholder="身份信息">
              <el-option
                v-for="item in identityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div class="sure">
            <el-button slot="reference" @click="editUserByUid">提交</el-button>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      userInfo: {
        user_name: "",
        phone: "",
        email: "",
        identity: 0,
      },
      identityList: [
        {
          value: 1,
          label: "RD",
        },
        {
          value: 2,
          label: "FE",
        },
        {
          value: 3,
          label: "UI",
        },
        {
          value: 4,
          label: "UE",
        },
        {
          value: 0,
          label: "Other",
        },
      ],
      value: 0,
    };
  },
  methods: {
    getUserInfoByUid() {
      var params = {
        uid: parseInt(localStorage.getItem(process.env.NODE_ENV + "_uid")),
      };

      this.$api.getUserInfoByUid(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }

        this.userInfo.user_name = res.data.user_name;
        this.userInfo.phone = res.data.phone;
        this.userInfo.email = res.data.email;
        this.userInfo.identity = res.data.identity;
        this.identityList.value = res.data.identity;
      });
    },
    editUserByUid() {
      var params = {
        uid: parseInt(localStorage.getItem(process.env.NODE_ENV + "_uid")),
        phone: this.userInfo.phone,
        identity: this.userInfo.identity,
      };
 if (params.phone == "") {
        this.$message.error("手机号不能为空");
        return;
      }

      if (params.identity < 1) {
        this.$message.error("身份信息不能为空");
        return;
      }

      this.$api.editUserByUid(params).then((res) => {
        if (res.code != 0) {
          this.$message.error(res.message);
          return;
        }

        this.$message.success("修改成功");
      });
    },
  },
  created() {
    this.getUserInfoByUid();
  },
};
</script>

