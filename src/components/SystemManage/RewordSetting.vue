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
                <input class="ipt-normal" type="text">
            </div>
            <div class="item">
                <span class="left-span">*获取金币时间间隔</span>
                <input class="ipt-normal" type="text">
            </div>
            <div class="item">
                <span class="left-span">*金币奖励范围</span>
                <input class="ipt-small" type="text">
                <span class="range-icon">-</span>
                <input class="ipt-small" type="text">
            </div>
            <div class="tc pt40"><button class="save-btn" @click="updateRate">保存</button></div>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    reloadUser () {
      this.data = ''
    },
    updateRate () {
      let json = {
        top: '',
        time: '',
        range: ''
      }
      this.$axiosPost('/back/saveAgentInfo', json).then((res) => {
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
