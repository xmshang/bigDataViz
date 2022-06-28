<template>
  <div class="main-container">
    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部标题 -->
      <div class="headerClass">
        <span class="headTitle">应急大数据可视化系统</span>
      </div>
      <!-- 右侧管理中心 -->
      <div v-show="false" class="rightTool">
        <div style="margin-right: 28px">
          <img src="../../assets/images/管理中心.png" alt="" />
          <el-dropdown class="manageCenter">
            <el-button type="primary"></el-button>
            <el-dropdown-menu slot="dropdown" class="manageDropMenu">
              <el-dropdown-item @click.native="toManageCenter"
                >管理中心</el-dropdown-item
              >
              <el-dropdown-item>帮助中心</el-dropdown-item>
              <el-dropdown-item>通知</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <img src="../../assets/images/个人.png" alt="" />
          <el-dropdown class="manageCenter">
            <el-button type="primary"></el-button>
            <el-dropdown-menu slot="dropdown" class="manageDropMenu">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <national v-if="nationalShow"></national>
      <province v-if="provinceShow"></province>
      <earthquake v-if="earthquakeShow"></earthquake>
      <manage v-if="manageCenterShow"></manage>
    </div>
  </div>
</template>

<script>
import national from "@/views/MainContent/national"
import province from "@/views/MainContent/province"
import earthquake from "@/views/MainContent/earthquake"
import manage from "@/views/manage/index"
export default {
  data() {
    return {
      nationalShow: true,
      provinceShow: false,
      earthquakeShow: false,
      manageCenterShow: false,
      hasNotice: false,
      currentdate: '',
      weekday: '',
      time: '',
      weekdayTranslate: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  components: { national, province, earthquake, manage },
  watch: {
    nationalPageShow(newVal, oldVal) {
      this.nationalShow = newVal
    },
    provincePageShow(newVal, oldVal) {
      this.provinceShow = newVal
    },
    earthquakePageShow(newVal, oldVal) {
      this.earthquakeShow = newVal
    },
    manageCenterPageShow(newVal, oldVal) {
      this.manageCenterShow = newVal
    }
  },
  computed: {
    nationalPageShow() {
      return this.$store.state.ievar.ieVarData.nationalShow
    },
    provincePageShow() {
      return this.$store.state.ievar.ieVarData.provinceShow
    },
    earthquakePageShow() {
      return this.$store.state.ievar.ieVarData.earthquakeShow
    },
    manageCenterPageShow() {
      return this.$store.state.ievar.ieVarData.manageCenterShow
    }
  },
  mounted() {
    this.setDateTime()
  },
  methods: {
    toManageCenter() {
      // this.$router.push('/manage')
      this.$store.state.ievar.ieVarData.nationalShow = false
      this.$store.state.ievar.ieVarData.provinceShow = false
      this.$store.state.ievar.ieVarData.earthquakeShow = false
      this.$store.state.ievar.ieVarData.manageCenterShow = true
    },
    setDateTime() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      month = this.checkTime(month)
      strDate = this.checkTime(strDate)
      this.currentdate = date.getFullYear() + '年' + month + '月' + strDate + '日'
      var h = date.getHours()
      var m = date.getMinutes()
      var s = date.getSeconds()
      h = this.checkTime(h)
      m = this.checkTime(m)
      s = this.checkTime(s)
      this.time = h + ':' + m + ':' + s
      this.weekday = this.weekdayTranslate[date.getDay()]
      this.$store.state.ievar.ieVarData.currentDateTime = this.currentdate + ' ' + this.time
      // var _this = this
      // setTimeout(function () {
      //   _this.setDateTime()
      // }, 500)
    },
    checkTime(i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    },
  }
}
</script>

<style scoped lang="scss">
.main-container {
  padding: 0;
  background-color: #060d1f;
  .main-content {
    padding: 0px;
    .headerClass {
      height: 70px;
      margin-bottom: 10px;
    }
    .headTitle {
      font-size: 30px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 80px;
    }
    .rightTool {
      position: absolute;
      top: 23px;
      right: 20px;
      display: flex;
      justify-content: space-between;
      .manageCenter {
        .el-button--primary {
          color: rgba(255, 255, 255, 0);
          background-color: rgba(255, 255, 255, 0);
          border-color: rgba(255, 255, 255, 0);
          top: -34px;
          right: 4px;
          position: absolute;
        }
      }
    }
  }
}
</style>