const {
  default: api
} = require("../../http/api")
import imgurl from '../../http/api'

// pages/daily/daily.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opyi: 0,
    _id: '',
    monthRank: '',
    totalRank: '',
    list: [],
    url:imgurl.STATIC_HOST
  },
  // 点击切换
  setid(e) {
    // console.log(e)
    this.setData({
      opyi: e.currentTarget.dataset.obj
    })
    // console.log(this.data.opyi)
    this.setOpti(e.currentTarget.dataset.id)
  },

  // 获取排行详情的请求
  setOpti(id) {
    api.rankInfo(id).then(res => {
      // console.log(res)
      this.setData({
        list: res.ranking.books
      })
      // console.log(this.data.list)
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击跳入详情
  getXin(item){
    console.log(item.currentTarget.dataset.item)
    wx.navigateTo({
      url:`/pages/details/details?id=${item.currentTarget.dataset.item}`
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(JSON.parse(options.obj))
    // 拿到传过来的3个id  赋值
    this.setData({
      _id: JSON.parse(options.obj)._id,
      monthRank: JSON.parse(options.obj).monthRank,
      totalRank: JSON.parse(options.obj).totalRank,
    }),
    // 将换标题标题
    wx.setNavigationBarTitle({
        title:JSON.parse(options.obj).title
    })

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
    this.setOpti(this.data._id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})