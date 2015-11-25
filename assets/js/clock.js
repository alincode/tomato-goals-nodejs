var tomatoGoals = {};

tomatoGoals.countdown = {
  clock: $('#clock'),
  init: function() {
    this._setClockFormat();
    $('#pomodoro').click({minute:25}, this.handler._countdown);
    $('#short-break').click({minute:5}, this.handler._countdown);
    $('#long-break').click({minute:10}, this.handler._countdown);
    $('#reset').click({minute:0}, this.handler._countdown);

    $('#start').click({commend:'resume'}, this.handler._commend);
    $('#stop').click({commend:'pause'}, this.handler._commend);
  },
  _setClockFormat: function() {
    var minuteDate = this._getminuteFromNow(0);
    $(clock).countdown(minuteDate, function(event) {
      var time = event.strftime('%H:%M:%S');
      $(this).html(time);
    });
  },
  _getminuteFromNow: function(minute) {
    return new Date(new Date().valueOf() + minute * 60 * 1000);
  },
  handler : {
    _commend: function(eventObject) {
      console.log('commend:' + eventObject.data.commend);
      $(clock).countdown(eventObject.data.commend);
    },
    _countdown: function(eventObject) {
      console.log('minute:' + eventObject.data.minute);
      $(clock).countdown(tomatoGoals.countdown._getminuteFromNow(eventObject.data.minute));
    }
  }
}

$(document).ready(function() {
  tomatoGoals.countdown.init();
});
