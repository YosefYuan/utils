// PC part
var pcWraperPart1 = `<div id="pro">`,

    pcWraperPart2 = `</div>`;

var pcPart1 = `<div class="pro-block part`,

    pcPart2 = `">`,

    pcPart3 = `</div>`;

// MB part
var mbWraperPart1 = `<div id="pro-mobile">`,

    mbWraperPart2 = `</div>`;

var mbPart1 = `<div class="pro-mobile-block part`,

    mbPart2 = `">`,

    mbPart3 = `</div>`;



// 静态资源后缀
var staticSuffix = `?$staticlink$"`;

// JS版本号
var jsVersionName = `index0.0.1.js`;

var cssLink = `<link rel="stylesheet" type="text/css" href="landing/2018/${pageId}/index.css?$staticlink$">`;

var jsLink = `<script type="text/javascript" src="landing/2018/lib/${jsVersionName}?$staticlink$"></script>`

// 图片链接
var $pcimg1 = `<img class="ld" data-src="landing/2018/${pageId}/images/p2_`,

    $pcimg2 = `.jpg${staticSuffix} alt="">`;

var $mbimg1 = `<img class="ld" data-src="landing/2018/${pageId}/images/m_`,

    $mbimg2 = `.jpg${staticSuffix} alt="">`

// 普通链接
var $link1 = `<a href="`,

    $link2 = `" class="plink link`,

    $link3 = `"></a>`;

// 产品链接
var $prodLink1 = `<a href="$url('Product-Show','pid','`,

    $prodLink2 = `')$" class="plink link`,

    $prodLink3 = `" target="_blank"></a>`;

// 产品弹窗链接
var $prodBt1 = `<a href="$url('Product-Show','pid','`,

    $prodBt2 = `')$" class="plink bt`,

    $prodBt3 = ` js-button_shop_now"></a>`;

function testProd(prefix) {
    var reg = /^BIO/;
    return reg.test(prefix);
}

function generateHtml() {
    var html = cssLink;

    // pc 部分
    html += pcWraperPart1;
    for (var i = 0; i < pcPartJson.length; i++) {
        var imgNum = i + 1;
        if (imgNum < 10) {
            imgNum = `0${imgNum}`
        }
        html += (pcPart1 + (i + 1) + pcPart2 + $pcimg1 + imgNum + $pcimg2);
        for (var j = 0; j < pcPartJson[i].length; j++) {
            var linkName = pcPartJson[i][j];
            if (testProd(linkName)) {
                html += $prodLink1 + linkName + $prodLink2 + (j + 1) + $prodLink3 + $prodBt1 + linkName + $prodBt2 + (j + 1) + $prodBt3;
            } else {
                html += $link1 + linkName + $link2 + (j + 1) + $link3;
            }
        }
        html += pcPart3;
    }
    html += pcWraperPart2;

    // mb 部分
    // html += mbWraperPart1;    
    // for (var i = 0; i < mbPartJson.length; i++) {
    //     var imgNum = i + 1;
    //     if (imgNum < 10) {
    //         imgNum = `0${imgNum}`
    //     }
    //     html += (mbPart1 + (i + 1) + mbPart2 + $mbimg1 + imgNum + $mbimg2);
    //     for (var j = 0; j < mbPartJson[i].length; j++) {
    //         var linkName = mbPartJson[i][j];
    //         if (testProd(linkName)) {
    //             html += $prodLink1 + linkName + $prodLink2 + (j + 1) + $prodLink3 + $prodBt1 + linkName + $prodBt2 + (j + 1) + $prodBt3;
    //         } else {
    //             html += $link1 + linkName + $link2 + (j + 1) + $link3;
    //         }
    //     }
    //     html += mbPart3;
    // }
    // html += mbWraperPart2;

    // 汇总并显示
    html += jsLink;
    document.getElementById('htmlwrapper').innerText = html;
}

generateHtml();