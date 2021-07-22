const {
  default: api
} = require("../../http/api")
// import api from '../../http/api';
import imgurl from '../../http/api'
// pages/subclass/subclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    major: '',
    gender: "",
    optin: 0,
    ooo: 0,
    oll: [],
    start: 1,
    minor: '',
    list: [],
    url: imgurl.STATIC_HOST,
    tag: []

  },
  // 获取小分类的请求  拿到二级分类的标题
  setMoj() {
    api.getMinor().then(res => {
      // console.log(res)
      // 拿到标题
      let list = res[this.data.gender]
      // console.log(list)
      // 过滤拿到单独的一项标题
      let obj = list.filter(item => {
        return item.major === this.data.major
      })
      // 先定义一个空数组装二级标题拿到的数据
      let arr1 = []
      if (obj[0].mins.length > 0) {
        arr1 = obj[0].mins
        arr1.unshift('全部')
      }
      this.setData({
        oll: arr1
      })
      // console.log(this.data.oll)
    }).catch(err => {
      console.log(err)
    })
  },

  // 一级点击切换
  opt(e) {
    this.setData({
      optin: e.currentTarget.dataset.index
    })
    this.getuit(this.data.typeList[this.data.optin].id, this.data.minor)
  },
  // 二级点击切换
  opte(e) {
    if (e.currentTarget.dataset.item !== '全部') {
      this.setData({
        ooo: e.currentTarget.dataset.index,
        minor: e.currentTarget.dataset.item
      })
    } else {
      this.setData({
        ooo: e.currentTarget.dataset.index,
        minor: ''
      })
    }
    this.getuit(this.data.typeList[this.data.optin].id, this.data.minor)
  },
  // 封装请求
  getuit(type, minor) {
    // 获取请求数据
    api.getCatsBooks(
      this.data.gender,
      type,
      this.data.major,
      minor,
      this.data.start
    ).then(res => {
      // console.log(res)
      this.setData({
        list: res.books
      })
      // console.log(this.data.list)
    }).catch(err => {
      console.log(err)
    })
  },
    // 下拉请求
    getuit2(type, minor) {
      // 获取请求数据
      api.getCatsBooks(
        this.data.gender,
        type,
        this.data.major,
        minor,
        this.data.start
      ).then(res => {
        // console.log(res)
        this.setData({
          list: this.data.list.concat(res.books)
        })
        // console.log(this.data.list)
      }).catch(err => {
        console.log(err)
      })
    },
   // 点击跳入详情
   getXin(item){
    // console.log(item.currentTarget.dataset.item)
    wx.navigateTo({
      url:`/pages/details/details?id=${item.currentTarget.dataset.item}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    if (options.gender === '男生') {
      this.setData({
        gender: 'male'
      })
    } else if (
      options.gender === '女生'
    ) {
      this.setData({
        gender: 'female'
      })
    } else {
      this.setData({
        gender: 'press'
      })
    }
    // 将得到的类型赋给大类
    this.setData({
      major: options.arr
    })
    // 换标题文字
    wx.setNavigationBarTitle({
      title: options.arr
    })

    this.setMoj()
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getuit(this.data.typeList[0].id, this.data.minor)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
        start:++this.data.start
    })
    this.getuit2(this.data.typeList[0].id, this.data.minor)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})