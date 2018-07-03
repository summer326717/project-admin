<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>用户管理</span><button class="btn-normal" @click="reloadAgent()">刷新</button></p>
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
                        <td>{{item.nickName}}<i>{{item.sex}}</i></td>
                        <td>--</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.balance}}</td>
                        <td>{{item.lastLoginTime}}</td>
                        <td>{{item.agentId}}</td>
                        <td><button>{{item.state}}</button></td>
                        <td>
                            <router-link class="view-btn" :to='{path: "/UserDetail", query: { type: 2, userBaseId : item.userBaseId }}'>查看</router-link>
                            <router-link class="edit-btn" :to='{path: "/UserDetail", query: { type: 3, userBaseId : item.userBaseId }}'>修改</router-link>
                        </td>
                    </tr>
                </table>
                <pagenation :cur='pageNo' :all='totalPages'></pagenation>
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
      resultList: []
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
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        agentId: '',
        mobile: '',
        nickName: '',
        sortType: this.sortType,
        resultList: this.resultList
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
    }
  }
}
</script>
