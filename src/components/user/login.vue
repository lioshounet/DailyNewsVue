<template>
  <div id="bg" class="bg">
    <div class="login" @keyup.13="doLogin">
      <div class="form-horizontal login">
        <div class="logo">Flyaha</div>
        <div class="form-group input-group input-group-lg">
          <span class="input-group-addon"
            ><i class="fa fa-user-o" aria-hidden="true"></i
          ></span>
          <el-input
            placeholder="请输入内容"
            v-model="userInfo.user_name"
            clearable
          >
          </el-input>
        </div>
        <div class="form-group input-group input-group-lg">
          <span class="input-group-addon"
            ><i class="fa fa-key" aria-hidden="true"></i
          ></span>
          <el-input
            placeholder="请输入密码"
            v-model="userInfo.pass_word"
            show-password
          ></el-input>
        </div>
        <div class="form-group">
          <el-button class="form-control" @click="doLogin" plain
            >登 录</el-button
          >
          <!--<button class="btn btn-default btn-sm form-control login-btn" @click="doLogin">登 录</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      userInfo: {
        user_name: "",
        pass_word: "",
      },
      show: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go("-1");
    },
    login() {},

    doLogin() {
      if (this.userInfo.user_name == "") {
        this.$message.error("用户名不能为空");
        return false;
      }
      if (this.userInfo.pass_word == "") {
        this.$message.error("密码名不能为空");
        return false;
      }
      this.$api
        .login(this.userInfo)
        .then((res) => {
          if (res.code != 0) {
            this.$notify({
              title: "提示信息",
              message: res.data.message,
              type: "error",
            });
            return;
          }

          var user = res.data;
          localStorage.setItem(process.env.NODE_ENV + "_token", user.token);
          localStorage.setItem(process.env.NODE_ENV + "_uid", user.uid);
          localStorage.setItem(process.env.NODE_ENV + "_user_name", user.user_name);
          localStorage.setItem(process.env.NODE_ENV + "_email", user.email);

          this.$notify({
            title: "提示信息",
            message: "登录成功",
            type: "success",
          });
          this.$router.push({ name: "PersonalView" });
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    var wi = window.screen.width;
    var hi = window.screen.height;
    document.getElementById("bg").style.width = wi + "px";
    document.getElementById("bg").style.height = hi + "px";
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.bg {*/
/*!*background-color: aqua;*!*/
/*background-image: url("../assets/bj.jpg");*/
/*background-size:100% 100%*/
/*}*/
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 400px;
}
.login-btn {
  background-color: whitesmoke;
}
.logo {
  font-family: "DejaVu Sans Mono";
  color: lightblue;
  font-size: 50px;
}
</style>