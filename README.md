# Tetris Game / 俄罗斯方块

> This Tetris is developing

> 浏览器版本 ie8+, chrome, firefox ...


## 游戏截图

![Tetris 俄罗斯方块](src/img/preview.jpg)

## 扫码体验

![Tetris 俄罗斯方块](src/img/qrcode.png)

## 初始化方法

```angular2html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Tetris - 俄罗斯方块单机版 - Capricorncd</title>
  <link rel="stylesheet" href="../dist/css/tetris.css" type="text/css">
  <style>
    body {background-color: #333;}
    .game-box { float: left; margin-right: 10px; padding: 10px; width: 320px; height: 540px; border: 1px solid #999}
  </style>
</head>
<body>

<div class="game-box" id="TetrisA"></div>

<script src="../dist/js/tetris.js"></script>
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

* ...
