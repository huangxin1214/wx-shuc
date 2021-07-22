import api from '../../http/api';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    female:[],
    male:[],
    press:[],
    female2:[],
    male2:[],
    obj:[],
    nan:[]
  },
  // 点击切换
  swichNav(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset.curren)
    this.setData({
      currentTab: e.currentTarget.dataset.curren
    })

  },
  // 获取书城的分类请求
  setBook() {
    api.getCats().then(res => {
      // console.log(res)
      this.setData({
        female:res.female,
        male:res.male,
        press:res.press
      })

    }).catch(err => {
      console.log(err)
    })
  },
  // 获取排行分类请求
  setRanking(){
    api.rankCategory().then(res=>{
      // console.log(res)
      this.setData({
        female2:res.female,
        male2:res.male
      })
      // 只传前6位
      this.setData({
        obj : this.data.female2.slice(0,6),
        nan : this.data.male2.slice(0,6)
      })
      // console.log(this.data.obj)
      // console.log(this.data.nan)
      // console.log(this.data.female2)
      // console.log(this.data.male2)
    }).catch(err=>{
      console.log(err)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setBook(),
    this.setRanking()
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