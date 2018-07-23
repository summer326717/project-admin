<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>系统设置 > 汇率管理 > 修改汇率</span><button class="btn-gray" @click="reloadUser()">刷新</button></p>
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
                <input class="ipt-normal" type="text">
            </div>
            <div class="item">
                <p>兑换规格：零钱 = 金币 * 汇率 / 1000</p>
                <div>
                    <input type="text">
                    <span>金币</span>
                    <span>=></span>
                    <span>零钱（元）</span>
                    <button>转换</button>
                </div>
                <div class="tc"><button class="save-btn">保存</button></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      nowTime: '',
      tomorTime: ''
    }
  },
  created () {
    this.tomorTime = new Date()
    this.nowTime = this.$changeTime(new Date())
  },
  methods: {
    updateRate () {
      let json = {
        time: ''
      }
      this.$axiosPost('/back/demo', json).then((res) => {
        if (res.code === 0) {
          // success
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
