//返回顶部按钮
(function($){
//     var functionpageScroll = function() {
//         window.scrollBy(0,-10);
//         var scrolldelay = setTimeout('pageScroll()',100);
//         if(document.documentElement.scrollTop==0) {
//             clearTimeout(scrolldelay);
//         }
//     }

//     $('.btn-top').click(function() {
//         functionpageScroll();
//     });
//     
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

// 楼层区侧边栏导航收叠
(function($){
    var firstNav = $('.first-nav');

    firstNav.click(function() {
        console.log(1);
        var secondNav = $(this).parent().find('.second-nav');
        var thirdNav = $(this).parent().find('.third-nav');
        secondNav.toggleClass('active');
        if(thirdNav.hasClass('active')) {
            thirdNav.removeClass('active');
        }
    });

    $('.second-nav').click(function() {
        $(this).parent().find('.third-nav').toggleClass('active');
    });

})(jQuery);


//商品名称长度超出替换为省略号
(function($){
    var desc = $('.product-container .item .desc');
    var para = desc.find('a p');
    for(var i = 0, len = para.length; i < len; i++) {
        var text = para.eq(i).text();
        if(text.length >= 50) {
            var newText = text.substr(0, 50) + '  ...';
            console.log(newText)
            para.eq(i).text(newText);
        };
    }

})(jQuery);



//楼层广告图片高度优化
// (function($){
//     console.log(document.body.clientWidth);
//     if(document.body.clientWidth >= 768) {

//         var image = $('.ad-banner img');
//         var minHeight = image.eq(1).height();
//         for(var i = 0, len = image.length; i < len; i++) {
//             var height = image.eq(i).height();
//             if (height < minHeight) {
//                 minHeight = height;
//             }
//         }

//         for(var i = 0, len = image.length; i < len; i++) {
//             image.eq(i).height(minHeight);
//         }
//     }

// })(jQuery);





