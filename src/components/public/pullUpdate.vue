<template>
    <div class="vue-scroller-container" >
        <div class="loading"></div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props:{
            onPull:Function,
            downText:{
                type:String,
                default:'下拉刷新数据'
            },
            pullText:{
              type:String,
                default:'松开加载数据'
            },
            loadingText:{
                type:String,
                default:'正在刷新数据'
            }
        },
        mounted(){
            var loading;
            var slide = function (option) {
                var defaults={
                    container:'',
                    next:function(){}
                }
                var downIcon = '<div class="mui-icon mui-icon-arrowthindown"></div>'
                var pullIcon = '<div class="mui-icon mui-icon-arrowthinup"></div>'
                var loadingIcon = '<div class="mui-icon mui-icon-loop load-loop"></div>'

                var {downText,pullText,loadingText} = option

                var start,
                        end,
                        length,
                        isLock = false,
                        isCanDo = false,
                        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                        hasTouch = 'ontouchstart' in window && !isTouchPad;
                var obj = document.querySelector(option.container);
                loading=obj.firstElementChild;
                var offset=loading.clientHeight;
                var objparent = obj.parentElement;


                var fn =
                {
                    translate: function (diff) {
                        obj.style.webkitTransform='translate3d(0,'+diff+'px,0)';
                        obj.style.transform='translate3d(0,'+diff+'px,0)';
                    },
                    setTransition: function (time) {
                        obj.style.webkitTransition='all '+time+'s';
                        obj.style.transition='all '+time+'s';
                    },
                    back: function () {
                        fn.translate(0 - offset);
                        isLock = false;
                        if (Math.abs(start - end) >= 50){
                            loading.innerHTML = '加载完成'
                        }
                    },
                    addEvent:function(element,event_name,event_fn){
                        if (element.addEventListener) {
                            element.addEventListener(event_name, event_fn, false);
                        } else if (element.attachEvent) {
                            element.attachEvent('on' + event_name, event_fn);
                        } else {
                            element['on' + event_name] = event_fn;
                        }
                    }
                };

                fn.translate(0-offset);
                fn.addEvent(obj,'touchstart',start);
                fn.addEvent(obj,'touchmove',move);
                fn.addEvent(obj,'touchend',end);
                fn.addEvent(obj,'mousedown',start)
                fn.addEvent(obj,'mousemove',move)
                fn.addEvent(obj,'mouseup',end)

                function start(e) {
                    if (objparent.scrollTop <= 0 && !isLock) {
                        var even = typeof event == "undefined" ? e : event;
                        isLock = true;
                        isCanDo = true;
                        if (even.touches){
                            start = hasTouch ? even.touches[0].pageY : even.pageY;
                        }
                        fn.setTransition(0);
                        loading.innerHTML = downIcon+downText;
                    }
                    return false;
                }
                function move(e) {
                    if (objparent.scrollTop <= 0 && isCanDo) {
                        var even = typeof event == "undefined" ? e : event;
                        end = hasTouch ? even.touches[0].pageY : even.pageY;
                        if (start < end) {
                            //阻止偏移错误
//                            even.preventDefault();
                            fn.setTransition(0);
                            if((end-start-offset)/2<=150) {
                                length=(end - start - offset) / 2;
                                fn.translate(length);
                            }
                            else {
                                length+=0.3;
                                fn.translate(length);
                            }
                        }
                        if (end - start > 50){
                            loading.innerHTML= pullIcon+pullText;
                        }else {
                            loading.innerHTML= downIcon+downText;
                        }

                    }
                }
                function end(e) {
                    if (isCanDo) {
                        isCanDo = false;
                        if (end - start >= offset) {
                            fn.setTransition(1.5);
                            fn.translate(0);
                            loading.innerHTML= loadingIcon+loadingText;
                            loading.firstElementChild.style.animation = 'loop 2s linear infinite';
                            if (typeof option.next == "function") {
                                option.next.call(fn, e);
                            }
                        } else {
                            fn.setTransition(1);
                            fn.back();
                        }
                    }
                }
            }

            if (this.onPull){
                var self = this

                slide({container:'.vue-scroller-container',next: function (e) {
                    var that = this
                    var endUpdate = function (msg) {
                        that.back.call()
                        loading.innerHTML = msg||'加载完成'
                    }
                    self.onPull(endUpdate)
                },downText:this.downText,pullText:this.pullText,loadingText:this.loadingText})
            }
        }
    }
</script>

<style scoped>
    .vue-scroller-container .loading{
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 100%;
        background-color: #f1f1f1;
    }
    .vue-scroller-container {
        -webkit-overflow-scrolling:touch;
    }

    @keyframes loop {
        0% {-webkit-transform: rotate(0deg);}
        50% {-webkit-transform: rotate(180deg);}
        100% {-webkit-transform: rotate(360deg);}
    }
</style>