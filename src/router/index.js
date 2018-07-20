import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'Login',
      component: resolve => require(['../components/Login'], resolve) // 异步加载组件
    },
    {
      path: '/MenuCommon/:id',
      name: 'MenuCommon',
      component: resolve => require(['../components/Common/MenuCommon'], resolve),
      children: [
        {
          path: '/UserManage',
          name: 'UserManage',
          component: resolve => require(['../components/UserManage/UserManage'], resolve) // 异步加载组件
        },
        {
          path: '/AgentManage',
          name: 'AgentManage',
          component: resolve => require(['../components/AgentManage/AgentManage'], resolve) // 异步加载组件
        },
        {
          path: '/UserDetail',
          name: 'UserDetail',
          component: resolve => require(['../components/UserManage/UserDetail'], resolve)
        },
        {
          path: '/AgentDetail',
          name: 'AgentDetail',
          component: resolve => require(['../components/AgentManage/AgentDetail'], resolve)
        },
        {
          path: '/MoneyCheck',
          name: 'MoneyCheck',
          component: resolve => require(['../components/FinanceManage/MoneyCheck'], resolve)
        },
        {
          path: '/MoneyDone',
          name: 'MoneyDone',
          component: resolve => require(['../components/FinanceManage/MoneyDone'], resolve)
        },
        {
          path: '/PlatAccount',
          name: 'PlatAccount',
          component: resolve => require(['../components/FinanceManage/PlatAccount'], resolve)
        },
        {
          path: '/EditRate',
          name: 'EditRate',
          component: resolve => require(['../components/SystemManage/EditRate'], resolve)
        },
        {
          path: '/RateManage',
          name: 'RateManage',
          component: resolve => require(['../components/SystemManage/RateManage'], resolve)
        },
        {
          path: '/RewordSetting',
          name: 'RewordSetting',
          component: resolve => require(['../components/SystemManage/RewordSetting'], resolve)
        }
      ]
    }
  ]
})
