<template>
  <div>
    <!-- 顶部导航 -->
    <div class="navClass">
      <span class="navTitle"
        ><span style="cursor: pointer" @click="goToNational()">首页</span> —
        管理中心</span
      >
    </div>
    <!-- 主体内容区 -->
    <div class="sideSubbar">
      <div class="content" id="contentID">
        <div>
          <div class="navBar">
            <el-menu
              class="el-menu-vertical-demo"
              @select="selectItem"
              @open="handleOpen"
              :collapse="isCollapse"
              default-active="1"
            >
              <el-menu-item index="1">
                <i
                  class="activeItem"
                  v-show="currentItem == 1 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/专题图.png"
                  alt=""
                  v-show="currentItem != 1"
                />
                <span slot="title" v-show="currentItem == 1 ? false : true"
                  >专题图</span
                >
                <img
                  src="../../assets/images/icons/专题图(1).png"
                  alt=""
                  v-show="currentItem == 1 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 1 ? true : false"
                  >专题图</span
                >
              </el-menu-item>
              <el-menu-item index="2">
                <i
                  class="activeItem"
                  v-show="currentItem == 2 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/应急一张图.png"
                  alt=""
                  v-show="currentItem != 2"
                />
                <span slot="title" v-show="currentItem == 2 ? true : false"
                  >应急一张图</span
                >
                <img
                  src="../../assets/images/icons/应急一张图(1).png"
                  alt=""
                  v-show="currentItem == 2 ? true : false"
                />
                <span slot="title" v-show="currentItem == 2 ? false : true"
                  >应急一张图</span
                >
              </el-menu-item>
              <el-menu-item index="3">
                <i
                  class="activeItem"
                  v-show="currentItem == 3 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/应急评估.png"
                  alt=""
                  v-show="currentItem != 3"
                />
                <span slot="title" v-show="currentItem == 3 ? false : true"
                  >应急评估</span
                >
                <img
                  src="../../assets/images/icons/应急评估(1).png"
                  alt=""
                  v-show="currentItem == 3 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 3 ? true : false"
                  >应急评估</span
                >
              </el-menu-item>
              <el-submenu index="4">
                <template slot="title">
                  <i
                    class="activeItem"
                    v-show="currentItem == 4 ? true : false"
                  ></i>
                  <img
                    src="../../assets/images/icons/应急事件.png"
                    alt=""
                    v-show="currentItem != 4"
                  />
                  <span slot="title" v-show="currentItem == 4 ? false : true"
                    >应急事件</span
                  >
                  <img
                    src="../../assets/images/icons/应急事件(1).png"
                    alt=""
                    v-show="currentItem == 4 ? true : false"
                  />
                  <span
                    slot="title"
                    style="color: #2f7695"
                    v-show="currentItem == 4 ? true : false"
                    >应急事件</span
                  >
                </template>
                <el-menu-item index="4-1">
                  <i class="subIcon">.</i>
                  <span slot="title">应急列表</span>
                </el-menu-item>
                <el-menu-item index="4-2">
                  <i class="subIcon">.</i>
                  <span slot="title">应急触发</span>
                </el-menu-item>
                <el-menu-item index="4-3">
                  <i class="subIcon">.</i>
                  <span slot="title">应急专题</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="5">
                <i
                  class="activeItem"
                  v-show="currentItem == 5 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/应急文件.png"
                  alt=""
                  v-show="currentItem != 5"
                />
                <span slot="title" v-show="currentItem == 5 ? false : true"
                  >应急文件</span
                >
                <img
                  src="../../assets/images/icons/应急文件(1).png"
                  alt=""
                  v-show="currentItem == 5 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 5 ? true : false"
                  >应急文件</span
                >
              </el-menu-item>
              <el-menu-item index="6">
                <i
                  class="activeItem"
                  v-show="currentItem == 6 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/灾情上报.png"
                  alt=""
                  v-show="currentItem != 6"
                />
                <span slot="title" v-show="currentItem == 6 ? false : true"
                  >灾情上报</span
                >
                <img
                  src="../../assets/images/icons/灾情上报(1).png"
                  alt=""
                  v-show="currentItem == 6 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 6 ? true : false"
                  >灾情上报</span
                >
              </el-menu-item>
              <el-menu-item index="7">
                <i
                  class="activeItem"
                  v-show="currentItem == 7 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/信息发布.png"
                  alt=""
                  v-show="currentItem != 7"
                />
                <span slot="title" v-show="currentItem == 7 ? false : true"
                  >信息发布</span
                >
                <img
                  src="../../assets/images/icons/信息发布(1).png"
                  alt=""
                  v-show="currentItem == 7 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 7 ? true : false"
                  >信息发布</span
                >
              </el-menu-item>
              <el-menu-item index="8">
                <i
                  class="activeItem"
                  v-show="currentItem == 8 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/数据管理.png"
                  alt=""
                  v-show="currentItem != 8"
                />
                <span slot="title" v-show="currentItem == 8 ? false : true"
                  >数据管理</span
                >
                <img
                  src="../../assets/images/icons/数据管理(1).png"
                  alt=""
                  v-show="currentItem == 8 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 8 ? true : false"
                  >数据管理</span
                >
              </el-menu-item>
              <el-menu-item index="9">
                <i
                  class="activeItem"
                  v-show="currentItem == 9 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/用户中心.png"
                  alt=""
                  v-show="currentItem != 9"
                />
                <span slot="title" v-show="currentItem == 9 ? false : true"
                  >用户中心</span
                >
                <img
                  src="../../assets/images/icons/用户中心(1).png"
                  alt=""
                  v-show="currentItem == 9 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 9 ? true : false"
                  >用户中心</span
                >
              </el-menu-item>
              <el-menu-item index="10">
                <i
                  class="activeItem"
                  v-show="currentItem == 10 ? true : false"
                ></i>
                <img
                  src="../../assets/images/icons/系统设置.png"
                  alt=""
                  v-show="currentItem != 10"
                />
                <span slot="title" v-show="currentItem == 10 ? false : true"
                  >系统设置</span
                >
                <img
                  src="../../assets/images/icons/系统设置(1).png"
                  alt=""
                  v-show="currentItem == 10 ? true : false"
                />
                <span
                  slot="title"
                  style="color: #2f7695"
                  v-show="currentItem == 10 ? true : false"
                  >系统设置</span
                >
              </el-menu-item>
            </el-menu>
          </div>
          <div style="float: left; cursor: pointer">
            <img
              src="../../assets/images/icons/收起.png"
              v-show="showOrNot"
              alt=""
              @click="handleIn"
            />
            <img
              src="../../assets/images/icons/展开.png"
              v-show="!showOrNot"
              alt=""
              @click="handleOut"
            />
          </div>
        </div>
        <div class="mainContent"></div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="footer">
      <div style="width: 50%; text-align: right">
        <span
          ><a href="http://news.ceic.ac.cn/index.html?time=1606377714"
            >中国地震台网</a
          ></span
        >
        <span class="splitClass"></span>
        <span style="margin-left: 50px"
          ><a href="https://www.cea.gov.cn/">中国地震局</a></span
        >
        <span class="splitClass"></span>
        <span style="margin-left: 50px"
          ><a href="http://www.bjdzj.gov.cn/">北京地震局</a></span
        >
      </div>
      <div style="width: 50%; text-align: right">
        <span>Copyright+[dates]+[author/owner]</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      showOrNot: true,
      currentItem: 1
    }
  },
  computed: {
  },
  mounted() {
    window.onresize = function () {
      var innerHeight = window.innerHeight
      var clientHeight = document.documentElement.clientHeight
      if (clientHeight > 1000) {
        document.getElementById('contentID').style.height = (innerHeight - 200) + 'px'
      } else {
        document.getElementById('contentID').style.height = (innerHeight - 192) + 'px'
      }
    }
  },
  methods: {
    goToNational() {
      // this.$router.push('/')
      this.$store.state.ievar.ieVarData.nationalShow = true
      this.$store.state.ievar.ieVarData.manageCenterShow = false
      this.$store.state.ievar.ieVarData.provinceShow = false
      this.$store.state.ievar.ieVarData.earthquakeShow = false
    },
    handleIn() {
      this.showOrNot = false
      this.isCollapse = true
    },
    handleOut() {
      this.showOrNot = true
      this.isCollapse = false
    },
    selectItem(key) {
      if (key.indexOf('-') > -1) {
        this.currentItem = key.split('-')[0]
      } else {
        this.currentItem = key
      }
    },
    handleOpen(key) {
      this.currentItem = key
    }
  }
}
</script>

<style scoped lang="scss">
.navClass {
  height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  text-align: left;
  background-image: url(../../assets/navImg.png);
}
.navTitle {
  font-size: 20px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 500;
  color: rgba(1, 238, 247, 1);
  line-height: 50px;
  padding-left: 50px;
}
.content {
  margin: 0 20px;
  display: flex;
  background-color: #f7f7f7;
  .navBar {
    margin-top: 10px;
    float: left;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(6, 13, 31, 0.05);
    border-radius: 4px 0px 0px 4px;
    height: 730px;
    .subIcon {
      color: #2f7695;
      font-size: 32px;
      display: inline-block;
      margin-top: -20px;
    }
    .activeItem {
      width: 6px;
      height: 54px;
      background: #2f7695;
      display: inline-block;
      margin-left: -20px;
      margin-right: 9px;
    }
  }
}
.footer {
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0px;
  left: 25%;
  span {
    font-size: 16px;
    font-weight: 400;
    color: #83868f;
    line-height: 35px;
  }
  .splitClass {
    display: inline-block;
    border-left: 1px solid #83868f;
    height: 12px;
    margin-left: 50px;
  }
}
</style>