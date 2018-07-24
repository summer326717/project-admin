<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>系统设置 > 奖励设置</span><button class="btn-gray" @click="reloadUser()">刷新</button></p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="item">
                <span class="left-span">*每日金币上限</span>
                <input class="ipt-normal" type="text" v-model="goldDayUpperNum">
            </div>
            <div class="item">
                <span class="left-span">*获取金币时间间隔</span>
                <input class="ipt-normal" type="number" v-model="goldRandomTime">秒
            </div>
            <div class="item">
                <span class="left-span">*金币奖励范围</span>
                <input class="ipt-small" type="text" v-model="goldUpperNum">
                <span class="range-icon">-</span>
                <input class="ipt-small" type="text" v-model="goldLowerNum">
            </div>
            <div class="tc pt40"><button class="save-btn" @click="updateRate">保存</button></div>
        </div>
    </div>
</template>

<script>
let utils = require('../../utils/common')
export default {
  data () {
    return {
      goldDayUpperNum: '',
      goldLowerNum: '',
      goldRandomTime: '',
      goldUpperNum: ''
    }
  },
  methods: {
    reloadUser () {
      this.data = ''
    },
    updateRate () {
      if (!utils.checkNull(this.goldDayUpperNum)) {
        this.$message('每日金币上限不能为空')
        return false
      }
      if (!utils.checkNull(this.goldRandomTime)) {
        this.$message('获取金币时间间隔不能为空')
        return false
      }
      if (!utils.checkNull(this.goldLowerNum)) {
        this.$message('金币奖励范围下限不能为空')
        return false
      }
      if (!utils.checkNull(this.goldUpperNum)) {
        this.$message('金币奖励范围上限不能为空')
        return false
      }
      if (parseInt(this.goldLowerNum) <= parseInt(this.goldUpperNum)) {
        this.$message('请输入正确范围值')
        return false
      }
      let json = {
        goldDayUpperNum: this.goldDayUpperNum, // 每日金币上限
        goldLowerNum: this.goldLowerNum, // 随机金币下限
        goldRandomTime: this.goldRandomTime, // 随机金币获取时间间隔秒S
        goldUpperNum: this.goldUpperNum // 随机金币上限
      }
      this.$axiosPost('/back/saveRandomGoldRange', json).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
