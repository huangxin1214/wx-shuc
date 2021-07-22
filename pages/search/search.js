const {
  default: api
} = require("../../http/api")
import imgurl from '../../http/api';
import utils from '../../utils/util'

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    arr: [],
    flag: true,
    value: "",
    onto: [],
    show: true,
    url:imgurl.STATIC_HOST,
    optik:[]
  },
  // 一进来获取热搜请求
  getHot() {
    api.hotWord().then(res => {
      // console.log(res)
      this.setData({
        list: res.hotWords,
      })
      let color = []
      this.data.list.map(item => {
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let rgb = `rgb(${r},${g},${b})`
        color.push(rgb)
      })
      this.setData({
        arr: color
      })
      let homite = res.hotWords
      homite = homite.map(item => {
        let list2 = Math.floor(Math.random() * res.hotWords.length)
        return homite[list2]
      })
      // 数组去重
      homite = Array.from(new Set(homite))
      // let obk = this.data.list.slice(list2)
      this.setData({
        list: homite
      })
      // console.log(this.data.list)
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击换一换
  getHis() {
    this.getHot()
  },
  // 键盘输入值
  bindinput(e) {
    // console.log(e.detail.value)
    if (e.detail.value === '') {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  // 点击清空输入框里面的值
  qk() {
    this.setData({
      value: ""
    })
    if (this.data.value === '') {
      this.setData({
        flag: true,
        show:true
      })
    } else {   
      this.setData({
        flag: false
      })
    }
  },
  // 点击回车事件
  bindconfirm(e) {
    console.log(e.detail.value)
    if(e.detail.value.trim()){
      this.setData({
        show: false
      })
      // 搜索请求
      api.bookSearch(e.detail.value).then(res => {
        this.setData({
          onto: res.books
        })
        console.log(this.data.onto)
      }).catch(err => {
        console.log(err)
      })
       // 存储搜索的关键字
      utils.saveHistory({
        key: 'search',
        data: e.detail.value.trim(),
        attr: 'name'
      })
      this.setData({
        optik:utils.getHistory({key: 'search'})
      })
    }
  },
  // 搜索历史点击进行搜索
  getitem(e){
    // console.log(e.currentTarget.dataset.item)
    this.setData({
      value:e.currentTarget.dataset.item,
      show:false
    })
    // 搜索请求
    api.bookSearch(this.data.value).then(res => {
      this.setData({
        onto: res.books
      })
      console.log(this.data.onto)
    }).catch(err => {
      console.log(err)
    })

    // 判断回来
    if (this.data.value === '') {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }

  },
  // 点击热词搜索
  getlim(e){
    // console.log(e)
    this.setData({
      value:e.currentTarget.dataset.item,
      show:false
    })
    // 搜索请求
    api.bookSearch(this.data.value).then(res => {
      this.setData({
        onto: res.books
      })
      // console.log(this.data.onto)
    }).catch(err => {
      console.log(err)
    })
    // 判断回来
    if (this.data.value === '') {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
     // 存储搜索的关键字
     utils.saveHistory({
      key: 'search',
      data: this.data.value.trim(),
      attr: 'name'
    })
    this.setData({
      optik:utils.getHistory({key: 'search'})
    })

  },
   // 点击跳入详情
   getXin(item){
    console.log(item.currentTarget.dataset.item)
    wx.navigateTo({
      url:`/pages/details/details?id=${item.currentTarget.dataset.item}`
    })
  },
  // 点击清空历史记录
  getObk(){
    wx.removeStorageSync('searchHistory')
    // 获取
    this.setData({
      optik:utils.getHistory({key: 'search'})
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHot()

    // 获取存储历史
    this.setData({
      optik:utils.getHistory({key: 'search'})
    })
    // console.log(this.data.optik)
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