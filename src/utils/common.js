import { axiosPost } from '../assets/serviceApi'

export function checkNull (e) {
  if (e === '' || e === null || e === undefined || e.toString().trim().length === 0) {
    return false
  } else {
    return true
  }
}

export function getAgentList () {
  return new Promise((resolve, reject) => {
    let json = {
      allData: 'Y',
      agentId: null,
      mobile: null,
      name: null,
      pageNo: null,
      pageSize: null,
      sortType: null
    }
    axiosPost('/back/queryAgentInfoList', json).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
