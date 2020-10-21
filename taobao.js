/**
 * By RoarRain
 * taobao 20201111
 */

function startGetMiaoCoinTask() {
  while (true) {
    var target = text("去搜索").findOne(3000) || text("去浏览").findOne(3000);
    if (target == null) {
      toast("浏览任务完成");
      back();
      sleep(1000);
      break;
    }
    target.click();
    sleep(3000);
    while (true) {
      var finish =
        text("继续逛逛").exists() ||
        text("任务完成").exists() ||
        desc("任务完成").exists() ||
        text("任务已经").exists() ||
        text("任务已完成").exists() ||
        text("全部完成啦").exists() ||
        descStartsWith("已获得").exists() ||
        textStartsWith("今日已达上限").exists() ||
        textStartsWith("已获得").exists();
      if (finish) {
        back();
        break;
      }
    }
    sleep(1500);
  }
}

function clickGetMiaoCoin() {
  var miaoCoinBtn = className("android.widget.Button").text("赚喵币").findOne();
  if (miaoCoinBtn) {
    miaoCoinBtn.click();
    sleep(1000);
    return true;
  } else {
    return false;
  }
}

toast("检测是否开启无障碍模式");
auto.waitFor();
app.startActivity({
  action: "android.intent.action.VIEW",
  data: "taobao://pages.tmall.com/wow/z/hdwk/act-20201111/index?disableNav=YES",
  packageName: "com.taobao.taobao",
});
sleep(3000);
var mainGetCoinBtn = text("20000喵币点击领取").findOne(3000);
if (mainGetCoinBtn) {
  mainGetCoinBtn.click();
  sleep(500);
}
if (clickGetMiaoCoin()) {
  sleep(2000);
  startGetMiaoCoinTask();
} else {
  toast("进入赚喵币任务失败");
}
