const Long = 12;
const Wide = 10;
const Count = 26;
var randomPoint = [];

function randomArr(arr) {
  var num1, num2;
  for (var i = 0; i < Count; i++) {
    var flag = 1;
    while (flag) {
      num1 = parseInt(Math.random() * Long);
      num2 = parseInt(Math.random() * Wide);
      if (arr[num1][num2] != 0) {
        flag = 1;
      } else {
        arr[num1][num2] = String.fromCharCode(97 + i).charAt(0);
        randomPoint[i] = {
          x: num1,
          y: num2
        };
        flag = 0;
      }
    }
  }
  console.log(arr);
}

function searchTop(arr, point, i) {
  var emptyPoint = {};
  var searchStartY;
  var searchEndtY;
  var searchX;
  if (point.y - i < 0) {
    // 防止x方向向左越界
    searchStartY = 0;
  } else {
    searchStartY = point.y - i;
  }
  if (point.y + i > Wide - 1) {
    // 防止x方向向右越界
    searchEndtY = Wide - 1;
  } else {
    searchEndtY = point.y + i;
  }
  if (point.x - i < 0) {
    // 防止y方向向上越界
    searchX = -1;
  } else {
    searchX = point.x - i;
  }
  for (var searchY = searchStartY; searchY <= searchEndtY && searchX >= 0; searchY++) {
    if (arr[searchX][searchY] == 0) {
      emptyPoint.x = searchX;
      emptyPoint.y = searchY;
      return emptyPoint;
    }
  }
  return 0;
}

function searchRight(arr, point, i) {
  var emptyPoint = {};
  var searchStartX;
  var searchEndtX;
  var searchY;
  if (point.x - i < 0) {
    // 防止y方向向上越界
    searchStartX = 0;
  } else {
    searchStartX = point.x - i;
  }
  if (point.x + i > Long - 1) {
    // 防止y方向向下越界
    searchEndtX = Long - 1;
  } else {
    searchEndtX = point.x + i;
  }
  if (point.y + i > Wide - 1) {
    // 防止x方向向右越界
    searchY = -1;
  } else {
    searchY = point.y + i;
  }
  for (var searchX = searchStartX; searchX <= searchEndtX && searchY >= 0; searchX++) {
    if (arr[searchX][searchY] == 0) {
      emptyPoint.x = searchX;
      emptyPoint.y = searchY;
      return emptyPoint;
    }
  }
  return 0;
}

function searchBottom(arr, point, i) {
  var emptyPoint = {};
  var searchStartY;
  var searchEndtY;
  var searchX;
  if (point.y - i < 0) {
    // 防止x方向向左越界
    searchStartY = 0;
  } else {
    searchStartY = point.y - i;
  }
  if (point.y + i > Wide - 1) {
    // 防止y方向向右越界
    searchEndtY = Wide - 1;
  } else {
    searchEndtY = point.y + i;
  }
  if (point.x + i > Long - 1) {
    // 防止y方向向下越界
    searchX = -1;
  } else {
    searchX = point.x + i;
  }
  for (var searchY = searchStartY; searchY <= searchEndtY && searchX >= 0; searchY++) {
    if (arr[searchX][searchY] == 0) {
      emptyPoint.x = searchX;
      emptyPoint.y = searchY;
      return emptyPoint;
    }
  }
  return 0;
}

function searchLeft(arr, point, i) {
  var emptyPoint = {};
  var searchStartX;
  var searchEndtX;
  var searchY;
  if (point.x - i < 0) {
    // 防止y方向向上越界
    searchStartX = 0;
  } else {
    searchStartX = point.x - i;
  }
  if (point.x + i > Long - 1) {
    // 防止y方向向下越界
    searchEndtX = Long - 1;
  } else {
    searchEndtX = point.x + i;
  }
  if (point.y - i < 0) {
    // 防止x方向向右越界
    searchY = -1;
  } else {
    searchY = point.y - i;
  }
  for (var searchX = searchStartX; searchX <= searchEndtX && searchY >= 0; searchX++) {
    if (arr[searchX][searchY] == 0) {
      emptyPoint.x = searchX;
      emptyPoint.y = searchY;
      return emptyPoint;
    }
  }
  return 0;
}

function getClosePoint(arr, point) {
  var result = {};
  for (var i = 1; i < Long; i++) {
    if (searchTop(arr, point, i) !== 0) {
      result = searchTop(arr, point, i);
      break;
    } else {
      if (searchRight(arr, point, i) !== 0) {
        result = searchRight(arr, point, i);
        break;
      } else {
        if (searchBottom(arr, point, i) !== 0) {
          result = searchBottom(arr, point, i);
          break;
        } else {
          if (searchLeft(arr, point, i) !== 0) {
            result = searchLeft(arr, point, i);
            break;
          } else {
            continue;
          }
        }
      }
    }
  }
  console.log('点的位置:' + point.x, point.y);
  console.log('最近点的位置:' + result.x, result.y);
  var temp = arr[point.x][point.y];
  arr[point.x][point.y] = arr[result.x][result.y];
  arr[result.x][result.y] = temp;
  console.log('交换后:');
  console.log(arr);
}

function TwoNeighbor(arr) {
  var num1 = parseInt(Math.random() * Count);
  var num2 = parseInt(Math.random() * Count);
  while (num1 === num2) {
    num2 = parseInt(Math.random() * Count);
  }
  var point1 = randomPoint[num1];
  getClosePoint(arr, point1);
  var point2 = randomPoint[num2];
  getClosePoint(arr, point2);
}

function main() {
  var arr = new Array(); //声明一维数组
  for (var x = 0; x < Long; x++) {
    arr[x] = new Array(); //声明二维数组
    for (var y = 0; y < Wide; y++) {
      arr[x][y] = 0; //数组初始化为0
    }
  }
  randomArr(arr);
  TwoNeighbor(arr);
}
main();
