// pages/main_test/main.js

var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */

  data: {
    degree:0,
    cur_day:0,
    cur_hour:new Date().getHours(),
    cur_min:new Date().getHours()*60+new Date().getMinutes(),
    week_name: [
      '日', '一', '二', '三', '四', '五', '六'
    ],
    display_dates:[],
    hours: [{ number: 12, value: 'PM' },{ number: 1, value: 'AM' }, { number: 2, value: 'AM' }, { number: 3, value: 'AM' },
      { number: 4, value: 'AM' }, { number: 5, value: 'AM' }, { number: 6, value: 'AM' }, { number: 7, value: 'AM' },
      { number: 8, value: 'AM' }, { number: 9, value: 'AM' }, { number: 10, value: 'AM' }, { number: 11, value: 'AM' },
      { number: 12, value: 'AM' }, { number: 1, value: 'PM' }, { number: 2, value: 'PM' }, { number: 3, value: 'PM' },
      { number: 4, value: 'PM' }, { number: 5, value: 'PM' }, { number: 6, value: 'PM' }, { number: 7, value: 'PM' },
      { number: 8, value: 'PM' }, { number: 9, value: 'PM' }, { number: 10, value: 'PM' }, { number: 11, value: 'PM' },
      

    ],
    buttons: [{ text: '取消' }, { text: '确定' }],
    color_table:[
      'grey','green','dodgerblue','darkorange','crimson'
    ],

    other_inform_card:[
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
            name : 'English',
            start_time:0,
            end_time:120,
            display:true,
            priority:4
            
          },
          {
            name: '睡觉',
            start_time: 120,
            end_time: 540,
            display: true,
            priority: 3

          },
          {
            name : '别人计算机图形学',
            start_time: 600,
            end_time: 720,
            display: true,
            priority:2
          },
          {
            name: '别人吃饭',
            start_time: 740,
            end_time: 780,
            display: true,
            priority: 1
          },
          {
            name: '晚上别人写代码',
            start_time: 1080,
            end_time: 1380,
            display: true,
            priority:3
          }
        ],
      
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
    inform_card: [
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
        event: [
          {
            name: 'English',
            start_time: 0,
            end_time: 120,
            display: true,
            priority: 4

          },
          {
            name: '睡觉',
            start_time: 120,
            end_time: 540,
            display: true,
            priority: 3

          },
          {
            name: '计算机图形学',
            start_time: 600,
            end_time: 720,
            display: true,
            priority: 2
          },
          {
            name: '吃饭',
            start_time: 740,
            end_time: 780,
            display: true,
            priority: 1
          },
          {
            name: '晚上写代码',
            start_time: 1080,
            end_time: 1380,
            display: true,
            priority: 3
          }
        ],

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

    touch_start_x:0,

    back_button_color:'rgb(200,200,200)',
    edit_show:false,

    groups:[
      {
        id:-1,
        name:'(在此切换组信息)'
      },
      {
        id:123,
        name:'JAVA小组'
      },
      {
        id:234,
        name:'软工小组'
      }
    ],

    cur_group:0,

    cur_group_members:[
      {
        id:-1,
        name:'default'
      },
      {
        id:'1',
        name:'freakx'
      },{
        id:'2',
        name:'freakv'
      }
    ]





  },

  handleEventTap:function(e){
    
    var id = e.target.id;

    var day_index = parseInt(id.charAt(5))+3;
    var event_index = parseInt(id.slice(6,id.length));

    
    //this.data.inform_card[day_index].event[event_index].display

    var key = 'inform_card['+day_index+'].event['+event_index+'].display';
    this.setData({
      [key]: !this.data.inform_card[day_index].event[event_index].display

    });


  },

  editEvent:function(){
    this.setData({
      edit_show:true
    });
    
  },

  moveToCurrent:function(){

    var p_this = this;
    this.setData(
      {
        cur_day:0,
        back_button_color:'black'
      }
    );
    setTimeout(function(){
      p_this.setData(
        {
          cur_hour: new Date().getHours(),
          back_button_color: 'grey'
        }
      );
    },400);

    
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

  initDisplay:function(){
    var tmp = [];
    for(var i=0;i<10;i++){
      var date = new Date();
      date.setDate(date.getDate()+i-3);
      
      var year = date.getFullYear();
      var month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
      var day = date.getDate();
      day = day > 10 ? day : '0' + day;

      var compute_param = year+'/'+month+'/'+day;

      var week = this.data.week_name[new Date(compute_param).getDay()];
     
      
      var insert_value={
        'week_name':week,
        'day_name':date.getDate()
      }

      
      tmp.push(insert_value);

    }

    this.setData({
      display_dates :tmp,
      cur_day:0,
      cur_hour: new Date().getHours(),
      cur_min: new Date().getHours() * 60 + new Date().getMinutes()
    });


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

    this.initDisplay();

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