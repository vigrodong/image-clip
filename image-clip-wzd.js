/**
 * Created by vigro on 2018/6/25.
 */
(function() {

  function imgClip(options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new Error('please give a reasonable object options');
      return false;
      if (!options.src) {
        throw new Error('please give a reasonable resource come');
      }
    }
    this.init(options);
  }

// 裁剪类的初始化功能
  imgClip.prototype.init = function(options) {
    let _this = this;

    //缓存文档body
    this.body = document.body;

    //src 图片资源来源，可以的链接，也可以是base64文件
    this.src = options.src;

    //图片的真实大小，也可以自己设置
    this.width = options.width || 1000;
    this.height = options.height || 1000;

    //图片加载容器，一个是原图容器，一个是裁剪，或者操作后的容器
    this.canvas = document.createElement('canvas');
    this.canvasSave = document.createElement('canvas');

    //两个canvas的执行环境
    this.ctxSave = this.canvasSave.getContext('2d');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    //插入到body里面
    this.body.appendChild(this.canvas);
    this.body.appendChild(this.canvasSave);

    this.image = new Image();
    this.image.src = this.src;
    this.image.onload = function() {
      _this.ctx.drawImage(_this.image, 0, 0, _this.width, _this.height);
    };
  };

//裁剪功能(矩形)
  imgClip.prototype.clip = function(startX, startY, width, height) {
    let imageData = this.ctx.getImageData(startX, startY, width, height);
    this.canvasSave.width = width;
    this.canvasSave.height = height;
    this.ctxSave.putImageData(imageData, 0, 0);
  };

  imgClip.prototype.clear = function() {
    this.body.removeChild(this.canvas);
    this.bdoy.removeChild(this.canvasSave);
  };

//导出图片
  imgClip.prototype.toBase64 = function(type, quality) {
    let type = 'image/jpeg', quality = 1;
    for (let i = 0; i < 2; i++) {
      if (typeof arguments[i] == 'string') {
        type = arguments[i];
      }
      if (typeof arguments[i] == 'number') {
        quality = arguments[i];
      }
    }
    return this.canvasSave.toDataURL(type, quality);
  };

  window.imgClip = imgClip;
})(window);
