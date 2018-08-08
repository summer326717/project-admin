<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>系统设置 > 汇率管理 > 修改汇率</span><button class="btn-gray" @click="back()">返回</button></p>
        </div>
        <div class="manage-detail">
            <div class="info-title">
                <span>基本信息</span>
            </div>
            <div class="item">
                <span class="left-span">生效时间</span>
                <span>{{nowTime}}</span>
            </div>
            <div class="item">
                <span class="left-span">*结算时间</span>
                <el-date-picker format='yyyy-MM-dd hh:mm:ss' readonly v-model="tomorTime" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="item">
                <span class="left-span">*汇率</span>
                <input class="ipt-normal" type="text" v-model="goldRate">
            </div>
            <div class="item tc">
                <div style="width:500px;border:1px solid #dedede;border-radius:10px;padding:30px;display:inline-block;margin:20px 0;text-align:left;">
                    <p style="padding-bottom:20px">兑换规格：零钱 = 金币 * 汇率 / 1000</p>
                    <el-input v-model="goldmoney" size="small" style="width:150px"></el-input>
                    <span>金币</span>
                    <span>=></span>
                    <el-input v-model="changemoney" size="small" style="width:150px" disabled></el-input>
                    <span>零钱（元）</span>
                    <el-button type="success" size="small" @click="changeRate">转换</el-button>
                </div>
                <div><button @click="updateRate" class="save-btn">保存</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      nowTime: '', // 生效时间
      tomorTime: '', // 结算时间
      goldRate: '',
      goldmoney: '',
      changemoney: ''
    }
  },
  created () {
    this.tomorTime = new Date()
    this.nowTime = this.$changeTime(new Date())
    this.queryRate()
  },
  methods: {
    back () {
      this.$router.back(-1)
    },
    queryRate () {
      this.$axiosPost('/back/queryGoldToMnyRateUsing', '').then((res) => {
        if (res.code === 0) {
          this.goldRate = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateRate () {
      if (!this.goldRate) {
        this.$message('汇率不能为空')
        return
      }
      if (!(/^\d*\.{0,1}\d{0,1}$/.test(this.goldRate))) {
        this.$message('汇率小数位最多只能为一位小数')
        return
      }
      let json = {
        goldRate: this.goldRate
      }
      this.$axiosPost('/back/saveGoldToMnyRate', json).then((res) => {
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
    changeRate () {
      if (!this.goldmoney) {
        this.$message('请输入金币数')
        return
      }
      if (!Number.isInteger(parseFloat(this.goldmoney))) {
        this.$message('金币数为整数')
        return
      }
      this.changemoney = this.$NP.round(this.$NP.divide(this.$NP.mulsec(this.goldmoney, this.goldRate), 1000), 3)
    }
  }
}
</script>
