<template>
  <div class="dashboard-container">
    <div class="dashboardIn">
      <div style="height:120px;">
        <div v-if="[1,2, '1', '2'].includes(showPage)" class="dashboardButton">
          <div class="dashboardButtonLeft" @click="tableClick(1)">评价数据</div>
          <div class="dashboardButtonRight" @click="tableClick(2)">项目数据</div>
        </div>
        <div v-if="[3, '3'].includes(showPage)" class="dashboardButtonBack" @click="tableClick(1)">
          <el-button type="primary" size="mini" @click="tableClick(1)">返回</el-button>
          <el-button type="primary" size="mini" @click="logout">退出</el-button>
        </div>
        <div class="dashboardInDate">
          <div style="font-size:14px;margin-right:10px;">时间</div>
          <el-date-picker v-model="effectiveStartTime" class="dashboardInDateTime" prefix-icon="el-icon-s-grid" :clearable="false" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd 00:00:00" :picker-options="pickerOptionsStart" />
          <el-date-picker v-model="effectiveEntTime" class="dashboardInDateTime" prefix-icon="el-icon-s-grid" :clearable="false" placeholder="选择日期" size="small" value-format="yyyy-MM-dd 00:00:00" :picker-options="pickerOptionsEnd" />
          <el-button type="danger" size="mini">查询信息</el-button>
        </div>
      </div>
      <div v-if="showPage === 1 || showPage === '1'" class="dashboardChart">
        <el-row>
          <el-col :span="9">
            <pie @tableClick="tableClick" />
          </el-col>
          <el-col :span="15">
            <linkMain />
          </el-col>
        </el-row>
      </div>
      <div v-if="showPage === 2 || showPage === '2'" class="dashboardChart">
        <el-row>
          <el-col :span="9">
            <pie2 @tableClick="tableClick" />
          </el-col>
          <el-col :span="15">
            <linkMain2 />
          </el-col>
        </el-row>
      </div>
      <div v-if="showPage === 3 || showPage === '3'">
        <tableList />
      </div>
    </div>
  </div>
</template>

<script>
import pie from './echartsList/pie.vue'
import pie2 from './echartsList/pie2.vue'
import linkMain from './echartsList/linkMain.vue'
import linkMain2 from './echartsList/linkMain2.vue'
import tableList from './tableList/index.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    pie,
    pie2,
    linkMain,
    linkMain2,
    tableList
  },
  data () {
    return {
      // showPage: 1,
      effectiveStartTime: '',
      effectiveEntTime: '',
      pickerOptionsStart: {
        // 开始有效期
        disabledDate: (time) => {
          if (this.effectiveEntTime) {
            return time.getTime() > new Date(this.effectiveEntTime).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        // 结束有效期
        disabledDate: (time) => {
          if (this.effectiveStartTime) {
            return time.getTime() < new Date(this.effectiveStartTime).getTime()
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'showPage'
    ])
  },
  mounted () {
  },
  methods: {
    tableClick (data) {
      this.$store.dispatch('app/setShowPage', data || '1')
      // this.showPage = 3
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>
<style lang="scss">
.dashboard-container {
  .el-input {
    border-radius: 0px;
    width: 140px;
    .el-input__inner {
      border-radius: 0px;
      padding: 0 20px 0 10px;
    }
    .el-input__prefix {
      // display: none;
      left: 113px;
      top: -3px;
      color: #dc2418;
    }
  }
}
</style>
<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  min-height: calc(100vh - 180px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.dashboardChart {
  border-radius: 20px;
  width: 100%;
  height: calc(100vh - 330px);
  background-color: rgba(0, 0, 0, 0.1);
}
.dashboardIn {
  min-height: calc(100vh - 180px);
  width: 100%;
  min-width: 1000px;
  padding: 10px 10%;
}
.dashboardButtonBack {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  color: #555;
  font-size: 16px;
  cursor: pointer;
}
.dashboardButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  color: #fff;
  font-size: 20px;
  margin-left: 15px;
  .dashboardButtonLeft {
    background-color: #dc2418;
    padding: 7px 40px 5px 30px;
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
    cursor: pointer;
  }
  .dashboardButtonRight {
    background-color: #174fa2;
    padding: 7px 30px 5px 40px;
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);
    margin-left: -15px;
    cursor: pointer;
  }
}
.dashboardInDate {
  float: right;
  height: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  .dashboardInDateTime {
    margin: 0 5px;
  }
}
</style>
