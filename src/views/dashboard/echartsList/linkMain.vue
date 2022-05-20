<template>
  <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
    <div id="logLinkMain" ref="chartLogLink" style="width:100%; height:calc(100vh - 450px);" />
    <div class="pieTitle">
      <el-divider class="pieTitleText" content-position="center">反馈问题对比图</el-divider>
      <div class="pieTitleLeft" />
      <div class="pieTitleRight" />
    </div>
  </div>
</template>

<script>
import resize from '@/components/mixins/resize'
export default {
  mixins: [resize],
  data () {
    return {
      chart: null,
      trendLineData: [],
      timeList: [],
      titleData: ['铁东区消防救援大队', '铁西区消防救援大队', '立山区消防救援大队', '千山区消防救援大队', '钢都消防救援大队'],
      logPieData: {
        name: ['好', '较好', '一般', '差'],
        data: [
          { name: '好', value: 20 },
          { name: '较好', value: 60 },
          { name: '一般', value: 80 },
          { name: '差', value: 80 }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
      // .then(res => {
      // this.listData()
      // })
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // listData (val) {
    //   logLevel().then(res => {
    //     if (res.status === 0) {
    //       this.logPieList = res.info
    //       this.logPieData.name = []
    //       this.logPieData.data = []
    //       for (const item in res.info) {
    //         this.logPieData.name.push(item)
    //         this.logPieData.data.push({ name: item, value: res.info[item] })
    //       }
    //       this.chartPie.setOption(this.option(this.logPieData), true)
    //     }
    //   })
    // },
    option (val, time, title) {
      var data = {
        color: ['#cb7e62', '#8dc1aa', '#b73630', '#2c4353', '#d87a80',
          '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
          '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
          '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'],
        title: {
          // text: '日志趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%', // 左边距
          right: '2%', // 走边距
          top: '25%', // 上边距
          bottom: '5%', // 下边距
          containLabel: true
        },
        legend: {
          type: 'scroll',
          itemGap: 15,
          data: title
          // data: ['PLC设备1', 'PLC设备2', 'PLC设备3', 'PLC设备4', 'PLC设备5']
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          splitLine: { // 去除网格线
            show: false
          },
          axisLabel: {
            rotate: 50,
            textStyle: {
              // 文字样式
              color: '#000',
              size: '16px'
            }
          },
          data: ['特勤大队', '铁东大队', '铁西大队', '立山大队', '千山大队', '海城大队', '台安大队', '岫岩大队', '高新大队', '钢都大队', '鞍矿大队']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            // 去除网格线
            show: false
          }
          // name: 'kwh'
        },
        series: [
          {
            name: '好',
            type: 'bar',
            barGap: 0,
            barWidth: 5,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 320, 332, 301, 334, 390, 320]
          },
          {
            name: '较好',
            type: 'bar',
            barWidth: 5,
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 220]
          },
          {
            name: '一般',
            type: 'bar',
            barWidth: 5,
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 150, 232, 201, 154, 190, 150]
          },
          {
            name: '差',
            type: 'bar',
            barWidth: 5,
            emphasis: {
              focus: 'series'
            },
            data: [98, 77, 101, 99, 40, 98, 77, 101, 99, 40, 98]
          }
        ]
      }
      return data
    },
    initChart (data) {
      this.chart = this.$echarts.init(document.getElementById('logLinkMain'))
      this.chart.setOption(this.option(this.trendLineData, this.timeList, this.titleData), true)
      // return Promise.resolve('seccess')
    }
  }
}
</script>
<style lang="scss">
.pieTitle {
  position: relative;
  width: 350px;
  .el-divider {
    background-color: #174fa2;
  }
  .el-divider__text {
    background-color: #174fa2;
    border: 1px solid #dc2418;
    color: #fff;
    line-height: 20px;
  }
}
.pieTitleLeft {
  position: absolute;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  left: 1%;
  top: 50%;
  transform: translate(-100%, -50%);
  background-color: #dc2418;
}
.pieTitleRight {
  position: absolute;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  top: 50%;
  right: 1%;
  transform: translate(100%, -50%);
  background-color: #dc2418;
}
</style>
