(function(w, d) {

    var body = d.body,
        gotop = d.getElementById('gotop'),
        menu = d.getElementById('menu'),
        navLi = menu.getElementsByTagName('li');
        header = d.getElementById('header'),
        mask = d.getElementById('mask'),
        menuToggle = d.getElementById('menu-toggle'),
        menuOff = d.getElementById('menu-off'),
        loading = d.getElementById('loading'),
        animate = w.requestAnimationFrame,
        ua = navigator.userAgent,
        isMD = ua.indexOf('Mobile') !== -1 || ua.indexOf('Android') !== -1 || ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1 || ua.indexOf('KFAPWI') !== -1,
        even = isMD ? 'touchstart' : 'click',
        noop = function() {},
        offset = function(el) {
            var x = el.offsetLeft,
                y = el.offsetTop;

            if (el.offsetParent) {
                var pOfs = arguments.callee(el.offsetParent);
                x += pOfs.x;
                y += pOfs.y;
            }

            return {
                x: x,
                y: y
            };
        },
        docEl = ua.indexOf('Firefox') !== -1 ? d.documentElement : body;

    var Blog = {
        goTop: function() {
            var top = docEl.scrollTop;
            if (top > 400) {
                docEl.scrollTop = top - 400;
                animate(arguments.callee);
            } else {
                docEl.scrollTop = 0;
            }
        },
        toggleGotop: function(top) {
            if (top > w.innerHeight / 2) {
                gotop.classList.add('in');
            } else {
                gotop.classList.remove('in');
            }
        },
        toggleMenu: function(flag) {
            if (flag) {
                menu.classList.remove('hide');

                if (w.innerWidth < 1241) {
                    mask.classList.add('in');
                    menu.classList.add('show');
                }

            } else {
                menu.classList.remove('show');
                mask.classList.remove('in');
            }
        },
        fixedHeader: function(top) {
            if (top > header.clientHeight) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        },
        fixedToc: (function() {
            var toc = d.getElementById('post-toc');

            if (!toc) {
                return noop;
            }

            var tocOfs = offset(toc),
                tocTop = tocOfs.y,
                tocH = toc.offsetHeight,
                isScroll = tocH > w.innerHeight,
                titles = d.getElementById('post-content').querySelectorAll('h1, h2, h3, h4, h5, h6'),
                cssTop = 150,
                minTop = -1 * (tocH - w.innerHeight) - cssTop;

            function scroll(top) {

                for (var id, i = 0, len = titles.length; i < len; i++) {
                    if (top > offset(titles[i]).y) {
                        id = titles[i].id;
                    }
                }

                var top = cssTop - toc.querySelectorAll('a[href="#' + id + '"]')[0].offsetTop;

                toc.style.top = (top < minTop ? minTop : top) + 'px';
            }

            return function(top) {
                if (top > tocTop) {
                    toc.classList.add('fixed');

                    if (isScroll) {
                        scroll(top);
                    }
                } else {
                    toc.classList.remove('fixed');
                }

            };
        })(),
        share: function() {

            var share = d.getElementById('global-share'),
                menuShare = d.getElementById('menu-share'),
                div = d.createElement('div'),
                sns = d.getElementsByClassName('share-sns'),
                summary, api;

            div.innerHTML = BLOG_SHARE.summary;
            summary = div.innerText;
            div = undefined;

            api = 'http://www.jiathis.com/send/?webid={service}&url=' + BLOG_SHARE.url + '&title=' + BLOG_SHARE.title + '&summary=' + summary + '&pic=' + location.protocol + '//' + location.host + BLOG_SHARE.pic;

            function goShare(service) {
                w.open(encodeURI(api.replace('{service}', service)));
            }

            function show() {
                mask.classList.add('in');
                share.classList.add('in');
            }

            function hide() {
                share.classList.remove('in');
                mask.classList.remove('in');
            }

            [].forEach.call(sns, function(el) {
                el.addEventListener('click', function() {
                    goShare(this.dataset.service);
                }, false);
            });

            menuShare.addEventListener(even, function() {
                show();
            }, false);

            mask.addEventListener(even, function() {
                hide();
            }, false);
        },
        search: function() {
            var searchWrap = d.getElementById('search-wrap');

            function toggleSearch() {
                searchWrap.classList.toggle('in');
            }

            d.getElementById('search').addEventListener(even, toggleSearch);
            d.getElementById('search').addEventListener(even, toggleSearch);
        }
    };



    menu.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });

    w.addEventListener('load', function() {
        loading.classList.remove('active');
    });

    w.addEventListener('resize', function() {
        Blog.toggleMenu();
    });

    gotop.addEventListener(even, function() {
        animate(Blog.goTop);
    }, false);

    menuToggle.addEventListener(even, function(e) {
        Blog.toggleMenu(true);
        e.preventDefault();
        setTimeout(function(){
            for(i = 0; i < navLi.length; i++){
                navLi[i].classList.remove('hide');
            }
        },200)
    }, false);



    menuOff.addEventListener(even, function() {
        menu.classList.add('hide');
        for(i=0;i<navLi.length;i++){
            navLi[i].classList.add('hide');
        }
    }, false);

    

    mask.addEventListener(even, function() {
        Blog.toggleMenu();
    }, false);

    d.addEventListener('scroll', function() {
        var top = docEl.scrollTop;
        Blog.toggleGotop(top);
        Blog.fixedHeader(top);
        Blog.fixedToc(top);
    }, false);

    if (typeof BLOG_SHARE !== 'undefined') {
        Blog.share();
    }

    Waves.init();
    Waves.attach('.global-share li', ['waves-block']);
    Waves.attach('.article-tag-list-link, #page-nav a, #page-nav span', ['waves-button']);

})(window, document);

function hasClass(ele,cls) { 
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
} 

function addClass(ele,cls) { 
    if (!this.hasClass(ele,cls)) ele.className += " "+cls; 
} 

function removeClass(ele,cls) { 
    if (hasClass(ele,cls)) { 
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
        ele.className=ele.className.replace(reg,' '); 
    } 
} 

function del_spacetxt(elem) {

	var elem_child = elem.childNodes;

	for(var i = 0; i < elem_child.length; i++) {
		// console.log(elem_child[i].nodeName);
		if(elem_child[i].nodeName == "#text") {
			// console.log(1);
			elem.removeChild(elem_child[i]);
		}
	}

	return elem.childNodes[0];
}

window.onload=function(){

	


    var menu = document.getElementById('menu');
    var navLi = menu.getElementsByTagName('li');

    console.log(del_spacetxt(navLi[1]));


	//menu延迟动画
    setTimeout(function(){
        removeClass(menu,'hide');
    },300)

    setTimeout(function(){
        for(i = 0; i < navLi.length; i++){
        	var child = del_spacetxt(navLi[i]);
            removeClass(child,'hide');
        }
    },500)

    
}


//去除Read More

var allA = document.getElementsByTagName('a');
var loc = window.location.toString().split("//");
loc = loc[1].replace("/","");

for(i in allA){
	// console.log(1);
	if(allA[i].innerText == "Read More…" && loc != window.location.host){
		addClass(allA[i],'hide');
		console.log(loc);
		console.log(allA[i].innerText);
	}
}

