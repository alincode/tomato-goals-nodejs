function getminuteFromNow(minute) {
  return new Date(new Date().valueOf() + minute * 60 * 1000);
}

var $clock = $('#clock');

$clock.countdown(getminuteFromNow(0), function(event) {
  $(this).html(event.strftime('%H:%M:%S'));
});

$('#pomodoro').click(function() {
  $clock.countdown(getminuteFromNow(25));
});

$('#short-break').click(function() {
  $clock.countdown(getminuteFromNow(5));
});

$('#long-break').click(function() {
  $clock.countdown(getminuteFromNow(10));
});

$('#stop').click(function() {
  $clock.countdown('pause');
});

$('#start').click(function() {
  $clock.countdown('resume');
});

$('#reset').click(function() {
  $clock.countdown(getminuteFromNow(0));
});
