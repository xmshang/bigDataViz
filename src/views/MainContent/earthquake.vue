<template>
  <div>
    <!-- 顶部导航 -->
    <div class="navClass">
      <span class="navTitle"
        ><span style="cursor: pointer" @click="goToNational()">中国</span
        ><span> — {{ provinceName }}</span
        ><span style="cursor: pointer" @click="goToNational()">{{
          location
        }}</span></span
      >
    </div>
    <!-- 主体内容区 -->
    <div
      class="leafletClass"
      style="padding: 5px 20px 20px 20px; display: flex"
    >
      <div id="mapid" style="height: 968px; width: 100%"></div>
      <div class="heatmapScale">
        <div
          style="
            display: flex;
            color: #fff;
            justify-content: space-between;
            padding: 4px 10px;
          "
        >
          <div class="heatmapScaleText">颜色对应人口密度</div>
          <div class="heatmapScaleText">人/100平方米</div>
        </div>

        <div
          style="
            display: flex;
            color: #fff;
            justify-content: space-between;
            padding: 10px;
          "
        >
          <div class="heatmapScaleText">0-20</div>
          <div class="heatmapScaleText">21-40</div>
          <div class="heatmapScaleText">41-60</div>
          <div class="heatmapScaleText">61-80</div>
          <div class="heatmapScaleText">81-100</div>
        </div>
      </div>
      <div class="heatmapGradient"></div>
      <div class="mapScale1" v-show="mapScale1">
        <div>
          <div class="heatmapScaleText">程度等级</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 5px 20px;
            "
          >
            <div
              style="
                width: 20px;
                height: 16px;
                background: #ffd2da;
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: #ffbebe;
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: #ff7f7f;
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: #c82828;
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: #a80000;
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: #8c0000;
                border-radius: 2px;
              "
            ></div>
          </div>
          <div
            style="
              display: flex;
              color: #fff;
              justify-content: space-between;
              padding: 2px 20px;
              font-size: 14px;
            "
          >
            <div>6度</div>
            <div>7度</div>
            <div>8度</div>
            <div>9度</div>
            <div>10度</div>
            <div>11度</div>
          </div>
        </div>
      </div>
      <div class="dangerScale" v-show="dangerScale">
        <div>
          <div class="heatmapScaleText">风险等级</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding: 5px 20px;
            "
          >
            <div
              style="
                width: 20px;
                height: 16px;
                background: rgba(255, 89, 89, 0.3);
                border-radius: 2px;
                border: 1px solid #ff5959;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: rgba(255, 174, 0, 0.3);
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: rgba(29, 84, 240, 0.3);
                border-radius: 2px;
              "
            ></div>
            <div
              style="
                width: 20px;
                height: 16px;
                background: rgba(1, 238, 247, 0.3);
                border-radius: 2px;
              "
            ></div>
          </div>
          <div
            style="
              display: flex;
              color: #fff;
              justify-content: space-between;
              padding: 2px 20px;
              font-size: 14px;
            "
          >
            <div>重大</div>
            <div>较大</div>
            <div>一般</div>
            <div>低</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮选择区域 -->
    <div class="btnsArea">
      <div class="eqBtnsclass">
        <el-radio-group
          v-model="radio1"
          size="small"
          style="padding: 10px"
          @change="changeScenario"
        >
          <el-radio-button label="地震预警"></el-radio-button>
          <el-radio-button label="烈度图"></el-radio-button>
          <el-radio-button label="灾情速报"></el-radio-button>
          <el-radio-button label="医院"></el-radio-button>
          <br />
          <el-radio-button label="避难场所"></el-radio-button>
          <el-radio-button label="救援队伍"></el-radio-button>
          <el-radio-button label="危险源"></el-radio-button>
          <el-radio-button label="油气管线"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!-- 地震预警 -->
    <div
      class="eqAlertClass"
      v-show="currentRadio == '地震预警' ? true : false"
    >
      <div class="alertClass1">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
        <div class="alertClass1Text">
          <div>
            发震时刻：<span>{{ currentEQData.time }}</span>
          </div>
          <div>
            <span style="padding-right: 35px"
              >纬度：<span>{{ currentEQData.latitude }}</span></span
            >
            <span style="padding-right: 35px"
              >经度：<span>{{ currentEQData.longitude }}</span></span
            >
            <span style="padding-right: 35px"
              >深度：<span>{{ currentEQData.depth }}</span
              >km</span
            >
            <span
              >震级：<span>{{ currentEQData.level }}</span></span
            >
          </div>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
      <div class="alertClass3">
        <div class="alertClass1Text">
          <span class="alertText1">距离地震来临还有</span
          ><span class="alertText2">{{ currentEQData.alertTime }}</span
          ><span class="pbtnClass"
            ><span class="pbtnTextClass" @click="sendAlert()"
              >发送警报</span
            ></span
          >
        </div>
      </div>
    </div>
    <!-- 烈度图 -->
    <div class="eqAlertClass" v-show="currentRadio == '烈度图' ? true : false">
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 灾情速报 -->
    <div
      class="eqAlertClass"
      v-show="currentRadio == '灾情速报' ? true : false"
    >
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
      <div class="alertClass2" style="height: 92px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">受灾人口（实时）</span>
        </div>
        <div
          class="alertClass1Text"
          style="
            display: flex;
            justify-content: space-between;
            padding-right: 13px;
          "
        >
          <div>
            <p class="redfontClass">{{ disasterPeople.injured }}</p>
            <p>受伤人数</p>
          </div>
          <div>
            <p class="redfontClass">{{ disasterPeople.lost }}</p>
            <p>失踪人数</p>
          </div>
          <div>
            <p class="redfontClass">{{ disasterPeople.dead }}</p>
            <p>死亡人数</p>
          </div>
          <div>
            <p class="yellowfontClass">{{ disasterPeople.homeless }}</p>
            <p>失去住所人数</p>
          </div>
          <div>
            <p class="greenfontClass">{{ disasterPeople.toPlace }}</p>
            <p>需转移安置</p>
          </div>
          <div>
            <p class="bluefontClass">{{ disasterPeople.placed }}</p>
            <p>已转移安置</p>
          </div>
        </div>
      </div>
      <div class="alertClass4">
        <div class="alertClass1Head" style="margin-right: 2px">
          <span style="padding-left: 13px">经济损失（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="economyChart"
          ></div>
        </div>
        <div class="alertClass1Head">
          <span style="padding-left: 13px">地质灾害（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="disasterChart"
          ></div>
        </div>
      </div>
      <div class="alertClass2" style="height: 188px; margin-top: 35px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">当地天气</span>
        </div>
        <!-- 天气曲线图 -->
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding-right: 13px;
            padding-left: 13px;
            color: #fff;
            margin-top: 5px;
          "
        >
          <div v-for="(item, index) in weatherList" :key="index">
            <p style="font-size: 14px">{{ item.date }}</p>
            <p style="font-size: 10px">{{ item.weekday }}</p>
            <p style="font-size: 10px">{{ item.weather }}</p>
          </div>
        </div>
        <div style="height: 88px; width: 506px" ref="weatherChart"></div>
      </div>
      <div
        class="alertClass3"
        style="
          margin-top: 5px;
          height: 110px;
          border-radius: 4px;
          padding-top: 10px;
          padding-bottom: 10px;
        "
      >
        <table style="width: 97%" border="1">
          <tbody class="disasterTableClass">
            <tr>
              <td style="height: 33px">
                <div style="font-size: 12px" class="out">
                  <p style="text-align: right; padding-right: 5px">灾害等级</p>
                  <p style="text-align: left; padding-left: 10px">类型</p>
                </div>
              </td>
              <td>滑坡</td>
              <td>崩塌</td>
              <td>泥石流</td>
              <td>地面塌陷</td>
              <td>地裂缝</td>
              <td>地面沉降</td>
            </tr>
            <tr>
              <td style="height: 33px; text-align: left; padding-left: 5px">
                特大、大
              </td>
              <td>
                <div
                  style="
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #ff5a5a;
                    margin-left: 12px;
                  "
                ></div>
              </td>
              <td>
                <div
                  style="
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #ffae00;
                    margin-left: 12px;
                  "
                ></div>
              </td>
              <td>
                <div>
                  <img
                    src="../../assets/images/triangleB.png"
                    style="height: 35px"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <div>
                  <img
                    src="../../assets/images/greenB.png"
                    style="height: 35px"
                    alt=""
                  />
                </div>
              </td>
              <td rowspan="2">
                <div><img src="../../assets/images/lineS.png" alt="" /></div>
              </td>
              <td rowspan="2">
                <div><img src="../../assets/images/pinkS.png" alt="" /></div>
              </td>
            </tr>
            <tr>
              <td style="height: 33px; text-align: left; padding-left: 5px">
                中、小
              </td>
              <td>
                <div
                  style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #ff5a5a;
                    margin-left: 12px;
                  "
                ></div>
              </td>
              <td>
                <div
                  style="
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #ffae00;
                    margin-left: 12px;
                  "
                ></div>
              </td>
              <td>
                <div>
                  <img src="../../assets/images/triangleS.png" alt="" />
                </div>
              </td>
              <td>
                <div><img src="../../assets/images/greenS.png" alt="" /></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 医院 -->
    <div class="eqAlertClass" v-show="currentRadio == '医院' ? true : false">
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">灾情速报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
      <div class="alertClass4">
        <div class="alertClass1Head" style="margin-right: 2px">
          <span style="padding-left: 13px">震区医疗资源（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="medicalResourceChart"
          ></div>
        </div>
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区各级医院数量（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="hospitalChart"
          ></div>
        </div>
      </div>
      <div class="alertClass2" style="height: 342px; margin-top: 35px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">医院详情</span>
        </div>
        <div class="alertClass1Text" style="padding-right: 13px">
          <p style="height: 28px">
            {{ oneHospitalDetail.name
            }}<span
              style="
                color: #02eef8;
                padding-left: 10px;
                text-decoration: underline;
                cursor: pointer;
              "
              @click="changeHospital()"
              >变换</span
            >
          </p>
          <div style="display: flex">
            <div style="width: 50%">
              医院等级：<span style="color: #a4b1d6">{{
                oneHospitalDetail.type
              }}</span>
            </div>
            <div style="width: 50%">
              占地面积：<span style="color: #a4b1d6">{{
                oneHospitalDetail.area
              }}</span>
            </div>
          </div>
          <div style="display: flex">
            <div style="width: 50%">
              成立时间：<span style="color: #a4b1d6">{{
                oneHospitalDetail.foundTime
              }}</span>
            </div>
            <div style="width: 50%">
              擅长：<span style="color: #a4b1d6">{{
                oneHospitalDetail.expertise
              }}</span>
            </div>
          </div>
          <div>
            <div>
              具体地址：<span style="color: #a4b1d6">{{
                oneHospitalDetail.name
              }}</span>
            </div>
          </div>
          <div style="display: flex; margin-top: 10px">
            <div style="width: 192px; height: 200px" ref="hospitalChart1"></div>
            <div style="width: 280px; height: 200px" ref="hospitalChart2"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 避难场所 -->
    <div
      class="eqAlertClass"
      v-show="currentRadio == '避难场所' ? true : false"
    >
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
      <div class="alertClass4">
        <div class="alertClass1Head" style="margin-right: 2px">
          <span style="padding-left: 13px">震区避难场所情况（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="eqMedicalChart"
          ></div>
        </div>
        <div class="alertClass1Head">
          <span style="padding-left: 13px">各类避难场所数量（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="eqHospitalChart"
          ></div>
        </div>
      </div>
      <div class="alertClass2" style="height: 250px; margin-top: 35px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">避难场所详情</span>
        </div>
        <div class="alertClass1Text">
          <p style="height: 28px">
            {{ oneRefugeDetail.name
            }}<span
              style="
                color: #02eef8;
                padding-left: 10px;
                text-decoration: underline;
                cursor: pointer;
              "
              @click="changeRefuge()"
              >变换</span
            >
          </p>
          <div style="display: flex">
            <div style="width: 50%">
              场所类别：<span style="color: #a4b1d6">{{
                oneRefugeDetail.type1
              }}</span>
            </div>
            <div style="width: 50%">
              场所类型：<span style="color: #a4b1d6">{{
                oneRefugeDetail.type2
              }}</span>
            </div>
          </div>
          <div style="display: flex">
            <div style="width: 50%">
              可容纳人数：<span style="color: #a4b1d6">{{
                oneRefugeDetail.population
              }}</span>
            </div>
            <div style="width: 50%">
              总面积：<span style="color: #a4b1d6">{{
                oneRefugeDetail.area
              }}</span>
            </div>
          </div>
          <div>
            <div>
              建成时间：<span style="color: #a4b1d6">{{
                oneRefugeDetail.foundTime
              }}</span>
            </div>
          </div>
          <div>
            <div>
              具体地址：<span style="color: #a4b1d6">{{
                oneRefugeDetail.location
              }}</span>
            </div>
          </div>
          <div style="margin-top: 30px">
            <span>总容纳人数：</span
            ><span style="font-size: 22px; font-weight: bold">{{
              oneRefugeDetail.totalPPL
            }}</span>
            <el-progress
              :percentage="82"
              :stroke-width="6"
              class="eqprogress"
              style="margin: 5px 0"
            ></el-progress>
            <div>
              <div
                style="
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: #ffae00;
                  border-radius: 5px;
                "
              ></div>
              <span style="padding-left: 5px">已容纳：</span
              ><span style="color: #a4b1d6">{{
                oneRefugeDetail.accepted
              }}</span>
              <div
                style="
                  color: #a4b1d6;
                  margin-left: 20px;
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  background: #1e54f0;
                  border-radius: 5px;
                "
              ></div>
              <span style="padding-left: 5px">还可容纳：</span
              ><span style="color: #a4b1d6">{{ oneRefugeDetail.left }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 救援队伍 -->
    <div
      class="eqAlertClass"
      v-show="currentRadio == '救援队伍' ? true : false"
    >
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
      <div class="alertClass4">
        <div class="alertClass1Head" style="margin-right: 2px">
          <span style="padding-left: 13px">震区救援队伍情况（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="rescueMedicalChart1"
          ></div>
        </div>
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区救援物资数量（最新）</span>
          <div
            class="alertClass4Chart"
            style="height: 158px; width: 252px"
            ref="rescueMedicalChart2"
          ></div>
        </div>
      </div>
      <div class="alertClass2" style="height: 244px; margin-top: 35px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">队伍详情</span>
        </div>
        <div class="alertClass1Text" style="padding-right: 13px">
          <p style="height: 28px">
            {{ oneRescueDetail.name
            }}<span
              style="
                color: #02eef8;
                padding-left: 10px;
                text-decoration: underline;
                cursor: pointer;
              "
              @click="changeRescue()"
              >变换</span
            >
          </p>
          <div style="display: flex">
            <div style="width: 50%">
              队伍类别：<span style="color: #a4b1d6">{{
                oneRescueDetail.type
              }}</span>
            </div>
            <div style="width: 50%">
              场队伍人数：<span style="color: #a4b1d6">{{
                oneRescueDetail.number
              }}</span>
            </div>
          </div>
          <div style="display: flex">
            <div style="width: 50%">
              队伍所属：<span style="color: #a4b1d6">{{
                oneRescueDetail.belongTo
              }}</span>
            </div>
            <div style="width: 50%">
              成立时间：<span style="color: #a4b1d6">{{
                oneRescueDetail.foundTime
              }}</span>
            </div>
          </div>
          <div>
            <div>
              人员组成：<span style="color: #a4b1d6">{{
                oneRescueDetail.member
              }}</span>
            </div>
          </div>
          <div>
            <div>
              装备配置：<span style="color: #a4b1d6">{{
                oneRescueDetail.equipment
              }}</span>
            </div>
          </div>
          <div>
            <div>
              救援经验：<span style="color: #a4b1d6">{{
                oneRescueDetail.experience
              }}</span>
            </div>
          </div>
          <div>
            <div>
              具体地址：<span style="color: #a4b1d6">{{
                oneRescueDetail.location
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 危险源 -->
    <div class="eqAlertClass" v-show="currentRadio == '危险源' ? true : false">
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 油气管线 -->
    <div
      class="eqAlertClass"
      v-show="currentRadio == '油气管线' ? true : false"
    >
      <div class="alertClass1" style="height: 30px">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">现在是：{{ dateTime }}</span>
        </div>
      </div>
      <div class="alertClass2">
        <div class="alertClass1Head">
          <span style="padding-left: 13px">震区新闻播报（实时）</span>
        </div>
        <div class="earthquakeSidebar" style="height: 110px">
          <div
            class="alertClass1Text"
            style="padding-top: 0px"
            v-for="(item, index) in realtimeNewsData"
            :key="index"
          >
            <p class="newsClass">{{ item.news }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
// import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'
import echarts from 'echarts'
import { getOneEarthquakeData } from '@/api/home'
// import { convertMapData } from '@/utils/datetime'
import { projectBaseUrl } from '@/utils/global'
export default {
  data() {
    return {
      location: '',
      dateTime: '',
      radio1: '地震预警',
      currentRadio: '地震预警',
      latestEQTitle: ['震级(M)', '发震时刻(UTC+8)', '纬度(°) ', '经度(°) ', '深度(km) ', '参考位置'],
      latestEQData: [],
      economyChart: null,
      disasterChart: null,
      weatherChart: null,
      medicalResourceChart: null,
      hospitalChart: null,
      hospitalChart1: null,
      hospitalChart2: null,
      eqMedicalChart: null,
      eqHospitalChart: null,
      rescueMedicalChart1: null,
      rescueMedicalChart2: null,
      weatherList: [
        // {date: '07月16日', weekday: '星期四', weather: '晴'},
        // {date: '07月17日', weekday: '星期五', weather: '晴'},
        // {date: '07月18日', weekday: '星期六', weather: '晴'},
        // {date: '07月19日', weekday: '星期日', weather: '晴'},
        // {date: '07月20日', weekday: '星期一', weather: '晴'},
        // {date: '07月21日', weekday: '星期二', weather: '晴'},
        // {date: '07月22日', weekday: '星期三', weather: '晴'}
      ],
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
      provinceName: '',
      province: '', //记录进入的省级地图名称
      arrName: '',
      arrValue: '',
      sumValue: '',
      objData: '',
      optionData: '',
      mapScale1: false,
      dangerScale: false,
      polygon: null,
      polygonL1: null,
      polygonL2: null,
      polygonL3: null,
      polygonL4: null,
      marker: null,
      circle1: null,
      circle2: null,
      circle3: null,
      circle4: null,
      mapInstance: null,
      hospitalOpts: null,
      // ======================
      heatMapData: [],
      currentEQData: [],
      warningPolygonData: [],
      realtimeNewsData: [],
      intensityPolygonData: {},
      hospitalMapMarker: [],
      refugeMapMarker: [],
      rescueMapMarker: [],
      dangerPolygonData: [],
      disasterData: [],
      refugeData: [],
      rescueData: [],
      disasterPeople: {},
      oneHospitalDetail: {},
      oneRefugeDetail: {},
      oneRescueDetail: {}
    }
  },
  watch: {
    currentDateTime(newVal, oldVal) {
      this.dateTime = newVal
    }
  },
  computed: {
    currentDateTime() {
      return this.$store.state.ievar.ieVarData.currentDateTime
    }
  },
  mounted() {
    this.dateTime = this.$store.state.ievar.ieVarData.currentDateTime
    if (this.$store.state.ievar.ieVarData.provinceName = '') {
      this.provinceName = ''
    } else {
      this.provinceName = this.$store.state.ievar.ieVarData.provinceName
    }
    if (this.provinceName == '北京' || this.provinceName == '上海' || this.provinceName == '天津' || this.provinceName == '重庆') {
      this.subTitleText = '全市各区'
      this.subTitleText1 = '全市'
    } else {
      this.subTitleText = '全省各市'
      this.subTitleText1 = '全省'
    }
    // this.getOneEarthquakeData()
    this.getPageData()
  },
  methods: {
    getPageData() {
      this.$http({
        url: projectBaseUrl + 'static/earthquake.json',
        method: 'get',
        headers:{ 'content-Type':'x-www-form-urlencoded' }
      }).then(response => {
          this.dataAll = response.data.data
          this.location = response.data.data.currentEQData[0].location
          this.heatMapData = this.dataAll.heatMapData
          this.currentEQData = this.dataAll.currentEQData[0]
          this.realtimeNewsData = this.dataAll.realtimeNewsData
          this.warningPolygonData = this.dataAll.warningPolygonData
          this.intensityPolygonData = this.dataAll.intensityPolygonData
          this.hospitalMapMarker = this.dataAll.hospitalData.hospitalMapMarker
          this.hospitalData = this.dataAll.hospitalData
          this.refugeMapMarker = this.dataAll.refugeData.refugeMapMarker
          this.rescueMapMarker = this.dataAll.rescueData.rescueMapMarker
          this.dangerPolygonData = this.dataAll.dangerPolygonData
          this.disasterData = this.dataAll.disasterData
          this.refugeData = this.dataAll.refugeData
          this.rescueData = this.dataAll.rescueData
          this.weatherList = this.dataAll.disasterData.weather[0].weatherList
          this.disasterPeople = this.dataAll.disasterData.population[0]
          this.oneHospitalDetail = this.dataAll.hospitalData.hospitalDetail
          this.oneRefugeDetail = this.dataAll.refugeData.refugeDetail
          this.oneRescueDetail = this.dataAll.rescueData.rescueDetail

          this.initBaiduMap()

          this.initEconomyChart()
          this.initDisasterChart()
          this.initWeatherChart()
          this.initMedicalResourceChart()
          this.initHospitalChart()
          this.initHospitalChart1()
          this.initHospitalChart2()
          this.initEQMedicalChart()
          this.initEQHospitalChart()
          this.initRescueMedicalChart1()
          this.initRescueMedicalChart2()
      })
    },
    getOneEarthquakeData() {
      let param = {
        earthquakeTime: sessionStorage.getItem('currentEQTime'),
        location: '北京市东城区',
        startDate: '2015',
        endDate: '2020'
      }
      // this.location = '北京市东城区'
      const rLoading = this.openLoading()
      getOneEarthquakeData(param).then(response => {
        if (response.code === 200) {
          if (response.data == {}) {
            return false
          }
          // console.log(response.data)

          this.dataAll = response.data
          this.location = response.data.currentEQData[0].location
          this.heatMapData = this.dataAll.heatMapData
          this.currentEQData = this.dataAll.currentEQData[0]
          this.realtimeNewsData = this.dataAll.realtimeNewsData
          this.warningPolygonData = this.dataAll.warningPolygonData
          this.intensityPolygonData = this.dataAll.intensityPolygonData
          this.hospitalMapMarker = this.dataAll.hospitalData.hospitalMapMarker
          this.hospitalData = this.dataAll.hospitalData
          this.refugeMapMarker = this.dataAll.refugeData.refugeMapMarker
          this.rescueMapMarker = this.dataAll.rescueData.rescueMapMarker
          this.dangerPolygonData = this.dataAll.dangerPolygonData
          this.disasterData = this.dataAll.disasterData
          this.refugeData = this.dataAll.refugeData
          this.rescueData = this.dataAll.rescueData
          this.weatherList = this.dataAll.disasterData.weather[0].weatherList
          this.disasterPeople = this.dataAll.disasterData.population[0]
          this.oneHospitalDetail = this.dataAll.hospitalData.hospitalDetail
          this.oneRefugeDetail = this.dataAll.refugeData.refugeDetail
          this.oneRescueDetail = this.dataAll.rescueData.rescueDetail
          // this.oneHospitalDetail = this.dataAll.hospitalData.hospitalDetail[0]
          // this.oneRefugeDetail = this.dataAll.refugeData.refugeDetail[0]
          // this.oneRescueDetail = this.dataAll.rescueData.rescueDetail[0]

          this.initBaiduMap()

          this.initEconomyChart()
          this.initDisasterChart()
          this.initWeatherChart()
          this.initMedicalResourceChart()
          this.initHospitalChart()
          this.initHospitalChart1()
          this.initHospitalChart2()
          this.initEQMedicalChart()
          this.initEQHospitalChart()
          this.initRescueMedicalChart1()
          this.initRescueMedicalChart2()
        } else {
          this.$message.error('获取数据失败')
          console.log('未获取到数据')
        }
      })
      rLoading.close()
    },
    initBaiduMap() {
      var map = new BMap.Map("mapid", { mapType: BMAP_HYBRID_MAP }) // 创建地图实例
      this.mapInstance = map
      var point = new BMap.Point(116.418261, 39.921984)
      map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
      // // 初始化地图， 设置中心点坐标和地图级别
      // var zoomCtrl = new BMap.ZoomControl({anchor: BMAP_ANCHOR_TOP_RIGHT, offset: new BMap.Size(20, 20)});
      // map.addControl(zoomCtrl);
      //添加地图类型控件
      map.addControl(new BMap.MapTypeControl({
        mapTypes: [
          BMAP_NORMAL_MAP,
          BMAP_HYBRID_MAP
        ]
      }))
      map.enableScrollWheelZoom() // 允许滚轮缩放

      // 创建polygon - 地震预警
      this.addEQWarning(map)
      // 热力图
      this.addHeatmap(map)
      // 设置热力图颜色
      // this.setGradient()
    },
    // 热力图
    addHeatmap(map) {
      var points = this.heatMapData
      if (!this.isSupportCanvas()) {
        alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
      }
      var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 })
      map.addOverlay(heatmapOverlay)
      heatmapOverlay.setDataSet({ data: points, max: 100 })
      heatmapOverlay.show()
    },
    // 地震预警
    addEQWarning(map) {
      let polygonData = this.warningPolygonData
      let polygonArr = []
      for (var i = 0; i < polygonData.length; i++) {
        let polygon = new BMap.Point(polygonData[i].lng, polygonData[i].lat)
        polygonArr.push(polygon)
      }
      this.polygon = new BMap.Polygon(polygonArr, { strokeColor: "#FF5959", strokeWeight: 0, strokeOpacity: 0.4, fillColor: '#FF5959', fillOpacity: 0.4 })  //创建多边形
      map.addOverlay(this.polygon)
      this.polygon.show()
    },
    // 烈度图
    addLieduMap(map) {
      let intensityData = this.intensityPolygonData

      var arr = Object.keys(intensityData)
      var len = arr.length
      console.log(len)
      for (let key in intensityData) {
        let polygonData = intensityData[key]
        console.log(polygonData)
        let polygonArr = []
        for (let j = 0; j < polygonData.length; j++) {
          let polygon = new BMap.Point(polygonData[j].lng, polygonData[j].lat)
          polygonArr.push(polygon)
          this.polygon[key] = new BMap.Polygon(polygonArr, { strokeColor: "#8C0000", strokeWeight: 0, strokeOpacity: 0, fillColor: '#8C0000', fillOpacity: key * 0.2 })  //创建多边形   
        }
        map.addOverlay(this.polygon[key])
      }
    },
    // 医院
    addHospitalMarker(map) {
      var data_info = this.hospitalMapMarker
      this.hospitalOpts = {
        width: 200, // 信息窗口宽度
        height: 30, // 信息窗口高度
        title: "", //信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      }
      var myIcon = new BMap.Icon("../static/hospital.png", new BMap.Size(40, 53))
      for (var i = 0; i < data_info.length; i++) {
        this.marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]), { icon: myIcon }) // 创建标注
        var content = data_info[i][2]
        map.addOverlay(this.marker) // 将标注添加到地图中
        this.addClickHandler(map, content, this.marker)
      }
      // // 随机向地图添加25个标注
      // var bounds = map.getBounds()
      // var sw = bounds.getSouthWest()
      // var ne = bounds.getNorthEast()
      // var lngSpan = Math.abs(sw.lng - ne.lng)
      // var latSpan = Math.abs(ne.lat - sw.lat)

      // for (var i = 0; i < 25; i ++) {
      //   var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7))
      //   var myIcon = new BMap.Icon("../static/hospital.png", new BMap.Size(40,53))
      //   this.marker = new BMap.Marker(point,{icon:myIcon})
      //   map.addOverlay(this.marker)
      // }
    },
    addClickHandler(map, content, marker) {
      marker.addEventListener("click", function (e) {
        var p = e.target
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
        var infoWindow = new BMap.InfoWindow(content, this.hospitalOpts)  // 创建信息窗口对象 
        map.openInfoWindow(infoWindow, point) //开启信息窗口
      })
    },
    // 避难场所
    addRefugeMap(map) {
      var data_info = this.refugeMapMarker
      this.hospitalOpts = {
        width: 200, // 信息窗口宽度
        height: 30, // 信息窗口高度
        title: "", //信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      }
      var myIcon = new BMap.Icon("../static/refuge.png", new BMap.Size(40, 53))
      for (var i = 0; i < data_info.length; i++) {
        this.marker = new BMap.Marker(new BMap.Point(data_info[i][1], data_info[i][0]), { icon: myIcon }) // 创建标注
        var content = data_info[i][2]
        map.addOverlay(this.marker) // 将标注添加到地图中
        this.addClickHandler(map, content, this.marker)
      }
    },
    // 救援队伍
    addRescueMap(map) {
      var data_info = this.rescueMapMarker
      this.hospitalOpts = {
        width: 200, // 信息窗口宽度
        height: 30, // 信息窗口高度
        title: "", //信息窗口标题
        enableMessage: true //设置允许信息窗发送短息
      }
      var myIcon = new BMap.Icon("../static/rescue.png", new BMap.Size(40, 53))
      for (var i = 0; i < data_info.length; i++) {
        this.marker = new BMap.Marker(new BMap.Point(data_info[i][1], data_info[i][0]), { icon: myIcon }) // 创建标注
        var content = data_info[i][2]
        map.addOverlay(this.marker) // 将标注添加到地图中
        this.addClickHandler(map, content, this.marker)
      }
    },
    dangerSourceMap(map) {
      let polygonData = this.dangerPolygonData
      // 危险源
      var strokeColorArr = ["#FF5959", "#FFAE00", "#1D54F0", "#01EEF7"]
      for (let i = 0; i < polygonData.length; i++) {
        let data = polygonData[i]
        this.circle = new BMap.Circle(new BMap.Point(data.polygon.lng, data.polygon.lat), data.polygonRadius, { strokeColor: strokeColorArr[i], strokeWeight: 0, strokeOpacity: 0.5, fillColor: strokeColorArr[i], fillOpacity: 0.5 })
        map.addOverlay(this.circle)
      }
    },
    initDisasterChart() {
      if (this.disasterChart) {
        this.disasterChart.clear()
      } else {
        this.disasterChart = echarts.init(this.$refs.disasterChart)
      }
      var salvProName = this.disasterData.geology[0].label
      var salvProValue = this.disasterData.geology[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.disasterChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        fillOpacity: 0.8,
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
            // rotate: '320'
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '次',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.disasterChart.resize
    },
    initWeatherChart() {
      if (this.weatherChart) {
        this.weatherChart.clear()
      } else {
        this.weatherChart = echarts.init(this.$refs.weatherChart)
      }
      this.weatherChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        fillOpacity: 0.8,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          top: '25%',
          left: '8%',
          right: '8%',
          bottom: '21%'
        },
        xAxis: [{
          type: 'category',
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          boundaryGap: false,
          data: this.disasterData.weather[0].label
        }],
        yAxis: [{
          type: 'value',
          // min: 0,
          splitNumber: 3,
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false,
            // margin: 5,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '最高气温',
          type: 'line',
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: "#FF5959",
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#FFF',
            }
          },
          itemStyle: {
            color: "#080b30",
            borderColor: "#FF5959",
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetY: 0,
            shadowOffsetX: 0
          },
          tooltip: {
            show: false
          },
          data: this.disasterData.weather[0].tempHigh
        },
        {
          name: '最低气温',
          type: 'line',
          showAllSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            normal: {
              color: "#1D54F0",
              shadowBlur: 0,
              shadowOffsetY: 0,
              shadowOffsetX: 0
            }
          },
          label: {
            show: true,
            position: 'bottom',
            textStyle: {
              color: '#FFF',
            }
          },
          itemStyle: {
            color: "#080b30",
            borderColor: "#1D54F0",
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetY: 0,
            shadowOffsetX: 0
          },
          tooltip: {
            show: false
          },
          data: this.disasterData.weather[0].tempLow
        }]
      })
      window.onresize = this.weatherChart.resize
    },
    initEconomyChart() {
      if (this.economyChart) {
        this.economyChart.clear()
      } else {
        this.economyChart = echarts.init(this.$refs.economyChart)
      }
      var salvProName = this.disasterData.economy[0].label
      var salvProValue = this.disasterData.economy[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.economyChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
            // rotate: '320'
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '万',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.economyChart.resize
    },
    initMedicalResourceChart() {
      if (this.medicalResourceChart) {
        this.medicalResourceChart.clear()
      } else {
        this.medicalResourceChart = echarts.init(this.$refs.medicalResourceChart)
      }
      try {
        var salvProName = this.hospitalData.medicalResource[0].label
        var salvProValue = this.hospitalData.medicalResource[0].data
      } catch (err) {
        var salvProName = []
        var salvProValue = []
      }
      // var salvProName = this.hospitalData.medicalResource[0].label
      // var salvProValue = this.hospitalData.medicalResource[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.medicalResourceChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '个数',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.medicalResourceChart.resize
    },
    initHospitalChart() {
      if (this.hospitalChart) {
        this.hospitalChart.clear()
      } else {
        this.hospitalChart = echarts.init(this.$refs.hospitalChart)
      }
      var salvProName = this.hospitalData.hospitalNumber[0].label
      var salvProValue = this.hospitalData.hospitalNumber[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.hospitalChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '所',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.hospitalChart.resize
    },
    initHospitalChart1() {
      if (this.hospitalChart1) {
        this.hospitalChart1.clear()
      } else {
        this.hospitalChart1 = echarts.init(this.$refs.hospitalChart1)
      }
      try {
        var salvProName = this.hospitalData.hospitalDetail[0].hospitalData[0].label
        var salvProValue = this.hospitalData.hospitalDetail[0].hospitalData[0].data
      } catch (err) {
        var salvProName = []
        var salvProValue = []
      }
      // var salvProName = this.hospitalData.hospitalDetail[0].hospitalData[0].label
      // var salvProValue = this.hospitalData.hospitalDetail[0].hospitalData[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.hospitalChart1.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '15%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '（情况）',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.hospitalChart1.resize
    },
    initHospitalChart2() {
      if (this.hospitalChart2) {
        this.hospitalChart2.clear()
      } else {
        this.hospitalChart2 = echarts.init(this.$refs.hospitalChart2)
      }
      try {
        var salvProName = this.hospitalData.hospitalDetail[0].officeData[0].label
        var salvProValue = this.hospitalData.hospitalDetail[0].officeData[0].data
      } catch (err) {
        var salvProName = []
        var salvProValue = []
      }
      // var salvProName = this.hospitalData.hospitalDetail[0].officeData[0].label
      // var salvProValue = this.hospitalData.hospitalDetail[0].officeData[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.hospitalChart2.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '10%',
          right: '2%',
          bottom: '10%',
          top: '15%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '（各科室医护人数）',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.hospitalChart2.resize
    },
    initEQMedicalChart() {
      if (this.eqMedicalChart) {
        this.eqMedicalChart.clear()
      } else {
        this.eqMedicalChart = echarts.init(this.$refs.eqMedicalChart)
      }
      // var salvProName = ["避难场所人数","可容纳总人数","一类场所数量","二类场所数量","三类场所数量"]
      // var salvProValue = [20, 45, 35, 10, 20]
      var salvProName = this.refugeData.medicalResource[0].label
      var salvProValue = this.refugeData.medicalResource[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.eqMedicalChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: 'x',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.eqMedicalChart.resize
    },
    initEQHospitalChart() {
      if (this.eqHospitalChart) {
        this.eqHospitalChart.clear()
      } else {
        this.eqHospitalChart = echarts.init(this.$refs.eqHospitalChart)
      }
      // var salvProName = ["学校","公园","体育场","广场","绿地","临时安置点"]
      // var salvProValue = [20, 45, 35, 10, 20, 85]
      var salvProName = this.refugeData.hospitalNumber[0].label
      var salvProValue = this.refugeData.hospitalNumber[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.eqHospitalChart.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '个',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.eqHospitalChart.resize
    },
    initRescueMedicalChart1() {
      if (this.rescueMedicalChart1) {
        this.rescueMedicalChart1.clear()
      } else {
        this.rescueMedicalChart1 = echarts.init(this.$refs.rescueMedicalChart1)
      }
      // var salvProName = ["队伍总数","队伍人数","现场队伍","抢救队伍","医护人数","专业抢救"]
      // var salvProValue = [20, 45, 35, 10, 20, 85]
      var salvProName = this.rescueData.rescueTeam[0].label
      var salvProValue = this.rescueData.rescueTeam[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.rescueMedicalChart1.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '个数',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.rescueMedicalChart1.resize
    },
    initRescueMedicalChart2() {
      if (this.rescueMedicalChart2) {
        this.rescueMedicalChart2.clear()
      } else {
        this.rescueMedicalChart2 = echarts.init(this.$refs.rescueMedicalChart2)
      }
      // var salvProName = ["侦检设备","搜救设备","营救设备","动力照明","通讯设备","医疗急救","个人装备"]
      // var salvProValue = [20, 45, 35, 10, 20, 85, 15]
      var salvProName = this.rescueData.rescueMaterial[0].label
      var salvProValue = this.rescueData.rescueMaterial[0].data
      var salvProMax = [] //背景按最大值
      for (let i = 0; i < salvProValue.length; i++) {
        salvProMax.push(salvProValue[0])
      }
      this.rescueMedicalChart2.setOption({
        background: 'rgba(12, 22, 40, 0.8)',
        grid: {
          left: '2%',
          right: '5%',
          bottom: '10%',
          top: '20%',
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
          show: true,
          data: salvProName,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            },
            formatter: function (value) { //竖排显示
              return value.split("").join("\n");
            }
          },
          type: 'category'
        },
        yAxis: [{
          type: 'value',
          name: '个数',
          nameTextStyle: {
            color: "#fff"
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitNumber: 3,
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
        }],
        series: [
          {
            name: '值',
            type: 'bar',
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 15,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0A263C'
                }, {
                  offset: 1,
                  color: '#01EEF7'
                }])
              }
            },
            barWidth: 8,
            data: salvProValue
          }
        ]
      })
      window.onresize = this.rescueMedicalChart2.resize
    },
    sendAlert() {
      alert('alert')
    },
    go2Earthquake() {
      this.$store.state.ievar.ieVarData.nationalShow = false
      this.$store.state.ievar.ieVarData.provinceShow = false
      this.$store.state.ievar.ieVarData.earthquakeShow = true
    },
    goToNational() {
      this.$store.state.ievar.ieVarData.nationalShow = true
      this.$store.state.ievar.ieVarData.provinceShow = false
      this.$store.state.ievar.ieVarData.earthquakeShow = false
    },
    getArrayValue(array, key) {
      var key = key || "value";
      var res = [];
      if (array) {
        array.forEach(function (t) {
          res.push(t[key]);
        });
      }
      return res;
    },
    array2obj(array, key) {
      var resObj = {};
      for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
      }
      return resObj;
    },
    getData(data) {
      var res = {
        series: [{
          name: "大环",
          type: 'gauge',
          splitNumber: 15,
          radius: '82%',
          center: ['50%', '55%'],
          startAngle: 90,
          endAngle: -269.9999,
          axisLine: {
            show: false,
            lineStyle: {
              color: [
                [1, '#1f59a7']
              ]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            length: 32,
            lineStyle: {
              color: 'auto',
              width: 3.5
            }
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          }
        },
        {
          name: '小环',
          type: 'gauge',
          splitNumber: 15,
          radius: '78%',
          center: ['50%', '55%'],
          startAngle: 90,
          endAngle: -269.9999,
          axisLine: {
            show: false
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#1f59a7',
              width: 3
            },
            length: 20,
            splitNumber: 5
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          }
        },
        ],
        yAxis: []
      };
      for (let i = 0; i < this.data.length; i++) {
        res.series.push({
          name: '学历',
          type: 'pie',
          clockWise: true,
          z: 2,
          hoverAnimation: false,
          radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
          center: ["50%", "55%"],
          label: {
            show: true,
            formatter: '{d}%',
            color: 'RGB(246,175,101)',
            fontSize: 15,
            position: 'inside'
          },
          labelLine: {
            show: false
          },
          data: [{
            value: this.data[i].value,
            name: this.data[i].name
          }, {
            value: this.sumValue - this.data[i].value,
            name: '',
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            label: {
              show: false
            },
            hoverAnimation: false
          }]
        });
        res.series.push({
          name: '背景线',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: true,
          hoverAnimation: false,
          radius: [71 - i * 15 + '%', 69 - i * 15 + '%'],
          center: ["50%", "55%"],
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            borderWidth: 5,
          },
          data: [{
            value: 100,
            itemStyle: {
              color: "RGB(12,64,128)",
              borderWidth: 0
            },
            tooltip: {
              show: false
            },
            hoverAnimation: false
          }]
        });
        res.yAxis.push(this.data[i].name);
      }
      return res;
    },
    changeScenario(val) {
      this.currentRadio = val
      this.mapScale1 = false
      this.dangerScale = false
      this.mapInstance.clearOverlays()
      if (val == '地震预警') {
        this.addEQWarning(this.mapInstance)
        this.addHeatmap(this.mapInstance)
      } else if (val == '烈度图') {
        this.mapScale1 = true
        this.addHeatmap(this.mapInstance)
        this.addLieduMap(this.mapInstance)
      } else if (val == '灾情速报') {
        this.addEQWarning(this.mapInstance)
        this.addHeatmap(this.mapInstance)
      } else if (val == '医院') {
        this.addEQWarning(this.mapInstance)
        this.addHeatmap(this.mapInstance)
        this.addHospitalMarker(this.mapInstance)
      } else if (val == '避难场所') {
        this.addEQWarning(this.mapInstance)
        this.addHeatmap(this.mapInstance)
        this.addRefugeMap(this.mapInstance)
      } else if (val == '救援队伍') {
        this.addEQWarning(this.mapInstance)
        this.addHeatmap(this.mapInstance)
        this.addRescueMap(this.mapInstance)
      } else if (val == '危险源') {
        this.addHeatmap(this.mapInstance)
        this.dangerSourceMap(this.mapInstance)
        this.dangerScale = true
      } else {
        this.addEQWarning(this.mapInstance)
        this.addHeatmap(this.mapInstance)
      }
    },
    isSupportCanvas() {
      var elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    },
    setGradient() {
      var gradient = {}
      var colors = document.querySelectorAll("input[type='color']")
      colors = [].slice.call(colors, 0)
      colors.forEach(function (ele) {
        gradient[ele.getAttribute("data-key")] = ele.value
      })
      heatmapOverlay.setOptions({ "gradient": gradient })
    },
    changeHospital() {
      console.log('hospital')
    },
    changeRefuge() {
      console.log('refuge')
    },
    changeRescue() {
      console.log('rescue')
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
.newsClass {
  padding: 5 10px;
  color: #fff;
  text-align: left;
  font-size: 14px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
}
.injuredText {
  font-size: 16px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 400;
  color: #fff;
  padding: 20px;
}
.injuredNo {
  font-size: 32px;
  font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
    "SimSun";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
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
.btnsArea {
  width: 506px;
  height: 82px;
  background: #0c1628cc;
  border-radius: 4px 4px 4px 4px;
  position: absolute;
  top: 170px;
  left: 30px;
  z-index: 9999;
}
.mapTileBtnClass {
  position: absolute;
  top: 230px;
  z-index: 9999;
  right: 20px;
}
.eqAlertClass {
  position: absolute;
  top: 255px;
  z-index: 9999;
  left: 30px;
  .alertClass1 {
    width: 506px;
    height: 84px;
    background: #0c1628cc;
    border-radius: 4px;
    .alertClass1Head {
      width: 506px;
      height: 30px;
      background: #0a263c;
      opacity: 1;
      border-radius: 4px;
      font-size: 16px;
      text-align: left;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: bold;
      color: #ffffff;
      line-height: 28px;
    }
    .alertClass1Text {
      padding-left: 13px;
      text-align: left;
      margin-top: 7px;
      font-size: 14px;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: 300;
      color: #ffffff;
      line-height: 20px;
    }
  }
  .alertClass2 {
    width: 506px;
    height: 145px;
    background: #0c1628cc;
    border-radius: 4px;
    margin-top: 5px;
    .alertClass1Head {
      width: 506px;
      height: 30px;
      background: #0a263c;
      border-radius: 4px;
      font-size: 16px;
      text-align: left;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: bold;
      color: #ffffff;
      line-height: 28px;
    }
    .alertClass1Text {
      padding-left: 13px;
      text-align: left;
      margin-top: 7px;
      font-size: 14px;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: 300;
      color: #ffffff;
      line-height: 20px;
      .redfontClass {
        font-size: 22px;
        font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
          sans-serif, "SimSun";
        font-weight: bold;
        color: #ff5a5a;
        line-height: 24px;
        text-align: center;
      }
      .yellowfontClass {
        font-size: 22px;
        font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
          sans-serif, "SimSun";
        font-weight: bold;
        color: #ffae00;
        line-height: 24px;
        text-align: center;
      }
      .greenfontClass {
        font-size: 22px;
        font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
          sans-serif, "SimSun";
        font-weight: bold;
        color: #02eef8;
        line-height: 24px;
        text-align: center;
      }
      .bluefontClass {
        font-size: 22px;
        font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
          sans-serif, "SimSun";
        font-weight: bold;
        color: #1e54f0;
        line-height: 24px;
        text-align: center;
      }
    }
  }
  .alertClass3 {
    width: 506px;
    height: 80px;
    background: #0c1628cc;
    border-radius: 0px 0px 4px 4px;
    margin-top: 5px;
    text-align: left;
    .alertText1 {
      text-align: left;
      font-size: 14px;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: 400;
      color: #ffffff;
      margin-right: 80px;
      padding-left: 13px;
      position: absolute;
      margin-top: 30px;
    }
    .alertText2 {
      font-size: 50px;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: bold;
      color: #ff5a5a;
      margin-left: 150px;
      margin-right: 15px;
      // margin-left: 200px;
      // margin-right: 95px;
      line-height: 75px;
    }
    .pbtnClass {
      width: 100px;
      height: 40px;
      background: #1e54f0;
      border-radius: 4px;
      position: absolute;
      cursor: pointer;
      margin-top: 20px;
    }
    .pbtnTextClass {
      font-size: 14px;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      padding-left: 20px;
      margin-top: 12px;
      position: absolute;
    }
    table {
      border-collapse: collapse;
      border: 1px #585858 solid;
      margin: 0 auto;
    }
    table th,
    td {
      border: 1px #585858 solid;
      text-align: center;
    }
    /*模拟对角线*/
    .out {
      position: relative;
      box-sizing: border-box;
      border: 0px solid #585858;
      text-indent: -3px;
      background: linear-gradient(
        22deg,
        transparent 49.5%,
        #585858 49.5%,
        #585858 50.5%,
        transparent 50.5%
      );
    }
    .disasterTableClass {
      text-align: center;
      padding: 10px;
      color: #fff;
      font-size: 14px;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
    }
  }
  .alertClass4 {
    width: 506px;
    height: 158px;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    .alertClass1Head {
      width: 506px;
      height: 30px;
      background: #0a263c;
      border-radius: 4px;
      font-size: 16px;
      text-align: left;
      font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica,
        sans-serif, "SimSun";
      font-weight: bold;
      color: #ffffff;
      line-height: 28px;
    }
    .alertClass4Chart {
      height: 158px;
      background: #0c1628cc;
      border-radius: 4px;
      margin-top: 2px;
    }
  }
}
.heatmapScale {
  width: 506px;
  height: 74px;
  background: #0b1528;
  opacity: 0.8;
  border-radius: 0px 0px 4px 4px;
  position: absolute;
  right: 30px;
  bottom: 20px;
  margin-top: 42.5%;
  .heatmapScaleText {
    font-size: 14px;
    font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
      "SimSun";
    font-weight: 400;
    color: #ffffff;
    line-height: 27px;
  }
}
.heatmapGradient {
  position: absolute;
  bottom: 50px;
  margin-top: 44.2%;
  right: 45px;
  opacity: 1;
  margin-left: 10px;
  width: 480px;
  height: 10px;
  border-radius: 5px;
  background-image: linear-gradient(
    to right,
    #0000ff,
    #00b750,
    #fff300,
    #ff0f00
  );
}
.mapScale1 {
  width: 310px;
  height: 80px;
  background: #0b1528;
  opacity: 0.8;
  border-radius: 4px;
  position: absolute;
  margin-top: 42%;
  margin-left: 10px;
  .heatmapScaleText {
    text-align: left;
    font-size: 14px;
    font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
      "SimSun";
    font-weight: 400;
    color: #ffffff;
    line-height: 27px;
    padding-left: 10px;
  }
}
.dangerScale {
  width: 210px;
  height: 80px;
  background: #0b1528;
  opacity: 0.8;
  border-radius: 4px;
  position: absolute;
  margin-top: 42%;
  margin-left: 10px;
  .heatmapScaleText {
    text-align: left;
    font-size: 14px;
    font-family: SourceHanFont, Arial, "Microsoft YaHei", Helvetica, sans-serif,
      "SimSun";
    font-weight: 400;
    color: #ffffff;
    line-height: 27px;
    padding-left: 10px;
  }
}
</style>