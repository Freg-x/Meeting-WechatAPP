// pages/GroupManage/GroupManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    my_create:[
      {
        id: 1234,
        name:'JAVA EE'
      },
      {
        id:2345,
        name:'JAVA SE'
      }

    ],
    my_join:[
      {
        id:1234,
        name:'hello'
      },
      {
        id:1234,
        name:'world'
      }
    ],

    
    user_id:"111",
    join_id:-1


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showShareMenu({
      withShareTicket:true
    });

    var p_join_id = options.join_id?options.join_id:-1;

    this.setData(
      {
        join_id:p_join_id
      }
    );


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
    let p_this = this;
    var groupId= 123;
    return{
      title:'邀请你加入java群聊',
      path:'/pages/GroupManage/GroupManage?join_id=${p_this.data.user_id}',
      success:function(res){
        var shareTicket = (res.shareTickets && res.shareTickets[0]) || '';
        console.log(shareTicket);
      }

    }
  

  }
  
})