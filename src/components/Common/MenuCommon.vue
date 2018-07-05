<template>
    <div class="container">
        <div class="left-menu">
            <p class="menu-title">赏金猎人</p>
            <ul>
                <li v-for="(item,i) in menuList" :key="i">
                    <a :class="{'active':'/'+onRoutes==item.menuLink}" @click="openMenu(i,item.menuItem.length,item.menuLink)">{{item.menuName}}<i class="i-arrow" :class="{'hide':item.menuItem.length===0}"></i></a>
                    <div class="second-menu">
                        <router-link v-for="(seconditem,index) in item.menuItem" :key="index" :to="seconditem.menuLink">{{seconditem.menuName}}</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="right-content">
            <router-view></router-view>
            <footer>
                版权所有 @ 的是的撒大
            </footer>
        </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      menuList: [
        {
          menuName: '代理人管理',
          menuLink: '/AgentManage',
          menuItem: []
        },
        {
          menuName: '用户管理',
          menuLink: '/UserManage',
          menuItem: []
        },
        {
          menuName: '财务管理',
          menuItem: [
            {
              menuName: '提现审核',
              menuLink: '/MoneyCheck'
            },
            {
              menuName: '提现操作',
              menuLink: '/MoneyDone'
            },
            {
              menuName: '平台账户',
              menuLink: '/PlatAccount'
            }
          ]
        }
        /* {
          menuName: '系统设置',
          menuItem: [
            {
              menuName: '汇率管理',
              menuLink: '/RateManage'
            },
            {
              menuName: '奖励管理',
              menuLink: '/RewordSetting'
            }
          ]
        } */
      ]
    }
  },
  mounted () {
    let element = document.getElementsByClassName('router-link-active')[0]
    if (element) {
      let h = element.parentElement.children[0].clientHeight
      let count = element.parentElement.childElementCount
      element.parentElement.style.height = h * count + 'px'
      element.parentNode.previousElementSibling.children[0].style.transform = 'rotate(-180deg)'
    }
  },
  methods: {
    openMenu (i, totalnum, menuLink) {
      if (totalnum > 0) {
        let height = document.getElementsByClassName('second-menu')[i].children[0].clientHeight
        let num = document.getElementsByClassName('second-menu')[i].children.length
        let parentHeight = document.getElementsByClassName('second-menu')[i].clientHeight
        if (parentHeight === 0) {
          document.getElementsByClassName('i-arrow')[i].style.transform = 'rotate(-180deg)'
          document.getElementsByClassName('second-menu')[i].style.height = (height * num) + 'px'
        } else {
          document.getElementsByClassName('i-arrow')[i].style.transform = ''
          document.getElementsByClassName('second-menu')[i].style.height = '0px'
        }
      } else {
        console.log('没有二级菜单')
        this.$router.push({'path': menuLink})
      }
    }
  },
  computed: {
    // 当前路由名称
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style>
.container .left-menu {
    position: fixed;
    width: 180px;
    height: 100%;
    top: 0;
    left: 0;
    background: #14191E;
}
.container .left-menu .menu-title{
    text-align: center;
    color: #ffffff;
    padding: 38px 0 50px 0;
    background: #14191E;
    font-size: 24px;
}
.container .left-menu ul {
    overflow-y: scroll;
    height: calc(100% - 80px);
}
.container .left-menu ul::-webkit-scrollbar{
    display: none;
}
.container .left-menu ul::-webkit-scrollbar-track{
    display: none;
}
.container .left-menu ul::-webkit-scrollbar-thumb{
    display: none;
}
.container .left-menu ul li a {
    padding-left: 20px;
    color: #787878;
    height: 42px;
    line-height: 42px;
    display: block;
    border-top: 1px solid #111519;
    transition: all 0.4s ease-in-out;
}
.container .left-menu .router-link-active {
  color: #f2ce00;
  box-shadow: 3px 0 0 #f2ce00 inset;
}
.container .left-menu ul li a:hover {
    background: #373a3e;
    box-shadow: 3px 0 0 #f2ce00 inset;
}
.container .left-menu ul li .i-arrow {
    float: right;
    width: 16px;
    height: 16px;
    margin: 13px 13px 0 0;
    background: url('../../assets/menu-open.png') no-repeat 90% 50%;
    background-size: 16px 16px;
    transition: transform 0.4s ease-in-out;
}
.container .left-menu .second-menu{
    height: 0;
    overflow: hidden;
    transition: height 0.4s ease-in-out;
}
.container .left-menu .second-menu a{
    padding-left: 40px;
}
.container .right-content {
    padding-left: 180px;
}
.right-content footer {
    font-size: 14px;
    padding: 15px 0;
    text-align: center;
}
</style>
