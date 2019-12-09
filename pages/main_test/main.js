// pages/main_test/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    speed:"not defined",
    degree:0,
    cur_day:0,
    sel_inform:[
      {
        day_index: -3
      },
      {
        day_index: -2
      },
      {
        day_index: -1
      },
      {
        day_index: 0,
        event:[
          {
            name : '上午写作业'
          },
          {
            name : '中午写作业'
          },
          {
            name: '晚上写作业'
          }
        ]
      },
      {
        day_index: 1
      },
      {
        day_index: 2
      },
      {
        day_index: 3
      },
      {
        day_index: 4
      },
      {
        day_index: 5
      },
      {
        day_index: 6
      },
    ],

    touch_start_x:0










  },

  touchstart:function(e){
    
   this.data.touch_start_x = e.touches[0].pageX;
  },

  touchend:function(e){
   if(e.changedTouches[0].pageX - this.data.touch_start_x > 80 && this.data.cur_day > -3){
     this.setData({
       cur_day:this.data.cur_day - 1
     });

   }
   else if (e.changedTouches[0].pageX - this.data.touch_start_x < -80 && this.data.cur_day < 6){
     this.setData({
       cur_day: this.data.cur_day + 1
     });
   }

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

    /*wx.request({
      url: 'http://meeting123.xiaomy.net/test',
      method:'GET',
      data:{
      title:13

      },
      success(res){console.log(res)
      }
    });*/



    var p_this = this;
    var last_x = 0;

    wx.onAccelerometerChange(function (res) {

      if(res.x - last_x >0.05 || last_x - res.x >0.05){
      p_this.setData({
      speed: '(' + p_this.cut_number(res.x) +       ',' + p_this.cut_number(res.y) + ',' +        p_this.cut_number(res.z)+')',
      degree:res.x*10

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