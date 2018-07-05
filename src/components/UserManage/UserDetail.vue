<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>代理人管理 > 添加用户</span><button class="btn-gray" @click="back()">返回</button></p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="detail-content" v-if='type===1||type==3'>
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
                <div class="item">
                    <span class="left-span">性别</span>
                    <el-radio v-model="sex" label="1">男</el-radio>
                    <el-radio v-model="sex" label="2">女</el-radio>
                </div>
                <div class="item">
                    <span class="left-span">代理人</span>
                    <span class="drop-menu">
                        <el-dropdown trigger="click" @command="changeAgent">
                            <span class="el-dropdown-link">
                                请选择代理人<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,i) in agentList" :key="i" :command="item.agentId">{{item.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
                <div class="item">
                    <span class="left-span">&nbsp;</span>
                    <button class="save-btn" @click="saveUser">保存</button>
                </div>
            </div>
            <div class="detail-view" v-if='type===2'>
                <div class="item">
                    <span class="left-span">用户ID</span>
                    <span>{{userObj.userBaseId}}</span>
                </div>
                <div class="item">
                    <span class="left-span">账户</span>
                    <span>{{userObj.account}}</span>
                </div>
                <div class="item">
                    <span class="left-span">姓名</span>
                    <span>{{userObj.nickName}}<i v-if='userObj.sex==2' class="female"></i><i v-if='userObj.sex==1' class="female"></i></span>
                </div>
                <div class="item">
                    <span class="left-span">手机号码</span>
                    <span>{{userObj.mobile}}</span>
                </div>
                <div class="item">
                    <span class="left-span">微信/QQ</span>
                    <span>--</span>
                </div>
                <div class="item">
                    <span class="left-span">代理人</span>
                    <span>{{userObj.agentId}}--</span>
                </div>
                <div class="item">
                    <span class="left-span">地区</span>
                    <span>--</span>
                </div>
                <div class="item">
                    <span class="left-span">注册时间</span>
                    <span>{{userObj.createTime}}</span>
                </div>
                <div class="item">
                    <span class="left-span">上次登录时间</span>
                    <span>{{userObj.lastLoginTime}}</span>
                </div>
                <div class="info-title">
                    <span>账户信息</span>
                </div>
                <div class="ul">
                    <ul>
                        <li>
                            <p>{{(userObj.balance/100).toFixed(2)}}</p>
                            <p>账户余额</p>
                        </li>
                        <li>
                            <p>{{(userObj.totalEarnMoney/100).toFixed(2)}}</p>
                            <p>已赚取</p>
                        </li>
                        <li>
                            <p>{{(userObj.yesterdayEarn/100).toFixed(2)}}</p>
                            <p>昨日收益</p>
                        </li>
                        <li>
                            <p>{{(userObj.todayEarnGold/100).toFixed(2)}}</p>
                            <p>今日金币</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let utils = require('../../utils/common')
export default {
  data () {
    return {
      userObj: '',
      account: '',
      nickName: '',
      mobile: '',
      sex: '1',
      agentId: '',
      userId: '',
      agentList: []
    }
  },
  created () {
    this.type = this.$route.query.type
    this.userBaseId = this.$route.query.userBaseId
    let agentList = sessionStorage.getItem('agentList')
    this.agentList = JSON.parse(agentList)
    if (this.type === 2 || this.type === 3) {
      this.ViewUserInfo()
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    checkUser () {
      if (!utils.checkNull(this.account)) {
        alert('账号不能为空')
        return false
      }
      if (!utils.checkNull(this.nickName)) {
        alert('姓名不能为空')
        return false
      }
      if (!utils.checkNull(this.mobile)) {
        alert('手机号码不能为空')
        return false
      }
      if (!utils.checkNull(this.agentId)) {
        alert('请选择代理人')
        return false
      }
      return true
    },
    addUser () {
      if (!this.checkUser()) {
        alert('请填写完整信息')
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
          this.sex = res.data.sex.toString()
          this.agentId = res.data.agentId
          this.yesterdayEarn = res.data.yesterdayEarn
          this.todayEarnGold = res.data.totalEarnMoney
          this.totalEarnMoney = res.data.totalEarnMoney
          this.balance = res.data.balance
        } else {
          alert(res.message)
        }
      })
    },
    EditUserInfo () {
      if (!this.checkUser()) {
        alert('请填写完整信息')
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
        if (res.code === 0) {
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
    },
    changeAgent (e) {
      this.agentId = e
    }
  }
}
</script>
