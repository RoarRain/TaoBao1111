/**
 * By RoarRain
 * taobao 20201111
 */

function startGetMiaoCoinTask() {
  while (true) {
    var target = text("逛一逛").findOne(2000) || text("签到").findOne(2000);
    if (target == null) {
      toast("浏览任务完成");
      back();
      sleep(1000);
      break;
    }
    target.click();
    sleep(3000);
    if (target.text() === "签到") {
      sleep(2000);
      continue;
    } else {
      back();
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
  data: "alipays://platformapi/startapp?appId=68687502",
  packageName: "com.eg.android.AlipayGphone",
});
sleep(3000);
var mainGetCoinBtn = text("20000喵币点击领取").findOne(3000);
if (mainGetCoinBtn) {
  mainGetCoinBtn.click();
  sleep(500);
}
sleep(500);
if (clickGetMiaoCoin()) {
  startGetMiaoCoinTask();
} else {
  toast("进入赚喵币任务失败");
}
