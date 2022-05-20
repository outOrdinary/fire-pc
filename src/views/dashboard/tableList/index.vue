<template>
  <div class="app-table">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" size="mini" height="calc(100vh - 330px)" border fit highlight-current-row>
      <el-table-column label="消防执法营商环境监督系统汇总表" align="center" class-name="tableTitle">
        <el-table-column align="center" label="执法单位" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="执法人员" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="执法时间" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="被执法单位" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系人" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系电话" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="执法内容" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总体评价" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="评价时间" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="存在问题" width="95" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="反映的其他问题" min-width="120" class-name="tableTitleY">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="处置情况" min-width="120" class-name="tableTitleR">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="反馈结果" min-width="120" class-name="tableTitleR">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: null,
      listLoading: true
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.tableTitle {
  font-size: 28px;
  color: #222;
  background-color: #ddd !important;
  .cell {
    line-height: 40px;
  }
}
.is-leaf.tableTitleY {
  color: #222;
  font-size: 14px;
  background-color: #f8b52b !important;
}
.tableTitleR.is-leaf {
  color: #fff;
  font-size: 14px;
  background-color: #e90016 !important;
}

// 右边和下边
.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: #134087 !important;
}
// 左边和上边
.el-table--border,
.el-table--group {
  border-color: #333 !important;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #333 !important;
}
// 头部的下边框
.el-table--border th,
.el-table--border th.gutter:last-of-type {
  border-bottom: 1px solid #333 !important;
}
// 列表中间的竖线
.el-table--border td,
.el-table--border th {
  border-right: 1px solid #333 !important;
}
</style>
