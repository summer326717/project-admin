<template>
    <div class="manage-content">
        <div class="m-header">
            <p>
              <span v-if='type==1'>代理人管理 > 添加代理人</span>
              <span v-if='type==2'>代理人管理 > 查看代理人</span>
              <span v-if='type==3'>代理人管理 > 修改代理人</span>
              <button class="btn-gray" @click="back()">返回</button></p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="detail-content" v-if='type==1||type==3'>
                <div class="item">
                    <span class="left-span">*账户</span>
                    <input v-if="type==1" class="ipt-normal" type="text" v-model="account" placeholder="请输入账户">
                    <input v-if="type==3" class="ipt-normal" type="text" v-model="account" placeholder="请输入账户" disabled>
                </div>
                <div class="item">
                    <span class="left-span">*姓名</span>
                    <input class="ipt-normal" type="text" v-model="name" placeholder="请输入姓名">
                </div>
                <div class="item">
                    <span class="left-span">*手机号码</span>
                    <input class="ipt-normal" type="text" placeholder="请输入手机号码" v-model="mobile">
                </div>
                <div class="item">
                    <span class="left-span">*性别</span>
                    <el-radio v-model="sex" label="1">男</el-radio>
                    <el-radio v-model="sex" label="2">女</el-radio>
                </div>
                <div class="item">
                    <span class="left-span">*身份证号</span>
                    <input class="ipt-normal" type="text" placeholder="请输入身份证件号" v-model="idNumber">
                </div>
                <div class="item">
                    <span class="left-span">*分润（%）</span>
                    <input class="ipt-normal" type="number" placeholder="请输入0-5" v-model="sharePoint">
                    <span>（上限为5%）</span>
                </div>
                <div class="item">
                    <span class="left-span">*开设代理权限</span>
                    <el-radio v-model="agentState" label="0">不开通</el-radio>
                    <el-radio v-model="agentState" label="1">开通</el-radio>
                </div>
                <!--<div>
                    <span class="left-span">*身份证照片</span>
                    <div style="display:inline-block;width:50%">
                        <p>tupian</p>
                        <form enctype="multipart/form-data" style="display:none" id="uploadForm_default_tea">
                        <input type="file" @change="uploadMethod" id="tea_cate_img" name="file" accept="image/png,image/gif,image/jpeg"/>
                        <input type="hidden" name="goods" value="123456" />
                        </form>
                        <p><span @click="uploadImg">+</span><button>修改</button></p>
                    </div>
                </div>-->
                <div class="item">
                    <span class="left-span">&nbsp;</span>
                    <button class="save-btn" @click="SaveAgent">保存</button>
                </div>
            </div>
            <div v-if='type==2' class="detail-view">
                <div class="item">
                    <span class="left-span">代理人ID</span>
                    <span>{{userDetail.agentId}}</span>
                </div>
                <div class="item">
                    <span class="left-span">账户</span>
                    <span>{{userDetail.account}}</span>
                </div>
                <div class="item">
                    <span class="left-span">姓名</span>
                    <span>{{userDetail.name}}<i v-if='userDetail.sex==2' class="female"></i><i v-if='userDetail.sex==1' class="male"></i></span>
                </div>
                <div class="item">
                    <span class="left-span">手机号码</span>
                    <span>{{userDetail.mobile}}</span>
                </div>
                <div class="item">
                    <span class="left-span">身份证号</span>
                    <span>{{userDetail.idNumber}}</span>
                </div>
                <div class="item">
                    <span class="left-span">客户数量</span>
                    <span>{{userDetail.customerNum}}人</span>
                </div>
                <div class="item">
                    <span class="left-span">代理数量</span>
                    <span>{{userDetail.lowerLevelNum}}人</span>
                </div>
                <div class="item">
                    <span class="left-span">注册时间</span>
                    <span>{{$changeTime(userDetail.createTime)}}</span>
                </div>
                <div class="item">
                    <span class="left-span">活跃时间</span>
                    <span>{{$changeTime(userDetail.updateTime)}}</span>
                </div>
            </div>
            <div class="info-title" v-if='type==2'>
                <span>账户信息</span>
            </div>
            <div class="ul" v-if='type==2'>
                <ul>
                    <li>
                        <p>{{$NP.div100(userDetail.balance)}}</p>
                        <p>账户余额</p>
                    </li>
                    <li>
                        <p>{{$NP.div100(userDetail.totalProfit)}}</p>
                        <p>总收益</p>
                    </li>
                    <li>
                        <p>{{$NP.div100(userDetail.customerProfit)}}</p>
                        <p>客户收益</p>
                    </li>
                    <li>
                        <p>{{$NP.div100(userDetail.agentProfit)}}</p>
                        <p>代理收益</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getAgentList } from '../../utils/common'
let utils = require('../../utils/common')
export default {
  data () {
    return {
      account: '',
      name: '',
      mobile: '',
      sex: '1',
      idNumber: '',
      type: 1, // 1.添加2.查看3.修改
      userDetail: {
        balance: 0,
        totalProfit: 0,
        customerProfit: 0,
        agentProfit: 0
      },
      agentId: '',
      sharePoint: '',
      agentState: '0'
    }
  },
  created () {
    this.type = this.$route.query.type
    this.agentId = this.$route.query.agentId
    if (this.type === 2 || this.type === 3) {
      this.ViewUserInfo(this.agentId)
    }
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    checkAgent () {
      if (!utils.checkNull(this.account)) {
        this.$message('账号不能为空')
        return false
      }
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(this.account)) {
        this.$message('账号必须为大于4个字符，小于16个字符的数字和字母')
        return
      }
      if (!utils.checkNull(this.name)) {
        this.$message('姓名不能为空')
        return false
      }
      if (this.name.length < 2) {
        this.$message('姓名不能小于两个字')
        return false
      }
      if (this.name.length > 50) {
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
      if (!utils.checkNull(this.idNumber)) {
        this.$message('身份证号不能为空')
        return false
      }
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idNumber)) {
        this.$message('请输入正确的身份证号码')
        return false
      }
      if (!utils.checkNull(this.sharePoint)) {
        this.$message('请输入分润')
        return false
      }
      this.sharePoint = parseFloat(this.sharePoint)
      if ((this.sharePoint < 0) || (this.sharePoint > 5)) {
        this.$message('分润(%)范围为0 - 5')
        return false
      }
      if (!(/^\d*\.{0,1}\d{0,1}$/.test(this.sharePoint))) {
        this.$message('分润(%)小数位最多只能为一位小数')
        return
      }
      return true
    },
    addAgent () {
      if (!this.checkAgent()) {
        return
      }
      let sharePoint = this.$NP.divide(this.sharePoint, 100)
      let json = {
        account: this.account,
        name: this.name,
        mobile: this.mobile,
        sex: this.sex, // 0保密1男2女，默认保密
        idNumber: this.idNumber,
        sharePoint: sharePoint,
        agentState: parseInt(this.agentState)
      }
      this.$axiosPost('/back/saveAgentInfo', json).then((res) => {
        if (res.code === 0) {
          this.queryList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryList () {
      getAgentList().then((res) => {
        if (res.data) {
          let dataList = []
          res.data.resultList.map((v, i) => {
            dataList.push({value: v.name, name: v.agentId})
          })
          sessionStorage.setItem('agentList', JSON.stringify(dataList))
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.back(-1)
        } else {
          this.$message(res.message)
        }
      })
    },
    SaveAgent () {
      if (this.type === 1) {
        this.addAgent()
      }
      if (this.type === 3) {
        this.EditUserInfo()
      }
    },
    ViewUserInfo (agentId) {
      let json = {
        agentId: agentId
      }
      this.$axiosPost('/back/queryAgentInfoDetail', json).then((res) => {
        if (res.code === 0) {
          this.userDetail = res.data
          this.account = res.data.account
          this.sex = res.data.sex + ''
          this.mobile = res.data.mobile
          this.idNumber = res.data.idNumber
          this.name = res.data.name
          this.sharePoint = this.$NP.mul100(res.data.sharePoint)
          this.agentState = res.data.agentState + ''
          this.balance = res.data.balance
        } else {
          this.$message(res.message)
        }
      })
    },
    EditUserInfo () {
      if (!this.checkAgent()) {
        return
      }
      let sharePoint = this.$NP.div100(this.sharePoint)
      let json = {
        agentId: this.agentId,
        account: this.account,
        name: this.name,
        mobile: this.mobile,
        sex: this.sex, // 0保密1男2女，默认保密
        idNumber: this.idNumber,
        sharePoint: sharePoint,
        agentState: parseInt(this.agentState)
      }
      this.$axiosPost('/back/updateAgentInfo', json).then((res) => {
        if (res.code === 0) {
          this.queryList()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
