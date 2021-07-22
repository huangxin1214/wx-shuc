// pages/details/details.js
import api from '../../http/api'
import imgurl from '../../http/api'
import utils from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    list: {},
    url: imgurl.STATIC_HOST,
    obj: 0,
    arr: [],
    hovr: [],
    box: [],
    list3: [],
    opt: "",
    flag: true,
    pot: [],
    flag1: true

  },
  // 获取详情页的请求
  setohu() {
    api.bookInfo(this.data.id).then(res => {
      // console.log(res)
      this.setData({
        list: res,
        arr: Math.floor(res.rating.score / 2)
      })
      // console.log(this.data.list)
      // console.log(this.data.arr)

    }).catch(err => {
      console.log(err)
    })
  },
  // 点击切换
  setOin(e) {
    this.setData({
      obj: e.currentTarget.dataset.index
    })
    // console.log(this.data.obj)
  },
  // 推荐书籍请求
  setTu() {
    api.relatedRecommendedBooks(this.data.id).then(res => {
      // console.log(res)
      // 一进来发请求将值赋给空数组
      this.setData({
        box: res.books
      })
      // 判断拿到数据的数组长度是否小于3
      if (this.data.box.length < 3) {
        // 小于就将得到的值赋给循环的数组
        this.setData({
          hovr: this.data.box
        })
        // 否则就再次调用
      } else {
        this.optt()
      }
      // console.log(this.data.hovr)
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击随机切换数据
  optt() {
    // 点击判断第一次值的数组长度是否大于3
    if (this.data.box.length > 3) {
      // 向下取整获取随机数
      let oty = Math.floor(
        Math.random() * (this.data.box.length - 2)
      )
      // 截取前3位
      this.setData({
        hovr: this.data.box.slice(oty, oty + 3)
      })
      // console.log(this.data.hovr)
    }
  },
  // 点击跳入详情
  getXin(item) {
    // console.log(item.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/details/details?id=${item.currentTarget.dataset.item}`
    })
  },
  // 评论
  getJop() {
    api.shortReviews(this.data.id).then(res => {
      // console.log(res)
      this.setData({
        list3: res.docs,
        opt: res.total
      })
      // console.log(this.data.list3)
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击加入书架并且存储在本地
  setHist() {
    // 存储书籍的详情
    utils.saveHistory({
      key: 'shuji',
      data: this.data.list,
      attr: '_id'
    })
    this.setData({
      flag: false
    })
  },
  tyud() {
    this.setData({
      flag1: false
    })
  },
  // 点击关闭图片
  getCun() {
    this.setData({
      flag1: true
    })
  },
  // 点击保存图片
  setCok(e) {
      wx.showActionSheet({
        itemList: ['保存图片'],
        success(res){
          wx.downloadFile({
            url: e.currentTarget.dataset.url,
            success(res){
              if(res.statusCode===200){
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                })
              }
            }
          })
        },fail(){}
      })



  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    // console.log(this.data.id)
    this.setohu()
    this.setTu()
    this.getJop()



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
    let pot = utils.getHistory({
      key: 'shuji'
    })
    // console.log(this.data.pot)
    // console.log(this.data.id);
    let okk = pot.filter(item => {
      return item._id === this.data.id
    })
    // console.log(okk)
    if (okk.length > 0) {
      // console.log(1111);
      this.setData({
        flag: false
      })
    }

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