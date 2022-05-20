<template>
  <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
    <div id="logPieMain2" ref="chartLogPie" style="width:100%; height:calc(100vh - 450px);" />
    <div class="pieTitle">
      <el-divider class="pieTitleText" content-position="center">反馈问题分析图</el-divider>
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
      chartPie: null,
      logPieList: null,
      logPieData: {
        name: ['行政许可', '行政处罚', '火灾调查', '监督检查'],
        data: [
          { name: '行政许可', value: 20 },
          { name: '行政处罚', value: 60 },
          { name: '火灾调查', value: 80 },
          { name: '监督检查', value: 80 }
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
    if (!this.chartPie) {
      return
    }
    this.chartPie.dispose()
    this.chartPie = null
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
    option (val) {
      var data = {
        color: ['#966135', '#009946', '#e5007f', '#f8b62a', '#d87a80',
          '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
          '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
          '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'],
        title: {
          // text: '',
          // subtext: '',
          // left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 50,
          // top: 20,
          bottom: '20%',
          itemGap: 15,
          data: val.name,
          selected: val.name
        },
        labelLine: {
          show: false
        },
        series: {
          name: '评价数据',
          type: 'pie',
          radius: '60%',
          center: ['60%', '50%'],
          data: val.data,
          label: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      }
      return data
    },
    initChart (val) {
      this.chartPie = this.$echarts.init(document.getElementById('logPieMain2'))
      this.chartPie.setOption(this.option(this.logPieData), true)
      const _that = this
      this.chartPie.on('click', function (params) {
        _that.$emit('tableClick', 3)
      })
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
