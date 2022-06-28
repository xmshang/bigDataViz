<template>
  <!-- 主体内容区 -->
  <div style="padding: 15px 20px 10px 20px; display: flex">
    <div style="width: 52%">
      <div style="display: flex; margin-bottom: 20px">
        <div
          class="BoxWrap"
          style="height: 240px; width: 73%; margin-right: 20px"
        >
          <div class="horn">
            <div class="lt"></div>
            <div class="rt"></div>
            <div class="rb"></div>
            <div class="lb"></div>
          </div>
          <div class="divtop">
            <div class="divTopText" style="padding: 0 10px">
              <span v-for="(item, index) in latestEQTitle" :key="index">
                <span
                  v-if="index == 1 || index == 4 || index == 5"
                  class="divTopText1"
                  style="width: 20%"
                  >{{ item }}</span
                >
                <span v-else class="divTopText1" style="width: 13.3%">{{
                  item
                }}</span>
              </span>
            </div>
          </div>
          <div style="height: 190px" class="sidebarTable">
            <div v-for="(item, index) in latestEQData" :key="index">
              <p
                style="padding: 0 10px; color: #ff5959; text-align: left"
                v-if="parseFloat(item.level) > 6"
              >
                <span class="divTopText2" style="width: 12%">{{
                  item.level
                }}</span>
                <span class="divTopText2" style="width: 20%">{{
                  item.time
                }}</span>
                <span class="divTopText2" style="width: 12%">{{
                  item.latitude
                }}</span>
                <span class="divTopText2" style="width: 12%">{{
                  item.longitude
                }}</span>
                <span class="divTopText2" style="width: 20%">{{
                  item.depth
                }}</span>
                <span class="divTopText2" style="width: 20%">{{
                  item.location
                }}</span>
              </p>
              <p style="padding: 0 10px; color: #fff; text-align: left" v-else>
                <span class="divTopText2" style="width: 12%">{{
                  item.level
                }}</span>
                <span class="divTopText2" style="width: 20%">{{
                  item.time
                }}</span>
                <span class="divTopText2" style="width: 12%">{{
                  item.latitude
                }}</span>
                <span class="divTopText2" style="width: 12%">{{
                  item.longitude
                }}</span>
                <span class="divTopText2" style="width: 20%">{{
                  item.depth
                }}</span>
                <span class="divTopText2" style="width: 20%">{{
                  item.location
                }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="BoxWrap" style="height: 240px; width: 25%">
          <div class="horn">
            <div class="lt"></div>
            <div class="rt"></div>
            <div class="rb"></div>
            <div class="lb"></div>
          </div>
          <div class="divtop">
            <span class="divTopText">{{ currentEQTime }}</span>
          </div>
          <div style="margin-top: 12px">
            <p>
              <a class="atagClass" @click="go2Earthquake()">{{
                currentLocation
              }}</a>
            </p>
            <p class="ptagClass" style="margin: 10px 0">距离地震来临还有</p>
            <p style="margin: 15px 0">
              <span class="alertTimeClass">{{ currentAlertTime }}</span>
            </p>
            <p class="pbtnClass">
              <span class="pbtnTextClass" @click="sendAlert()">发送警报</span>
            </p>
          </div>
        </div>
      </div>
      <div ref="mapChart" id="mapid" style="height: 695px; clear: both"></div>
    </div>
    <div style="width: 15.6%; margin: 0 20px">
      <div class="BoxWrap" style="height: 180px">
        <div class="horn">
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="rb"></div>
          <div class="lb"></div>
        </div>
        <div class="divtop">
          <span class="divTopText">地震震级统计（</span
          ><span class="divTopText">{{ statisticalTime }}）</span>
        </div>
        <div style="height: 130px" ref="levelChart"></div>
      </div>
      <div class="BoxWrap" style="height: 755px; margin-top: 20px">
        <div class="horn">
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="rb"></div>
          <div class="lb"></div>
        </div>
        <div class="divtop">
          <span class="divTopText">各省市地震次数统计（</span
          ><span class="divTopText">{{ statisticalTime }}）</span>
        </div>
        <div style="height: 705px" ref="provinceChart"></div>
      </div>
    </div>
    <div style="width: 32.4%">
      <div class="BoxWrap" style="height: 240px">
        <div class="horn">
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="rb"></div>
          <div class="lb"></div>
        </div>
        <div class="divtop">
          <span class="divTopText">全国各月份平均地震发生频次（</span
          ><span class="divTopText">{{ statisticalTime }}）</span>
        </div>
        <div style="height: 190px" ref="frequencyChart"></div>
      </div>
      <div class="BoxWrap" style="height: 240px; margin: 20px 0">
        <div class="horn">
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="rb"></div>
          <div class="lb"></div>
        </div>
        <div>
          <el-row>
            <el-col class="divtop" :span="12">
              <span class="divTopText">受灾面积（{{ statisticalTime }}）</span>
            </el-col>
            <el-col class="divtop" :span="12">
              <span class="divTopText">受灾人数（{{ statisticalTime }}）</span>
            </el-col>
          </el-row>
          <div style="height: 190px" ref="areapplChart"></div>
        </div>
      </div>
      <div class="BoxWrap" style="height: 435px">
        <div class="horn">
          <div class="lt"></div>
          <div class="rt"></div>
          <div class="rb"></div>
          <div class="lb"></div>
        </div>
        <div class="divtop">
          <span class="divTopText">经济影响（{{ statisticalTime }}）</span>
        </div>
        <div style="height: 385px" ref="economyChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getHomeData } from '@/api/home'
import { convertMapData } from '@/utils/datetime'
import { projectBaseUrl } from '@/utils/global'

export default {
  data() {
    return {
      latestEQTitle: ['震级(M)', '发震时刻(UTC+8)', '纬度(°) ', '经度(°) ', '深度(km) ', '参考位置'],
      latestEQData: [],
      areaPopulationData: [],
      mapChart: null,
      areapplChart: null,
      frequencyChart: null,
      economyChart: null,
      levelChart: null,
      provinceChart: null,
      currentLocation: '',
      currentEQTime: '',
      currentAlertTime: '',
      dataAll: {
        latestEQData: [],
        currentEQData: [],
        areaData: {},
        populationData: {},
        levelData: [],
        provinceData: {},
        frequencyData: {},
        economyData: {},
        mapData: []
      },
      statisticalTime: '',
      provinces: ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'],
      provincesText: ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
      map: {},
      province: '' //记录进入的省级地图名称
    }
  },
  computed: {
  },
  mounted() {
    this.openLoading()
    this.getPageData()
    // this.getHomeData()
  },
  methods: {
    getPageData() {
      this.$http({
        url: projectBaseUrl + 'static/national.json',
        method: 'get',
        headers:{ 'content-Type':'x-www-form-urlencoded' }
      }).then(response => { 
        this.dataAll = response.data.data
        this.statisticalTime = this.dataAll.statisticalTime

        let curEQ = this.dataAll.currentEQData

        this.currentLocation = curEQ.location
        this.currentEQTime = curEQ.time
        this.currentAlertTime = curEQ.alertTime
        // 列表数据
        this.latestEQData = this.dataAll.latestEQData

        // 受灾面积&受灾人口数据
        this.dataConvert(this.dataAll)
        this.showChinaMap()
        this.initAreaPPlChart()
        this.initFrequencyChart()
        this.initEconomyChart()
        this.initLevelChart()
        this.initProvinceChart()
      })
    },
    getHomeData() {
      let param = {
        startDate: '',
        endDate: ''
      }
      getHomeData(param).then(response => {
        if (response.code === 200) {
          if (response.data == {}) {
            return false
          }
          this.dataAll = response.data
          this.statisticalTime = response.data.statisticalTime
          this.currentLocation = response.data.currentEQData.location
          this.currentEQTime = response.data.currentEQData.time
          this.currentAlertTime = response.data.currentEQData.alertTime
          // 列表数据
          this.latestEQData = this.dataAll.latestEQData

          // 受灾面积&受灾人口数据
          this.dataConvert(this.dataAll)
          this.showChinaMap()
          this.initAreaPPlChart()
          this.initFrequencyChart()
          this.initEconomyChart()
          this.initLevelChart()
          this.initProvinceChart()
        } else {
          this.$message.error('获取数据失败')
          console.log('未获取到数据')
        }
      })

    },
    obj2ArrConvert(obj) {
      let str = '[' + JSON.stringify(obj) + ']'
      let arr = JSON.parse(str)
      return arr
    },
    dataConvert(dataAll) {
      // 受灾面积&受灾人口数据
      let areaPPLData = {
        area: { data: null },
        population: { data: null }
      }
      let len = dataAll.areaData.data.length
      if (len > 0) {
        let aData = []
        let pplData = []
        let latestEQData = dataAll.areaData
        let populationData = dataAll.populationData
        for (let i = 0; i < len; i++) {
          aData.push({ value: latestEQData.data[i], label: latestEQData.level[i] })
          pplData.push({ value: populationData.data[i], label: populationData.level[i] })
        }
        areaPPLData.area.data = aData
        areaPPLData.population.data = pplData
      }
      this.areaPopulationData = areaPPLData
    },
    initAreaPPlChart() {
      let data = this.areaPopulationData
      let yAxisData = new Set()
      _.forEach(data, (d) => {
        _.forEach(d.data, (item) => {
          yAxisData.add(item.label)
        })
      })
      let top = 30
      let bottom = 20
      yAxisData = [...yAxisData]
      if (this.areapplChart) {
        this.areapplChart.clear()
      } else {
        this.areapplChart = echarts.init(this.$refs.areapplChart)
      }
      this.areapplChart.setOption({
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: [{
          left: '12%',
          width: '28%',
          containLabel: true,
          bottom
        }, {
          left: '52%',
          width: '0%',
          bottom: bottom + 16
        }, {
          right: '12%',
          width: '28%',
          containLabel: true,
          bottom
        }].map(item => _.merge({
          top
        }, item)),
        xAxis: [{
          type: 'value',
          inverse: true,
          axisLabel: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true
          }
        }, {
          gridIndex: 1,
          show: true
        }, {
          gridIndex: 2,
          type: 'value',
          axisLabel: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true
          }
        }].map((item) => _.merge(item, {
          axisLabel: {
            color: '#0B1528',
            margin: 0
          },
          splitLine: {
            lineStyle: {
              color: '#0B1528',
              type: 'dashed'
            }
          }
        })),
        yAxis: [{
          position: 'right',
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        {
          gridIndex: 1,
          position: 'center',
          axisLabel: {
            align: 'center',
            padding: [8, 0, 0, 0],
            fontSize: 12,
            color: `#fff`
          },
          axisLine: {
            show: false
          }
        },
        {
          gridIndex: 2,
          position: 'left',
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        }
        ].map((item) => {
          return _.merge(item, {
            type: 'category',
            inverse: false,
            axisTick: {
              show: false
            },
            data: yAxisData
          })
        }),
        series: [{
          label: {
            position: 'left'
          },
          itemStyle: {
            normal: {
              barBorderRadius: 4,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#01EEF7'
              }, {
                offset: 1,
                color: '#0A263C'
              }])
            }
          },
          barWidth: 10,
          data: _.map(_.get(data, 'area.data'), d => d.value)
        },
        {
          xAxisIndex: 2,
          yAxisIndex: 2,
          label: {
            position: 'right'
          },
          itemStyle: {
            normal: {
              barBorderRadius: 4,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#0A263C'
              }, {
                offset: 1,
                color: '#01EEF7'
              }])
            }
          },
          barWidth: 10,
          data: _.map(_.get(data, 'population.data'), d => d.value)
        }
        ].map(item => _.merge(item, {
          type: 'bar',
          barWidth: 11,
          label: {
            show: true,
            fontFamily: 'Rubik-Medium',
            fontSize: 14,
            distance: 10,
            color: '#0b1528'
          }
        }))
      })
      window.onresize = this.areapplChart.resize
    },
    initFrequencyChart() {
      if (this.frequencyChart) {
        this.frequencyChart.clear()
      } else {
        this.frequencyChart = echarts.init(this.$refs.frequencyChart)
      }
      this.frequencyChart.setOption({
        color: ['#00F4FD', '#1D54F0', '#FFAE00', '#FF5959'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          icon: "rect",
          itemWidth: 20,  // 设置宽度
          itemHeight: 1, // 设置高度
          textStyle: { color: '#fff' }
          // data: ['3.0-3.9级', '4.0-4.9级', '5.0+级']
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: { color: 'rgba(79,122,182,0.24)' }
          },
          axisLine: {
            lineStyle: { color: '#01123a' }
          },
          axisLabel: {
            fontFamily: 'SourceHanFont',
            textStyle: {
              color: '#fff',
              fontSize: '12'
            },
            color: '#CDCDCD'
          }
        },
        xAxis: {
          type: 'category',
          splitLine: {
            lineStyle: { color: 'rgba(79,122,182,0.24)' }
          },
          axisLine: {
            lineStyle: { color: 'rgba(79,122,182,0.24)' }
          },
          axisLabel: {
            fontFamily: 'SourceHanFont',
            textStyle: {
              color: '#fff',
              fontSize: '12'
            },
            color: '#CDCDCD'
          },
          data: this.dataAll.frequencyData.data
        },
        series: [
          {
            name: '3.0-3.9级',
            type: 'line',
            stack: '总量',
            symbolSize: 3,
            symbol: 'circle',
            label: {
              show: false,
              position: 'insideRight'
            },
            data: this.dataAll.frequencyData.level3
          },
          {
            name: '4.0-4.9级',
            type: 'line',
            stack: '总量',
            symbolSize: 3,
            symbol: 'circle',
            label: {
              show: false,
              position: 'insideRight'
            },
            data: this.dataAll.frequencyData.level4
          },
          {
            name: '5.0-5.9级',
            type: 'line',
            stack: '总量',
            symbolSize: 3,
            symbol: 'circle',
            label: {
              show: false,
              position: 'insideRight'
            },
            data: this.dataAll.frequencyData.level5
          },
          {
            name: '6.0+级',
            type: 'line',
            stack: '总量',
            symbolSize: 3,
            symbol: 'circle',
            label: {
              show: false,
              position: 'insideRight'
            },
            data: this.dataAll.frequencyData.level6
          }
        ]
      })
      window.onresize = this.frequencyChart.resize
    },
    initEconomyChart() {
      if (this.levelChart) {
        this.economyChart.clear()
      } else {
        this.economyChart = echarts.init(this.$refs.economyChart)
      }
      this.economyChart.setOption({
        backgroundColor: "#0B1528",
        tooltip: {},
        legend: {
          orient: 'vertical',
          icon: "circle",
          x: '85%',
          y: '5%',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { color: '#fff' },
          data: ['3.0-3.9级', '4.0-4.9级', '5.0-5.9级', '6.0+级']
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              padding: [3, 5]
            }
          },
          center: ['44%', '55%'],
          radius: 140,
          startAngle: 90,
          splitNumber: 1,
          splitArea: {
            areaStyle: {
              color: '#0B1528',
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 1
            }
          },
          axisLine: {
            lineStyle: {
              color: '#294C68',
              width: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#294C68',
              width: 1
            }
          },
          indicator: this.dataAll.economyData.type
        },
        series: [{
          name: 'name',
          type: 'radar',
          itemStyle: {
            emphasis: {
              lineStyle: {
                width: 1
              }
            }
          },
          data: [
            {
              value: this.dataAll.economyData.data[0].value,
              name: this.dataAll.economyData.data[0].name,
              lineStyle: {
                color: '#01EEF7',
                width: 1
              },
              itemStyle: {
                normal: {
                  color: '#01EEF7',
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(1,238,247,0.3)'
                }
              }
            },
            {
              value: this.dataAll.economyData.data[1].value,
              name: this.dataAll.economyData.data[1].name,
              lineStyle: {
                color: '#1D54F0',
                width: 1
              },
              itemStyle: {
                normal: {
                  color: '#1D54F0',
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(29,84,240,0.3)'
                }
              }
            },
            {
              value: this.dataAll.economyData.data[2].value,
              name: this.dataAll.economyData.data[2].name,
              lineStyle: {
                color: '#FFAE00',
                width: 1
              },
              itemStyle: {
                normal: {
                  color: '#FFAE00',
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(255,174,0,0.3)'
                }
              }
            },
            {
              value: this.dataAll.economyData.data[3].value,
              name: this.dataAll.economyData.data[3].name,
              lineStyle: {
                color: '#FF5959',
                width: 1
              },
              itemStyle: {
                normal: {
                  color: '#FF5959',
                }
              },
              areaStyle: {
                normal: {
                  color: 'rgba(255,89,89,0.3)'
                }
              }
            }
          ]
          // data: this.dataAll.economyData.data
        }]
      })
      window.onresize = this.economyChart.resize
    },
    initLevelChart() {
      if (this.levelChart) {
        this.levelChart.clear()
      } else {
        this.levelChart = echarts.init(this.$refs.levelChart)
      }
      this.levelChart.setOption({
        color: ['#00F4FD', '#1D54F0', '#FFAE00', '#FF5959'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          icon: "circle",
          orient: 'vertical',
          x: '70%',
          top: 'center',
          itemWidth: 15,
          itemHeight: 12,
          textStyle: { color: '#fff' }
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '20'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.dataAll.levelData
          }
        ]
      })
      window.onresize = this.levelChart.resize
    },
    initProvinceChart() {
      if (this.provinceChart) {
        this.provinceChart.clear()
      } else {
        this.provinceChart = echarts.init(this.$refs.provinceChart)
      }
      var salvProName = this.dataAll.provinceData.province
      var salvProValue = this.dataAll.provinceData.data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.provinceChart.setOption({
        backgroundColor: "#0B1528",
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '4%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + ' : ' + params[0].value
          }
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: salvProName
        }, {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12'
            }
          },
          data: salvProValue
        }],
        series: [{
          name: '值',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#0A263C'
              }, {
                offset: 1,
                color: '#01EEF7'
              }])
            }
          },
          barWidth: 6,
          data: salvProValue
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: 6,
          barGap: '-100%',
          data: salvProMax,
          itemStyle: {
            normal: {
              color: 'rgba(24,31,68,0.5)',
              barBorderRadius: 10,
            }
          }
        }
        ]
      })
      window.onresize = this.provinceChart.resize
    },
    //地图参数配置                 
    getMapOpt(place) {
      let option = { // 进行相关配置               
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            let data = params.data
            let toolTiphtml = ''
            toolTiphtml += `
              <div style="text-align:left;">
                <span>参考位置：</span><span>${data.location}</span>
              </div>
              <div style="text-align:left;">
                <span>发震时刻：</span><span>${data.time}</span>
              </div>
              <div style="text-align:left;">
                <span>经度：</span><span>${data.longitude}</span>
              </div>
              <div style="text-align:left;">
                <span>纬度：</span><span>${data.latitude}</span>
              </div>
              <div style="text-align:left;">
                <span>深度：</span><span>${data.depth}</span><span>km</span>
              </div>
              <div style="text-align:left;">
                <span>震级：</span><span>${data.level}</span>
              </div>`
            return toolTiphtml
          }
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          precision: 1,
          itemWidth: 12,
          itemHeight: 12,
          pieces: [
            {
              min: 3.0,
              max: 3.9
            },
            {
              min: 4.0,
              max: 4.9
            },
            {
              min: 5.0,
              max: 5.9
            },
            {
              min: 6.0
            }
          ],
          showLabel: true,
          text: ['震级'],
          textStyle: {
            color: '#fff'
          },
          calculable: true,
          inRange: {
            color: ['#01EEF7', '#1D54F0', '#FFAE00', '#FF5959']
          }
        },
        backgroundColor: '#060d1f',
        geo: { // 这个是重点配置区
          map: place ? place : 'china', // 表示中国地图
          roam: false,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: '#fff',
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#2F7597',
              borderColor: '#0D1F31'
            },
            emphasis: {
              areaColor: '#085d82'
            }
          }
        },
        series: [
          {
            name: '城市',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertMapData(this.dataAll.mapData),
            symbolSize: function (val) {
              return val[2] * 3
            },
            roam: false,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              },
            },
            itemStyle: {
              normal: {
                color: '#ffc107'
              }
            }
          },
          {
            name: '当前地震',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            roam: false,
            data: convertMapData(this.dataAll.currentEQData),
            symbolSize: function (val) {
              return val[2] * 3
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#FF5959',
                shadowBlur: 200,
                shadowColor: 'rgba(255,89,89,0.3)'
              }
            },
            zlevel: 1
          }
        ]
      }
      return option
    },
    //用于在省级地图,点击空白处返回全国地图,这里要根据自己的业务数据来判断是否返回
    showChinaMap() {
      // this.map.dispose()
      this.initMap()
    },
    //显示各省地图
    getProvinceMap(province) {
      this.$http({
        url: '../../static/province/' + province + '.json',
        method: 'get',
        headers: { 'content-Type': 'x-www-form-urlencoded' }
      }).then(res => {
        this.map.dispose()
        echarts.registerMap(province, res.data)  //注册省级地图
        this.initMap(province)
        this.$store.state.ievar.ieVarData.nationalShow = false
        this.$store.state.ievar.ieVarData.provinceShow = true
        this.$store.state.ievar.ieVarData.earthquakeShow = false
      })
    },
    initMap(place) {
      this.map = echarts.init(document.getElementById("mapid"))
      window.onresize = this.map.resize
      // this.map.showLoading()   //加动画效果
      let option = this.getMapOpt(place)
      if (option && typeof option === "object") {
        this.map.setOption(option, true)
        setTimeout(() => {
          this.map.hideLoading()
        }, 500)
      }
      this.map.on('click', (param) => {
        console.log(param)
        if (param.seriesType == 'effectScatter') {
          this.go2Earthquake()
        }
        event.stopPropagation()// 阻止冒泡
        // 找到省份名
        let provinceIndex = this.provincesText.findIndex(x => {
          this.$store.state.ievar.ieVarData.provinceName = x
          return param.name === x
        })
        if (provinceIndex === -1) {
          // 没找到省份名,代表进入到了市图层,这里可以放业务代码
          return
        } else {
          this.province = this.provinces[provinceIndex]
          this.$store.state.ievar.ieVarData.provinceEnName = this.province
          // 重新渲染各省份地图
          this.getProvinceMap(this.province)

        }
      })
    },
    sendAlert(e) {
      alert('alert')
    },
    go2Earthquake() {
      this.$store.state.ievar.ieVarData.nationalShow = false
      this.$store.state.ievar.ieVarData.provinceShow = false
      this.$store.state.ievar.ieVarData.earthquakeShow = true
      this.$store.state.ievar.ieVarData.provinceEnName = ''
    }
  }
}
</script>

<style scoped lang="scss">
.BoxWrap {
  position: relative;
  background-color: #0b1528;
  border-radius: 4px;
}
.horn {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0px solid #1cafcc;
}
.horn > div {
  width: 14px;
  height: 14px;
  position: absolute;
  border-radius: 2px;
}
.horn .lt {
  border-top: 2px solid #1cafcc;
  border-left: 2px solid #1cafcc;
  left: 0px;
  top: 0px;
  opacity: 0.3;
}
.horn .rt {
  border-top: 2px solid #1cafcc;
  border-right: 2px solid #1cafcc;
  right: 0px;
  top: 0px;
  opacity: 0.3;
}
.horn .rb {
  border-bottom: 2px solid #1cafcc;
  border-right: 2px solid #1cafcc;
  right: 0px;
  bottom: 0px;
  opacity: 0.3;
}
.horn .lb {
  border-bottom: 2px solid #1cafcc;
  border-left: 2px solid #1cafcc;
  left: 0px;
  bottom: 0px;
  opacity: 0.3;
}
.atagClass {
  font-size: 16px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 400;
  color: rgba(1, 238, 247, 1);
  position: relative;
  cursor: pointer;
}
.ptagClass {
  font-size: 14px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.alertTimeClass {
  font-size: 50px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: bold;
  color: rgba(255, 89, 89, 1);
}
.alertUnitClass {
  font-size: 26px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: bold;
  color: rgba(255, 89, 89, 1);
}
.pbtnClass {
  width: 100px;
  height: 40px;
  background: rgba(29, 84, 240, 1);
  border-radius: 4px;
  // margin: auto;
  position: absolute;
  cursor: pointer;
  left: 65px;
}
.pbtnTextClass {
  font-size: 14px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 40px;
}
.subTitle {
  color: #cdddf7;
  font-size: 18px;
  padding: 5px 20px;
  border-bottom: 1px solid #025bd6;
  text-align: left;
}
.divtop {
  height: 50px;
  background: rgba(10, 38, 60, 1);
  border-radius: 4px;
}
.divTopText {
  font-size: 16px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: bold;
  color: #fff;
  line-height: 50px;
}
.divTopText1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  display: inline-block;
  text-align: center;
}
.divTopText2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  display: inline-block;
  height: 32px;
  line-height: 38px;
  font-size: 14px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  text-align: center;
}
.mainTitle {
  font-size: 30px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 27px;
}
.chartClass {
  height: 280px;
}
.mapClass {
  height: 765px;
}
.centerText {
  color: #cdddf7;
  font-size: 22px;
  padding: 15px 20px;
  text-align: center;
}
</style>