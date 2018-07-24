<template>
    <div class="manage-content">
        <div class="m-header">
            <p><span>系统设置 > 汇率管理</span><button class="btn-gray" @click="reloadAgent()">刷新</button></p>
        </div>
        <div class="m-limit">
            <div class="m-title">
                <span>筛选条件</span>
                <button class="btn-normal" @click="updateRate()">修改汇率</button>
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
                        <th>生效时间</th>
                        <th>汇率</th>
                        <th>兑换的金币数</th>
                        <th>兑换的金额（元）</th>
                        <th>结算时间</th>
                    </tr>
                    <tr v-for="(item,i) in resultList" :key="i">
                        <td>{{$changeTime(item.time)}}</td>
                        <td>11111</td>
                        <td>11111</td>
                        <td>11111</td>
                        <td>{{$changeTime(item.time)}}</td>
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
      resultList: [],
      pageNo: 1,
      pageSize: 10,
      totalPages: 1,
      sortType: 2,
      time: ''
    }
  },
  created () {
    this.getData()
  },
  components: {
    pagenation
  },
  methods: {
    getData () {
      let json = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortType: this.sortType,
        time: this.time
      }
      this.$axiosPost('/back/queryGoldRuleList', json).then((res) => {
        if (res.code === 0) {
          // this.resultList = res.data.resultList
          this.totalPages = res.data.pageTotal
        } else {
          this.resultList = []
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
    },
    updateRate () {
      this.$router.push({ path: '/EditRate' })
    }
  }
}
</script>
