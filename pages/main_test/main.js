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

    six_after_year:'',
    six_after_month:'',
    six_after_date:'',


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
    suggest_buttons:[{text:'返回'}],

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
      },
      {
        day_index: 0,

      },
      {
        day_index: 1,
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
    edit_show:false,
    suggest_show:false,


    //组的部分信息
    groups:[],

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
      }
    ],

    my_calendar_id:0,
    cur_event_name:'',
    cur_event_date:'',
    cur_event_start:'',
    cur_event_end:'',
    cur_event_prior:0,
    cur_event_repeat:0,
    cur_event_detail:'',
    cur_event_id:'',
    cur_event_index:'',
    cur_disturb_state:'开启勿扰',
    suggest_length:'',
    prior_sel:[
      { name: '1', checked: false }, { name: '2', checked: false }, { name: '3', checked: false }, { name: '4', checked: false}
    ],
    submit_error:false,
    submit_error_msg:"",

    cur_event_mode:0,

    suggest_period:[
    ]
  },

  handleGroupButtonTap:function(){
    var p_this = this;
    var sel_index =this.data.cur_group;
    var cur_group_id = this.data.groups[sel_index].id;

    if(!this.data.is_leader&&this.data.cur_disturb_state=='开启勿扰'){
      wx.showModal({
        title: '开启勿扰',
        content: '你确定要对该组开启勿扰模式?',
        success(res){
          if(res.confirm){
            wx.request({
              url: 'http://meeting123.xiaomy.net/api/Calendar/setNoDisturb',
              header: {
                'Authorization': app.globalData.skey
              },
              data:{
                'calendarId':cur_group_id,
                'disturb': 1
              },
              success:res=>{
                p_this.setData({
                  cur_disturb_state:'关闭勿扰',
                  
                });
              }
            })

          }
        }
      });
    } else if (!this.data.is_leader && this.data.cur_disturb_state == '关闭勿扰'){
      wx.showModal({
        title: '关闭勿扰',
        content: '你确定要对该组关闭勿扰模式?',
        success(res) {
          if (res.confirm) {
            wx.request({
              url: 'http://meeting123.xiaomy.net/api/Calendar/setNoDisturb',
              header: {
                'Authorization': app.globalData.skey
              },
              data:{
                'calendarId': cur_group_id,
                'disturb':0
              },
              success: res => {
                p_this.setData({
                  cur_disturb_state: '开启勿扰'
                });
              }
            })

          }
        }
      });
    }else if(this.data.is_leader){

      p_this.setData({
        edit_show:true,
        cur_event_mode:0
       
      });

    }
    


  },

  bindGroupChange(e){
    /**在这里需要发送网络请求，获取当前组的成员信息 */
    /**成功之后进行下面的样式切换 */

    var p_this=this;

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });

    var sel_index = e.detail.value;
    

    if(sel_index!=0){

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/disturbStatus',
      header: {
        'Authorization': app.globalData.skey
      },
      data:{
        'calendarId': p_this.data.groups[sel_index].id
      },
      success:res=>{
        var word = res.data?'关闭勿扰':'开启勿扰'
        this.setData({
          cur_disturb_state:word
        });
      }
    });
    }

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/members',
      header: {
        'Authorization': app.globalData.skey
      },
      method: 'GET',
      data: {
      'calendarId':p_this.data.groups[sel_index].id
      },
      success: function (res) {

        var new_group_members = [];
        var me={
          id:-1,
          name:'我'
        };
        new_group_members.push(me);

        if (sel_index == 0) {

          var group0_name = "groups[0].name";

          p_this.setData({
            cur_mode: 0,
            cur_group: 0,
            'groups[0].name': '我'

          })
        } else {
          var group0_name = "groups[0].name";

          for(var i=0;i<res.data.length;i++){
            var new_member = {
              id:res.data[i].userid,
              name:res.data[i].name
            }
            new_group_members.push(new_member);
          }

          console.log(p_this.data.groups[sel_index].id);

          p_this.setData({
            cur_mode: 1,
            cur_group: sel_index,
            'groups[0].name': '我',
            other_inform_card: p_this.data.inform_card,
            is_leader: p_this.data.groups[sel_index].leader,
            cur_group_members:new_group_members,
            cur_group_id: p_this.data.groups[sel_index].id,
            cur_member:0
          });

        }
      }

    });


    
  },

  bindGroupMemberChange:function(e){
    var sel_id = e.detail.value;
    var p_this = this;
   
    if(sel_id == 0){
      this.setData({
        other_inform_card:this.data.inform_card,
        cur_member:0
      });
    }else{
      //在此处发送网络请求
      wx.showToast({
        title: '切换中',
        icon:'loading'
      });

      var p_user_id = this.data.cur_group_members[sel_id].id;

      console.log(this.data.cur_group_members);

      wx.request({
        url: 'http://meeting123.xiaomy.net/api/Event/showOthersEvent',
        header: {
          'Authorization': app.globalData.skey
        },
        method: 'GET',
        data:{
          'userid':p_user_id
        },
        success:res=>{
          console.log(res);
          res = res.data;
          var p_inform_card = [];

          for (var i = 0; i < 10; i++) {
            var day = {
              day_index: i - 3,
              event: []
            };


            var events = [];

            for (var j = 0; j < res[i].event.length; j++) {

              var add = {
                name: res[i].event[j].title,
                id: res[i].event[j].event_id,
                is_repeat: res[i].event[j].is_repeat,
                content: res[i].event[j].content,
                display: false,
                start_time: p_this.stamp2min(res[i].event[j].start_time),
                end_time: p_this.stamp2min(res[i].event[j].end_time),
                priority: res[i].event[j].priority
              };

              events.push(add);
            }
            day.event = events;
            p_inform_card.push(day);

          }
          wx.hideToast();


          p_this.setData({
            other_inform_card: p_inform_card,
            cur_member:sel_id
          });
        }
        
      });
    }

  },

  handleDateChange:function(e){
  this.setData({
    cur_event_date:e.detail.value
  });
  },

  handleSuggest(){

    if(this.data.cur_mode==1){

      this.setData({
        edit_show:false,
        suggest_show:true,
        suggest_length:''
      });

    }

  },

  handleSuggestInput(e){
    this.setData({
      suggest_length:e.detail.value
    });
  },

  handleSuggestSubmit(){
    var p_this = this;
    if(this.data.suggest_length<30||this.data.suggest_length>1440){
      this.setData({
        submit_error:true,
        submit_error_msg:'不合理的事件长度'
      });
    }else{
      wx.request({
        url: 'http://meeting123.xiaomy.net/api/Event/recommend',
        header: {
          'Authorization': app.globalData.skey
        },
        data:{
          'calendarId':p_this.data.cur_group_id,
          'duration':p_this.data.suggest_length
        },
        success:res=>{

          res=res.data;
          var p_suggest_period = [];
          for(var i=0;i<res.length;i++){
            var new_period = {
              date:res[i].start_time.slice(0,10),
              start_time:res[i].start_time.slice(11,16),
              end_time: res[i].end_time.slice(11, 16)
            }
            p_suggest_period.push(new_period);
          }
          p_this.setData({
            suggest_period:p_suggest_period
          });
        }
      });

    }

  },

  handleUseSuggest:function(e){
    var use_id = e.target.id.charAt(7);
    var use_date = this.data.suggest_period[use_id].date;
    var use_start = this.data.suggest_period[use_id].start_time;
    var use_end = this.data.suggest_period[use_id].end_time;

    this.setData({
      edit_show:true,
      suggest_show:false,
      cur_event_date:use_date,
      cur_event_start:use_start,
      cur_event_end:use_end
    })
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

    var result;
    
    if(e.detail.value==false)result=0;
    else result=1;
    this.setData(
      {
        cur_event_repeat:result
      }
    );
  },

  handleDetailInput:function(e){
    this.setData(
      {
        cur_event_detail: e.detail.value
      }
    );
  },

  getDistanceByDate(future_date){

    var tmp = new Date();
    for(var i = 0;i < 7;i++){

    if(tmp.getDate()==future_date){return i;break;}
    else tmp.setDate(tmp.getDate() + 1);

    }

  },

  bind2Stamp:function(date,time){
    
    date = date.replace(/-/g,'/');
    time=time+':00';

    return date+' '+time;
  },

 

  checkOverlap:function(day_index,start,end){

    for(var i = 0;i < this.data.inform_card[day_index+3].event.length;i++){
      var event_start = this.data.inform_card[day_index+3].event[i].start_time;
      var event_end = this.data.inform_card[day_index+3].event[i].end_time;
      if(start>event_start&&start<event_end)return false;
      if(end>event_start&&end<event_end)return false;  
    }
    return true;
  },

  /*加入下面函数的原因是，在修改事件时，不用检查它和之前的它自己自己是否重叠*/ 

  checkModifyOverlap: function (day_index, start, end,this_index) {
    for (var i = 0; i < this.data.inform_card[day_index + 3].event.length; i++) {
    var event_start = this.data.inform_card[day_index + 3].event[i].start_time;
      var event_end = this.data.inform_card[day_index + 3].event[i].end_time;
      if (start > event_start && start < event_end&&i!=this_index) return false;

    }
    return true;
  },

  
  handleSubmitEvent:function(){

    var start_hour = this.data.cur_event_start.slice(0,2);
    var start_minute = this.data.cur_event_start.slice(3,5);
    var start_cal = parseInt(start_hour)*60 + parseInt(start_minute);

    var end_hour = this.data.cur_event_end.slice(0, 2);
    var end_minute = this.data.cur_event_end.slice(3, 5);
    var end_cal = parseInt(end_hour) * 60 + parseInt(end_minute);


    var p_day_index = parseInt(this.data.cur_event_date.slice(8,10)) - this.data.cur_date;

 
    var p_this = this;

    if(this.data.cur_event_name == ""){
      this.setData({
        submit_error:true,
        submit_error_msg:"事件名称不能为空"
      });
    }else if(end_cal - start_cal < 30){
      this.setData({
        submit_error: true,
        submit_error_msg: "事件长度至少为30分钟"
      });
    }else if(this.data.cur_event_prior == 0){
      this.setData({
        submit_error: true,
        submit_error_msg: "至少要设定一个优先级"
      });
    }else if(!p_this.checkOverlap(p_day_index,start_cal,end_cal)){
      this.setData({
        submit_error: true,
        submit_error_msg: "当前指定的时间有其他事件存在"
      });

    }else if(p_this.data.cur_mode==0){
      /**至此，个人事件的提交校验全部完成，可以提交至后端 */

      var p_start = p_this.bind2Stamp(p_this.data.cur_event_date,p_this.data.cur_event_start);
      var p_end = p_this.bind2Stamp(p_this.data.cur_event_date, p_this.data.cur_event_end);
      
      
      wx.request({
        url: 'http://meeting123.xiaomy.net/api/Event/addNewEvent',
        header: {
          'Authorization': app.globalData.skey
        },
        method:'GET',
        data:{
          'title':p_this.data.cur_event_name,
          'content':p_this.data.cur_event_detail,
          'priority':p_this.data.cur_event_prior,
          'start_time':p_start,
          'end_time':p_end,
          'calendar_id':p_this.data.my_calendar_id,
          'is_remind':0,
          'is_repeat':p_this.data.cur_event_repeat,
        },
        success:function(){

          wx.showToast({
            title: '成功添加',
            icon: 'loading'
          });

          p_this.setData({
            edit_show: false,
            cur_day: p_this.getDistanceByDate(p_this.data.cur_event_date.slice(8, 10))

          });
        p_this.sendInitRequest(app.globalData.skey);
        }
      });
    }else if(p_this.data.cur_mode == 1){

      console.log("添加组事件");

      var p_start = p_this.bind2Stamp(p_this.data.cur_event_date, p_this.data.cur_event_start);
      var p_end = p_this.bind2Stamp(p_this.data.cur_event_date, p_this.data.cur_event_end);

      wx.request({
        url: 'http://meeting123.xiaomy.net/api/Event/addGroupEvent',
        header: {
          'Authorization': app.globalData.skey
        },
        method: 'GET',
        data: {
          'title': p_this.data.cur_event_name,
          'content': p_this.data.cur_event_detail,
          'priority': p_this.data.cur_event_prior,
          'start_time': p_start,
          'end_time': p_end,
          'calendar_id': p_this.data.cur_group_id,
          'is_remind': 0,
          'is_repeat': p_this.data.cur_event_repeat,
        },
        success: function (res) {

          console.log(res);

          wx.showToast({
            title: '成功添加',
            icon: 'loading'
          });

          p_this.setData({
            edit_show: false,
            cur_day: p_this.getDistanceByDate(p_this.data.cur_event_date.slice(8, 10))
          });
        
        
          p_this.sendInitGroupChange(p_this.data.cur_group_members[p_this.data.cur_member].id);
          
        }
      });

    }

  },

  sendInitGroupChange:function(member_id){

    var p_this =this;
    

    if(member_id==-1){
      wx.request({
        url: 'http://meeting123.xiaomy.net/api/Event/showMyCalendar',
        header: {
          'Authorization': app.globalData.skey
        },
        success: function (res) {
          res = res.data;
          var p_inform_card = [];

          for (var i = 0; i < 10; i++) {
            var day = {
              day_index: i - 3,
              event: []
            };
            var events = [];
            for (var j = 0; j < res[i].event.length; j++) {

              var add = {
                name: res[i].event[j].title,
                id: res[i].event[j].event_id,
                is_repeat: res[i].event[j].is_repeat,
                content: res[i].event[j].content,
                display: false,
                start_time: p_this.stamp2min(res[i].event[j].start_time),
                end_time: p_this.stamp2min(res[i].event[j].end_time),
                priority: res[i].event[j].priority
              };
              events.push(add);
            }
            day.event = events;
            p_inform_card.push(day);

          }
          wx.hideToast();
          p_this.setData({
            inform_card: p_inform_card,
            other_inform_card:p_inform_card
          });
        }
      })

    }else{


    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Event/showOthersEvent',
      header: {
        'Authorization': app.globalData.skey
      },
      method: 'GET',
      data: {
        'userid': member_id
      },
      success: res => {
        res = res.data;
        var p_inform_card = [];

        for (var i = 0; i < 10; i++) {
          var day = {
            day_index: i - 3,
            event: []
          };


          var events = [];

          for (var j = 0; j < res[i].event.length; j++) {

            var add = {
              name: res[i].event[j].title,
              id: res[i].event[j].event_id,
              is_repeat: res[i].event[j].is_repeat,
              content: res[i].event[j].content,
              display: false,
              start_time: p_this.stamp2min(res[i].event[j].start_time),
              end_time: p_this.stamp2min(res[i].event[j].end_time),
              priority: res[i].event[j].priority
            };

            events.push(add);
          }
          day.event = events;
          p_inform_card.push(day);

        }
        wx.hideToast();


        p_this.setData({
          other_inform_card: p_inform_card,
        });
  
  }
  });
  }
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
        cur_event_repeat: this.data.inform_card[day_index].event[event_index].is_repeat,
        cur_event_detail: this.data.inform_card[day_index].event[event_index].content,
        cur_event_mode:1,
        cur_event_id: this.data.inform_card[day_index].event[event_index].id,
        cur_event_index:event_index
      });


    }else{

    }

  },




  handleAddEvent:function(){

    var set_month = new Date().getMonth() + 1;

    var six_after = new Date();
    six_after.setDate(six_after.getDate()+6);

   

    
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
      cur_event_repeat: 0,
      cur_event_detail: '',
      cur_year: new Date().getFullYear(),
      cur_month: set_month,
      cur_date: new Date().getDate(),
      cur_event_date: new Date().getFullYear() + '-' + set_month + '-' + new Date().getDate(),
      six_after_year:six_after.getFullYear(),
      six_after_month:six_after.getMonth()+1,
      six_after_date:six_after.getDate(),
      cur_event_mode:0
    });

    
  },
  handleModifyEvent: function () {

    var start_hour = this.data.cur_event_start.slice(0, 2);
    var start_minute = this.data.cur_event_start.slice(3, 5);
    var start_cal = parseInt(start_hour) * 60 + parseInt(start_minute);

    var end_hour = this.data.cur_event_end.slice(0, 2);
    var end_minute = this.data.cur_event_end.slice(3, 5);
    var end_cal = parseInt(end_hour) * 60 + parseInt(end_minute);


    var p_day_index = parseInt(this.data.cur_event_date.slice(8, 10)) - this.data.cur_date;

    var p_this = this;

    if (this.data.cur_event_name == "") {
      this.setData({
        submit_error: true,
        submit_error_msg: "事件名称不能为空"
      });
    } else if (end_cal - start_cal < 30) {
      this.setData({
        submit_error: true,
        submit_error_msg: "事件长度至少为30分钟"
      });
    } else if (!p_this.checkModifyOverlap(p_day_index, start_cal, end_cal,p_this.data.cur_event_index)) {
      this.setData({
        submit_error: true,
        submit_error_msg: "当前指定的时间有其他事件存在"
      });

    } else {
      /**至此，个人事件的提交校验全部完成，可以提交至后端 */

      var p_start = p_this.bind2Stamp(p_this.data.cur_event_date, p_this.data.cur_event_start);
      var p_end = p_this.bind2Stamp(p_this.data.cur_event_date, p_this.data.cur_event_end);


      wx.request({
        url: 'http://meeting123.xiaomy.net/api/Event/modifyEvent',
        header: {
          'Authorization': app.globalData.skey
        },
        method: 'GET',
        data: {
          'title': p_this.data.cur_event_name,
          'content': p_this.data.cur_event_detail,
          'priority': parseInt(p_this.data.cur_event_prior),
          'start_time': p_start,
          'end_time': p_end,
          'event_id': parseInt(p_this.data.cur_event_id),
        },
        success: function () {

          wx.showToast({
            title: '成功修改',
            icon: 'loading'
          });


          p_this.setData({
            edit_show: false,
            cur_day: p_this.getDistanceByDate(p_this.data.cur_event_date.slice(8, 10))

          });

          p_this.sendInitRequest(app.globalData.skey);

        }

      });


    }
  },

  handleDeleteEvent:function(){
    var p_this=this;
    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Event/deleteEvent',
      header: {
        'Authorization': app.globalData.skey
      },
      method: 'GET',
      data: {
        'event_id':p_this.data.cur_event_id
      },
      success:function(){
        wx.showToast({
          title: '事件已删除',
          icon: 'loading'
        });

        p_this.setData({
          edit_show:false
        });
        p_this.sendInitRequest(app.globalData.skey);
      }

    })


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

  handleSuggestTap: function (e) {
    this.setData(
      {
        edit_show: true,
        suggest_show:false
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

  stamp2min:function(stamp){
    var start_hour = parseInt(stamp.slice(11,13));
    var start_min = parseInt(stamp.slice(14,16));
    return start_hour*60 + start_min;
  },

  sendInitRequest:function(skey){

    var p_this=this;
    var renew_groups=[];
    var p_name='我';
    if (this.data.cur_mode == 0) p_name ="(在此切换组信息)";

    var first_group={
      id: -1,
      name: p_name,
      leader: false
    };

    renew_groups.push(first_group);

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/myCreated',
      header: {
        'Authorization': skey
      },
      success: res => { 
        res = res.data;
        var insert_group;
        for(var i = 0;i<res.calendarList.length;i++){
          insert_group={
            id:res.calendarList[i].calendarId,
            name:res.calendarList[i].calendarName,
            leader:true
          }
          renew_groups.push(insert_group);
        }
        p_this.setData({
          groups: renew_groups
        });
       }

    });

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/myParticipated',
      header: {
        'Authorization': skey
      },
      success: res => { 
        res = res.data;
        var insert_group;
        for (var i = 0; i < res.calendarList.length; i++) {
          insert_group = {
            id: res.calendarList[i].calendarId,
            name: res.calendarList[i].calendarName,
            leader: false
          }
          renew_groups.push(insert_group);
          
        }
        p_this.setData({
          groups: renew_groups
        });

      }

    });

    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Calendar/myCalendar',
      header: {
        'Authorization': skey
      },
      success: res => {
        
        p_this.setData({
          my_calendar_id: res.data.calendarId
        });
      }

    });


    wx.request({
      url: 'http://meeting123.xiaomy.net/api/Event/showMyCalendar',
      header: {
        'Authorization': skey
      },

      success: function (res) {
        res = res.data;
        var p_inform_card = [];
   
        for (var i = 0; i < 10; i++) {



          var day = {
            day_index: i - 3,
            event: []
          };


          var events = [];

          for (var j = 0; j < res[i].event.length; j++) {

            var add = {
              name: res[i].event[j].title,
              id: res[i].event[j].event_id,
              is_repeat: res[i].event[j].is_repeat,
              content: res[i].event[j].content,
              display: false,
              start_time: p_this.stamp2min(res[i].event[j].start_time),
              end_time: p_this.stamp2min(res[i].event[j].end_time),
              priority: res[i].event[j].priority
            };

            events.push(add);
          }
          day.event = events;
          p_inform_card.push(day);

        }
        wx.hideToast();
       

        p_this.setData({
          inform_card: p_inform_card
        });

      }
    })





  },


  initData(){
    var p_this=this;
    /**在这里发送第一次初始化的网络请求 */
    wx.showToast({
      title: '获取数据中',
      icon:'loading',
      duration:5000
      
    });

    if(app.globalData.skey==null){
    app.skeyReadyCallback = res =>{
      var skey = res.data.skey;
      p_this.sendInitRequest(skey);
    }
    } else { p_this.sendInitRequest(app.globalData.skey);}
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

    var set_month = new Date().getMonth() + 1;

    var six_after = new Date();
    six_after.setDate(six_after.getDate() + 6);

    


    var set_month = new Date().getMonth()+1;

    this.setData({
      display_dates :tmp,
      cur_day:0,
      cur_hour: new Date().getHours(),
      cur_min: new Date().getHours() * 60 + new Date().getMinutes(),
      cur_mode:this.data.cur_group==0?0:1,
      'groups[0].name':this.data.cur_group==0?'(在此切换组信息)':'我',
      cur_year: new Date().getFullYear(),
      cur_month: set_month,
      cur_date: new Date().getDate(),
      six_after_year: six_after.getFullYear(),
      six_after_month: six_after.getMonth()+1,
      six_after_date: six_after.getDate(),
      cur_event_date: new Date().getFullYear() +'-'+ set_month + '-'+new Date().getDate(),
      cur_event_name: '',
      cur_event_start: '00:00',
      cur_event_end: '23:59',
      cur_event_prior: 0,
      'prior_sel[0].checked': false,
      'prior_sel[1].checked': false,
      'prior_sel[2].checked': false,
      'prior_sel[3].checked': false,
      cur_event_repeat:0

    });

  },

  initName:function(){

    setTimeout(function(){
      wx.request({
        url: 'http://meeting123.xiaomy.net/api/user/changeName',
        header: {
          'Authorization': app.globalData.skey
        },
        data: {
          'userName': app.globalData.userInfo.nickName
        }
      });

    },5000);

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
    this.initName();

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