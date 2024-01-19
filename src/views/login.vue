<template>
  <div class="home">
    <div>
      <van-nav-bar :title="title" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />
    </div>
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />

        <van-row style="border-bottom:1px solid #ccc;">
          <van-col span="16">
            <van-field v-model="key" name="验证码" label="验证码" placeholder="输入验证码"
              :rules="[{ required: true, message: '请填写验证码' }]" />
          </van-col>
          <van-col span="8"><img :src="url" alt="" style="width: 200px;height: 50px;"></van-col>
        </van-row>
        <div style="font-size: 15px;color: skyblue;margin: 10px;" @click="qh">立即注册</div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginApi,zhuceApi } from '@/api/index'
export default {
  data() {
    return {
      username: '',
      password: '',
      url: '',
      key: '',
      title: '登录'
    };
  },
  methods: {
    getcode() {
      const code = Math.floor(Math.random() * 10);
      this.url =
        "https://slwl-api.itheima.net/manager/captcha" + `?key=${code}`;
    },
    onSubmit(values) {
      if (this.title == '登录') {
        loginApi({ loginName: this.username, passwordMd5: this.password }).then(res => {
          console.log(res);
        })
      } else {
        zhuceApi().then(res => {
          console.log(res);
        })
      }

    },
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() { },
    qh() {
      this.title = '注册'
    }
  },
  computed: {},
  created() {
    this.getcode()
  }
};
</script>

<style lang="scss" scoped></style>