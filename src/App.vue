<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, #app {
  height: 100%;
}
body,p,ul {
  margin: 0;
}
ul,button {
  padding: 0;
}
li {
  list-style: none;
}
a{
  text-decoration: none;
}
input {
  padding: 0;
}
input,button {
    outline: none
}
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.hide {
  display: none;
}

.manage-content .m-header {
    padding: 22px 12px;
    background: #F1F1F1;
    border-bottom: 1px solid #E9E9E9;
}
.manage-content .m-header p {
    border-left: 6px solid #F1CE02;
    padding-left: 10px;
}
.manage-content .m-header .btn-normal {
    float: right;
    margin-top: -10px;
}
.manage-content .m-limit {
    margin: 32px 52px 20px 52px;
    background: #F1F1F1;
}
.manage-content .m-limit .btn-normal {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
}
.manage-content .ptb20 {
    padding: 16px 20px;
    border-top: 1px solid #EAEAEA;
}
/* 小标题 */
.manage-content .m-title {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    background: #F1F1F1;
}
/* 下拉框 */
.manage-content .right {
    float: right;
    width: 170px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #DCDCDC;
}
/* 文本框 */
.manage-content .ipt-normal {
    padding-left: 10px;
    width: 158px;
    height: 38px;
    border: 1px solid #DCDCDC;
    background: #F7F7F7;
    border-radius: 6px;
    margin-right: 50px;
}
/* 按钮 */
.manage-content .btn-normal {
    width:85px;
    height:40px;
    background:rgba(241,206,2,1);
    border-radius:6px;
    border: 1px solid #DCDCDC;
}
.manage-content .view-btn {
    color: #4B4B4B;
    margin-right: 18px;
}
.manage-content .edit-btn {
    color: #F1CE02;
}
.manage-content .m-table {
    margin: 0 52px;
}
.manage-content .m-t-content {
    font-size: 14px;
}
.manage-content .m-t-content table {
    width: 100%;
    border-collapse: collapse;
}
.manage-content .m-t-content table th {
    background: #F1F1F1;
    height: 38px;
    line-height: 39px;
    font-weight: normal;
    border: 1px solid #EAEAEA;
}
.manage-content .m-t-content table td{
    text-align: center;
    padding: 18px 0;
    border: 1px solid #EAEAEA;
}
.manage-detail .ipt-normal {
    
}
</style>
