(function(window){
    'use strict';

    function stpdInterscroller(stpdInterscroller){
        let config = {
            container: 'x',
            height: 0,
            width: null,
            showTitle: false,
            titleText: 'Advertisement',
            titleBackground: '#1AB6C5',
            titleColor: '#FFFFFF',
            overrideParentWidth: 0
        };

        stpdInterscroller.setConfig = function(conf){
            for (const key in conf) {
                if (typeof config[key] !== 'undefined') {
                    config[key] = conf[key];
                }
                else {
                    throw new Error("stpdInterscroller config key '" + key + "' not found");
                }
            }
            return config;
        };

        stpdInterscroller.run = function(){
            let wrapperHeight = config.height;
            let wrapperWidth = config.width;

            if (!wrapperWidth) {
                wrapperWidth = "100%";
            } else if (wrapperWidth > document.documentElement.clientWidth){
                wrapperWidth = "100%";
            } else {
                wrapperWidth = config.width + "px";
            }

            let wrapperId = String(config.container);
            let elementToWrap = top.document.querySelector(wrapperId);   // select element with set value in index

            window.addEventListener("stpdRendered", function (e) {
                var adName =  e.detail.name;
                var adWinner = e.detail.winner;
                var elementToWrapChild = top.document.querySelector(wrapperId + " > div");
                var cleanEventName = adName.split('/')[2];
                var cleanContainerName = config.container.split('\"')[1];
                var startChar = String(elementToWrapChild.id).split('/', 2).join('/').length;
                var endChar = String(elementToWrapChild.id).split('_', 7).join('_').length;
                var cleanContainerChildName = String(elementToWrapChild.id).slice(startChar + 1, endChar,);

                if ( (cleanEventName == cleanContainerChildName) && (adWinner != "passback") ){
                    repositionAd();
                    addTitle();
                    addWrapper();
                }
            });

            // Wrapper element creation
            let scroller = document.createElement('div');
            let scrollerIn = document.createElement('div');
            let scrollerInWrapper = document.createElement('div');
            let scrollerWrapper = document.createElement('div');

            scrollerIn.setAttribute("class", "stpd-interscroller-in");
            scrollerInWrapper.setAttribute("class", "stpd-interscroller-in-wrapper");
            scrollerWrapper.setAttribute("class", "stpd-interscroller-wrapper");
            scroller.setAttribute("class", "stpd-interscroller");

            elementToWrap.parentNode.insertBefore(scrollerIn, elementToWrap);
            scrollerIn.parentNode.insertBefore(scrollerInWrapper, scrollerIn);
            scrollerInWrapper.parentNode.insertBefore(scrollerWrapper, scrollerInWrapper);
            scrollerWrapper.parentNode.insertBefore(scroller, scrollerWrapper);

            scrollerIn.appendChild(elementToWrap);
            scrollerInWrapper.appendChild(scrollerIn);
            scrollerWrapper.appendChild(scrollerInWrapper);
            scroller.appendChild(scrollerWrapper);

            // Wrap ad in title tags
            let addTitle = function () {
                var title = top.document.querySelector('.stpd-interscroller-title') // check if title already exists
                if (!title) {
                    if ( (config.showTitle) && (elementToWrap.clientHeight > 0) ) {
                        let scrollerTitleStart = document.createElement('div');
                        let scrollerTitleEnd = document.createElement('div');
                        scrollerTitleStart.setAttribute("class", "stpd-interscroller-title");
                        scrollerTitleEnd.setAttribute("class", "stpd-interscroller-title");
                        scrollerTitleStart.innerHTML = scrollerTitleEnd.innerHTML = String(config.titleText);
                        scroller.prepend(scrollerTitleStart);
                        scroller.append(scrollerTitleEnd);

                        let scrollerTitle = top.document.querySelectorAll('.stpd-interscroller-title');
                        scrollerTitle.forEach((adTitle) => {
                            adTitle.style.cssText += "background: " + config.titleBackground + "; color: " + config.titleColor + "; width: " + wrapperWidth + "; margin: auto; position: relative; font-size: 12px; text-align: center; height: 18px;";
                        });
                    }
                }
            }

            // Default css for wrapper
            let addWrapper = function() {
                if (elementToWrap.clientHeight > 0) {
                    scroller.style.cssText += "position: relative; padding: 0; overflow: hidden;"
                    scrollerWrapper.style.cssText += "position: relative; width: " + wrapperWidth + "; height: " + wrapperHeight + "px; margin: auto;"
                    scrollerInWrapper.style.cssText += "position: absolute; width: " + wrapperWidth + "; height: " + wrapperHeight + "px; clip: rect(auto, auto, auto, auto);"
                    scrollerIn.style.cssText += "position: fixed; max-width: 100%; top: 0;"
                }
            }

            // Override margins
            if (config.overrideParentWidth){
                let marginLeft = scroller.getBoundingClientRect().left
                let marginRight = scroller.getBoundingClientRect().right - window.innerWidth
                scroller.style.cssText += "margin-left: -" + marginLeft + "px; margin-right: " + marginRight + "px;";
            }

            // Scrollability
            let repositionAd = function() {
                // Horizontal reposition
                let margCalc = (scrollerWrapper.clientWidth - scrollerIn.clientWidth) / 2;
                scrollerIn.style.cssText += "margin-left: " + margCalc + "px;";

                //Wrapper height override if wrapped element smaller - unless wrapped element bigger than screen height
                if ( (elementToWrap.clientHeight < wrapperHeight) && (window.innerHeight > elementToWrap.clientHeight) ) {
                    scrollerWrapper.style.cssText += "height: " + elementToWrap.clientHeight + "px";
                    scrollerInWrapper.style.cssText += "height: " + elementToWrap.clientHeight + "px";
                }

                scrollerIn.style.height = elementToWrap.clientHeight + "px";        //stpd-interscroller-in"

                let windowHeight = window.innerHeight;
                let outWrapHeight = scrollerWrapper.clientHeight;                   //stpd-interscroller-wrapper
                let outWrapTop = scrollerWrapper.getBoundingClientRect().top;
                let innerElHeight = elementToWrap.clientHeight;

                if (elementToWrap.clientHeight < windowHeight){
                    if ((outWrapTop + outWrapHeight) > windowHeight) {
                        scrollerIn.style.bottom = "0";
                        scrollerIn.style.top = "unset";
                    } else if (outWrapTop < 0) {
                        scrollerIn.style.top = "0";
                        scrollerIn.style.bottom = "unset";
                    } else {
                        var calcRelation = ((windowHeight - outWrapHeight) / (windowHeight - innerElHeight));
                        var getElTopPos = (outWrapTop / calcRelation);
                        scrollerIn.style.cssText += "top: " + getElTopPos + "px;";
                    }
                } else {
                    scrollerIn.style.top = "0";
                    scrollerIn.style.bottom = "unset";
                }
            }

            setTimeout(function () {
                repositionAd();
            }, 1500);
            window.addEventListener("load", repositionAd);
            window.addEventListener("scroll", repositionAd);
            window.addEventListener("resize", repositionAd);
            window.addEventListener("load",  () => { addTitle(), addWrapper() });
            window.addEventListener("resize",  () => { addTitle(), addWrapper() });
        };

        if (stpdInterscroller.que.length > 0) {
            while (stpdInterscroller.que.length > 0) {
                try {
                    stpdInterscroller.que.shift()();
                } catch (err) {
                    throw new Error(err);
                }
            }
        }

        stpdInterscroller.que.push = function(q) {
            q();
        }

        return stpdInterscroller;
    }

    window.stpdInterscroller = stpdInterscroller(window.stpdInterscroller || {que:[]});

})(window);
