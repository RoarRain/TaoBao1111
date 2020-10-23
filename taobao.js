/**
 * By RoarRain
 * taobao 20201111
 */

toast("检测是否开启无障碍模式");
auto.waitFor();
app.startActivity({
  action: "android.intent.action.VIEW",
  data: "taobao://pages.tmall.com/wow/z/hdwk/act-20201111/index?disableNav=YES",
  packageName: "com.taobao.taobao",
});
textContains("撸猫").waitFor();

/**
 * 领喵币
 */
var mainGetCoinBtn = textContains("喵币点击领取").findOne(3000);
if (mainGetCoinBtn) {
  mainGetCoinBtn.click();
  sleep(500);
}

/**
 * 撸猫
 */
var reg = /我的喵币.*\d+/;
var vReg = /\d+/g;
let catBtn = textContains("撸猫").findOne(2000);
let coinCountBtn = textMatches(reg).findOne(3000);
if (catBtn && coinCountBtn) {
  let coinCount = coinCountBtn.text().match(vReg)[0];
  while (true) {
    let random = parseInt(Math.random() * 10);
    strokedCat(catBtn, random);
    toast(random);
    sleep(random * 500 + 3000);
    let newCoinCountBtn = textMatches(reg).findOne(3000);
    let newCoinCount = 0;
    if (newCoinCountBtn) {
      newCoinCount = newCoinCountBtn.text().match(vReg)[0];
      toast(newCoinCount);
    }
    if (newCoinCount > coinCount) {
      coinCount = newCoinCount;
    } else {
      break;
    }
  }
}

sleep(500);

/**
 * 浏览等任务
 */
if (clickGetMiaoCoin()) {
  sleep(2000);
  startGetMiaoCoinTask();
} else {
  toast("进入赚喵币任务失败");
}

function startGetMiaoCoinTask() {
  while (true) {
    var reg = /逛一逛["].*(\d\/\d)*/;
    var vReg = /\d+/g;
    var target =
      text("去搜索").findOne(3000) ||
      text("去浏览").findOne(3000) ||
      text("领取奖励").findOne(3000) ||
      textContains("每日签到领喵币(0/1)").findOne(3000) ||
      textMatches(reg).findOne(3000);
    if (
      target == null ||
      (reg.test(target.text()) &&
        target.text().match(vReg)[0] == target.text().match(vReg)[1])
    ) {
      back();
      alert("任务完成！ 其它任务请手动完成，有问题直接提Issues");
      exit();
      sleep(1000);
      break;
    }
    target.click();
    sleep(3000);
    if (target.text() != "领取奖励") {
      while (true) {
        var finish =
          textContains("继续逛逛").exists() ||
          textContains("任务完成").exists() ||
          descContains("任务完成").exists() ||
          descContains("任务已经").exists() ||
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
    }
    sleep(500);
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

function strokedCat(catBtn, clickCount) {
  let count = 0;
  while (count < clickCount) {
    sleep(500);
    catBtn.click();
    count++;
  }
}
