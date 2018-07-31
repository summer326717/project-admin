<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>财务管理 > 提现审核</span><button class="btn-gray" @click="reload()">刷新</button></p>
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
                <!--<button class="btn-normal">批量通过</button>-->
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
                        <th>提现方式</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>{{i+(pageNo-1)*pageSize}}</td>
                        <td>{{item.userId}}</td>
                        <td>{{item.nickName}}<i v-if='item.sex==2' class="female"></i><i v-if='item.sex==1' class="male"></i></td>
                        <td>{{item.mobile}}</td>
                        <td>{{(item.amount/100).toFixed(2)}}</td>
                        <td>{{$changeTime(item.createTime)}}</td>
                        <td>支付宝：{{item.sureAlipay}}</td>
                        <td>
                          <el-button size="small" type="success" plain @click='passMethod(item.userWithdrawId, 1)'>通过</el-button>
                          <el-button size="small" type="danger" plain @click='passMethod(item.userWithdrawId, 3)'>拒绝</el-button>
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
      sortType: 2,
      totalPages: 1
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
      if (this.mobile) {
        if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.mobile)) {
          this.$message('请输入正确手机号')
          return false
        }
      }
      let json = {
        userName: this.nickName,
        phoneNo: this.mobile,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        state: 0, // 审核中
        sortType: this.sortType
      }
      this.$axiosPost('/back/queryWithdrawInfoList', json).then((res) => {
        if (res.code === 0) {
          this.resultList = res.data.resultList
          this.totalPages = res.data.pageTotal
        } else {
          this.resultList = []
        }
      })
    },
    passMethod (userWithdrawId, state) {
      if (state === 1) {
        this.$confirm('是否通过该提现申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.passCheck('', state, userWithdrawId)
        }).catch(() => {
          // 取消
        })
      } else {
        this.$prompt('拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.passCheck(value, state, userWithdrawId)
        }).catch(() => {
          // 取消
        })
      }
    },
    passCheck (value, state, userWithdrawId) {
      let json = {
        rejectReason: value,
        state: state, // 审核状态,1是审核通过，3是审核失败
        userWithdrawId: userWithdrawId
      }
      this.$axiosPost('/back/approveWithdrawInfo', json).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.getData()
        } else {
          this.$message.error(res.message)
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
      this.pageNo = 1
      this.pageSize = e
      this.getData()
    }
  }
}
</script>
