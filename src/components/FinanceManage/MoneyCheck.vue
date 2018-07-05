<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>财务管理 > 提现审核</span><button class="btn-gray" @click="reloadAgent()">刷新</button></p>
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
                <button class="btn-normal">批量通过</button>
                <span class="right">显示条数</span>
                <span class="right">排序方式</span>
            </div>
            <div class="m-t-content">
                <table>
                    <tr>
                        <th></th>
                        <th>订单编号</th>
                        <th>用户ID</th>
                        <th>姓名</th>
                        <th>手机号码</th>
                        <th>提现金额（元）</th>
                        <th>申请时间</th>
                        <th>提现方式</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td></td>
                        <td>{{i+(pageNo-1)*pageSize}}</td>
                        <td>{{item.userId}}</td>
                        <td>{{item.nickName}}{{item.sex}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{(item.amount/100).toFixed(2)}}</td>
                        <td>{{item.createTime}}</td>
                        <td>支付宝：{{item.sureAlipay}}</td>
                        <td>
                          <button class="btn-normal" @click='passMethod(item.userWithdrawId, 1)'>通过</button>
                          <button class="btn-normal" @click='passMethod(item.userWithdrawId, 3)'>拒绝</button>
                        </td>
                    </tr>
                </table>
                <div class="no-data" v-if='resultList.length==0'>
                    <img src="../../assets/no-data.png">
                </div>
                <pagenation v-if='resultList.length>0' :cur='pageNo' :all='totalPages' @getpage='getPage'></pagenation>
            </div>
        </div>
    </div>
</template>

<script>
import pagenation from '../Common/Pagenation'
export default {
  data () {
    return {
      nickName: '',
      mobile: '',
      resultList: [],
      alipay: '',
      pageNo: 1,
      pageSize: 10,
      userId: '',
      sortType: 2
    }
  },
  components: {
    pagenation
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      let json = {
        alipay: '', // 支付宝账号
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        state: 0, // 审核中
        userId: '',
        sortType: this.sortType
      }
      this.$axiosPost('/back/queryWithdrawInfoList', json).then((res) => {
        if (res.code === 0) {
          this.resultList = res.data.resultList
        } else {
          this.resultList = []
        }
      })
    },
    passMethod (userWithdrawId, state) {
      let json = {
        rejectReason: '666',
        state: state, // 审核状态,1是审核通过，3是审核失败
        userWithdrawId: userWithdrawId
      }
      this.$axiosPost('/back/approveWithdrawInfo', json).then((res) => {
        if (res.code === 0) {
          this.getData()
          alert(res.message)
        } else {
          alert(res.message)
        }
      })
    },
    getPage (e) {
      this.pageNo = e
      this.getData()
    }
  }
}
</script>
