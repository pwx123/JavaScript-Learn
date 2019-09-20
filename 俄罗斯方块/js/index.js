const ROW = 32;
const COLUMN = 16;
var timer = 0;
var longTranformFlag = false; //长条形单独处理
/* 初始化 */
function init() {
  var arr = new Array();
  for (let i = 0; i < ROW; i++) {
    arr[i] = new Array();
    for (let j = 0; j < COLUMN; j++) {
      arr[i][j] = 0;
    }
  }
  var activeblock = [];
  startNewShape(arr, activeblock);
  /* 键盘监听 */
  $(document).keyup(function (e) {
    switch (e.key) {
      case "w":
        trandfromShape(activeblock);
        draw(arr, activeblock, true);
        break;
      case "a":
        /* 
          TODO:边界问题
        */
        for (let i = 0; i < activeblock.length - 1; i++) {
          if (activeblock[i].y)
            activeblock[i].y -= 1;
        }
        draw(arr, activeblock, true);
        break;
      case "d":
        for (let i = 0; i < activeblock.length - 1; i++) {
          activeblock[i].y += 1;
        }
        draw(arr, activeblock, true);
        break;
    }
  })
}
/* 
  绘图 
  根据arr绘制整个图形，然后根据activeblock绘制活动的图形
  判断是否到底，到底后写入arr
*/
function draw(arr, activeblock, isOption) {
  repaint(arr);
  for (let i = 0; i < activeblock.length - 1; i++) {
    let x = activeblock[i].x > 0 ? activeblock[i].x : 0;
    let y = activeblock[i].y > 0 ? activeblock[i].y : 0;
    $li = $(".row>li").eq(x).find(".column>li").eq(y);
    $li.addClass("active");
    if (!isOption) {
      activeblock[i].x += 1;
    }
  }
  // 判断
  var flag = 0;
  for (let i = 0; i < activeblock.length - 1; i++) {
    if (activeblock[i].x > 31 || arr[activeblock[i].x][activeblock[i].y] === 1) {
      flag = 1;
    }
  }
  if (flag) {
    for (let i = 0; i < activeblock.length - 1; i++) {
      arr[activeblock[i].x - 1][activeblock[i].y] = 1;
    }
    startNewShape(arr, activeblock);
    // 消除一行
    var fillNum = 0;
    var colNum = 0;
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; i < COLUMN; j++) {
        if (arr[i][j] === 1) {
          colNum++;
        }
      }
      if (colNum === COLUMN) {
        fillNum++;
      }
    }
  }
}

/* 
  根据arr绘制整个图形
*/
function repaint(arr) {
  $("li").removeClass("active");
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COLUMN; j++) {
      if (arr[i][j] === 1) {
        $li = $(".row>li").eq(i).find(".column>li").eq(j);
        $li.addClass("active");
      }
    }
  }
}
/* 
  生成一个新图形 
*/
function startNewShape(arr, activeblock) {
  var shapeNum = parseInt(Math.random() * 5);
  switch (shapeNum) {
    case 0:
      getShape1(activeblock);
      break;
    case 1:
      getShape2(activeblock);
      break;
    case 2:
      getShape3(activeblock);
      break;
    case 3:
      getShape4(activeblock);
      break;
    case 4:
      getShape5(activeblock);
      break;
  }
  repaint(arr);
  draw(arr, activeblock);
  clearInterval(timer);
  timer = setInterval(() => {
    draw(arr, activeblock)
  }, 1200);
}
/* 
  图形变换
*/
function trandfromShape(activeblock) {
  if (activeblock[4].type === 1) {
    return;
  }
  var orginPoint = {};
  orginPoint.x = activeblock[0].x;
  orginPoint.y = activeblock[0].y;
  // 原始矩阵
  var orginArr = [
    [activeblock[0].x, activeblock[0].y, 1],
    [activeblock[1].x, activeblock[1].y, 1],
    [activeblock[2].x, activeblock[2].y, 1],
    [activeblock[3].x, activeblock[3].y, 1],
  ];
  // 旋转矩阵
  var roateArr = [
    [Math.round(Math.cos(90 * Math.PI / 180)), -Math.round(Math.sin(90 * Math.PI / 180)), 0],
    [Math.round(Math.sin(90 * Math.PI / 180)), Math.round(Math.cos(90 * Math.PI / 180)), 0],
    [0, 0, 1],
  ];
  // 长条特殊处理
  if (activeblock[4].type === 2 && longTranformFlag) {
    roateArr = [
      [Math.round(Math.cos(90 * Math.PI / 180)), Math.round(Math.sin(90 * Math.PI / 180)), 0],
      [Math.round(-Math.sin(90 * Math.PI / 180)), Math.round(Math.cos(90 * Math.PI / 180)), 0],
      [0, 0, 1],
    ];
  }
  longTranformFlag = !longTranformFlag;
  // 转换矩阵
  var tranfromArr = [
    [1, 0, 0],
    [0, 1, 0],
    [-orginPoint.x, -orginPoint.y, 1]
  ];
  var tranfromOrginArr = [
    [1, 0, 0],
    [0, 1, 0],
    [orginPoint.x, orginPoint.y, 1]
  ];
  arrMult(orginArr, tranfromArr);
  arrMult(orginArr, roateArr);
  arrMult(orginArr, tranfromOrginArr);
  for (let i = 0; i < 4; i++) {
    activeblock[i].x = orginArr[i][0];
    activeblock[i].y = orginArr[i][1];
  }
}
/* 
  矩阵相乘
*/
function arrMult(orginArr, tranfromArr) {
  var result = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      result[i][j] = orginArr[i][0] * tranfromArr[0][j] + orginArr[i][1] * tranfromArr[1][j] + orginArr[i][2] * tranfromArr[2][j];
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      orginArr[i][j] = result[i][j];
    }
  }
}
/* 
  获取不同的方块图像
  保存图形的初始坐标
  从中间开始出现
 */
function getShape1(activeblock) { //正方形
  activeblock[0] = {
    x: 1,
    y: 8
  };
  activeblock[1] = {
    x: 1,
    y: 9
  };
  activeblock[2] = {
    x: 0,
    y: 8
  };
  activeblock[3] = {
    x: 0,
    y: 9
  };
  activeblock[4] = {
    type: 1
  };
}

function getShape2(activeblock) { //长条
  activeblock[0] = {
    x: 2,
    y: 8
  };
  activeblock[1] = {
    x: 3,
    y: 8
  };
  activeblock[2] = {
    x: 1,
    y: 8
  };
  activeblock[3] = {
    x: 0,
    y: 8
  };
  activeblock[4] = {
    type: 2
  };
}

function getShape3(activeblock) { //L形
  activeblock[0] = {
    x: 1,
    y: 8
  };
  activeblock[1] = {
    x: 0,
    y: 8
  };
  activeblock[2] = {
    x: 2,
    y: 8
  };
  activeblock[3] = {
    x: 2,
    y: 9
  };
  activeblock[4] = {
    type: 3
  };
}

function getShape4(activeblock) { //土字形
  activeblock[0] = {
    x: 1,
    y: 8
  };
  activeblock[1] = {
    x: 1,
    y: 7
  };
  activeblock[2] = {
    x: 1,
    y: 9
  };
  activeblock[3] = {
    x: 0,
    y: 8
  };
  activeblock[4] = {
    type: 4
  };
}

function getShape5(activeblock) { //之字形
  activeblock[0] = {
    x: 1,
    y: 8
  };
  activeblock[1] = {
    x: 1,
    y: 7
  };
  activeblock[2] = {
    x: 0,
    y: 8
  };
  activeblock[3] = {
    x: 0,
    y: 9
  };
  activeblock[4] = {
    type: 5
  };
}
init();