/******/
(() => {
  // webpackBootstrap
  /******/
  "use strict";
  /******/
  var __webpack_modules__ = {
    /***/
    /*!*****************************!*\
          !*** ./js/_modules/home.js ***!
          \*****************************/
    "./js/_modules/home.js":
      /***/
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          eventWidth: () => /* binding */ eventWidth,
          /* harmony export */
          initHome: () => /* binding */ initHome,
        });
        /* harmony export */
        /* harmony import */
        var _menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu */ "./js/_modules/menu.js");

        var initHome = () => {
          document.addEventListener("click", () => {
            showContent();
          });
          window.addEventListener("wheel", () => {
            showContent();
          });
          window.addEventListener("touchmove", () => {
            showContent();
          });
          window.addEventListener("keydown", () => {
            showContent();
          });
          document.querySelector(".js-headerTitle").addEventListener("click", (e) => {
            e.preventDefault();
            hideContent();
          });
        };
        var showContent = () => {
          if (
            document.body.classList.contains("open") ||
            document.body.classList.contains("animated-in") ||
            document.body.classList.contains("animated-out")
          )
            return;
          document.body.classList.add("animated-in");
          setTimeout(() => {
            document.body.classList.remove("animated-in", "animated-out");
            document.body.classList.add("open");
          }, 2000);
        };
        var hideContent = () => {
          (0, _menu__WEBPACK_IMPORTED_MODULE_0__.closeMenu)();
          document.body.classList.remove("open", "animated-in");
          document.body.classList.add("animated-out");
          document.querySelectorAll(".js-scroll").forEach((scroll) => {
            scroll.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          });
          setTimeout(() => {
            document.body.classList.remove("animated-out");
          }, 2000);
        };
        var eventWidth = () => {
          getEventWidth();
          window.addEventListener("resize", () => {
            getEventWidth();
          });
        };
        var getEventWidth = () => {
          document.querySelectorAll(".js-eventsCol").forEach((col) => {
            col.style.setProperty("--width", "".concat(col.querySelector("span").offsetWidth, "px"));
          });
        };
      },
    /***/

    /***/
    /*!*****************************!*\
          !*** ./js/_modules/menu.js ***!
          \*****************************/
    "./js/_modules/menu.js":
      /***/
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          closeMenu: () => /* binding */ closeMenu,
          /* harmony export */
          toggleMenu: () => /* binding */ toggleMenu,
        });
        /* harmony export */
        var toggleMenu = () => {
          document.querySelector(".js-headerHamburger").addEventListener("click", () => {
            if (document.querySelector(".js-menu").classList.contains("show")) {
              closeMenu();
            } else {
              openMenu();
            }
          });
        };
        var openMenu = () => {
          document.querySelector(".js-menu").classList.add("show");
        };
        var closeMenu = () => {
          document.querySelector(".js-menu").classList.remove("show");
        };
      },
    /***/

    /***/
    /*!**********************************!*\
          !*** ./js/_modules/slideshow.js ***!
          \**********************************/
    "./js/_modules/slideshow.js":
      /***/
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          initSlideshow: () => /* binding */ initSlideshow,
        });
        /* harmony export */
        /* harmony import */
        var tinygesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! tinygesture */
          "../node_modules/.pnpm/tinygesture@2.0.0/node_modules/tinygesture/dist/TinyGesture.js"
        );

        var initSlideshow = () => {
          document.querySelectorAll(".js-slideshow").forEach((slideshow) => {
            var prevButton = slideshow.closest(".js-slideshowContainer").querySelector(".js-slideshowPrev");
            var nextButton = slideshow.closest(".js-slideshowContainer").querySelector(".js-slideshowNext");
            slideshow.addEventListener("click", () => {
              nextSlide(slideshow);
            });
            prevButton.addEventListener("click", () => {
              prevSlide(slideshow);
            });
            nextButton.addEventListener("click", () => {
              nextSlide(slideshow);
            });
            var gesture = new tinygesture__WEBPACK_IMPORTED_MODULE_0__["default"](slideshow);
            gesture.on("swiperight", () => {
              prevSlide(slideshow);
            });
            gesture.on("swipeleft", () => {
              nextSlide(slideshow);
            });
          });
        };
        var prevSlide = (slideshow) => {
          var container = slideshow.closest(".js-slideshowContainer");
          var slides = slideshow.querySelectorAll(".js-slide");
          var current = slideshow.querySelector(".js-slide.active");
          var currentIndex = Array.from(slides).indexOf(current);
          var prev = slides[currentIndex - 1];
          if (prev) {
            current.classList.remove("active");
            prev.classList.add("active");
            changeCount(slideshow, currentIndex);
            container.querySelector(".js-slideshowCaption").innerHTML =
              prev.querySelector(".js-slideCaption").innerHTML;
          } else {
            current.classList.remove("active");
            slides[slides.length - 1].classList.add("active");
            changeCount(slideshow, slides.length);
            container.querySelector(".js-slideshowCaption").innerHTML =
              slides[slides.length - 1].querySelector(".js-slideCaption").innerHTML;
          }
        };
        var nextSlide = (slideshow) => {
          var container = slideshow.closest(".js-slideshowContainer");
          var slides = slideshow.querySelectorAll(".js-slide");
          var current = slideshow.querySelector(".js-slide.active");
          var currentIndex = Array.from(slides).indexOf(current);
          var next = slides[currentIndex + 1];
          if (next) {
            current.classList.remove("active");
            next.classList.add("active");
            changeCount(slideshow, currentIndex + 2);
            container.querySelector(".js-slideshowCaption").innerHTML =
              next.querySelector(".js-slideCaption").innerHTML;
          } else {
            current.classList.remove("active");
            slides[0].classList.add("active");
            changeCount(slideshow, 1);
            container.querySelector(".js-slideshowCaption").innerHTML =
              slides[0].querySelector(".js-slideCaption").innerHTML;
          }
        };
        var changeCount = (slideshow, index) => {
          var container = slideshow.closest(".js-slideshowContainer");
          var i = index < 10 ? "0" + index : index;
          container.querySelector(".js-slideshowCount").innerHTML = i;
        };
      },
    /***/

    /***/
    /*!***********************************!*\
          !*** ./js/_modules/transition.js ***!
          \***********************************/
    "./js/_modules/transition.js":
      /***/
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          clickClose: () => /* binding */ clickClose,
          /* harmony export */
          clickEvent: () => /* binding */ clickEvent,
          /* harmony export */
          clickHeader: () => /* binding */ clickHeader,
        });
        /* harmony export */
        /* harmony import */
        var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ "./js/_modules/home.js");
        /* harmony import */
        var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./js/_modules/menu.js");
        /* harmony import */
        var _slideshow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./slideshow */
          "./js/_modules/slideshow.js"
        );
        /* harmony import */
        var tinygesture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! tinygesture */
          "../node_modules/.pnpm/tinygesture@2.0.0/node_modules/tinygesture/dist/TinyGesture.js"
        );

        var clickHeader = () => {
          document.querySelectorAll(".js-headerLink").forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              if (link.pathname == window.location.pathname) {
                (0, _menu__WEBPACK_IMPORTED_MODULE_1__.closeMenu)();
                document.querySelectorAll(".js-scroll").forEach((scroll) => {
                  scroll.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                });
              } else {
                if (link.pathname == "/about" || link.pathname == "/a-propos") {
                  clickAbout(link.href);
                } else {
                  closeItem(link.href);
                }
              }
            });
          });
        };
        var clickEvent = () => {
          document.querySelectorAll(".js-eventItem").forEach((line) => {
            line.addEventListener("click", (e) => {
              e.preventDefault();
              var href = line.getAttribute("href");
              (0, _menu__WEBPACK_IMPORTED_MODULE_1__.closeMenu)();
              fetch("".concat(href, "?ajax=1"))
                .then((response) => response.text())
                .then((html) => {
                  var parser = new DOMParser();
                  var doc = parser.parseFromString(html, "text/html");
                  var content = doc.querySelector(".js-event");
                  if (document.querySelector(".js-event").innerHTML != "") {
                    document.querySelector(".js-event").classList.add("transition");
                    setTimeout(() => {
                      document.querySelector(".js-event").innerHTML = content.innerHTML;
                      document.querySelector(".js-event").classList.remove("transition");
                      initFunctions();
                    }, 500);
                  } else {
                    document.querySelector(".js-event").innerHTML = content.innerHTML;
                    initFunctions();
                  }
                  document.querySelector(".js-main").classList.remove("main--events", "main--about");
                  document.querySelector(".js-main").classList.add("main--event");
                  document.querySelectorAll(".js-headerClose").forEach((button) => {
                    button.classList.remove("hidden");
                  });
                  document.querySelectorAll(".js-scroll").forEach((scroll) => {
                    scroll.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  });
                  history.pushState({}, null, href);
                });
            });
          });
        };
        var clickAbout = (href) => {
          (0, _menu__WEBPACK_IMPORTED_MODULE_1__.closeMenu)();
          fetch("".concat(href, "?ajax=1"))
            .then((response) => response.text())
            .then((html) => {
              var parser = new DOMParser();
              var doc = parser.parseFromString(html, "text/html");
              var content = doc.querySelector(".js-about");
              document.querySelector(".js-about").innerHTML = content.innerHTML;
              document.querySelector(".js-main").classList.remove("main--events", "main--event");
              document.querySelector(".js-main").classList.add("main--about");
              document.querySelectorAll(".js-headerClose").forEach((button) => {
                button.classList.add("hidden");
              });
              initFunctions();
              document.querySelectorAll(".js-scroll").forEach((scroll) => {
                scroll.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              });
              history.pushState({}, null, href);
              setTimeout(() => {
                document.querySelector(".js-event").innerHTML = "";
              }, 500);
            });
        };
        var clickClose = () => {
          document.querySelectorAll(".js-headerClose").forEach((button) => {
            button.addEventListener("click", (e) => {
              var href = document.querySelector(".js-headerClose").getAttribute("href");
              e.preventDefault();
              closeItem(href);
            });
          });
          document.addEventListener("click", (e) => {
            if (!document.querySelector(".js-main").classList.contains("main--event")) return;
            if (e.target.closest(".js-event") || e.target.closest(".js-header") || e.target.closest(".js-events"))
              return;
            var href = document.querySelector(".js-headerClose").getAttribute("href");
            closeItem(href);
          });
          window.addEventListener("keydown", (e) => {
            if (!document.querySelector(".js-main").classList.contains("main--event")) return;
            if (!e.key === "ArrowLeft") return;
            var href = document.querySelector(".js-headerClose").getAttribute("href");
            closeItem(href);
          });
          var gesture = new tinygesture__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector(".js-event"));
          gesture.on("swiperight", (e) => {
            if (e.target.closest(".js-slideshow")) return;
            var href = document.querySelector(".js-headerClose").getAttribute("href");
            closeItem(href);
          });
        };
        var closeItem = (href) => {
          (0, _menu__WEBPACK_IMPORTED_MODULE_1__.closeMenu)();
          document.querySelector(".js-main").style.overflow = "initial";
          document.querySelector(".js-main").classList.remove("main--event", "main--about");
          document.querySelector(".js-main").classList.add("main--events");
          document.querySelectorAll(".js-headerClose").forEach((button) => {
            button.classList.add("hidden");
          });
          history.pushState({}, null, href);
          document.querySelectorAll(".js-scroll").forEach((scroll) => {
            scroll.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          });
          setTimeout(() => {
            document.querySelector(".js-event").innerHTML = "";
            document.querySelector(".js-about").innerHTML = "";
            document.querySelector(".js-main").style.overflow = "";
          }, 500);
        };
        var initFunctions = () => {
          clickClose();
          (0, _slideshow__WEBPACK_IMPORTED_MODULE_2__.initSlideshow)();
          (0, _home__WEBPACK_IMPORTED_MODULE_0__.eventWidth)();
        };
      },
    /***/

    /***/
    /*!********************************!*\
          !*** ./js/_modules/website.js ***!
          \********************************/
    "./js/_modules/website.js":
      /***/
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          onLoading: () => /* binding */ onLoading,
        });
        /* harmony export */
        var onLoading = () => {
          addClassesToHTML();
          addTargetBlank();
          addVHValue();
        };
        var addClassesToHTML = () => {
          var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
          var ua = window.navigator.userAgent;
          var iOS = !!ua.match(/iP(ad|hone)/i);
          var webkit = !!ua.match(/WebKit/i);
          var isiOS = iOS && webkit && !ua.match(/CriOS/i);
          var touch = isTouch ? "touch" : "no-touch";
          var os = isiOS ? "ios" : "no-ios";
          document.documentElement.classList.remove("touch", "no-touch", "ios", "no-ios");
          document.documentElement.classList.add(touch, os);
        };
        var addTargetBlank = () => {
          var links = document.querySelectorAll("a");
          links.forEach((link) => {
            if (link.target) {
              return;
            } else if (link.host !== window.location.host) {
              link.target = "_blank";
              link.rel = "noopener";
            } else {
              link.target = "_self";
            }
          });
        };
        var addVHValue = () => {
          var vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
          window.addEventListener("resize", () => {
            var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
          });
        };
      },
    /***/

    /***/
    /*!*******************************!*\
          !*** ./scss/application.scss ***!
          \*******************************/
    "./scss/application.scss":
      /***/
      (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
      },
    // extracted by mini-css-extract-plugin
    /***/

    /***/
    /*!********************************************************************************************!*\
          !*** ../node_modules/.pnpm/tinygesture@2.0.0/node_modules/tinygesture/dist/TinyGesture.js ***!
          \********************************************************************************************/
    "../node_modules/.pnpm/tinygesture@2.0.0/node_modules/tinygesture/dist/TinyGesture.js":
      /***/
      (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          default: () => /* binding */ TinyGesture,
        });
        /* harmony export */
        class TinyGesture {
          constructor(element, options) {
            this.element = element;
            this.touchStartX = null;
            this.touchStartY = null;
            this.touchEndX = null;
            this.touchEndY = null;
            this.touchMoveX = null;
            this.touchMoveY = null;
            this.velocityX = null;
            this.velocityY = null;
            this.longPressTimer = null;
            this.doubleTapTimer = null;
            this.doubleTapWaiting = false;
            this.thresholdX = 0;
            this.thresholdY = 0;
            this.disregardVelocityThresholdX = 0;
            this.disregardVelocityThresholdY = 0;
            this.swipingHorizontal = false;
            this.swipingVertical = false;
            this.swipingDirection = null;
            this.swipedHorizontal = false;
            this.swipedVertical = false;
            this.handlers = {
              panstart: [],
              panmove: [],
              panend: [],
              swipeleft: [],
              swiperight: [],
              swipeup: [],
              swipedown: [],
              tap: [],
              doubletap: [],
              longpress: [],
            };
            this._onTouchStart = this.onTouchStart.bind(this);
            this._onTouchMove = this.onTouchMove.bind(this);
            this._onTouchEnd = this.onTouchEnd.bind(this);
            this.opts = Object.assign({}, TinyGesture.defaults, options);
            this.element.addEventListener("touchstart", this._onTouchStart, passiveIfSupported);
            this.element.addEventListener("touchmove", this._onTouchMove, passiveIfSupported);
            this.element.addEventListener("touchend", this._onTouchEnd, passiveIfSupported);
            if (this.opts.mouseSupport && !("ontouchstart" in window)) {
              this.element.addEventListener("mousedown", this._onTouchStart, passiveIfSupported);
              document.addEventListener("mousemove", this._onTouchMove, passiveIfSupported);
              document.addEventListener("mouseup", this._onTouchEnd, passiveIfSupported);
            }
          }
          destroy() {
            var _a, _b;
            this.element.removeEventListener("touchstart", this._onTouchStart);
            this.element.removeEventListener("touchmove", this._onTouchMove);
            this.element.removeEventListener("touchend", this._onTouchEnd);
            this.element.removeEventListener("mousedown", this._onTouchStart);
            document.removeEventListener("mousemove", this._onTouchMove);
            document.removeEventListener("mouseup", this._onTouchEnd);
            clearTimeout((_a = this.longPressTimer) !== null && _a !== void 0 ? _a : undefined);
            clearTimeout((_b = this.doubleTapTimer) !== null && _b !== void 0 ? _b : undefined);
          }
          on(type, fn) {
            if (this.handlers[type]) {
              this.handlers[type].push(fn);
              return {
                type,
                fn,
                cancel: () => this.off(type, fn),
              };
            }
          }
          off(type, fn) {
            if (this.handlers[type]) {
              const idx = this.handlers[type].indexOf(fn);
              if (idx !== -1) {
                this.handlers[type].splice(idx, 1);
              }
            }
          }
          fire(type, event) {
            for (let i = 0; i < this.handlers[type].length; i++) {
              this.handlers[type][i](event);
            }
          }
          onTouchStart(event) {
            this.thresholdX = this.opts.threshold("x", this);
            this.thresholdY = this.opts.threshold("y", this);
            this.disregardVelocityThresholdX = this.opts.disregardVelocityThreshold("x", this);
            this.disregardVelocityThresholdY = this.opts.disregardVelocityThreshold("y", this);
            this.touchStartX = event.type === "mousedown" ? event.screenX : event.changedTouches[0].screenX;
            this.touchStartY = event.type === "mousedown" ? event.screenY : event.changedTouches[0].screenY;
            this.touchMoveX = null;
            this.touchMoveY = null;
            this.touchEndX = null;
            this.touchEndY = null;
            this.swipingDirection = null;
            this.longPressTimer = setTimeout(() => this.fire("longpress", event), this.opts.longPressTime);
            this.fire("panstart", event);
          }
          onTouchMove(event) {
            var _a, _b, _c, _d, _e;
            if (event.type === "mousemove" && (!this.touchStartX || this.touchEndX !== null)) {
              return;
            }
            const touchMoveX =
              (event.type === "mousemove" ? event.screenX : event.changedTouches[0].screenX) -
              ((_a = this.touchStartX) !== null && _a !== void 0 ? _a : 0);
            this.velocityX = touchMoveX - ((_b = this.touchMoveX) !== null && _b !== void 0 ? _b : 0);
            this.touchMoveX = touchMoveX;
            const touchMoveY =
              (event.type === "mousemove" ? event.screenY : event.changedTouches[0].screenY) -
              ((_c = this.touchStartY) !== null && _c !== void 0 ? _c : 0);
            this.velocityY = touchMoveY - ((_d = this.touchMoveY) !== null && _d !== void 0 ? _d : 0);
            this.touchMoveY = touchMoveY;
            const absTouchMoveX = Math.abs(this.touchMoveX);
            const absTouchMoveY = Math.abs(this.touchMoveY);
            this.swipingHorizontal = absTouchMoveX > this.thresholdX;
            this.swipingVertical = absTouchMoveY > this.thresholdY;
            this.swipingDirection =
              absTouchMoveX > absTouchMoveY
                ? this.swipingHorizontal
                  ? "horizontal"
                  : "pre-horizontal"
                : this.swipingVertical
                ? "vertical"
                : "pre-vertical";
            if (Math.max(absTouchMoveX, absTouchMoveY) > this.opts.pressThreshold) {
              clearTimeout((_e = this.longPressTimer) !== null && _e !== void 0 ? _e : undefined);
            }
            this.fire("panmove", event);
          }
          onTouchEnd(event) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (event.type === "mouseup" && (!this.touchStartX || this.touchEndX !== null)) {
              return;
            }
            this.touchEndX = event.type === "mouseup" ? event.screenX : event.changedTouches[0].screenX;
            this.touchEndY = event.type === "mouseup" ? event.screenY : event.changedTouches[0].screenY;
            this.fire("panend", event);
            clearTimeout((_a = this.longPressTimer) !== null && _a !== void 0 ? _a : undefined);
            const x = this.touchEndX - ((_b = this.touchStartX) !== null && _b !== void 0 ? _b : 0);
            const absX = Math.abs(x);
            const y = this.touchEndY - ((_c = this.touchStartY) !== null && _c !== void 0 ? _c : 0);
            const absY = Math.abs(y);
            if (absX > this.thresholdX || absY > this.thresholdY) {
              this.swipedHorizontal = this.opts.diagonalSwipes
                ? Math.abs(x / y) <= this.opts.diagonalLimit
                : absX >= absY && absX > this.thresholdX;
              this.swipedVertical = this.opts.diagonalSwipes
                ? Math.abs(y / x) <= this.opts.diagonalLimit
                : absY > absX && absY > this.thresholdY;
              if (this.swipedHorizontal) {
                if (x < 0) {
                  if (
                    ((_d = this.velocityX) !== null && _d !== void 0 ? _d : 0) < -this.opts.velocityThreshold ||
                    x < -this.disregardVelocityThresholdX
                  ) {
                    this.fire("swipeleft", event);
                  }
                } else {
                  if (
                    ((_e = this.velocityX) !== null && _e !== void 0 ? _e : 0) > this.opts.velocityThreshold ||
                    x > this.disregardVelocityThresholdX
                  ) {
                    this.fire("swiperight", event);
                  }
                }
              }
              if (this.swipedVertical) {
                if (y < 0) {
                  if (
                    ((_f = this.velocityY) !== null && _f !== void 0 ? _f : 0) < -this.opts.velocityThreshold ||
                    y < -this.disregardVelocityThresholdY
                  ) {
                    this.fire("swipeup", event);
                  }
                } else {
                  if (
                    ((_g = this.velocityY) !== null && _g !== void 0 ? _g : 0) > this.opts.velocityThreshold ||
                    y > this.disregardVelocityThresholdY
                  ) {
                    this.fire("swipedown", event);
                  }
                }
              }
            } else if (absX < this.opts.pressThreshold && absY < this.opts.pressThreshold) {
              if (this.doubleTapWaiting) {
                this.doubleTapWaiting = false;
                clearTimeout((_h = this.doubleTapTimer) !== null && _h !== void 0 ? _h : undefined);
                this.fire("doubletap", event);
              } else {
                this.doubleTapWaiting = true;
                this.doubleTapTimer = setTimeout(() => (this.doubleTapWaiting = false), this.opts.doubleTapTime);
                this.fire("tap", event);
              }
            }
          }
        }
        TinyGesture.defaults = {
          threshold: (type, _self) =>
            Math.max(
              25,
              Math.floor(
                0.15 *
                  (type === "x"
                    ? window.innerWidth || document.body.clientWidth
                    : window.innerHeight || document.body.clientHeight)
              )
            ),
          velocityThreshold: 10,
          disregardVelocityThreshold: (type, self) =>
            Math.floor(0.5 * (type === "x" ? self.element.clientWidth : self.element.clientHeight)),
          pressThreshold: 8,
          diagonalSwipes: false,
          diagonalLimit: Math.tan(((45 * 1.5) / 180) * Math.PI),
          longPressTime: 500,
          doubleTapTime: 300,
          mouseSupport: true,
        };
        let passiveIfSupported = false;
        try {
          window.addEventListener(
            "test",
            null,
            Object.defineProperty({}, "passive", {
              get: function () {
                passiveIfSupported = {
                  passive: true,
                };
              },
            })
          );
        } catch (err) {}
      },
  };
  //# sourceMappingURL=TinyGesture.js.map
  /***/
  /******/
  /************************************************************************/
  /******/
  // The module cache
  /******/
  var __webpack_module_cache__ = {};
  /******/
  /******/
  // The require function
  /******/
  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache
    /******/
    var cachedModule = __webpack_module_cache__[moduleId];
    /******/
    if (cachedModule !== undefined) {
      /******/
      return cachedModule.exports;
    }
    /******/
    /******/
    // Create a new module (and put it into the cache)
    /******/
    var module = (__webpack_module_cache__[moduleId] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {},
    });
    /******/
    /******/
    /******/
    // Execute the module function
    /******/
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/
    // Return the exports of the module
    /******/
    return module.exports;
  }
  /******/
  /******/
  /************************************************************************/
  /******/
  /* webpack/runtime/define property getters */
  /******/
  (() => {
    /******/
    // define getter functions for harmony exports
    /******/
    __webpack_require__.d = (exports, definition) => {
      /******/
      for (var key in definition) {
        /******/
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();
  /******/
  /******/
  /******/
  /******/
  /******/
  /******/
  /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  (() => {
    /******/
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  /******/
  /******/
  /******/
  /* webpack/runtime/make namespace object */
  /******/
  (() => {
    /******/
    // define __esModule on exports
    /******/
    __webpack_require__.r = (exports) => {
      /******/
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      /******/
      /******/
      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
    };
  })();
  /******/
  /******/
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!*********************!*\
          !*** ./js/index.js ***!
          \*********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _scss_application_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../scss/application.scss */
      "./scss/application.scss"
    );
    /* harmony import */
    var _modules_website__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./_modules/website */
      "./js/_modules/website.js"
    );
    /* harmony import */
    var _modules_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./_modules/home */
      "./js/_modules/home.js"
    );
    /* harmony import */
    var _modules_slideshow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./_modules/slideshow */
      "./js/_modules/slideshow.js"
    );
    /* harmony import */
    var _modules_transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./_modules/transition */
      "./js/_modules/transition.js"
    );
    /* harmony import */
    var _modules_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./_modules/menu */
      "./js/_modules/menu.js"
    );

    document.addEventListener("DOMContentLoaded", () => {
      (0, _modules_website__WEBPACK_IMPORTED_MODULE_1__.onLoading)();
      (0, _modules_home__WEBPACK_IMPORTED_MODULE_2__.initHome)();
      (0, _modules_slideshow__WEBPACK_IMPORTED_MODULE_3__.initSlideshow)();
      (0, _modules_transition__WEBPACK_IMPORTED_MODULE_4__.clickHeader)();
      (0, _modules_transition__WEBPACK_IMPORTED_MODULE_4__.clickEvent)();
      (0, _modules_transition__WEBPACK_IMPORTED_MODULE_4__.clickClose)();
      (0, _modules_home__WEBPACK_IMPORTED_MODULE_2__.eventWidth)();
      (0, _modules_menu__WEBPACK_IMPORTED_MODULE_5__.toggleMenu)();
    });
  })();
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnQ0FBZ0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQSxtQ0FBbUM7QUFDbkMsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7OztVQ3JOQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOa0M7QUFDYTtBQUNRO0FBQ0Y7QUFDdUI7QUFDL0I7QUFFN0NuRyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE1BQU07RUFDbEQrRSwyREFBUyxFQUFFO0VBQ1hqRix1REFBUSxFQUFFO0VBQ1Y4QixpRUFBYSxFQUFFO0VBQ2Z1QixnRUFBVyxFQUFFO0VBQ2JPLCtEQUFVLEVBQUU7RUFDWmlCLCtEQUFVLEVBQUU7RUFDWnhELHlEQUFVLEVBQUU7RUFDWk0seURBQVUsRUFBRTtBQUNkLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvX21vZHVsZXMvaG9tZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9fbW9kdWxlcy9tZW51LmpzIiwid2VicGFjazovLy8uL2pzL19tb2R1bGVzL3NsaWRlc2hvdy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9fbW9kdWxlcy90cmFuc2l0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL19tb2R1bGVzL3dlYnNpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHBsaWNhdGlvbi5zY3NzP2NlMWEiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy8ucG5wbS90aW55Z2VzdHVyZUAyLjAuMC9ub2RlX21vZHVsZXMvdGlueWdlc3R1cmUvZGlzdC9UaW55R2VzdHVyZS5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjbG9zZU1lbnUgfSBmcm9tIFwiLi9tZW51XCI7XG5cbmV4cG9ydCBjb25zdCBpbml0SG9tZSA9ICgpID0+IHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzaG93Q29udGVudCgpO1xuICB9KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsICgpID0+IHtcbiAgICBzaG93Q29udGVudCgpO1xuICB9KTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoKSA9PiB7XG4gICAgc2hvd0NvbnRlbnQoKTtcbiAgfSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsICgpID0+IHtcbiAgICBzaG93Q29udGVudCgpO1xuICB9KTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlclRpdGxlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBoaWRlQ29udGVudCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IHNob3dDb250ZW50ID0gKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpIHx8IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbWF0ZWQtaW5cIikgfHwgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltYXRlZC1vdXRcIikpXG4gICAgcmV0dXJuO1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlZC1pblwiKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiYW5pbWF0ZWQtaW5cIiwgXCJhbmltYXRlZC1vdXRcIik7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcbiAgfSwgMjAwMCk7XG59O1xuXG5jb25zdCBoaWRlQ29udGVudCA9ICgpID0+IHtcbiAgY2xvc2VNZW51KCk7XG4gIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIiwgXCJhbmltYXRlZC1pblwiKTtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiYW5pbWF0ZWQtb3V0XCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNjcm9sbFwiKS5mb3JFYWNoKChzY3JvbGwpID0+IHtcbiAgICBzY3JvbGwuc2Nyb2xsVG8oe1xuICAgICAgdG9wOiAwLFxuICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXG4gICAgfSk7XG4gIH0pO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJhbmltYXRlZC1vdXRcIik7XG4gIH0sIDIwMDApO1xufTtcblxuZXhwb3J0IGNvbnN0IGV2ZW50V2lkdGggPSAoKSA9PiB7XG4gIGdldEV2ZW50V2lkdGgoKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgZ2V0RXZlbnRXaWR0aCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IGdldEV2ZW50V2lkdGggPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZXZlbnRzQ29sXCIpLmZvckVhY2goKGNvbCkgPT4ge1xuICAgIGNvbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0td2lkdGhcIiwgYCR7Y29sLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLm9mZnNldFdpZHRofXB4YCk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBjb25zdCB0b2dnbGVNZW51ID0gKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlckhhbWJ1cmdlclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW1lbnVcIikuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgY2xvc2VNZW51KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW5NZW51KCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IG9wZW5NZW51ID0gKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW1lbnVcIikuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG59O1xuXG5leHBvcnQgY29uc3QgY2xvc2VNZW51ID0gKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW1lbnVcIikuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG59O1xuIiwiaW1wb3J0IFRpbnlHZXN0dXJlIGZyb20gXCJ0aW55Z2VzdHVyZVwiO1xuXG5leHBvcnQgY29uc3QgaW5pdFNsaWRlc2hvdyA9ICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zbGlkZXNob3dcIikuZm9yRWFjaCgoc2xpZGVzaG93KSA9PiB7XG4gICAgY29uc3QgcHJldkJ1dHRvbiA9IHNsaWRlc2hvdy5jbG9zZXN0KFwiLmpzLXNsaWRlc2hvd0NvbnRhaW5lclwiKS5xdWVyeVNlbGVjdG9yKFwiLmpzLXNsaWRlc2hvd1ByZXZcIik7XG4gICAgY29uc3QgbmV4dEJ1dHRvbiA9IHNsaWRlc2hvdy5jbG9zZXN0KFwiLmpzLXNsaWRlc2hvd0NvbnRhaW5lclwiKS5xdWVyeVNlbGVjdG9yKFwiLmpzLXNsaWRlc2hvd05leHRcIik7XG5cbiAgICBzbGlkZXNob3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIG5leHRTbGlkZShzbGlkZXNob3cpO1xuICAgIH0pO1xuXG4gICAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgcHJldlNsaWRlKHNsaWRlc2hvdyk7XG4gICAgfSk7XG5cbiAgICBuZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBuZXh0U2xpZGUoc2xpZGVzaG93KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGdlc3R1cmUgPSBuZXcgVGlueUdlc3R1cmUoc2xpZGVzaG93KTtcbiAgICBnZXN0dXJlLm9uKFwic3dpcGVyaWdodFwiLCAoKSA9PiB7XG4gICAgICBwcmV2U2xpZGUoc2xpZGVzaG93KTtcbiAgICB9KTtcbiAgICBnZXN0dXJlLm9uKFwic3dpcGVsZWZ0XCIsICgpID0+IHtcbiAgICAgIG5leHRTbGlkZShzbGlkZXNob3cpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHByZXZTbGlkZSA9IChzbGlkZXNob3cpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gc2xpZGVzaG93LmNsb3Nlc3QoXCIuanMtc2xpZGVzaG93Q29udGFpbmVyXCIpO1xuICBjb25zdCBzbGlkZXMgPSBzbGlkZXNob3cucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zbGlkZVwiKTtcbiAgY29uc3QgY3VycmVudCA9IHNsaWRlc2hvdy5xdWVyeVNlbGVjdG9yKFwiLmpzLXNsaWRlLmFjdGl2ZVwiKTtcbiAgY29uc3QgY3VycmVudEluZGV4ID0gQXJyYXkuZnJvbShzbGlkZXMpLmluZGV4T2YoY3VycmVudCk7XG4gIGNvbnN0IHByZXYgPSBzbGlkZXNbY3VycmVudEluZGV4IC0gMV07XG4gIGlmIChwcmV2KSB7XG4gICAgY3VycmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIHByZXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBjaGFuZ2VDb3VudChzbGlkZXNob3csIGN1cnJlbnRJbmRleCk7XG4gICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVzaG93Q2FwdGlvblwiKS5pbm5lckhUTUwgPSBwcmV2LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVDYXB0aW9uXCIpLmlubmVySFRNTDtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGNoYW5nZUNvdW50KHNsaWRlc2hvdywgc2xpZGVzLmxlbmd0aCk7XG4gICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVzaG93Q2FwdGlvblwiKS5pbm5lckhUTUwgPSBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdLnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVDYXB0aW9uXCIpLmlubmVySFRNTDtcbiAgfVxufTtcblxuY29uc3QgbmV4dFNsaWRlID0gKHNsaWRlc2hvdykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBzbGlkZXNob3cuY2xvc2VzdChcIi5qcy1zbGlkZXNob3dDb250YWluZXJcIik7XG4gIGNvbnN0IHNsaWRlcyA9IHNsaWRlc2hvdy5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNsaWRlXCIpO1xuICBjb25zdCBjdXJyZW50ID0gc2xpZGVzaG93LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGUuYWN0aXZlXCIpO1xuICBjb25zdCBjdXJyZW50SW5kZXggPSBBcnJheS5mcm9tKHNsaWRlcykuaW5kZXhPZihjdXJyZW50KTtcbiAgY29uc3QgbmV4dCA9IHNsaWRlc1tjdXJyZW50SW5kZXggKyAxXTtcbiAgaWYgKG5leHQpIHtcbiAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgbmV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGNoYW5nZUNvdW50KHNsaWRlc2hvdywgY3VycmVudEluZGV4ICsgMik7XG4gICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVzaG93Q2FwdGlvblwiKS5pbm5lckhUTUwgPSBuZXh0LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVDYXB0aW9uXCIpLmlubmVySFRNTDtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgc2xpZGVzWzBdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgY2hhbmdlQ291bnQoc2xpZGVzaG93LCAxKTtcbiAgICBjb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5qcy1zbGlkZXNob3dDYXB0aW9uXCIpLmlubmVySFRNTCA9IHNsaWRlc1swXS5xdWVyeVNlbGVjdG9yKFwiLmpzLXNsaWRlQ2FwdGlvblwiKS5pbm5lckhUTUw7XG4gIH1cbn07XG5cbmNvbnN0IGNoYW5nZUNvdW50ID0gKHNsaWRlc2hvdywgaW5kZXgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gc2xpZGVzaG93LmNsb3Nlc3QoXCIuanMtc2xpZGVzaG93Q29udGFpbmVyXCIpO1xuICBjb25zdCBpID0gaW5kZXggPCAxMCA/IFwiMFwiICsgaW5kZXggOiBpbmRleDtcbiAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2xpZGVzaG93Q291bnRcIikuaW5uZXJIVE1MID0gaTtcbn07XG4iLCJpbXBvcnQgeyBldmVudFdpZHRoIH0gZnJvbSBcIi4vaG9tZVwiO1xuaW1wb3J0IHsgY2xvc2VNZW51IH0gZnJvbSBcIi4vbWVudVwiO1xuaW1wb3J0IHsgaW5pdFNsaWRlc2hvdyB9IGZyb20gXCIuL3NsaWRlc2hvd1wiO1xuaW1wb3J0IFRpbnlHZXN0dXJlIGZyb20gXCJ0aW55Z2VzdHVyZVwiO1xuXG5leHBvcnQgY29uc3QgY2xpY2tIZWFkZXIgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtaGVhZGVyTGlua1wiKS5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChsaW5rLnBhdGhuYW1lID09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgICBjbG9zZU1lbnUoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zY3JvbGxcIikuZm9yRWFjaCgoc2Nyb2xsKSA9PiB7XG4gICAgICAgICAgc2Nyb2xsLnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsaW5rLnBhdGhuYW1lID09IFwiL2Fib3V0XCIgfHwgbGluay5wYXRobmFtZSA9PSBcIi9hLXByb3Bvc1wiKSB7XG4gICAgICAgICAgY2xpY2tBYm91dChsaW5rLmhyZWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlSXRlbShsaW5rLmhyZWYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsaWNrRXZlbnQgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZXZlbnRJdGVtXCIpLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICBsaW5lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgaHJlZiA9IGxpbmUuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgIGNsb3NlTWVudSgpO1xuICAgICAgZmV0Y2goYCR7aHJlZn0/YWpheD0xYClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgIC50aGVuKChodG1sKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiLmpzLWV2ZW50XCIpO1xuICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWV2ZW50XCIpLmlubmVySFRNTCAhPSBcIlwiKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWV2ZW50XCIpLmNsYXNzTGlzdC5hZGQoXCJ0cmFuc2l0aW9uXCIpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZXZlbnRcIikuaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZXZlbnRcIikuY2xhc3NMaXN0LnJlbW92ZShcInRyYW5zaXRpb25cIik7XG4gICAgICAgICAgICAgIGluaXRGdW5jdGlvbnMoKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZXZlbnRcIikuaW5uZXJIVE1MID0gY29udGVudC5pbm5lckhUTUw7XG4gICAgICAgICAgICBpbml0RnVuY3Rpb25zKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtbWFpblwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibWFpbi0tZXZlbnRzXCIsIFwibWFpbi0tYWJvdXRcIik7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1tYWluXCIpLmNsYXNzTGlzdC5hZGQoXCJtYWluLS1ldmVudFwiKTtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWhlYWRlckNsb3NlXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zY3JvbGxcIikuZm9yRWFjaCgoc2Nyb2xsKSA9PiB7XG4gICAgICAgICAgICBzY3JvbGwuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sIG51bGwsIGhyZWYpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCBjbGlja0Fib3V0ID0gKGhyZWYpID0+IHtcbiAgY2xvc2VNZW51KCk7XG4gIGZldGNoKGAke2hyZWZ9P2FqYXg9MWApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLnRoZW4oKGh0bWwpID0+IHtcbiAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCIuanMtYWJvdXRcIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWFib3V0XCIpLmlubmVySFRNTCA9IGNvbnRlbnQuaW5uZXJIVE1MO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1tYWluXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJtYWluLS1ldmVudHNcIiwgXCJtYWluLS1ldmVudFwiKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtbWFpblwiKS5jbGFzc0xpc3QuYWRkKFwibWFpbi0tYWJvdXRcIik7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWhlYWRlckNsb3NlXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuICAgICAgaW5pdEZ1bmN0aW9ucygpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zY3JvbGxcIikuZm9yRWFjaCgoc2Nyb2xsKSA9PiB7XG4gICAgICAgIHNjcm9sbC5zY3JvbGxUbyh7XG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sIG51bGwsIGhyZWYpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZXZlbnRcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgIH0sIDUwMCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xpY2tDbG9zZSA9ICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1oZWFkZXJDbG9zZVwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBocmVmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1oZWFkZXJDbG9zZVwiKS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2xvc2VJdGVtKGhyZWYpO1xuICAgIH0pO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtbWFpblwiKS5jbGFzc0xpc3QuY29udGFpbnMoXCJtYWluLS1ldmVudFwiKSkgcmV0dXJuO1xuICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmpzLWV2ZW50XCIpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoXCIuanMtaGVhZGVyXCIpIHx8IGUudGFyZ2V0LmNsb3Nlc3QoXCIuanMtZXZlbnRzXCIpKSByZXR1cm47XG4gICAgY29uc3QgaHJlZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtaGVhZGVyQ2xvc2VcIikuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICBjbG9zZUl0ZW0oaHJlZik7XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1tYWluXCIpLmNsYXNzTGlzdC5jb250YWlucyhcIm1haW4tLWV2ZW50XCIpKSByZXR1cm47XG4gICAgaWYgKCFlLmtleSA9PT0gXCJBcnJvd0xlZnRcIikgcmV0dXJuO1xuICAgIGNvbnN0IGhyZWYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlckNsb3NlXCIpLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgY2xvc2VJdGVtKGhyZWYpO1xuICB9KTtcblxuICBjb25zdCBnZXN0dXJlID0gbmV3IFRpbnlHZXN0dXJlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtZXZlbnRcIikpO1xuICBnZXN0dXJlLm9uKFwic3dpcGVyaWdodFwiLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbG9zZXN0KFwiLmpzLXNsaWRlc2hvd1wiKSkgcmV0dXJuO1xuICAgIGNvbnN0IGhyZWYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlckNsb3NlXCIpLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgY2xvc2VJdGVtKGhyZWYpO1xuICB9KTtcbn07XG5cbmNvbnN0IGNsb3NlSXRlbSA9IChocmVmKSA9PiB7XG4gIGNsb3NlTWVudSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW1haW5cIikuc3R5bGUub3ZlcmZsb3cgPSBcImluaXRpYWxcIjtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1tYWluXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJtYWluLS1ldmVudFwiLCBcIm1haW4tLWFib3V0XCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW1haW5cIikuY2xhc3NMaXN0LmFkZChcIm1haW4tLWV2ZW50c1wiKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1oZWFkZXJDbG9zZVwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSk7XG4gIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCBocmVmKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1zY3JvbGxcIikuZm9yRWFjaCgoc2Nyb2xsKSA9PiB7XG4gICAgc2Nyb2xsLnNjcm9sbFRvKHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxuICAgIH0pO1xuICB9KTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1ldmVudFwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtYWJvdXRcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLW1haW5cIikuc3R5bGUub3ZlcmZsb3cgPSBcIlwiO1xuICB9LCA1MDApO1xufTtcblxuY29uc3QgaW5pdEZ1bmN0aW9ucyA9ICgpID0+IHtcbiAgY2xpY2tDbG9zZSgpO1xuICBpbml0U2xpZGVzaG93KCk7XG4gIGV2ZW50V2lkdGgoKTtcbn07XG4iLCJleHBvcnQgY29uc3Qgb25Mb2FkaW5nID0gKCkgPT4ge1xuICBhZGRDbGFzc2VzVG9IVE1MKCk7XG4gIGFkZFRhcmdldEJsYW5rKCk7XG4gIGFkZFZIVmFsdWUoKTtcbn07XG5cbmNvbnN0IGFkZENsYXNzZXNUb0hUTUwgPSAoKSA9PiB7XG4gIGNvbnN0IGlzVG91Y2ggPSBcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdyB8fCBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDA7XG4gIGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGNvbnN0IGlPUyA9ICEhdWEubWF0Y2goL2lQKGFkfGhvbmUpL2kpO1xuICBjb25zdCB3ZWJraXQgPSAhIXVhLm1hdGNoKC9XZWJLaXQvaSk7XG4gIGNvbnN0IGlzaU9TID0gaU9TICYmIHdlYmtpdCAmJiAhdWEubWF0Y2goL0NyaU9TL2kpO1xuICBjb25zdCB0b3VjaCA9IGlzVG91Y2ggPyBcInRvdWNoXCIgOiBcIm5vLXRvdWNoXCI7XG4gIGNvbnN0IG9zID0gaXNpT1MgPyBcImlvc1wiIDogXCJuby1pb3NcIjtcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3VjaFwiLCBcIm5vLXRvdWNoXCIsIFwiaW9zXCIsIFwibm8taW9zXCIpO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0b3VjaCwgb3MpO1xufTtcblxuY29uc3QgYWRkVGFyZ2V0QmxhbmsgPSAoKSA9PiB7XG4gIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImFcIik7XG4gIGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICBpZiAobGluay50YXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGxpbmsuaG9zdCAhPT0gd2luZG93LmxvY2F0aW9uLmhvc3QpIHtcbiAgICAgIGxpbmsudGFyZ2V0ID0gXCJfYmxhbmtcIjtcbiAgICAgIGxpbmsucmVsID0gXCJub29wZW5lclwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rLnRhcmdldCA9IFwiX3NlbGZcIjtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgYWRkVkhWYWx1ZSA9ICgpID0+IHtcbiAgY29uc3QgdmggPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjAxO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLXZoXCIsIGAke3ZofXB4YCk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLXZoXCIsIGAke3ZofXB4YCk7XG4gIH0pO1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbnlHZXN0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydFggPSBudWxsO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRZID0gbnVsbDtcbiAgICAgICAgdGhpcy50b3VjaEVuZFggPSBudWxsO1xuICAgICAgICB0aGlzLnRvdWNoRW5kWSA9IG51bGw7XG4gICAgICAgIHRoaXMudG91Y2hNb3ZlWCA9IG51bGw7XG4gICAgICAgIHRoaXMudG91Y2hNb3ZlWSA9IG51bGw7XG4gICAgICAgIHRoaXMudmVsb2NpdHlYID0gbnVsbDtcbiAgICAgICAgdGhpcy52ZWxvY2l0eVkgPSBudWxsO1xuICAgICAgICB0aGlzLmxvbmdQcmVzc1RpbWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5kb3VibGVUYXBUaW1lciA9IG51bGw7XG4gICAgICAgIHRoaXMuZG91YmxlVGFwV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRocmVzaG9sZFggPSAwO1xuICAgICAgICB0aGlzLnRocmVzaG9sZFkgPSAwO1xuICAgICAgICB0aGlzLmRpc3JlZ2FyZFZlbG9jaXR5VGhyZXNob2xkWCA9IDA7XG4gICAgICAgIHRoaXMuZGlzcmVnYXJkVmVsb2NpdHlUaHJlc2hvbGRZID0gMDtcbiAgICAgICAgdGhpcy5zd2lwaW5nSG9yaXpvbnRhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN3aXBpbmdWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN3aXBpbmdEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnN3aXBlZEhvcml6b250YWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zd2lwZWRWZXJ0aWNhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge1xuICAgICAgICAgICAgcGFuc3RhcnQ6IFtdLFxuICAgICAgICAgICAgcGFubW92ZTogW10sXG4gICAgICAgICAgICBwYW5lbmQ6IFtdLFxuICAgICAgICAgICAgc3dpcGVsZWZ0OiBbXSxcbiAgICAgICAgICAgIHN3aXBlcmlnaHQ6IFtdLFxuICAgICAgICAgICAgc3dpcGV1cDogW10sXG4gICAgICAgICAgICBzd2lwZWRvd246IFtdLFxuICAgICAgICAgICAgdGFwOiBbXSxcbiAgICAgICAgICAgIGRvdWJsZXRhcDogW10sXG4gICAgICAgICAgICBsb25ncHJlc3M6IFtdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vblRvdWNoU3RhcnQgPSB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9vblRvdWNoTW92ZSA9IHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fb25Ub3VjaEVuZCA9IHRoaXMub25Ub3VjaEVuZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBUaW55R2VzdHVyZS5kZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25Ub3VjaFN0YXJ0LCBwYXNzaXZlSWZTdXBwb3J0ZWQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHBhc3NpdmVJZlN1cHBvcnRlZCk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQsIHBhc3NpdmVJZlN1cHBvcnRlZCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMubW91c2VTdXBwb3J0ICYmICEoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uVG91Y2hTdGFydCwgcGFzc2l2ZUlmU3VwcG9ydGVkKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlLCBwYXNzaXZlSWZTdXBwb3J0ZWQpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uVG91Y2hFbmQsIHBhc3NpdmVJZlN1cHBvcnRlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9vblRvdWNoRW5kKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uVG91Y2hTdGFydCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uVG91Y2hFbmQpO1xuICAgICAgICBjbGVhclRpbWVvdXQoKF9hID0gdGhpcy5sb25nUHJlc3NUaW1lcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdW5kZWZpbmVkKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KChfYiA9IHRoaXMuZG91YmxlVGFwVGltZXIpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIG9uKHR5cGUsIGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmhhbmRsZXJzW3R5cGVdKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzW3R5cGVdLnB1c2goZm4pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIGZuLFxuICAgICAgICAgICAgICAgIGNhbmNlbDogKCkgPT4gdGhpcy5vZmYodHlwZSwgZm4pLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvZmYodHlwZSwgZm4pIHtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnNbdHlwZV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMuaGFuZGxlcnNbdHlwZV0uaW5kZXhPZihmbik7XG4gICAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNbdHlwZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlyZSh0eXBlLCBldmVudCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGFuZGxlcnNbdHlwZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNbdHlwZV1baV0oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICB0aGlzLnRocmVzaG9sZFggPSB0aGlzLm9wdHMudGhyZXNob2xkKCd4JywgdGhpcyk7XG4gICAgICAgIHRoaXMudGhyZXNob2xkWSA9IHRoaXMub3B0cy50aHJlc2hvbGQoJ3knLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kaXNyZWdhcmRWZWxvY2l0eVRocmVzaG9sZFggPSB0aGlzLm9wdHMuZGlzcmVnYXJkVmVsb2NpdHlUaHJlc2hvbGQoJ3gnLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kaXNyZWdhcmRWZWxvY2l0eVRocmVzaG9sZFkgPSB0aGlzLm9wdHMuZGlzcmVnYXJkVmVsb2NpdHlUaHJlc2hvbGQoJ3knLCB0aGlzKTtcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0WCA9XG4gICAgICAgICAgICBldmVudC50eXBlID09PSAnbW91c2Vkb3duJyA/IGV2ZW50LnNjcmVlblggOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRZID1cbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nID8gZXZlbnQuc2NyZWVuWSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XG4gICAgICAgIHRoaXMudG91Y2hNb3ZlWCA9IG51bGw7XG4gICAgICAgIHRoaXMudG91Y2hNb3ZlWSA9IG51bGw7XG4gICAgICAgIHRoaXMudG91Y2hFbmRYID0gbnVsbDtcbiAgICAgICAgdGhpcy50b3VjaEVuZFkgPSBudWxsO1xuICAgICAgICB0aGlzLnN3aXBpbmdEaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLmxvbmdQcmVzc1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmZpcmUoJ2xvbmdwcmVzcycsIGV2ZW50KSwgdGhpcy5vcHRzLmxvbmdQcmVzc1RpbWUpO1xuICAgICAgICB0aGlzLmZpcmUoJ3BhbnN0YXJ0JywgZXZlbnQpO1xuICAgIH1cbiAgICBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScgJiYgKCF0aGlzLnRvdWNoU3RhcnRYIHx8IHRoaXMudG91Y2hFbmRYICE9PSBudWxsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRvdWNoTW92ZVggPSAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScgPyBldmVudC5zY3JlZW5YIDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWCkgLVxuICAgICAgICAgICAgKChfYSA9IHRoaXMudG91Y2hTdGFydFgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDApO1xuICAgICAgICB0aGlzLnZlbG9jaXR5WCA9IHRvdWNoTW92ZVggLSAoKF9iID0gdGhpcy50b3VjaE1vdmVYKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwKTtcbiAgICAgICAgdGhpcy50b3VjaE1vdmVYID0gdG91Y2hNb3ZlWDtcbiAgICAgICAgY29uc3QgdG91Y2hNb3ZlWSA9IChldmVudC50eXBlID09PSAnbW91c2Vtb3ZlJyA/IGV2ZW50LnNjcmVlblkgOiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZKSAtXG4gICAgICAgICAgICAoKF9jID0gdGhpcy50b3VjaFN0YXJ0WSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogMCk7XG4gICAgICAgIHRoaXMudmVsb2NpdHlZID0gdG91Y2hNb3ZlWSAtICgoX2QgPSB0aGlzLnRvdWNoTW92ZVkpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IDApO1xuICAgICAgICB0aGlzLnRvdWNoTW92ZVkgPSB0b3VjaE1vdmVZO1xuICAgICAgICBjb25zdCBhYnNUb3VjaE1vdmVYID0gTWF0aC5hYnModGhpcy50b3VjaE1vdmVYKTtcbiAgICAgICAgY29uc3QgYWJzVG91Y2hNb3ZlWSA9IE1hdGguYWJzKHRoaXMudG91Y2hNb3ZlWSk7XG4gICAgICAgIHRoaXMuc3dpcGluZ0hvcml6b250YWwgPSBhYnNUb3VjaE1vdmVYID4gdGhpcy50aHJlc2hvbGRYO1xuICAgICAgICB0aGlzLnN3aXBpbmdWZXJ0aWNhbCA9IGFic1RvdWNoTW92ZVkgPiB0aGlzLnRocmVzaG9sZFk7XG4gICAgICAgIHRoaXMuc3dpcGluZ0RpcmVjdGlvbiA9XG4gICAgICAgICAgICBhYnNUb3VjaE1vdmVYID4gYWJzVG91Y2hNb3ZlWVxuICAgICAgICAgICAgICAgID8gdGhpcy5zd2lwaW5nSG9yaXpvbnRhbFxuICAgICAgICAgICAgICAgICAgICA/ICdob3Jpem9udGFsJ1xuICAgICAgICAgICAgICAgICAgICA6ICdwcmUtaG9yaXpvbnRhbCdcbiAgICAgICAgICAgICAgICA6IHRoaXMuc3dpcGluZ1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgID8gJ3ZlcnRpY2FsJ1xuICAgICAgICAgICAgICAgICAgICA6ICdwcmUtdmVydGljYWwnO1xuICAgICAgICBpZiAoTWF0aC5tYXgoYWJzVG91Y2hNb3ZlWCwgYWJzVG91Y2hNb3ZlWSkgPiB0aGlzLm9wdHMucHJlc3NUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCgoX2UgPSB0aGlzLmxvbmdQcmVzc1RpbWVyKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlyZSgncGFubW92ZScsIGV2ZW50KTtcbiAgICB9XG4gICAgb25Ub3VjaEVuZChldmVudCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNldXAnICYmICghdGhpcy50b3VjaFN0YXJ0WCB8fCB0aGlzLnRvdWNoRW5kWCAhPT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvdWNoRW5kWCA9XG4gICAgICAgICAgICBldmVudC50eXBlID09PSAnbW91c2V1cCcgPyBldmVudC5zY3JlZW5YIDogZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcbiAgICAgICAgdGhpcy50b3VjaEVuZFkgPVxuICAgICAgICAgICAgZXZlbnQudHlwZSA9PT0gJ21vdXNldXAnID8gZXZlbnQuc2NyZWVuWSA6IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblk7XG4gICAgICAgIHRoaXMuZmlyZSgncGFuZW5kJywgZXZlbnQpO1xuICAgICAgICBjbGVhclRpbWVvdXQoKF9hID0gdGhpcy5sb25nUHJlc3NUaW1lcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdW5kZWZpbmVkKTtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMudG91Y2hFbmRYIC0gKChfYiA9IHRoaXMudG91Y2hTdGFydFgpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDApO1xuICAgICAgICBjb25zdCBhYnNYID0gTWF0aC5hYnMoeCk7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnRvdWNoRW5kWSAtICgoX2MgPSB0aGlzLnRvdWNoU3RhcnRZKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAwKTtcbiAgICAgICAgY29uc3QgYWJzWSA9IE1hdGguYWJzKHkpO1xuICAgICAgICBpZiAoYWJzWCA+IHRoaXMudGhyZXNob2xkWCB8fCBhYnNZID4gdGhpcy50aHJlc2hvbGRZKSB7XG4gICAgICAgICAgICB0aGlzLnN3aXBlZEhvcml6b250YWwgPSB0aGlzLm9wdHMuZGlhZ29uYWxTd2lwZXNcbiAgICAgICAgICAgICAgICA/IE1hdGguYWJzKHggLyB5KSA8PSB0aGlzLm9wdHMuZGlhZ29uYWxMaW1pdFxuICAgICAgICAgICAgICAgIDogYWJzWCA+PSBhYnNZICYmIGFic1ggPiB0aGlzLnRocmVzaG9sZFg7XG4gICAgICAgICAgICB0aGlzLnN3aXBlZFZlcnRpY2FsID0gdGhpcy5vcHRzLmRpYWdvbmFsU3dpcGVzXG4gICAgICAgICAgICAgICAgPyBNYXRoLmFicyh5IC8geCkgPD0gdGhpcy5vcHRzLmRpYWdvbmFsTGltaXRcbiAgICAgICAgICAgICAgICA6IGFic1kgPiBhYnNYICYmIGFic1kgPiB0aGlzLnRocmVzaG9sZFk7XG4gICAgICAgICAgICBpZiAodGhpcy5zd2lwZWRIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKF9kID0gdGhpcy52ZWxvY2l0eVgpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IDApIDwgLXRoaXMub3B0cy52ZWxvY2l0eVRocmVzaG9sZCB8fCB4IDwgLXRoaXMuZGlzcmVnYXJkVmVsb2NpdHlUaHJlc2hvbGRYKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3N3aXBlbGVmdCcsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCgoX2UgPSB0aGlzLnZlbG9jaXR5WCkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogMCkgPiB0aGlzLm9wdHMudmVsb2NpdHlUaHJlc2hvbGQgfHwgeCA+IHRoaXMuZGlzcmVnYXJkVmVsb2NpdHlUaHJlc2hvbGRYKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcmUoJ3N3aXBlcmlnaHQnLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5zd2lwZWRWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIGlmICh5IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKChfZiA9IHRoaXMudmVsb2NpdHlZKSAhPT0gbnVsbCAmJiBfZiAhPT0gdm9pZCAwID8gX2YgOiAwKSA8IC10aGlzLm9wdHMudmVsb2NpdHlUaHJlc2hvbGQgfHwgeSA8IC10aGlzLmRpc3JlZ2FyZFZlbG9jaXR5VGhyZXNob2xkWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJlKCdzd2lwZXVwJywgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKChfZyA9IHRoaXMudmVsb2NpdHlZKSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiAwKSA+IHRoaXMub3B0cy52ZWxvY2l0eVRocmVzaG9sZCB8fCB5ID4gdGhpcy5kaXNyZWdhcmRWZWxvY2l0eVRocmVzaG9sZFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnc3dpcGVkb3duJywgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFic1ggPCB0aGlzLm9wdHMucHJlc3NUaHJlc2hvbGQgJiYgYWJzWSA8IHRoaXMub3B0cy5wcmVzc1RocmVzaG9sZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZG91YmxlVGFwV2FpdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuZG91YmxlVGFwV2FpdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCgoX2ggPSB0aGlzLmRvdWJsZVRhcFRpbWVyKSAhPT0gbnVsbCAmJiBfaCAhPT0gdm9pZCAwID8gX2ggOiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZSgnZG91YmxldGFwJywgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3VibGVUYXBXYWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZVRhcFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiAodGhpcy5kb3VibGVUYXBXYWl0aW5nID0gZmFsc2UpLCB0aGlzLm9wdHMuZG91YmxlVGFwVGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlKCd0YXAnLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5UaW55R2VzdHVyZS5kZWZhdWx0cyA9IHtcbiAgICB0aHJlc2hvbGQ6ICh0eXBlLCBfc2VsZikgPT4gTWF0aC5tYXgoMjUsIE1hdGguZmxvb3IoMC4xNSAqXG4gICAgICAgICh0eXBlID09PSAneCdcbiAgICAgICAgICAgID8gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aFxuICAgICAgICAgICAgOiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpKSksXG4gICAgdmVsb2NpdHlUaHJlc2hvbGQ6IDEwLFxuICAgIGRpc3JlZ2FyZFZlbG9jaXR5VGhyZXNob2xkOiAodHlwZSwgc2VsZikgPT4gTWF0aC5mbG9vcigwLjUgKiAodHlwZSA9PT0gJ3gnID8gc2VsZi5lbGVtZW50LmNsaWVudFdpZHRoIDogc2VsZi5lbGVtZW50LmNsaWVudEhlaWdodCkpLFxuICAgIHByZXNzVGhyZXNob2xkOiA4LFxuICAgIGRpYWdvbmFsU3dpcGVzOiBmYWxzZSxcbiAgICBkaWFnb25hbExpbWl0OiBNYXRoLnRhbigoKDQ1ICogMS41KSAvIDE4MCkgKiBNYXRoLlBJKSxcbiAgICBsb25nUHJlc3NUaW1lOiA1MDAsXG4gICAgZG91YmxlVGFwVGltZTogMzAwLFxuICAgIG1vdXNlU3VwcG9ydDogdHJ1ZSxcbn07XG5sZXQgcGFzc2l2ZUlmU3VwcG9ydGVkID0gZmFsc2U7XG50cnkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBwYXNzaXZlSWZTdXBwb3J0ZWQgPSB7IHBhc3NpdmU6IHRydWUgfTtcbiAgICAgICAgfSxcbiAgICB9KSk7XG59XG5jYXRjaCAoZXJyKSB7IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRpbnlHZXN0dXJlLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9hcHBsaWNhdGlvbi5zY3NzXCI7XG5pbXBvcnQgeyBvbkxvYWRpbmcgfSBmcm9tIFwiLi9fbW9kdWxlcy93ZWJzaXRlXCI7XG5pbXBvcnQgeyBldmVudFdpZHRoLCBpbml0SG9tZSB9IGZyb20gXCIuL19tb2R1bGVzL2hvbWVcIjtcbmltcG9ydCB7IGluaXRTbGlkZXNob3cgfSBmcm9tIFwiLi9fbW9kdWxlcy9zbGlkZXNob3dcIjtcbmltcG9ydCB7IGNsaWNrQ2xvc2UsIGNsaWNrRXZlbnQsIGNsaWNrSGVhZGVyIH0gZnJvbSBcIi4vX21vZHVsZXMvdHJhbnNpdGlvblwiO1xuaW1wb3J0IHsgdG9nZ2xlTWVudSB9IGZyb20gXCIuL19tb2R1bGVzL21lbnVcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBvbkxvYWRpbmcoKTtcbiAgaW5pdEhvbWUoKTtcbiAgaW5pdFNsaWRlc2hvdygpO1xuICBjbGlja0hlYWRlcigpO1xuICBjbGlja0V2ZW50KCk7XG4gIGNsaWNrQ2xvc2UoKTtcbiAgZXZlbnRXaWR0aCgpO1xuICB0b2dnbGVNZW51KCk7XG59KTtcbiJdLCJuYW1lcyI6WyJjbG9zZU1lbnUiLCJpbml0SG9tZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNob3dDb250ZW50Iiwid2luZG93IiwicXVlcnlTZWxlY3RvciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhpZGVDb250ZW50IiwiYm9keSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwic2V0VGltZW91dCIsInJlbW92ZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwic2Nyb2xsIiwic2Nyb2xsVG8iLCJ0b3AiLCJiZWhhdmlvciIsImV2ZW50V2lkdGgiLCJnZXRFdmVudFdpZHRoIiwiY29sIiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsIm9mZnNldFdpZHRoIiwidG9nZ2xlTWVudSIsIm9wZW5NZW51IiwiVGlueUdlc3R1cmUiLCJpbml0U2xpZGVzaG93Iiwic2xpZGVzaG93IiwicHJldkJ1dHRvbiIsImNsb3Nlc3QiLCJuZXh0QnV0dG9uIiwibmV4dFNsaWRlIiwicHJldlNsaWRlIiwiZ2VzdHVyZSIsIm9uIiwiY29udGFpbmVyIiwic2xpZGVzIiwiY3VycmVudCIsImN1cnJlbnRJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJwcmV2IiwiY2hhbmdlQ291bnQiLCJpbm5lckhUTUwiLCJsZW5ndGgiLCJuZXh0IiwiaW5kZXgiLCJpIiwiY2xpY2tIZWFkZXIiLCJsaW5rIiwicGF0aG5hbWUiLCJsb2NhdGlvbiIsImNsaWNrQWJvdXQiLCJocmVmIiwiY2xvc2VJdGVtIiwiY2xpY2tFdmVudCIsImxpbmUiLCJnZXRBdHRyaWJ1dGUiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsInRleHQiLCJodG1sIiwicGFyc2VyIiwiRE9NUGFyc2VyIiwiZG9jIiwicGFyc2VGcm9tU3RyaW5nIiwiY29udGVudCIsImluaXRGdW5jdGlvbnMiLCJidXR0b24iLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiY2xpY2tDbG9zZSIsInRhcmdldCIsImtleSIsIm92ZXJmbG93Iiwib25Mb2FkaW5nIiwiYWRkQ2xhc3Nlc1RvSFRNTCIsImFkZFRhcmdldEJsYW5rIiwiYWRkVkhWYWx1ZSIsImlzVG91Y2giLCJuYXZpZ2F0b3IiLCJtc01heFRvdWNoUG9pbnRzIiwidWEiLCJ1c2VyQWdlbnQiLCJpT1MiLCJtYXRjaCIsIndlYmtpdCIsImlzaU9TIiwidG91Y2giLCJvcyIsImRvY3VtZW50RWxlbWVudCIsImxpbmtzIiwiaG9zdCIsInJlbCIsInZoIiwiaW5uZXJIZWlnaHQiXSwic291cmNlUm9vdCI6IiJ9
