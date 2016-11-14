//汇跑头部nav固定
(function($){
    $(window).scroll(function() {    
        if($(window).scrollTop() >= 300){
            $('#js-bootstrap-offcanvas').addClass('navbar-fixed-top'); 
        }else{   
            $('#js-bootstrap-offcanvas').removeClass('navbar-fixed-top');    
        }  
    });
})(jQuery);

//添加搜索按钮代码
(function($){
    $('.search-but .but').click(function(){
        // if(!$('#menu .search').hasClass('active')) {
        //     $('#menu .search').addClass('active');
        //     $('#menu .search input').focus();
        // }
        // else {
        //     console.log(2);
        //     // $('#menu .search .search-input').blur();
        //     $('#menu .search').removeClass('active');
        // }

        $('#menu .search').toggleClass('active');
        if(!$('#menu .search').hasClass('active')) {
            $('#menu .search .search-input').focus();
            console.log(2);
        }
    });
    
    var ww = $(window).width();
    inputBlur(ww);
    function inputBlur(width) {
        ww = width;
        if(ww < 414) {
           $('#menu .search .search-input').blur(function(){
                $('#menu .search').removeClass('active');
            }); 
        }
    }
    $(window).resize(function() {
        inputBlur($(window).width());
    })
   
})(jQuery);
            

//顶部导航标签状态根据页面URL显示
(function($){
    var loc = window.location.pathname;
    if(loc == '/mall/' || loc == '/mall') {
        $('.nav-side .btn-home').addClass('active');
    }
    else if(loc.indexOf('eqorder') > -1) {
        $('.nav-side .btn-order').addClass('active');
    }
    else if(loc.indexOf('cart') > -1) {
        $('.nav-side .btn-cart').addClass('active');
    }
    else if(loc.indexOf('cart') > -1) {
        $('.nav-side .btn-cart').addClass('active');
    }

})(jQuery);

//返回顶部按钮
(function($){
    $(window).scroll(function() {        
        if($(window).scrollTop() >= 100){
            $('#page_top').addClass('scroll'); 
        }else{   
            $('#page_top').removeClass('scroll');    
        }  
    });

    $('#page_top').click(function(){
        if(!$('html,body').is(":animated")){
            $('html,body').animate({scrollTop: 0}, 800);
        }
    })
})(jQuery);

//商品名称长度超出替换为省略号
(function($){
    fontResize();
    function fontResize() {
        var winWidth = $(window).width();
        var desc = $('.product-container .item .desc');
        var len = 56;
        desc.each(function(idx, item) {
            if($(item).parent().parent().parent().parent().parent('.product-floor').length > 0) {
                if (winWidth > 1200) {
                    len = 66
                }
                else if (winWidth > 992) {
                    len = 53;
                }
                else if (winWidth > 768) {
                    len = 68;
                }
                else if (winWidth > 414) {
                    len = 84;
                }
                else if (winWidth <= 414) {
                    len = 56;
                }
            }
            else if ($(item).parent().parent().parent().parent().parents('.new-product').length > 0){
                if (winWidth > 1200) {
                    len = 82;
                }
                else if (winWidth > 992) {
                    len = 60;
                }
                else if (winWidth > 768) {
                    len = 66;
                }
                else if (winWidth > 414) {
                    len = 56;
                }
                else if (winWidth <= 414) {
                    len = 40;
                }
            }
            var text = $(item).find('a p').text();
            var subLen = getLength(len, text);
            if(subLen) {
                var newText = text.substr(0, subLen) + '...';
                $(item).find('a p').text(newText);
            }
        });
    };
    function getLength (len, str) {
        var subLen = len;
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            }
            else {
                realLength += 2;
            }
            if(realLength >= subLen) {
                return i;
            }
        }
        return false;
    };

})(jQuery);


//品牌logo轮播自动播放
(function($) {
    window.clearInterval(bandSlide);

    var bandSlide = setInterval(function() {
        $('.js_next').trigger('click');
    },3000);

})(jQuery);


//秒杀区标签今日默认状态
// (function($) {
//     var now = new Date();
//     var day = now.getDay();
//     var pre = $('.seconds-kill .nav .presentation');
//     pre.each(function(idx, el) {
//         if(idx === day) {
//             $(this).find('a').trigger('click');
//         }
//     });
//     if(day >= 5) {
//         pre.each(function(idex, item) {
//             if(idex == 0) {
//                 $(item).find('a').trigger('click');
//             }
//             else {
//                 console.log($(item).find('a'));
//                 $(item).find('a').attr('data-toggle', '');
//             }
//         })
//     }
// })(jQuery);

//侧边分类菜单收叠
(function($) {
    $('#sui_nav2').html($('#sui_nav').html());
    var topbar;
    topbar = $('#sui_nav').SuiNav({});
    var navbar = $('#sui_nav2').SuiNav({});
    $('.MenuToggle').click(function() {
        topbar.toggle();
    });
    $('.MenuOpen').click(function() {
        topbar.show();
    });

    //默认展开
    var navLiAll = $('.sui-nav').find('li');
    var navFirstLi = $('.sui-nav').children('div').children('ul').children('li');

    //一级菜单添加收叠按钮
    navFirstLi.each(function(idx, el) {
        if($(el).find('ul').length) {
            $(el).append('<div class="toggle-cross"><span></span><span></span></div>');
        }
    });

    //二级菜单添加收叠按钮
    $('.nav-sec').each(function(idx, el) {
        $(el).parent('li').append('<div class="toggle-cross"><span></span><span></span></div>');
        $(el).click(function() {
            $(this).parent().find('.toggle-cross').toggleClass('active');
        });
    });

    navFirstLi.each(function(idx, el) {
        var aNav = $(el).children(':first');
        aNav.click(function() {
            $(this).parent().children('.toggle-cross').toggleClass('active');
        });
    });

    $('.toggle-cross').click(function() {
        if("none" == $(this).parent().children('ul').css('display')) {
            $(this).parent().children('ul').slideDown(400);
            $(this).removeClass('active');
            var ulList = $(this).parent().children('ul');
            ulList.each(function(idx, item) {
                $(item).find('li .toggle-cross').trigger('click');
            });
        }
        else {
            $(this).parent().find('ul').slideUp(400);
            $(this).addClass('active');
        }
    });

    $('.MenuOpen').click(function() {
        $('.slide-nav .toggle-cross').addClass('active');
        // var navFirstLiSlide = $('.slide-nav').children('div').children('ul').children('li');
        // navFirstLiSlide.each(function(idx, el) {
        //     var aNav = $(el).children(':first');
        //     aNav.click(function() {
        //         $(this).parent().children('.toggle-cross').toggleClass('active');
        //     });
        // });
        // $('.slide-nav .nav-sec').each(function(idx, el) {
        //     $(el).click(function() {
        //         $(this).parent().find('.toggle-cross').toggleClass('active');
        //     });
        // });
    });

    navHide();

    function navHide() {
        var loc = window.location.pathname;

        if($(window).width() < 992 && $(window).height() > 400 && loc.indexOf('brand') == -1 && loc.indexOf('branddetail') == -1) {
            $('.nav-bottom').css('display', 'block');
        }
        else {
            $('.nav-bottom').css('display', 'none');
        }
    }

    var IID = setInterval(function() {
        if($('.nav-bottom').eq(0)[0].offsetTop < 300) {
            $('.nav-bottom').css('visibility', 'hidden');
        }
        else {
            $('.nav-bottom').css('visibility', 'visible');
        }
    },100);

    if($(window).width() >= 768) {
        clearInterval(IID);
    }

    $(window).resize(function() {
        navHide();
    });

})(jQuery);

//商品筛选功能
(function($) {
                         
    $("#select1 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectA").remove();
        } else {
            var copyThisA = $(this).clone();
            if ($("#selectA").length > 0) {
                $("#selectA a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisA.attr("id", "selectA"));
            }
        }
    });
    
    $("#select2 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectB").remove();
        } else {
            var copyThisB = $(this).clone();
            if ($("#selectB").length > 0) {
                $("#selectB a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisB.attr("id", "selectB"));
            }
        }
    });
    
    $("#select3 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectC").remove();
        } else {
            var copyThisC = $(this).clone();
            if ($("#selectC").length > 0) {
                $("#selectC a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisC.attr("id", "selectC"));
            }
        }
    });

    $("#select4 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectD").remove();
        } else {
            var copyThisC = $(this).clone();
            if ($("#selectD").length > 0) {
                $("#selectD a").html($(this).text());
            } else {
                $(".select-result dl").append(copyThisC.attr("id", "selectD"));
            }
        }
    });
    
    $(document).on("click", "#selectA", function () {
        $(this).remove();
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    
    $(document).on("click", "#selectB", function () {
        $(this).remove();
        $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    
    $(document).on("click", "#selectC", function () {
        $(this).remove();
        $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
    });

    $(document).on("click", "#selectD", function () {
        $(this).remove();
        $("#select4 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    
    $(document).on("click", ".select dd", function () {
        if ($(".select-result dd").length > 1) {
            $(".select-no").hide();
        } else {
            $(".select-no").show();
        }
    });
    

    //收叠按钮
    if($('.select-list').length > 3) {
        for(var i = 3, len = $('.select-list').length; i < len; i++) {
            $('.select-list').eq(i).css('display','none');
        }
    }

    $('.btn-collapse').click(function() {
        for(var i = 3, len = $('.select-list').length; i < len; i++) {
            var selectList = $('.select-list').eq(i);
            if(selectList.css('display') === 'block') {

                selectList.css('display','none');
            } 
            else {
                selectList.css('display','block');
            }
        }
        $(this).toggleClass('active');
    })

    $('.select-list').each(function(idx, item) {
        var selected = $(item).find('.selected');
        if(selected && !selected.hasClass('select-all')) {
            $(item).css('display','block');
        }
    })

})(jQuery);

//商品购买选择
(function($) {
    var itemNum = $('#product-select .item-num .num');
    var num = parseInt(itemNum.text());
    var supplyNum = parseInt($('#product-select .item-num .supply-num').text())

    function isReady() {
        var isReady = false;
        var specReady = true;
        $('.item-spec').each(function(idx, item) {
            if($(item).find('.active').length == 0) {
                specReady = false;
            }
        });
        if(num >= 0 && specReady) {
            $('.item-selected .selected').text(num);
        }
    }

    $('.minus').click(function() {
        if(num > 0) {
            num --;
            itemNum.text(num);
        }
        isReady();
    }); 
    $('.plus').click(function() {
        if(num < supplyNum) {
            num ++;
            itemNum.text(num);
        }
        isReady();
    }); 
    $('.spec').click(function() {
        $(this).siblings('.spec').removeClass('active');
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
        }
        isReady();
    });

})(jQuery);


//品牌列表页字母区域跳转
(function($) {

    var a = $('.first-characters a');

    a.each(function(idx, item) {
        var character = $(item).text();
        for(var i = 0, len = $('.brands').length; i < len; i++) {
            if($('.brands').eq(i).find('.character').text() === character) {
                if($('.brands').eq(i).find('.brand .item').length > 0) {
                    $(item).addClass('underline');
                }
            }
        }
    })

    a.click(function() {
        var character = $(this).text();
        for(var i = 0, len = $('.brands').length; i < len; i++) {
            if($('.brands').eq(i).find('.character').text() === character) {
                var top = $('.brands').eq(i).offset().top - 100;
                $('html,body').scrollTop(top);
            }
        }
    });
    

})(jQuery);

