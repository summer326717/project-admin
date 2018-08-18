<template>
    <div class="manage-content">
        <div class="m-header">
            <p>
              <span v-if='type==1'>代理人管理 > 添加用户</span>
              <span v-if='type==2'>代理人管理 > 查看用户</span>
              <span v-if='type==3'>代理人管理 > 修改用户</span>
              <button class="btn-gray" @click="back()">返回</button>
            </p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="detail-content" v-if='type===1||type==3'>
                <div class="item">
                    <span class="left-span">*账户</span>
                    <input v-if="type==1" class="ipt-normal" type="text" v-model="account" placeholder="请输入账户">
                    <input v-if="type==3" class="ipt-normal" type="text" v-model="account" placeholder="请输入账户" disabled>
                </div>
                <div class="item">
                    <span class="left-span">*姓名</span>
                    <input class="ipt-normal" type="text" v-model="nickName" placeholder="请输入姓名">
                </div>
                <div class="item">
                    <span class="left-span">*手机号码</span>
                    <input class="ipt-normal" type="text" v-model="mobile" placeholder="请输入手机号码">
                </div>
                <div class="item">
                    <span class="left-span">性别</span>
                    <el-radio v-model="sex" label="1">男</el-radio>
                    <el-radio v-model="sex" label="2">女</el-radio>
                </div>
                <div class="item">
                    <span class="left-span">*代理人</span>
                    <span>
                        <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="agentName"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入填写代理人"
                            @select="changeAgent">
                        <i
                            class="el-icon-edit el-input__icon"
                            slot="suffix">
                        </i>
                        <template slot-scope="{item}">
                            <span class="addr">{{item.name}}&nbsp;{{item.value}}</span>
                        </template>
                        </el-autocomplete>
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
                    <span>{{userObj.nickName}}<i v-if='userObj.sex==2' class="female"></i><i v-if='userObj.sex==1' class="male"></i></span>
                </div>
                <div class="item">
                    <span class="left-span">手机号码</span>
                    <span>{{userObj.mobile}}</span>
                </div>
                <div class="item">
                    <span class="left-span">代理人</span>
                    <span>{{userObj.agentId}} {{userObj.agentName}}</span>
                </div>
                <div class="item">
                    <span class="left-span">注册时间</span>
                    <span>{{$changeTime(userObj.createTime)}}</span>
                </div>
                <div class="item">
                    <span class="left-span">上次登录时间</span>
                    <span>{{$changeTime(userObj.lastLoginTime)}}</span>
                </div>
                <div class="info-title">
                    <span>账户信息</span>
                </div>
                <div class="ul">
                    <ul>
                        <li>
                            <p>{{$NP.div100(userObj.balance)}}</p>
                            <p>账户余额</p>
                        </li>
                        <li>
                            <p>{{$NP.div100(userObj.totalEarnMoney)}}</p>
                            <p>已赚取</p>
                        </li>
                        <li>
                            <p>{{$NP.div100(userObj.yesterdayEarn)}}</p>
                            <p>昨日收益</p>
                        </li>
                        <li>
                            <p>{{userObj.todayEarnGold}}</p>
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
      type: 1, // 1.添加2.查看3.修改
      agentName: '',
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
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    querySearch (queryString, cb) {
      var restaurants = this.agentList
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    back () {
      this.$router.back(-1)
    },
    checkUser () {
      if (!utils.checkNull(this.account)) {
        this.$message('账号不能为空')
        return false
      }
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(this.account)) {
        this.$message('账号必须为大于4个字符，小于16个字符的数字和字母')
        return
      }
      if (!utils.checkNull(this.nickName)) {
        this.$message('姓名不能为空')
        return false
      }
      if (this.nickName.length < 2) {
        this.$message('姓名不能小于两个字')
        return false
      }
      if (this.nickName.length > 50) {
        this.$message('姓名不能大于50个字')
        return false
      }
      if (!utils.checkNull(this.mobile)) {
        this.$message('手机号码不能为空')
        return false
      }
      if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile)) {
        this.$message('请输入正确手机号')
        return false
      }
      if (!utils.checkNull(this.agentId)) {
        this.$message('请选择代理人')
        return false
      }
      return true
    },
    addUser () {
      if (!this.checkUser()) {
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
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.back(-1)
        } else {
          this.$message.error(res.message)
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
          this.agentName = res.data.agentName
          this.yesterdayEarn = res.data.yesterdayEarn
          this.todayEarnGold = res.data.totalEarnMoney
          this.totalEarnMoney = res.data.totalEarnMoney
          this.balance = res.data.balance
        } else {
          this.$message.error(res.message)
        }
      })
    },
    EditUserInfo () {
      if (!this.checkUser()) {
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
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.back(-1)
        } else {
          this.$message.error(res.message)
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
      this.agentId = e.name
    }
  }
}
</script>
