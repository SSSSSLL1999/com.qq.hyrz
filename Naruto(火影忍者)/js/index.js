$('a').click(function () {
    //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减50px（这里根据需要自由设置）
    $('html,body').animate({
        scrollTop: ($($(this).attr('href')).offset().top - 50)
    }, 500);
});

//变速动画函数
function animate(element, json, fn) {
    clearInterval(element.timeId); //清理定时器
    element.timeId = setInterval(function () {
        var flag = true; //假设默认为当前值已经等于目标值
        for (var arrt in json) {
            if (arrt == "opacity") { //如果属性值为opacity
                var current = getStyle(element, arrt) * 100; //current和target先扩大100倍
                target = json[arrt] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[arrt] = current / 100; //运算完后缩小100倍
            } else if (arrt == "zIndex") { //如果属性值为zindex
                element.style[arrt] = json[arrt];
            } else { //普通属性
                var current = parseInt(getStyle(element, arrt));
                target = json[arrt];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step); //step大于零向上取整，小于零向下取整
                current += step;
                element.style[arrt] = current + "px";
            }
            if (current != target) {
                flag = false;
            }
        }
        if (flag) { //只有所有属性的当前值已经等于目标值，才清理定时器
            clearInterval(element.timeId);
            if (fn) { //回调函数
                fn();
            }
        }
    }, 20);
}

function getStyle(element, arrt) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[arrt] : element.currentStyle[arrt];
}

function my$(id) {
    return document.getElementById(id);
}
//写每张图片对应的样式
var config = [{
        "width": 308,
        "top": 50,
        "left": -310,
        "opacity": 0.8,
        "zIndex": -3
    },
    {
        "width": 308,
        "top": 50,
        "left": 27,
        "opacity": 0.8,
        "zIndex": 3
    }, //1
    {
        "width": 521,
        "top": -6,
        "left": 231,
        "opacity": 1,
        "zIndex": 4
    }, //2
    {
        "width": 308,
        "top": 50,
        "left": 663,
        "opacity": 0.8,
        "zIndex": 3
    },
    {
        "width": 308,
        "top": 50,
        "left": 1019,
        "opacity": 0.8,
        "zIndex": -3
    },
    {
        "width": 308,
        "top": 50,
        "left": 1019,
        "opacity": 0.8,
        "zIndex": -3
    }
];

var flag = true; //假设动画全部执行完毕-----锁
//页面加载的事件
window.onload = function () {
    //1---散开图片
    var list = my$("slide").getElementsByTagName("li"); //拿到所有li
    function assign() { //分配函数
        for (var i = 0; i < list.length; i++) {
            animate(list[i], config[i], function () {
                flag = true;
            });
        }
    }
    assign();
    document.getElementById('left_btn').onclick = function () {
        if (flag) {
            flag = false;
            config.unshift(config.pop()); //把最后一组值放到第一组
            assign();
        }
    }
    document.getElementById('right_btn').onclick = function () {
        if (flag) {
            flag = false;
            config.push(config.shift()); //把最后一组值放到第一组
            assign();
        }
    }
}