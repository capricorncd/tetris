# Tetris Game / 俄罗斯方块

> This Tetris is developing

## 游戏截图

![Tetris 俄罗斯方块](src/img/preview.jpg)

## 扫码体验

![Tetris 俄罗斯方块](src/img/qrcode.png)

## 初始化方法

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Tetris - 俄罗斯方块单机版 - zx1984</title>
  <style>
    body {background-color: #333;}
    .game-box { float: left; margin-right: 10px; padding: 10px; width: 320px; height: 540px; border: 1px solid #999}
  </style>
</head>
<body>

<div class="game-box" id="TetrisA"></div>

<script src="./tetris.min.js"></script>
<script>
  new Tetris({
    // 可选参数，默认为body
    container: '#TetrisA',
    // 错误回调
    error: function (err) {
      console.error(err)
    },
    // 游戏DOM结构创建完成回调
    ready: function (res) {
      console.log(res)
    }
  })
</script>
</body>
</html>

```

## 待开发功能

* 游戏难易程度选项

* PC操作自定义方向键

* 游戏声音

* 排行榜记录

* 自定义主题（方块颜色、舞台颜色等等）

* ...

UI方面暂时没有想到合适的方案，待续 ...

## 最后

记得点【★Star】，走过路过千万不要错过，Thanks！
