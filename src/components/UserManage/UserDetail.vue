<template>
    <div>
        <div v-if='type===1||type==3'>
            <div>
                <span>账户</span>
                <input type="text" v-model="account" placeholder="请输入姓名">
            </div>
            <div>
                <span>姓名</span>
                <input type="text" v-model="nickName" placeholder="请输入姓名">
            </div>
            <div>
                <span>手机号码</span>
                <input type="text" v-model="mobile" placeholder="请输入手机号码">
            </div>
            <!--<div>
                <span>微信/QQ</span>
                <input type="text" placeholder="请输入微信/QQ">
            </div>-->
            <div>
                <span>性别</span>
                <input type="checkbox">
                <span>男</span>
                <input type="checkbox">
                <span>女</span>
            </div>
            <div>
                <span>代理人</span>
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
            <div><button @click="saveUser">保存</button></div>
        </div>
        <div v-if='type===2'>
            <div>
                <span>账户</span>
                <span>{{account}}</span>
            </div>
            <div>
                <span>姓名</span>
                <span>{{nickName}}</span>
            </div>
            <div>
                <span>手机号码</span>
                <span>{{mobile}}</span>
            </div>
            <div>
                <span>性别</span>
                <span>{{sex}}</span>
            </div>
            <div>
                <span>代理人</span>
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
