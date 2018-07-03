<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>代理人管理</span><button class="btn-normal" @click="reloadAgent()">刷新</button></p>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="addAgent()">添加</button>
                <button class="btn-normal" @click="getData()">查询</button>
            </div>
            <div class="ptb20">
                <span>姓名：</span>
                <input class="ipt-normal" type="text" v-model="name">
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
                        <th>代理人ID</th>
                        <th>姓名</th>
                        <th>地区</th>
                        <th>手机号码</th>
                        <th>微信/QQ</th>
                        <th>活跃时间</th>
                        <th>客户数量（人）</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>{{item.agentId}}</td>
                        <td>{{item.name}}<i>女</i></td>
                        <td>--</td>
                        <td>{{item.mobile}}</td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>
                            <router-link class="view-btn" :to='{path: "/AgentDetail", query: { type: 2, agentId: item.agentId}}'>查看</router-link>
                            <router-link class="edit-btn" :to='{path: "/AgentDetail", query: { type: 3, agentId: item.agentId}}'>修改</router-link>
                        </td>
                    </tr>
                </table>
                <pagenation v-if="totalPages>1" :cur='pageNo' :all='totalPages' @getpage='getPage'></pagenation>
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
      name: '',
      pageNo: 1,
      pageSize: 10,
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
        agentId: this.agentId,
        mobile: this.mobile,
        name: this.name
      }
      this.$axiosPost('/back/queryAgentInfoList', json).then((res) => {
        if (res.code === 0) {
          this.resultList = res.data.resultList
          this.totalPages = res.data.pageTotal
        } else {
          this.resultList = []
          this.totalPages = 1
        }
      })
    },
    addAgent () {
      this.$router.push({'path': '/AgentDetail', query: { type: 1 }})
    },
    getPage (e) {
      this.pageNo = e
      this.getData()
    }
  }
}
</script>
