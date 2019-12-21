// pages/GroupManage/GroupManage.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    my_create:[
      
    ],
    my_join:[
      
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

  handleGroupDisband:function(e){
    var id = e.target.id;
    var index = id.slice(8,id.length+1);
   var group_id = this.data.my_create[index].id;
    var group_name = this.data.my_create[index].name;
    wx.showModal({

      title: '解散组',
      content: '你确定要解散'+group_name+'？',
      success(res){
        if(res.confirm){
          var skey=app.globalData.skey;
          console.log(skey);
          wx.request({
            method: 'GET',
            url: 'http://meeting123.xiaomy.net/api/Calendar/disbandCalendar',
            header: {
              'Authorization': skey
            },
            data:{
              'calendarId':parseInt(group_id)
            },
            success:function(){

            }
            });




        }
      }
    })

  },

  sendInitRequest:function(skey){

    var p_this=this;
    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/myCreated',
      header: {
        'Authorization': skey
      },
      success: res => {
        var data = res.data;
        var new_create_group = [];

        console.log(data);

        for (var i = 0; i < data.calendarList.length; i++) {
          var group_inform = {
            'id': data.calendarList[i].calendarId,
            'name': data.calendarList[i].calendarName,
            'memberCount': data.memberNum[i],
            'eventCount': data.eventNum[i]
          }
          new_create_group.push(group_inform);
        }
        p_this.setData({
          my_create: new_create_group
        });

      }

    });

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/myParticipated',
      header: {
        'Authorization': skey
      },
      success: res => {
        var data = res.data;
        var new_create_group = [];

        for (var i = 0; i < data.calendarList.length; i++) {
          var group_inform = {
            'id': data.calendarList[i].calendarId,
            'name': data.calendarList[i].calendarName,
            'memberCount': data.memberNum[i],
            'eventCount': data.eventNum[i]
          }
          new_create_group.push(group_inform);
        }
        p_this.setData({
          my_join: new_create_group
        });

        wx.hideToast();
        wx.showToast({
          title: '数据已同步',
          icon: 'success'
        });
      }
    });

  },

  initData:function(){

    wx.showToast({
      title: '获取数据中',
      icon: 'loading',
      duration: 5000

    });

    var p_this=this;
    var skey;

    if(app.globalData.skey==null){app.skeyReadyCallback = res=>{skey = res.data.skey;this.sendInitRequest(skey);}}
    else {skey = app.globalData.skey;this.sendInitRequest(skey);}
 
   
    
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

    this.initData();

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