function _formatNormalize(formatter = "datetime") {
  if (typeof formatter === "function") {
    return formatter;
  }

  if (typeof formatter !== "string") {
    throw new TypeError("formatter must be a string or function");
  }

  if (formatter === "date") {
    formatter = "YYYY-MM-DD";
  } else if (formatter === "datetime") {
    formatter = "YYYY-MM-DD HH:mm:ss";
  }

  const formatterFunc = (dateInfo) => {
    const { YYYY, MM, DD, HH, mm, ss, ms } = dateInfo;
    return formatter
      .replace("YYYY", YYYY)
      .replace("MM", MM)
      .replace("DD", DD)
      .replace("HH", HH)
      .replace("mm", mm)
      .replace("ss", ss)
      .replace("ms", ms);
  };

  return formatterFunc;
}

function format(date, formatter = "datetime", isPad = true) {
  const formatFunc = _formatNormalize(formatter);
  const dateInfo = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString(),
    DD: date.getDate().toString(),
    HH: date.getHours().toString(),
    mm: date.getMinutes().toString(),
    ss: date.getSeconds().toString(),
    ms: date.getMilliseconds().toString(),
  };

  function _pad(prop, len = 2) {
    dateInfo[prop] = dateInfo[prop].padStart(len, "0");
  }

  if (isPad) {
    _pad('YYYY', 4);
    _pad('MM');
    _pad('DD');
    _pad('HH');
    _pad('mm');
    _pad('ss');
    _pad('ms', 3);
  }

  return formatFunc(dateInfo);
}

// 使用示例
const now = new Date();
console.log(format(now, 'date')); 
console.log(format(now, 'datetime')); 
console.log(format(now, 'YYYY-MM-DD HH:mm:ss', true)); 