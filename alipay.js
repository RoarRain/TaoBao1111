/**
 * By RoarRain
 * taobao 20201111
 */

toast("检测是否开启无障碍模式");
auto.waitFor();
app.startActivity({
  action: "android.intent.action.VIEW",
  data: "alipays://platformapi/startapp?appId=68687502",
  packageName: "com.eg.android.AlipayGphone",
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
  toast(coinCount);
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
 * 浏览等赚喵币
 */
if (clickGetMiaoCoin()) {
  startGetMiaoCoinTask();
} else {
  toast("进入赚喵币任务失败");
}

function startGetMiaoCoinTask() {
  while (true) {
    var target = text("逛一逛").findOne(2000) || text("签到").findOne(2000);
    if (target == null) {
      back();
      alert("任务完成！ 其它任务请手动完成，有问题直接提Issues");
      exit();
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

function strokedCat(catBtn, clickCount) {
  let count = 0;
  while (count < clickCount) {
    sleep(500);
    catBtn.click();
    count++;
  }
}
