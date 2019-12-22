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
  
    buttons: [{ text: '关闭' },{text:'创建'}],
    create_show:false,
    cur_create_name:'',
    submit_error_msg:'',
    submit_error:false,
    user_id:"111",
    join_id:-1,
    cur_group_id:'',
    cur_group_name:'',
    share_show:false,
    share_buttons:[{text:"关闭"}]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var p_join_id = options.join_id?options.join_id:-1;
    var p_this = this;
    console.log(options);
    
    if(p_join_id!=-1){
      var p_join_name = options.join_name;

        wx.showModal({
          title: '加入组',
          content: '你确定要加入组' + p_join_name +'吗?',
          success(res){
            if(res.confirm){
              if(app.globalData.skey){
                p_this.sendJoinRequest(app.globalData.skey,p_join_id);
              }else{
                app.skeyReadyCallback = res=>{
                 skey=res.data.skey;
                p_this.sendJoinRequest(skey,p_join_id);
                }
                }
            }
          

          }
        });
     



    }


  },

  handleGroupCreate:function(){

    this.setData({
      create_show: true
    });

  },

  handleNameInput:function(e){
    this.setData({
      cur_create_name:e.detail.value
    });
  },
  
  handleDialogTap:function(e){
    var p_this=this;

    var index = e.detail.index;
    if(index == 0){
      this.setData({
        create_show:false
      });
    }else if(this.data.cur_create_name==''){
      this.setData({
        submit_error:true,
        submit_error_msg:'输入的组名不能为空'
      });
    }else{
      var skey = app.globalData.skey;
      wx.request({
        method: 'GET',
        url: 'http://meeting123.xiaomy.net/api/Calendar/newCalendar',
        header: {
          'Authorization': skey
        },
        data: {
          'calendarName': p_this.data.cur_create_name
        },
        success: function () {
          
          p_this.setData({
            create_show: false
          });

          wx.showToast({
            title: '校验通过',
            icon:'loading',
            duration:5000

          })

          p_this.sendInitRequest(skey);

        }
      });


    }
  },



  handleGroupDisband:function(e){
    var p_this=this;
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

              wx.showToast({
                title: '解散成功',
                icon: 'loading',
                duration: 5000

              })

              p_this.sendInitRequest(skey);

            }
            });




        }
      }
    })

  },

  handleGroupDelete: function (e) {
    var p_this = this;
    var id = e.target.id;
    var index = id.slice(8, id.length + 1);
    var group_id = this.data.my_join[index].id;
    var group_name = this.data.my_join[index].name;
    wx.showModal({

      title: '退出组',
      content: '你确定要退出' + group_name + '？',
      success(res) {
        if (res.confirm) {
          var skey = app.globalData.skey;
          wx.request({
            method: 'GET',
            url: 'http://meeting123.xiaomy.net/api/Calendar/quitCalendar',
            header: {
              'Authorization': skey
            },
            data: {
              'calendarId': parseInt(group_id)
            },
            success: function () {

              wx.showToast({
                title: '退出成功',
                icon: 'loading',
                duration: 5000

              })

              p_this.sendInitRequest(skey);

            }
          });




        }
      }
    })

  },

  sendJoinRequest:function(skey,id){

    var p_this = this;
    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/participateCalendar',
      header: {
        'Authorization': skey
      },
      data:{
        'calendarId':id
      },
      success:res=>{
        wx.showToast({
          title: '加入成功',
          icon:'loading'
        });

        p_this.sendInitRequest(skey);

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
            'eventCount': data.eventNum[i],
          }
          new_create_group.push(group_inform);
        }
        p_this.setData({
          my_create: new_create_group
        });

        console.log(this.data.my_create);



      }

    });

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/myParticipated',
      header: {
        'Authorization': skey
      },
      success: res => {
        var data = res.data;
        var new_join_group = [];

        console.log(data);

        for (var i = 0; i < data.calendarList.length; i++) {
          var group_inform = {
            'id': data.calendarList[i].calendarId,
            'name': data.calendarList[i].calendarName,
            'memberCount': data.memberNum[i],
            'eventCount': data.eventNum[i],
            'disturb': data.disturbModes[i]
          }
          new_join_group.push(group_inform);
        }
        p_this.setData({
          my_join: new_join_group
        });

        wx.hideToast();
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
  initName: function () {

    setTimeout(function () {
      wx.request({
        url: 'http://meeting123.xiaomy.net/api/user/changeName',
        header: {
          'Authorization': app.globalData.skey
        },
        data: {
          'userName': app.globalData.userInfo.nickName
        }
      });

    }, 5000);

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
    this.initName();
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

  handleGroupShare:function(e){
    var p_this = this;
    var id = e.target.id;
    var index = id.slice(8, id.length + 1);
    var p_group_id;
    var p_group_name;
    if(id.charAt(0)=='l'){
      p_group_id = p_this.data.my_create[index].id;
      p_group_name=p_this.data.my_create[index].name;
    }else{
      p_group_id = p_this.data.my_join[index].id;
      p_group_name = p_this.data.my_join[index].name;
    }

    this.setData({
      cur_group_id:p_group_id,
      cur_group_name:p_group_name,
      share_show:true
    });     
             
  },

  handleShareTap:function(){
    this.setData({
      share_show: false
    });  

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let p_this = this;

  
      
      var id = p_this.data.cur_group_id;
      var name = p_this.data.cur_group_name;
      
      
      return {
        title: '邀请你加入'+name,
        path: '/pages/GroupManage/GroupManage?join_id='+id+'&join_name='+name,
        desc: '分享页面的内容',
        success: function (res) {
          var shareTicket = (res.shareTickets && res.shareTickets[0]) || '';
          
        }

      }


 
    
  

  }
  
})