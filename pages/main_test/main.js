// pages/main_test/main.js

var util = require("../../utils/util.js");

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */

  data: {
    //页面有两种模式，自己模式和他人模式
    //其中0代表自己模式，1代表他人模式
    cur_mode:0,
    degree:0,
    cur_day:0,
    cur_hour:new Date().getHours(),
    cur_min:new Date().getHours()*60+new Date().getMinutes(),
    week_name: [
      '日', '一', '二', '三', '四', '五', '六'
    ],

    cur_year:new Date().getFullYear(),
    cur_month:new Date().getMonth(),
    cur_date:new Date().getDate(),


    //上面十天的信息，前端直接可以运算出来
    display_dates:[],

    hours: [{ number: 12, value: 'PM' },{ number: 1, value: 'AM' }, { number: 2, value: 'AM' }, { number: 3, value: 'AM' },
      { number: 4, value: 'AM' }, { number: 5, value: 'AM' }, { number: 6, value: 'AM' }, { number: 7, value: 'AM' },
      { number: 8, value: 'AM' }, { number: 9, value: 'AM' }, { number: 10, value: 'AM' }, { number: 11, value: 'AM' },
      { number: 12, value: 'AM' }, { number: 1, value: 'PM' }, { number: 2, value: 'PM' }, { number: 3, value: 'PM' },
      { number: 4, value: 'PM' }, { number: 5, value: 'PM' }, { number: 6, value: 'PM' }, { number: 7, value: 'PM' },
      { number: 8, value: 'PM' }, { number: 9, value: 'PM' }, { number: 10, value: 'PM' }, { number: 11, value: 'PM' },
      

    ],

    buttons: [{ text: '关闭' }],

    //事件颜色的选项
    color_table:[
      'grey','green','dodgerblue','darkorange','crimson'
    ],

    //其他人的信息卡片

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
            priority: 4

          },
          {
            name : '别人计算机图形学',
            start_time: 600,
            end_time: 720,
            display: true,
            priority:3
          },
          {
            name: '别人吃饭',
            start_time: 740,
            end_time: 780,
            display: true,
            priority: 4
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

    //我自己的信息卡片
    inform_card: [
      {
        day_index: -3

      },
      {
        day_index: -2

      },
      {
        day_index: -1,
        event:[{
        name: '晚上写代码',
        start_time: 1080,
        end_time: 1380,
        display: true,
        priority: 3,

      }]

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
        day_index: 1,
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
        ]
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

    //在这里存储上一次滑动事件的起点
    touch_start_x:0,
    //控制回到起点按钮的颜色
    back_button_color:'rgb(200,200,200)',
    //控制信息框的显示
    edit_show:true,


    //组的部分信息
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

    //你当前选择的组
    cur_group:0,

    //你是不是当前选择组的组长

    is_leader:0,

    //你正在查看的成员

    cur_member:0,

    //你当前选择组的成员
    cur_group_members:[
      {
        id:-1,
        name:'我'
      },
      {
        id:'1',
        name:'freakx'
      },{
        id:'2',
        name:'freakv'
      }
    ],

    cur_event_name:'',
    cur_event_date:'',
    cur_event_start:'',
    cur_event_end:'',
    cur_event_prior:0,
    cur_event_repeat:'',
    cur_event_detail:'',
    prior_sel:[
      { name: '1', checked: false }, { name: '2', checked: false }, { name: '3', checked: false }, { name: '4', checked: false}
    ]



  },

  bindGroupChange(e){
    /**在这里需要发送网络请求，获取当前组的成员信息 */
    /**成功之后进行下面的样式切换 */

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });

    setTimeout(function () {
      wx.hideToast();
      wx.showToast({
        title: '切换成功',
        icon: 'success'
      })
    }, 200);

    //rt

    var sel_index = e.detail.value;

    if(sel_index == 0){

      var group0_name = "groups[0].name";

      this.setData({
        cur_mode:0,
        cur_group:0,
        'groups[0].name':'(在此切换组信息)'
        
      })
    }else{
      var group0_name = "groups[0].name";

      this.setData({
        cur_mode:1,
        cur_group:sel_index,
        'groups[0].name': '我',
        other_inform_card:this.data.inform_card
      });

    }
  },

  bindGroupMemberChange:function(e){
    var sel_id = e.detail.value;

   
    if(sel_id == 0){
      this.setData({
        other_inform_card:this.data.inform_card
      });
    }else{
      //在此处发送网络请求

      wx.showToast({
        title: '加载中',
        icon:'loading'
      });

      setTimeout(function(){
        wx.hideToast();
        wx.showToast({
          title: '切换成功',
          icon:'success'
        })
      },200);

      //rt

      this.setData({
        //other_inform_card:,
        cur_member:sel_id
      });
    }

  },

  handleDateChange:function(e){
  this.setData({
    cur_event_date:e.detail.value
  });
  },

  handleIntroInput:function(e){
    this.setData({
      cur_event_name:e.detail.value
    });
  },

  handlePriorChange:function(e){

    this.setData({
      cur_event_prior:e.detail.value
    });
  },

  handleStartChange:function(e){
    this.setData({
      cur_event_start:e.detail.value
    });

  },
   
  handleEndChange:function(e){
    this.setData({
      cur_event_end:e.detail.value
    });

  },

  handleRepeatChange:function(e){
    this.setData(
      {
        cur_event_repeat:e.detail.value
      }
    )
  },


  handleEventTap:function(e){
    
    var id = e.target.id;

    

    if(id.charAt(5)!='-'){
    var day_index = parseInt(id.charAt(5))+3;
    var event_index = parseInt(id.slice(6,id.length));
    }else{
      var day_index =  parseInt(id.charAt(6)) ;
      day_index = 3 - day_index;
      var event_index = parseInt(id.slice(7, id.length));
    }
    
    //this.data.inform_card[day_index].event[event_index].display
    if(this.data.cur_mode == 0){
    var key = 'inform_card['+day_index+'].event['+event_index+'].display';
    this.setData({
      [key]: !this.data.inform_card[day_index].event[event_index].display

    });
    }else{
      var key = 'other_inform_card[' + day_index + '].event[' + event_index + '].display';
      this.setData({
        [key]: !this.data.other_inform_card[day_index].event[event_index].display

      });

    }


  },

  min2hour:function(min){

    if(min<10)return '00:0'+min;
    else if(min<60)return '00:'+min;
    else {
      var hour = parseInt(min/60);
      var minute = min%60;

      if (hour < 10) hour = '0' + hour;
      if(minute < 10)minute = '0' + minute;

      return hour+':'+minute;
    }

  },

  handleEventLongPress:function(e){

    if(e.target.id.charAt(5)=='-')return;

    if(this.data.cur_mode == 0){

      var id = e.target.id;
      var day_index = parseInt(id.charAt(5)) + 3;
      var event_index = parseInt(id.slice(6, id.length));

      var sel_date = parseInt(id.charAt(5))+this.data.cur_date;

      var sel_start = this.data.inform_card[day_index].event[event_index].start_time;
      var sel_end = this.data.inform_card[day_index].event[event_index].end_time;

      sel_start = this.min2hour(sel_start);
      sel_end = this.min2hour(sel_end);

      

      

      
      var prior_index = this.data.inform_card[day_index].event[event_index].priority - 1;
      var prior_key = 'prior_sel['+prior_index+'].checked'
      var set_month = new Date().getMonth() + 1;
 


      this.setData({
        edit_show:true,
        cur_event_name:this.data.inform_card[day_index].event[event_index].name,
        cur_event_date: new Date().getFullYear() + '-' + set_month + '-' + sel_date,
        cur_event_start: sel_start,
        cur_event_end: sel_end,
        cur_event_prior: this.data.inform_card[day_index].event[event_index].priority,
        [prior_key]:true,
        cur_event_repeat: '',
        cur_event_detail: '',
      });



      

    }else{

    }

  },


  handleAddEvent:function(){

    var set_month = new Date().getMonth() + 1;

    this.setData({
      edit_show:true,
      cur_event_name:'',
      cur_event_start:'00:00',
      cur_event_end:'23:59',
      cur_event_prior: 0,
      'prior_sel[0].checked': false,
      'prior_sel[1].checked': false,
      'prior_sel[2].checked': false,
      'prior_sel[3].checked': false,
      cur_event_repeat: false,
      cur_event_detail: '',
      cur_year: new Date().getFullYear(),
      cur_month: set_month,
      cur_date: new Date().getDate(),
      cur_event_date: new Date().getFullYear() + '-' + set_month + '-' + new Date().getDate()
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

  handleDialogTap:function(e){
    this.setData(
      {
        edit_show:false
      }
    );
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

  initData(){

    /**在这里发送第一次初始化的网络请求 */

    app.userInfoReadyCallback = res => {

      console.log(res.userInfo);


    }


    app.skeyReadyCallback = res =>{


      var skey = res.data.skey;
      wx.request({
        url: 'http://test',
        header: {
          'Authorization': skey
        },

        success:function(res){
            



        }

      })


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

    var set_month = new Date().getMonth()+1;

    this.setData({
      display_dates :tmp,
      cur_day:0,
      cur_hour: new Date().getHours(),
      cur_min: new Date().getHours() * 60 + new Date().getMinutes(),
      cur_mode:this.data.cur_group==0?0:1,
      'groups[0].name':this.data.cur_group==0?'在此切换组信息':'我',
      cur_year: new Date().getFullYear(),
      cur_month: set_month,
      cur_date: new Date().getDate(),
      cur_event_date: new Date().getFullYear() +'-'+ set_month + '-'+new Date().getDate(),
      cur_event_name: '',
      cur_event_start: '00:00',
      cur_event_end: '23:59',
      cur_event_prior: 0,
      'prior_sel[0].checked': false,
      'prior_sel[1].checked': false,
      'prior_sel[2].checked': false,
      'prior_sel[3].checked': false,


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
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    
    this.initData();
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