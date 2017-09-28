function video(width, height, id, num, folderName, imgPrefix, rate,  fn, a) {
    if (!(width && height && id && num && folderName && imgPrefix)) {
        alert("函数参数缺失");
        return;
    }
    // if (!(order && (order == 2 || order == 1))) {
    //     alert('图片序列参数应该 "1"（默认升序）或者 "2"（倒序）');
    //     return;
    // }
    var ind = 1,
        flag = true,
        flagInd = 0,
        flagArr = [true],
        myCanvas = document.getElementById(id),
        ctx = myCanvas.getContext("2d");

    // if (order == 2) {
    //     ind = num;
    // }

    myCanvas.setAttribute('width', width);
    myCanvas.setAttribute('height', height);

    // 改變速率
    function rateChange() {
        if (rate && typeof rate === 'number' && parseInt(rate) > 1) {
            for (var i = 0; i < parseInt(rate) - 1; i++) {
                flagArr.push(false);
            }
        }
    }
    rateChange();
    
    function animate() {
        if (ind == num + 1) {
            if (fn) fn(a || '');
            return;
        }
        var image = new Image();
        image.src = folderName + "/" + imgPrefix + ind + ".jpg";
        image.onload = function () {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
        }
        flag = flagArr[flagInd];
        if (flagInd == flagArr.length - 1) {
            flagInd = 0;
        } else {
            flagInd++;
        }
        if (flag) {
            // if (order && order == 2) {
            //     ind--
            // }
            // else {
                ind++
            // }
        };
        requestAnimationFrame(animate);
    }
    animate();
}