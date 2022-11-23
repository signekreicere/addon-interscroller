/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	//Interscroller bundle
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	//Interscroller bundle
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	//Interscroller bundle
	else if(typeof exports === 'object')
		exports["dist"] = factory();
	//Interscroller bundle
	else
		root["dist"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/interscroller.js":
/*!******************************!*\
  !*** ./src/interscroller.js ***!
  \******************************/
/***/ (function() {

eval("(function (window) {\n  'use strict';\n\n  function stpdInterscroller(stpdInterscroller) {\n    let config = {\n      container: 'x',\n      height: 0,\n      width: null,\n      showTitle: false,\n      titleText: 'Advertisement',\n      titleBackground: '#1AB6C5',\n      titleColor: '#FFFFFF',\n      overrideParentWidth: 0\n    };\n    stpdInterscroller.setConfig = function (conf) {\n      for (const key in conf) {\n        if (typeof config[key] !== 'undefined') {\n          config[key] = conf[key];\n        } else {\n          throw new Error(\"stpdInterscroller config key '\" + key + \"' not found\");\n        }\n      }\n      return config;\n    };\n    stpdInterscroller.run = function () {\n      let wrapperHeight = config.height;\n      let wrapperWidth = config.width;\n      if (!wrapperWidth) {\n        wrapperWidth = \"100%\";\n      } else if (wrapperWidth > document.documentElement.clientWidth) {\n        wrapperWidth = \"100%\";\n      } else {\n        wrapperWidth = config.width + \"px\";\n      }\n      let wrapperId = String(config.container);\n      let elementToWrap = top.document.querySelector(wrapperId); // select element with set value in index\n\n      // Wrapper element creation\n      let scroller = document.createElement('div');\n      let scrollerIn = document.createElement('div');\n      let scrollerInWrapper = document.createElement('div');\n      let scrollerWrapper = document.createElement('div');\n      scrollerIn.setAttribute(\"class\", \"stpd-interscroller-in\");\n      scrollerInWrapper.setAttribute(\"class\", \"stpd-interscroller-in-wrapper\");\n      scrollerWrapper.setAttribute(\"class\", \"stpd-interscroller-wrapper\");\n      scroller.setAttribute(\"class\", \"stpd-interscroller\");\n      elementToWrap.parentNode.insertBefore(scrollerIn, elementToWrap);\n      scrollerIn.parentNode.insertBefore(scrollerInWrapper, scrollerIn);\n      scrollerInWrapper.parentNode.insertBefore(scrollerWrapper, scrollerInWrapper);\n      scrollerWrapper.parentNode.insertBefore(scroller, scrollerWrapper);\n      scrollerIn.appendChild(elementToWrap);\n      scrollerInWrapper.appendChild(scrollerIn);\n      scrollerWrapper.appendChild(scrollerInWrapper);\n      scroller.appendChild(scrollerWrapper);\n\n      // Wrap ad in title tags\n      if (config.showTitle) {\n        let scrollerTitleStart = document.createElement('div');\n        let scrollerTitleEnd = document.createElement('div');\n        scrollerTitleStart.setAttribute(\"class\", \"stpd-interscroller-title\");\n        scrollerTitleEnd.setAttribute(\"class\", \"stpd-interscroller-title\");\n        scrollerTitleStart.innerHTML = scrollerTitleEnd.innerHTML = String(config.titleText);\n        scroller.prepend(scrollerTitleStart);\n        scroller.append(scrollerTitleEnd);\n        let scrollerTitle = top.document.querySelectorAll('.stpd-interscroller-title');\n        scrollerTitle.forEach(adTitle => {\n          adTitle.style.cssText += \"background: \" + config.titleBackground + \"; color: \" + config.titleColor + \"; width: \" + wrapperWidth + \"; margin: auto; position: relative; font-size: 12px; text-align: center; height: 18px;\";\n        });\n      }\n\n      // Default css for wrapper\n      scroller.style.cssText += \"position: relative; padding: 0; overflow: hidden;\";\n      scrollerWrapper.style.cssText += \"position: relative; width: \" + wrapperWidth + \"; height: \" + wrapperHeight + \"px; margin: auto;\";\n      scrollerInWrapper.style.cssText += \"position: absolute; width: \" + wrapperWidth + \"; height: \" + wrapperHeight + \"px; clip: rect(auto, auto, auto, auto);\";\n      scrollerIn.style.cssText += \"position: fixed; max-width: 100%; top: 0;\";\n\n      // Override margins\n      if (config.overrideParentWidth) {\n        let marginLeft = scroller.getBoundingClientRect().left;\n        let marginRight = scroller.getBoundingClientRect().right - window.innerWidth;\n        scroller.style.cssText += \"margin-left: -\" + marginLeft + \"px; margin-right: \" + marginRight + \"px;\";\n      }\n\n      // Scrollability\n      let repositionAd = function () {\n        // Horizontal reposition\n        let margCalc = (scrollerWrapper.clientWidth - scrollerIn.clientWidth) / 2;\n        scrollerIn.style.cssText += \"margin-left: \" + margCalc + \"px;\";\n\n        //Wrapper height override if wrapped element smaller - unless wrapped element bigger than screen height\n        if (elementToWrap.clientHeight < wrapperHeight && window.innerHeight > elementToWrap.clientHeight) {\n          scrollerWrapper.style.cssText += \"height: \" + elementToWrap.clientHeight + \"px\";\n          scrollerInWrapper.style.cssText += \"height: \" + elementToWrap.clientHeight + \"px\";\n        }\n        scrollerIn.style.height = elementToWrap.clientHeight + \"px\"; //stpd-interscroller-in\"\n\n        let windowHeight = window.innerHeight;\n        let outWrapHeight = scrollerWrapper.clientHeight; //stpd-interscroller-wrapper\n        let outWrapTop = scrollerWrapper.getBoundingClientRect().top;\n        let innerElHeight = elementToWrap.clientHeight;\n        if (elementToWrap.clientHeight < windowHeight) {\n          if (outWrapTop + outWrapHeight > windowHeight) {\n            scrollerIn.style.bottom = \"0\";\n            scrollerIn.style.top = \"unset\";\n          } else if (outWrapTop < 0) {\n            scrollerIn.style.top = \"0\";\n            scrollerIn.style.bottom = \"unset\";\n          } else {\n            var calcRelation = (windowHeight - outWrapHeight) / (windowHeight - innerElHeight);\n            var getElTopPos = outWrapTop / calcRelation;\n            scrollerIn.style.cssText += \"top: \" + getElTopPos + \"px;\";\n          }\n        } else {\n          scrollerIn.style.top = \"0\";\n          scrollerIn.style.bottom = \"unset\";\n        }\n      };\n      window.addEventListener(\"scroll\", repositionAd);\n      window.addEventListener(\"load\", repositionAd);\n      window.addEventListener(\"resize\", repositionAd);\n    };\n    if (stpdInterscroller.que.length > 0) {\n      while (stpdInterscroller.que.length > 0) {\n        try {\n          stpdInterscroller.que.shift()();\n        } catch (err) {\n          throw new Error(err);\n        }\n      }\n    }\n    stpdInterscroller.que.push = function (q) {\n      q();\n    };\n    return stpdInterscroller;\n  }\n  window.stpdInterscroller = stpdInterscroller(window.stpdInterscroller || {\n    que: []\n  });\n})(window);\n\n//# sourceURL=webpack://dist/./src/interscroller.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/interscroller.js"]();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});