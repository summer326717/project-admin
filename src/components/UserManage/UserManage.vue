<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>用户管理</span><button class="btn-gray" @click="reloadUser()">刷新</button></p>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="addUser()">添加</button>
                <button class="btn-normal" @click="getData()">查询</button>
            </div>
            <div class="ptb20">
                <span>姓名：</span>
                <input class="ipt-normal" type="text" v-model="nickName">
                <span>手机号码：</span>
                <input class="ipt-normal" type="text" v-model="mobile">
                <span>代理人：</span>
                <span class="drop-menu">
                    <el-dropdown trigger="click" @command="changeAgent">
                        <span class="el-dropdown-link">
                            请选择代理人<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item,i) in agentList" :key="i" :command="item.agentId">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
            </div>
        </div>
        <div class="m-table">
            <div class="m-title">
                <span>数据列表</span>
                <span class="right drop-menu">
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
                <span class="right drop-menu">
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
                        <th>用户ID</th>
                        <th>姓名</th>
                        <th>地区</th>
                        <th>手机号码</th>
                        <th>账户余额（元）</th>
                        <th>上次登录时间</th>
                        <th>代理人ID</th>
                        <th>启用状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>{{item.userBaseId}}</td>
                        <td>{{item.nickName}}<i v-if='item.sex==2' class="female"></i><i v-if='item.sex==1' class="female"></i></td>
                        <td>--</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.balance}}</td>
                        <td>{{item.lastLoginTime}}</td>
                        <td>{{item.agentId}}</td>
                        <td><button @click="changeState(1,item)" v-if='item.state==0' class="switch-btn"></button><button @click="changeState(0,item)" v-if='item.state==1' class="switch-btn2"></button></td>
                        <td>
                            <router-link class="view-btn" :to='{path: "/UserDetail", query: { type: 2, userBaseId : item.userBaseId }}'>查看</router-link>
                            <router-link class="edit-btn" :to='{path: "/UserDetail", query: { type: 3, userBaseId : item.userBaseId }}'>修改</router-link>
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
      agentId: '',
      mobile: '',
      nickName: '',
      pageNo: 1,
      pageSize: 10,
      sortType: 2, // 1正序2倒叙，默认倒叙
      totalPages: 1,
      agentList: [],
      resultList: []
    }
  },
  components: {
    pagenation
  },
  created () {
    let agentList = sessionStorage.getItem('agentList')
    this.agentList = JSON.parse(agentList)
    this.getData()
  },
  methods: {
    getData () {
      let json = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        agentId: this.agentId,
        mobile: this.mobile,
        nickName: this.nickName,
        sortType: this.sortType
      }
      this.$axiosPost('/back/queryUserInfoList', json).then((res) => {
        if (res.code === 0) {
          this.resultList = res.data.resultList
          this.totalPages = res.data.pageTotal
        } else {
          this.resultList = []
          this.totalPages = 1
        }
      })
    },
    addUser () {
      // 添加
      this.$router.push({path: 'UserDetail', query: { type: 1 }})
    },
    reloadUser () {
      this.pageNo = 1
      this.pageSize = 10
      this.mobile = ''
      this.nickName = ''
      this.agentId = ''
      this.sortType = 2
      this.getData()
    },
    changeSort (e) {
      this.sortType = e
      this.getData()
    },
    changePageSize (e) {
      this.pageSize = e
      this.getData()
    },
    getPage (e) {
      this.pageNo = e
      this.getData()
    },
    changeAgent (e) {
      this.agentId = e
      this.getData()
    },
    changeState (e, item) {
      let json = {
        userBaseId: item.userBaseId,
        state: e
      }
      this.$axiosPost('/back/updateUserInfo', json).then((res) => {
        if (res.code === 0) {
          alert(res.message)
          this.getData()
        } else {
          alert(res.message)
        }
      })
    }
  }
}
</script>
