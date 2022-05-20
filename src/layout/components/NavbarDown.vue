<template>
  <div class="navbarDown">
    <div class="navbarDownText-container">
      <div class="navbarDownText">鞍山市消防执法营商环境监督系统综合数据分析</div>
    </div>
    <div class="navbarDownTextLeft">THE FIRE RESCUE</div>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.navbarDown {
  position: relative;
  text-align: center;
  height: 40px;
  background-color: #174fa2;
}
.navbarDownText-container {
  position: absolute;
  transform: translate(-50%, 0);
  width: 830px;
  left: 50%;
  font-size: 34px;
  color: #fff;
  background-color: #174fa2;
  line-height: 65px;
  -webkit-clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
  font-family: Source-Han-Serif-CN-Bold;
}
.navbarDownTextLeft {
  position: absolute;
  color: #fff;
  right: 1%;
  font-size: 18px;
  line-height: 40px;
}
</style>
