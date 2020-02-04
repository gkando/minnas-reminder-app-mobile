export default (o, c, d) => {
  var LT = 'h:mm A';
  var L = 'MM/DD/YYYY';
  var calendarFormat = {
    lastDay: `[Yesterday at] ${LT}`,
    sameDay: `[Today at] ${LT}`,
    nextDay: `[Tomorrow at] ${LT}`,
    nextWeek: `dddd [at] ${LT}`,
    lastWeek: `[Last] dddd [at] ${LT}`,
    sameElse: L,
  };
  var proto = c.prototype;

  proto.calendar = function(referenceTime, formats) {
    var format = formats || this.$locale().calendar || calendarFormat;
    var referenceStartOfDay = d(referenceTime || undefined).startOf('d');
    var diff = this.diff(referenceStartOfDay, 'd', true);
    var sameElse = 'sameElse';
    var lastMonth = referenceStartOfDay.clone().subtract(1, 'month');
    /* eslint-disable no-nested-ternary */

    var retVal =
      // diff < -6
      lastMonth.month() === this.month() && lastMonth.year() === this.year()
        ? 'lastMonth'
        : diff < -1
        ? 'lastWeek'
        : diff < 0
        ? 'lastDay'
        : diff < 1
        ? 'sameDay'
        : diff < 2
        ? 'nextDay'
        : diff < 7
        ? 'nextWeek'
        : diff < 14
        ? 'twoWeeks'
        : // : this.month() === referenceStartOfDay.month() &&
          //   this.year() === referenceStartOfDay.year()
          // ? "thisMonth" diff < -7
          sameElse;
    /* eslint-enable no-nested-ternary */
    return this.format(format[retVal] || calendarFormat[retVal]);
  };
};
