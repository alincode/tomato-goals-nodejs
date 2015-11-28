var tomatoGoals = {};

tomatoGoals.timer = {
  clock: $('#countdown'),
  myCountDown : '',
  currentCountDownMinute : 0,
  currentCountDownType : '',
  pomodoro: $('#pomodoro'),
  shortBreak: $('#short-break'),
  longBreak: $('#long-break'),
  reset: $('#reset'),
  start: $('#start'),
  stop: $('#stop'),
  init: function() {
    this._setClockFormat();
    this.myCountDown.on('finish.countdown', this.handler._finishCountdown);

    this.pomodoro.click({minute:25, type: 'tomato'}, this.handler._countdown);
    this.shortBreak.click({minute:5, type: 'break'}, this.handler._countdown);
    this.longBreak.click({minute:10, type: 'break'}, this.handler._countdown);
    this.reset.click({minute:0, type: 'reset'}, this.handler._countdown);

    this.start.click({commend:'resume'}, this.handler._commend);
    this.stop.click({commend:'pause'}, this.handler._commend);

    tomatoGoals.history.updateNotifications();
    tomatoGoals.bell.init();
    tomatoGoals.shortcut.init();
  },
  _setClockFormat: function() {
    var minuteDate = this._getminuteFromNow(0);
    this.myCountDown = this.clock.countdown(minuteDate, function(event) {
      var time = event.strftime('%H:%M:%S');
      $(this).html(time);
    });
  },
  _getminuteFromNow: function(minute) {
    return new Date(new Date().valueOf() + minute * 60 * 1000);
  },
  _clear: function(){
    console.log('clear current minute and type');
    this.currentCountDownMinute = 0;
    this.currentCountDownType = '';
  },
  handler : {
    _commend: function(eventObject) {
      console.log('commend:' + eventObject.data.commend);
      var that = tomatoGoals.timer;
      that.myCountDown.countdown(eventObject.data.commend);
    },
    _countdown: function(eventObject) {
      var minute = eventObject.data.minute;
      var type = eventObject.data.type;

      var that = tomatoGoals.timer;
      that.currentCountDownMinute = minute;
      that.currentCountDownType = eventObject.data.type;
      console.log('minute:' + minute);
      that.myCountDown.countdown(that._getminuteFromNow(minute));

      if(type === 'reset'){
        that._clear();
        return;
      }
    },
    _finishCountdown: function(event){
      // http://hilios.github.io/jQuery.countdown/documentation.html
      var that = tomatoGoals.timer;
      var minute = that.currentCountDownMinute;
      console.log('finish countdown ' + minute + ' minute.');
      if(that.currentCountDownType === 'break'){
        tomatoGoals.history.setBreakTime(minute);
      }else{
        tomatoGoals.history.setTomatoTime(minute);
      }
      tomatoGoals.history.updateNotifications();
      tomatoGoals.bell.play();
    }
  }
}

tomatoGoals.history = {
  tomotoTimeKey : 'tomotoTime',
  breakTimeKey : 'breakTime',
  setTomatoTime : function(minute){
    this._setTime(this.tomotoTimeKey, minute);
  },
  setBreakTime : function(minute){
    this._setTime(this.breakTimeKey, minute);
  },
  _setTime: function(key, minute){
    if(this.isAvailableRecordHistory()){
      this.addItem(key, minute);
    }
  },
  isAvailableRecordHistory: function(){
    return (typeof(Storage) !== "undefined");
  },
  addItem: function(key, val){
    var oldValue = this.getItem(key);
    // console.log('addItem ---> oldValue:' + oldValue + ', val:' + val);
    localStorage.setItem(key, oldValue + val);
  },
  getItem: function(key){
    var val = localStorage.getItem(key);
    if(val == null) return 0;
    else return parseInt(val, 10);
  },
  updateNotifications: function(){
    console.log('update notifications');
    var tomatoTime = this.getItem(this.tomotoTimeKey);
    var breakTime = this.getItem(this.breakTimeKey);

    if(tomatoTime == 0 && breakTime == 0){
      return;
    }

    var message = 'Total tomato time is ' + tomatoTime +
      ' minutes , break time is ' + breakTime + ' minutes.';
    $('#notifications-panel').html(message);
  },
  clear: function(){
    this.setItem(this.breakTimeKey, 0);
    this.setItem(this.tomotoTimeKey, 0);
  }
}

tomatoGoals.bell = {
  init: function(){
    ion.sound({
        sounds: [{
          name: "door_bell",
          volume: 0.5,
          preload: false,
          loop: 3
        }],
        volume: 0.5,
        path: "sounds/",
        preload: true
    });
  },
  play: function(){
    console.log('bell play');
    ion.sound.play('door_bell');
  }
}

tomatoGoals.shortcut = {
  init: function(){
    var that = tomatoGoals.timer
    this.bind('keydown.space', that.stop);
    this.bind('keydown.alt_p', that.pomodoro);
    this.bind('keydown.alt_s', that.shortBreak);
    this.bind('keydown.alt_l', that.longBreak);
  },
  bind: function(eventType, element){
    $(document).bind(eventType, function (evt){
      element.click();
      return false;
    });
  }
}

$(document).ready(function() {
  tomatoGoals.timer.init();
});
