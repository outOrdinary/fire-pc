<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="breadcrumb-container">
      <el-image style="width:60px;margin-right:5px;" :src="require('@/assets/img/logo.jpeg')" fit="fill" />
      <div class="navbarText">消防执法营商环境监督系统</div>
    </div>
    <div class="right-menu">
      <el-image :src="require('@/assets/img/newW.png')" style="height:60px;margin:25px;" fit="fill" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    // toggleSideBar () {
    //   this.$store.dispatch('app/toggleSideBar')
    // },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 120px;
  overflow: hidden;
  position: relative;
  background: #dc2418;

  .breadcrumb-container {
    float: left;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 25px;
    .navbarText {
      font-size: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: Source-Han-Serif-CN-Bold;
      color: #fff;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
