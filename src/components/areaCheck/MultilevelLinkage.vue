<template>
  <section>
    <el-row>
      <el-col :span="8">
        <el-select v-model="provinceValue" placeholder="请选择" @change="selectProvince">
          <el-option
            v-for="(item,index) of provincearr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select v-model="cityValue" placeholder="请选择" @change="selectCity">
          <el-option v-for="(item,index) of cityArr" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-select placeholder="请选择" v-model="RegionValue" @change="selectRegion">
          <el-option
            v-for="(item,index) of regionArr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import {province} from '@/components/areaCheck/map'

export default {

  name: 'MultilevelLinkage',

  created () {
    this.provincearr = province
  },
  data () {
    return {
      arr: [1, 3, 4],
      province: [],
      cityArr: [],
      regionArr: [],
      provinceValue: '',
      cityValue: '',
      RegionValue: '',
      areaName: ''
    }
  },
  watch: {
    areaName (val) {
      this.$emit('area-linkage', this.areaName)
    }
  },
  mounted () {
  },
  methods: {

    selectProvince (id) {
      this.cityArr = []
      this.regionArr = []
      this.cityValue = ''
      this.RegionValue = ''
      for (let item of this.provincearr) {
        if (id === item.id) {
          console.log(item)
          this.cityArr = item.children
          this.provinceValue = item.name
        }
      }
    },
    selectCity (id) {
      let a = ''
      this.regionArr = []
      this.RegionValue = ''
      for (let item of this.cityArr) {
        if (id === item.id) {
          console.log(item)
          this.regionArr = item.children
          this.cityValue = item.name
        }
      }
      this.areaName = this.areaName + a
    },
    selectRegion (id) {
      for (let item of this.regionArr) {
        if (id === item.id) {
          this.RegionValue = item.name
          this.areaName = this.provinceValue + this.cityValue + this.RegionValue
        }
      }
    }
  }
}
</script>

<style>
</style>
