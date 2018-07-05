<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>财务管理 > 平台账号</span><button class="btn-gray" @click="reload()">刷新</button></p>
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
                <span class="drop-menu right">
                    <el-dropdown trigger="click" @command="changeSort">
                        <span class="el-dropdown-link">
                            排序方式<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">正序</el-dropdown-item>
                            <el-dropdown-item command="2">倒叙</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <span class="drop-menu right">
                    <el-dropdown trigger="click" @command="changePageSize">
                        <span class="el-dropdown-link">
                            显示条数<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="10">10条</el-dropdown-item>
                            <el-dropdown-item command="20">20条</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
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
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>11111</td>
                        <td>{{item.userId}}</td>
                        <td>{{item.nickName}}<i v-if='item.sex==2' class="female"></i><i v-if='item.sex==1' class="female"></i></td>
                        <td>{{item.mobile}}</td>
                        <td>{{(item.amount/100).toFixed(2)}}</td>
                        <td>{{item.createTime}}</td>
                        <td>
                            <p>{{item.sloveTime}}</p>
                            <p>{{item.rejectReason}}</p>
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
      userId: ''
    }
  },
  components: {
    pagenation
  },
  created () {
    this.getData()
  },
  methods: {
    reload () {
      this.nickName = ''
      this.mobile = ''
      this.pageNo = 1
      this.pageSize = 10
      this.sortType = 2
      this.getData()
    },
    getData () {
      let json = {
        alipay: '',
        pageNo: '',
        pageSize: '',
        userId: '',
        sortType: 2,
        state: '23'
      }
      this.$axiosPost('/back/queryWithdrawInfoList', json).then((res) => {
        if (res.code === 0) {
          this.resultList = res.data.resultList
          this.totalPages = res.data.pageTotal
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
    },
    getPage (e) {
      this.pageNo = e
      this.getData()
    },
    changeSort (e) {
      this.sortType = e
      this.getData()
    },
    changePageSize (e) {
      this.pageSize = e
      this.getData()
    }
  }
}
</script>
