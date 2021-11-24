/* 歌词处理 */
function createLrcObj(lrc) {
  let oLRC = {
    ti: "", //歌曲名
    ar: "", //演唱者
    al: "", //专辑名
    by: "", //歌词制作人
    ms: [], //歌词数组{t:时间,c:歌词}
  };

  if (lrc.length == 0) return;
  var lrcs = lrc.split("\n"); //用回车拆分成数组
  for (var i in lrcs) {
    //遍历歌词数组
    lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
    var t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]")); //取[]间的内容
    var s = t.split(":"); //分离:前后文字
    if (isNaN(parseInt(s[0]))) {
      //不是数值
      for (var i in oLRC) {
        if (i != "ms" && i == s[0].toLowerCase()) {
          oLRC[i] = s[1];
        }
      }
    } else {
      //是数值
      var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
      var start = 0;
      for (var k in arr) {
        start += arr[k].length; //计算歌词位置
      }
      var content = lrcs[i].substring(start); //获取歌词内容
      for (var k in arr) {
        var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
        var s = t.split(":"); //分离:前后文字
        if (content) {
          //歌词可能有空字符串
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content,
          });
        }
      }
    }
  }
  oLRC.ms.sort(function(a, b) {
    //按时间顺序排序
    return a.t - b.t;
  });

  return oLRC;
}
/* 秒转时间格式 */
function formateTime(time) {
  const h = parseInt(time / 3600);
  const minute = parseInt((time / 60) % 60);
  const second = Math.ceil(time % 60);

  const hours = h < 10 ? "0" + h : h;
  const formatSecond = second > 59 ? 59 : second;
  return `${hours > 0 ? `${hours}:` : ""}${
    minute < 10 ? "0" + minute : minute
  }:${formatSecond < 10 ? "0" + formatSecond : formatSecond}`;
}

export { createLrcObj, formateTime };
