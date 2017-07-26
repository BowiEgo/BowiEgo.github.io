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

//移动端底部菜单收叠
(function($){
    $(window).scroll(function() {        
        if($(window).scrollTop() >= 100){
            $('.nav-bottom').addClass('scroll'); 
        }else{   
            $('.nav-bottom').removeClass('scroll');    
        }  
    });
    
})(jQuery);

//商品名称长度超出替换为省略号
(function($){
    var desc = $('.product-container .item .desc');
    var para = desc.find('a p');
    for(var i = 0, len = para.length; i < len; i++) {
        var text = para.eq(i).text();
        if(text.length >= 30) {
            var newText = text.substr(0, 30) + '  ...';
            para.eq(i).text(newText);
        };
    }

})(jQuery);


//品牌logo轮播自动播放
(function($) {
    window.clearInterval(bandSlide);

    var bandSlide = setInterval(function() {
        $('.js_next').trigger('click');
    },3000);

})(jQuery);


//秒杀区标签今日默认状态
(function($) {
    var now = new Date();
    var day = now.getDay();
    var pre = $('.seconds-kill .nav .presentation');
    pre.each(function(idx, el) {
        if(idx === day) {
            $(this).find('a').trigger('click');
        }
    });
})(jQuery);

//侧边分类菜单图片尺寸控制
(function($) {
    var secondNavAll = $('.second-nav.active');
    secondNavAll.each(function(idx, el) {
        var img = el.find('img');

    })

})(jQuery);


//侧边分类菜单收叠
(function($) {
    $('#sui_nav2').html($('#sui_nav').html());
    var topbar;
    topbar = $('#sui_nav').SuiNav({});
    var navbar = $('#sui_nav2').SuiNav({});
    $('.MenuToggle').click(function() {
        console.log("toggle");
        topbar.toggle();
    });
    $('.MenuOpen').click(function() {
        console.log("open");
        topbar.show();
    });


    //默认展开
    var navLiAll = $('.sui-nav').find('li');

  
    //
    var aAll = $('.sui-nav').find('a');

    // navLiAll.each(function(idx, el) {
    //     if($(el).find('ul').length) {
    //         $(el).find('ul li').each(function(i, item) {
    //             // console.log(i);
    //             // $(el).append('<div class="toggle-cross"><span></span><span></span></div>');
                
                 
    //         })
    //     }
    // });

     aAll.each(function(idx, el) {
        if($(el).parent().find('ul').length) {
            $(el).trigger('click');
        }
    });
    
    // aAll.click(function() {
    //     // event.stopPropagation();
    //     console.log($(this).parent().find('.toggle-cross').eq(0).eq(0));
    //     $(this).parent().find('.toggle-cross').eq(0).toggleClass('active');
    // });

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
        console.log($(this));
        $(this).remove();
        $("#select1 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    
    $(document).on("click", "#selectB", function () {
        console.log($(this));
        $(this).remove();
        $("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
    });
    
    $(document).on("click", "#selectC", function () {
        console.log($(this));
        $(this).remove();
        $("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
    });

    $(document).on("click", "#selectD", function () {
        console.log($(this));
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

})(jQuery);


//商品详情图片放大
(function($) {

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
