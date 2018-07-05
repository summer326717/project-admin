<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>财务管理 > 提现操作</span><button class="btn-gray" @click="reloadAgent()">刷新</button></p>
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
                <button class="btn-normal">批量完成</button>
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
                    <tr v-for="(item,i) in dataList" :key="i">
                        <td></td>
                        <td>{{i+(pageNo-1)*pageSize}}</td>
                        <td>{{item.userId}}</td>
                        <td>{{item.nickName}}{{item.sex}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{(item.amount/100).toFixed(2)}}</td>
                        <td>{{item.createTime}}</td>
                        <td>支付宝：{{item.sureAlipay}}</td>
                        <td><button class="btn-normal" @click="finishMethod(item.userWithdrawId, 2)">完成</button></td>
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
        alipay: '',
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userId: '',
        state: 1, // 打款中
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
    finishMethod (userWithdrawId, state) {
      let json = {
        userWithdrawId: userWithdrawId
      }
      this.$axiosPost('/back/handleWithdrawInfo', json).then((res) => {
        if (res.code === 0) {
          alert(res.message)
          this.getData()
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
