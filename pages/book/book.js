// pages/book/book.js
import utils from '../../utils/util'
import imgurl from '../../http/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:true,
      list:[],
      url:imgurl.STATIC_HOST,

  },
  // 点击帮助跳帮助页面
  getHelp(){
    wx.navigateTo({
      url: '/pages/explain/explain',
    })
  },
  // 点击修改
  getImk(){
    this.setData({
      flag:false
    })
  },
  getImk2(){
    this.setData({
      flag:true
    })
  },
  // 点击删除存储
  gioKp(e){
    console.log(e.currentTarget.dataset.item)
    utils.removeHistory({
      key:'shuji',
      data:e.currentTarget.dataset.item
    })
     // 获取存储历史
     this.setData({
      list:utils.getHistory({key: 'shuji'})
    })
    // console.log(this.data.list)
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
     // 获取存储历史
     this.setData({
      list:utils.getHistory({key: 'shuji'})
    })
    // console.log(this.data.list)
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