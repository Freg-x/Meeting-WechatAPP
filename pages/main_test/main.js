// pages/main_test/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    speed:"not defined",
    degree:0
  },

  my_rotate:function(){


  },

  cut_number:function(number){
    return parseInt(100*number)/100;
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
    console.log("onready");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show finish!");

    var p_this = this;
    var last_x = 0;

    wx.onAccelerometerChange(function (res) {
      console.log(p_this.data.speed);

      if(res.x - last_x >0.05 || last_x - res.x >0.05){
      p_this.setData({
      speed: '(' + p_this.cut_number(res.x) +       ',' + p_this.cut_number(res.y) + ',' +        p_this.cut_number(res.z)+')',
      degree:res.x*25

    });
      last_x = res.x;
    }
    
      
    })
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