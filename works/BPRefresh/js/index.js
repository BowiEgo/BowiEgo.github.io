;
(function() {
    function BPRefresh(options, cb) {
        options = options || {};

        this.el = typeof options.el === 'Object' ? options.el : document.getElementById(options.el);
        this.content = this.el.getElementsByClassName('BPRefresh__content')[0];
        var loadTmp = '<img class="BPRefresh__loading" src='+ options.loading +'></img>';
        this.animating = false;
        this.loading = this.render(loadTmp).childNodes[1];
        this.cb = cb || function() {return false};
        this.resetD = "M0,0 C121,0 146,0 196,0 S271,0 375,0 L375,667 0,667z";
        this.startY = 0;
        this.pullDeltaY = 0;
        this.pullSlowCoef = 1.2;
        this.maxPullY = 150;
        this.minReleaseY = 120;
        this.contentYCoef = 0.4;
        this.maxContentY = this.maxPullY * this.contentYCoef;
        this.bodyOffsetX = this.el.clientWidth;
        this.bodyW = this.el.clientWidth;
        this.easings = {
            elastic: function(t,b,c,d) {
              var ts = (t/=d)*t;
              var tc = ts*t;
              return b+c*(33*tc*ts + -106*ts*ts + 126*tc + -67*ts + 15*t);
            },
            inCubic: function(t,b,c,d) {
              var tc = (t/=d)*t*t;
              return b+c*(tc);
            }
        };

        this.resetAT = 500;
        this.releaseStep1AT = 800;
        this.releaseWaitTime = 3000;

        var svgTmp = '<svg class="BPRefresh__svg-bg" viewBox="0 0 375 667" preserveAspectRatio="xMaxYMin slice">\
                        <path class="BPRefresh__svg-bg__path" d="M0,0 C121,0 146,0 196,0 S271,0 375,0 L375,667 0,667z" />\
                    </svg>';
        this.bgPath = this.render(svgTmp).childNodes[1];
        this.init();

    }

    function hasClass(ele,cls) { 
        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
    } 

    function addClass(ele,cls) { 
        if (!hasClass(ele,cls)) {
            if(ele.className !== '') {
                ele.className += " "+cls;
            } else {
                ele.className = cls;
            }
        }
    } 

    function removeClass(ele,cls) { 
        if (hasClass(ele,cls)) { 
            var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
            ele.className=ele.className.replace(reg,''); 
        } 
    } 

    function toggleClass(obj,cls){  
        if(hasClass(obj,cls)){  
            removeClass(obj, cls);  
        }else{  
            addClass(obj, cls);  
        }  
    }

    BPRefresh.prototype = {
        constructor: BPRefresh,

        init: function() {
            addClass(this.el, 'BPRefresh')
            this.el.style.position = 'relative';
            this.bgPath.setAttribute('d', this.resetD);
            this.setPull();
            console.log(this.el);
        },

        render: function(tmpl) {
            var tmpDiv = document.createElement('div');
            tmpDiv.innerHTML = tmpl;
            var tmpEl = tmpDiv.childNodes[0];
            this.el.insertAdjacentElement('afterbegin', tmpEl);
            return tmpEl;
        },

        SvgPathTween: function(from, to, time, easing) {
            var _self = this;
            var regex = /\d+(\.\d{1,2})?/g;
            var fromD = from.getAttribute("d");
            var fm = fromD.match(regex);
            var tm = to.match(regex);
            var diff = [];
            for (var i = 0; i < fm.length; i++) {
                diff.push(+fm[i] - (+tm[i]));
            }
            var time = time || 600;
            var curFrame = 0;
            var frames = time / 1000 * 60;
            var easing = easing || "elastic";

            function animate() {
                if (curFrame > frames) return;
                var i = 0;
                var newD = fromD.replace(regex, function(m) {
                    if (+m === 0 || // if nothing changed - skip
                        i % 2 === 0) { // in this demo I want to animate only y values
                        i++;
                        return m;
                    }
                    return +_self.easings[easing](curFrame, +fm[i], 0 - diff[i++], frames).toFixed(2);
                });
                from.setAttribute("d", newD);
                curFrame++;
                requestAnimationFrame(animate);
            };
            animate();
        },

        pullchange: function(y, x) {
            var pullY = (y <= this.maxPullY) ? y : this.maxPullY;
            if (pullY < 0) pullY = 0;
            var pullCoef = pullY / this.maxPullY;
            var sdo = this.circleLen + pullCoef * this.lineDragBoundries;
            var pullYCont = +(pullY * this.contentYCoef).toFixed(2);
            var bodyX = parseInt(x, 10);
            var leftX = x - 50;
            if (leftX < 0) leftX = 0;
            var rightX = x + 50;
            if (rightX > this.bodyW) rightX = this.bodyW;
            this.content.style.transform = "translate3d(0,"+ pullYCont +"px,0)";
            this.bgPath.setAttribute("d", "M0,0 C"+(leftX-25)+",0 "+(leftX)+","+pullYCont+" "+bodyX+","+pullYCont+" S"+(rightX+25)+",0 375,0 L375,667 0,667z");
        },

        reset: function() {
            var _self = this;
            addClass(this.el, 'reset');
            addClass(this.content, 'reset');
            this.SvgPathTween(this.bgPath, this.resetD);

            setTimeout(function() {
                removeClass(_self.el, 'reset');
                _self.el.setAttribute('style', '');
                removeClass(_self.content, 'reset');
                _self.content.setAttribute('style', '');
                _self.animating = false;
            }, this.resetAT);
        },

        performMagic: function() {
            var _self = this;
            
            if(this.animating) {
                return false;
            } else {
                this.animating = true;
            }
            addClass(this.el, 'waiting');
            addClass(this.content, 'reset');
            this.SvgPathTween(this.bgPath, this.resetD);

            setTimeout(function() {
                _self.cb(function() {
                    removeClass(_self.el, 'waiting');
                    addClass(_self.el, 'reset');
                    removeClass(_self.content, 'reset');
                    _self.content.setAttribute('style', '');
                    _self.animating = false;
                });
            }, _self.releaseWaitTime);
        },

        release: function() {
            if (this.pullDeltaY < this.minReleaseY) {
                this.reset();
            } else {
                this.performMagic();
            }
        },

        setPull: function() {
            var _self = this;
            this.el.addEventListener('mousedown', start, false);
            this.el.addEventListener('touchstart', start, false);
            function start(e) {
                console.log(e);
                _self.startY =  e.pageY || e.touches[0].pageY;
                document.addEventListener('mousemove', move, false);
                document.addEventListener('touchmove', move, false);
                document.addEventListener('mouseup', end, false);
                document.addEventListener('touchend', end, false);
            }
            function move(e, startY) {
                var y = e.pageY || e.touches[0].pageY;
                var x = e.pageX || e.touches[0].pageX;
                _self.pullDeltaY = (y - _self.startY) / _self.pullSlowCoef;
                if (!_self.pullDeltaY) return;
                if(!_self.animating) {
                    _self.pullchange(_self.pullDeltaY, x);
                }
            }
            function end(e) {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('touchmove', move);
                document.removeEventListener('mouseup', end);
                document.removeEventListener('touchend', end);
                _self.release();
            }
        }
    }

    window.BPRefresh = BPRefresh;
})();

