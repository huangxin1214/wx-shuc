// components/classification/classification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
    },
    title: {
      type: String,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },


  /**
   * 组件的方法列表
   */
  methods: {
    // 点击跳转小分类 将item传过去
    getWed(e) {
      // console.log(e.currentTarget.dataset.item.name)
      // 路由传参
      wx.navigateTo({
        url:`/pages/subclass/subclass?arr=${e.currentTarget.dataset.item.name}&gender=${this.data.title}`
      })
    },
  },
  lifetimes: {
    ready() {
      // console.log(this.data.list)
      // console.log(this.data.title)
    }
  }

})