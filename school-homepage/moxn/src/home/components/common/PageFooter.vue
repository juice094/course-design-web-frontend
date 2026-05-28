<template>
  <div class="page-footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-col">
          <h4>快速链接</h4>
          <ul>
            <li><a href="#">学校概况</a></li>
            <li><a href="#">招生信息</a></li>
            <li><a href="#">学术项目</a></li>
            <li><a href="#">校园生活</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>服务支持</h4>
          <ul>
            <li><a href="#">图书馆</a></li>
            <li><a href="#">电子邮件</a></li>
            <li><a href="#">校园网络</a></li>
            <li><a href="#">IT服务</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>联系我们</h4>
          <ul>
            <li>电话：8900 - 444 - 422</li>
            <li>邮箱：info@webtech.edu.cn</li>
            <li>地址：苏州希望小区通南大街88号</li>
            <li>邮编：505606</li>
          </ul>
        </div>
        <div class="footer-col footer-logo-col">
          <img src="/images/logo.jpg" alt="Web技术大学">
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Web技术大学 版权所有</p>
        <p>京ICP备2022012209号 京公网安备2022011299号</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 15px 0 10px;
  color: #fff;
}

.footer-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-top {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 12px;
}

.footer-col h4 {
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 600;
  position: relative;
  padding-bottom: 5px;
}

.footer-col h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background: #e63946;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-col li {
  margin-bottom: 4px;
  font-size: 13px;
  color: #ccc;
  line-height: 1.4;
}

.footer-col a {
  color: #ccc;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s ease;
}

.footer-col a:hover {
  color: #fff;
  padding-left: 5px;
}

.footer-logo-col {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.footer-logo-col img {
  width: 150px;
  height: auto;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 10px;
  text-align: center;
}

.footer-bottom p {
  color: #999;
  font-size: 12px;
  margin: 2px 0;
}
</style>
