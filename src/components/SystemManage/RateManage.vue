<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>系统设置 > 汇率管理</span><button class="btn-normal" @click="reloadAgent()">刷新</button></p>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="getData()">修改汇率</button>
                <button class="btn-normal" @click="getData()">查询</button>
            </div>
            <div class="ptb20">
                <span>生效日期：</span>
                <input class="ipt-normal" type="text">
            </div>
        </div>
        <div class="m-table">
            <div class="m-title">
                <span>数据列表</span>
                <span class="right">显示条数</span>
                <span class="right">排序方式</span>
            </div>
            <div class="m-t-content">
                <table>
                    <tr>
                        <th>生效时间</th>
                        <th>汇率</th>
                        <th>兑换的金币数</th>
                        <th>兑换的金额（元）</th>
                        <th>结算时间</th>
                    </tr>
                    <tr>
                        <td>11111</td>
                        <td>11111</td>
                        <td>11111</td>
                        <td>11111</td>
                        <td>11111</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [],
      alipay: '',
      pageNo: '',
      pageSize: '',
      userId: ''
    }
  },
  methods: {
    getData () {
      let json = {
        alipay: '',
        pageNo: '',
        pageSize: '',
        userId: ''
      }
      this.$axiosPost('/back/queryWithdrawInfoList', json).then((res) => {
        if (res.code === 0) {
          this.dataList = []
        }
      })
    },
    passCheck () {
      let json = {
        rejectReason: '',
        userWithdrawId: ''
      }
      this.$axiosPost('/back/handleWithdrawInfo', json).then((res) => {
        if (res.code === 0) {
          alert(res.message)
        }
      })
    }
  }
}
</script>
