const { default: api } = require("../../http/api")
import imgurl from '../../http/api'


// components/ranking/ranking.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr:{
      type:Array
    },
    title2:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      url:imgurl.STATIC_HOST,
      obj:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 点击进入排行详情页
      getdetails(e){
        //  this.$set(e,'rank_id',e.currentTarget.dataset.item._id)
        // console.log(e.currentTarget.dataset)
        this.setData({
          obj:e.currentTarget.dataset.item
        })
        // 跳路由将item传过去
        wx.navigateTo({
          url:`/pages/daily/daily?obj=${JSON.stringify(this.data.obj)}`
        })
        // console.log(this.data.obj)
      }
  },
  lifetimes:{
    ready(){
      // console.log(this.data.arr)
      // console.log(this.data.title2)
    }
  }

})
