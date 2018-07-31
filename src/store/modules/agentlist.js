import { getAgentList } from '../../utils/common'

const agentlist = {
  state: {
    agentlist: []
  },
  mutations: {
    SET_AGENTLIST: (state, agentlist) => {
      state.agentlist = agentlist
    }
  },
  actions: {
    resetAgentList ({commit, state}) {
      return new Promise((resolve, reject) => {
        getAgentList().then(response => {
          if (response.code === 0) {
            const data = response.data.resultList
            let dataList = []
            data.map((v, i) => {
              dataList.push({value: v.name, name: v.agentId})
            })
            commit('SET_AGENTLIST', dataList)
            resolve(data)
          } else {
            this.$message.error(response.message)
            console.log(response.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default agentlist
