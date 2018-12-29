<template>
  <div class="back-index">
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://pbl.yaojunrong.com/FvRdKNv1h5d0rO3ypYh8R-Foy9gH" class="image">
          <div style="padding: 14px;">
            <span> 不争就是慈悲，不辩就是智慧，不闻就是清净，不看就是自在，原谅就是解脱，知足就是放下。不乱于心，不困于情。不畏将来，不念过往。</span>
            <div class="bottom clearfix">
              <time class="time fr">2019-3-20</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://pbl.yaojunrong.com/FnKsUTjxTcJLayg751O5v8Nt_ZtL" class="image">
          <div style="padding: 14px;">
            <span> 失去的风景，走散的人，等不来的渴望，全都住在缘分的尽头。何必太执着，该来的自然来，会走的留不住。人生无常，珍惜眼前。</span>
            <div class="bottom clearfix">
              <time class="time fr">2019-4-5</time>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }">
          <img src="http://pbl.yaojunrong.com/Fn3A4m9Kk_G6Jyaaa8QTubvGiz-f" class="image">
          <div style="padding: 14px;">
            <span>  一个人的涵养来自大度，来自宽容;一个人的修为，是懂得包容，懂得尊重。目中有人，才有路可走;心中有爱，才有事所为。</span>
            <div class="bottom clearfix">
              <time class="time fr">2019-4-18</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="margin-right: 5px;">
      <panel-group @handleSetLineChartData="handleSetLineChartData"/>
    </div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name:'',
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  methods: {
     handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style scoped lang="scss">
.image {
  width: 100%;
}
.image:hover {
  transform: rotate(1turn);
  transition-delay: .5s;
  transition-property: all;
  transition-duration: 2s;
  transition-timing-function: cubic-bezier(.34,0,.84,1);
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.time {
  font-size: 13px;
  color: #999;
}
/deep/ {
  .el-card {
    margin-top: 0;
    min-height: 400px;
    margin-right: 5px;
  }
}
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>