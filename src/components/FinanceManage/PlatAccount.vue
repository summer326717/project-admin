<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>财务管理 > 平台账号</span><button class="btn-normal" @click="reloadAgent()">刷新</button></p>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="getData()">查询</button>
            </div>
            <div class="ptb20">
                <span>姓名：</span>
                <input class="ipt-normal" type="text" v-model="nickName">
                <span>手机号码：</span>
                <input class="ipt-normal" type="text" v-model="mobile">
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
                        <th>订单编号</th>
                        <th>用户ID</th>
                        <th>姓名</th>
                        <th>手机号码</th>
                        <th>提现金额（元）</th>
                        <th>申请时间</th>
                        <th>备注</th>
                    </tr>
                    <tr>
                        <td>11111</td>
                        <td>11111</td>
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
      nickName: '',
      mobile: '',
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
