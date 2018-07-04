<template>
    <div class="manage-detail">
        <div v-if='type==1||type==3'>
            <div class="item">
                <span class="left-span">*账户</span>
                <input class="ipt-normal" type="text" v-model="account" placeholder="请输入账户">
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
                <input type="checkbox">
                <span>男</span>
                <input type="checkbox">
                <span>女</span>
            </div>
            <div class="item">
                <span class="left-span">*身份证号</span>
                <input class="ipt-normal" type="text" placeholder="请输入身份证件号" v-model="idNumber">
            </div>
            <div>
                <span class="left-span">*身份证照片</span>
                <div>
                    <p>tupian</p>
                    <form enctype="multipart/form-data" style="display:none" id="uploadForm_default_tea">
                    <input type="file" @change="uploadMethod" id="tea_cate_img" name="file" accept="image/png,image/gif,image/jpeg"/>
                    <input type="hidden" name="goods" value="123456" />
                    </form>
                    <p><span @click="uploadImg">+</span><button>修改</button></p>
                </div>
            </div>
            <div><button @click="SaveAgent">保存</button></div>
        </div>
        <div v-if='type==2'>
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
                <span>{{userDetail.name}}</span>
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
                <span class="left-span">身份证照片</span>
                <div>
                    <p>tupian</p>
                    <form enctype="multipart/form-data" style="display:none" id="uploadForm_default_tea">
                    <input type="file" @change="uploadMethod" id="tea_cate_img" name="file" accept="image/png,image/gif,image/jpeg"/>
                    <input type="hidden" name="goods" value="123456" />
                    </form>
                    <p><span @click="uploadImg">+</span><button>修改</button></p>
                </div>
            </div>
            <div class="item">
                <span class="left-span">客户数量</span>
                <span>{{userDetail.customerNum}}人</span>
            </div>
            <div class="item">
                <span class="left-span">注册时间</span>
                <span>{{userDetail.createTime}}</span>
            </div>
            <div class="item">
                <span class="left-span">活跃时间</span>
                <span>{{userDetail.updateTime}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      name: '',
      mobile: '',
      sex: 0,
      idNumber: '',
      type: 1, // 1.添加2.查看3.修改
      userDetail: '',
      agentId: ''
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
    addAgent () {
      let json = {
        account: this.mobile,
        name: this.name,
        mobile: this.mobile,
        sex: this.sex, // 0保密1男2女，默认保密
        idNumber: this.idNumber
      }
      this.$axiosPost('/back/saveAgentInfo', json).then((res) => {
        if (res.code === 0) {
          alert('添加成功')
        } else {
          alert(res.message)
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
          this.sex = res.data.sex
          this.mobile = res.data.mobile
          this.idNumber = res.data.idNumber
          this.name = res.data.name
        } else {
          alert(res.message)
        }
      })
    },
    EditUserInfo () {
      let json = {
        agentId: this.agentId,
        account: this.mobile,
        name: this.name,
        mobile: this.mobile,
        sex: this.sex, // 0保密1男2女，默认保密
        idNumber: this.idNumber
      }
      this.$axiosPost('/back/updateAgentInfo', json).then((res) => {
        if (res.code) {
          alert(res.message)
        } else {
          alert(res.message)
        }
      })
    },
    uploadImg () {
      document.getElementById('tea_cate_img').click()
    },
    uploadMethod () {
      let files = document.getElementById('tea_cate_img').files
      var fd = new FormData()
      fd.append('file', files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('/fileUploadSave', fd, config).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
    }
  }
}
</script>
