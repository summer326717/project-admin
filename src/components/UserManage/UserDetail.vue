<template>
    <div class="manage-detail">
        <div v-if='type===1||type==3'>
            <div class="item">
                <span class="left-span">账户</span>
                <input class="ipt-normal" type="text" v-model="account" placeholder="请输入姓名">
            </div>
            <div class="item">
                <span class="left-span">姓名</span>
                <input class="ipt-normal" type="text" v-model="nickName" placeholder="请输入姓名">
            </div>
            <div class="item">
                <span class="left-span">手机号码</span>
                <input class="ipt-normal" type="text" v-model="mobile" placeholder="请输入手机号码">
            </div>
            <div>
                <span class="left-span">微信/QQ</span>
                <input class="ipt-normal" type="text" placeholder="请输入微信/QQ" disabled>
            </div>
            <div class="item">
                <span class="left-span">性别</span>
                <input type="checkbox">
                <span>男</span>
                <input type="checkbox">
                <span>女</span>
            </div>
            <div class="item">
                <span class="left-span">代理人</span>
                <select>
                    <option>选择代理人</option>
                </select>
            </div>
            <!--<div>
                <span>地区</span>
                <select>
                    <option>选择省份</option>
                </select>
                <select>
                    <option>选择城市</option>
                </select>
            </div>-->
            <div><button class="save-btn" @click="saveUser">保存</button></div>
        </div>
        <div v-if='type===2'>
            <div class="item">
                <span class="left-span">账户</span>
                <span>{{account}}</span>
            </div>
            <div class="item">
                <span class="left-span">姓名</span>
                <span>{{nickName}}</span>
            </div>
            <div class="item">
                <span class="left-span">手机号码</span>
                <span>{{mobile}}</span>
            </div>
            <div class="item">
                <span class="left-span">性别</span>
                <span>{{sex}}</span>
            </div>
            <div class="item">
                <span class="left-span">代理人</span>
                <span>{{agentId}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      nickName: '',
      mobile: '',
      sex: 0,
      agentId: '5000019'
    }
  },
  created () {
    this.type = this.$route.query.type
    this.userBaseId = this.$route.query.userBaseId
    if (this.type === 2 || this.type === 3) {
      this.ViewUserInfo()
    }
  },
  methods: {
    addUser () {
      if (this.account === '' || this.account === null || this.account === undefined) {
        return
      }
      if (this.nickName === '' || this.nickName === null || this.nickName === undefined) {
        return
      }
      if (this.mobile === '' || this.mobile === null || this.mobile === undefined) {
        return
      }
      if (this.agentId === '' || this.agentId === null || this.agentId === undefined) {
        return
      }
      let json = {
        account: this.account,
        nickName: this.nickName,
        mobile: this.mobile,
        sex: this.sex,
        agentId: this.agentId
      }
      this.$axiosPost('/back/saveUserInfo', json).then((res) => {
        if (res.code === 0) {
          alert('添加成功')
        } else {
          alert(res.message)
        }
      })
    },
    ViewUserInfo (userBaseId) {
      let json = {
        userId: this.userBaseId
      }
      this.$axiosPost('/back/queryUserInfoDetail', json).then((res) => {
        if (res.code === 0) {
          this.userObj = res.data
          this.account = res.data.account
          this.nickName = res.data.nickName
          this.mobile = res.data.mobile
          this.sex = res.data.sex
          this.agentId = res.data.agentId
        } else {
          alert(res.message)
        }
      })
    },
    EditUserInfo () {
      if (this.account === '' || this.account === null || this.account === undefined) {
        return
      }
      if (this.nickName === '' || this.nickName === null || this.nickName === undefined) {
        return
      }
      if (this.mobile === '' || this.mobile === null || this.mobile === undefined) {
        return
      }
      if (this.agentId === '' || this.agentId === null || this.agentId === undefined) {
        return
      }
      let json = {
        account: this.account,
        nickName: this.nickName,
        mobile: this.mobile,
        sex: this.sex,
        agentId: this.agentId,
        userBaseId: this.userBaseId
      }
      this.$axiosPost('/back/updateUserInfo', json).then((res) => {
        if (res.code) {
          alert(res.message)
        } else {
          alert(res.message)
        }
      })
    },
    saveUser () {
      if (this.type === 1) {
        this.addUser()
      }
      if (this.type === 3) {
        this.EditUserInfo()
      }
    }
  }
}
</script>
