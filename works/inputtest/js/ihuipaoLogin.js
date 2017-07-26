
    $(document).ready(function() {
        set_none();

        var check_mobile = /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        // var check_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var check_email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/

        $('#account').bind('input propertychange', function() {
            var account = $(this).val();

            if(check_mobile.test(account)) { 

                checkAccount(account,'mobile');

            }else if (check_email.test(account)) {

                checkAccount(account,'email');

            }else{
                set_none();
            }
        });

    });

    function checkAccount(account,platform){
        $.ajax({
            type: "POST",
            url: "http://interface.ihuipao.cn/user/checkuser",
            dataType: "json",
            data: {
                account:account,
                platform:platform
            },
            success: function(data){
                if(data.data=='login'){
                    set_login();
                }else if(data.data=='register'){
                    set_register();
                }else{
                    set_none();
                }
             },
             error:function(){
                 $.messager.popup("网络有问题，请稍后再试");
                 set_none();
             }                 
        });
    }


    function set_register(){
        LUOCAPTCHA.reset();
        var registerBox   = $("#registerBox").html();
        $("#login_state").html(registerBox);    
        $("#sms_code").css('display','block');
        $(".btn_login").attr('disabled',false);
        $("#login_form").attr("action","/user/register");
        $(".text_login").html('注册');
        $(".regText").remove();
    }
    function set_login(){
        var loginBox   = $("#loginBox").html();
        var loginBox2   = $("#loginBox2").html();
        $("#login_state").html(loginBox);   //登录密码
        $(".regText").remove(); //删除忘记密码
        $("#login_form").append(loginBox2); //忘记密码
        $("#login_form").attr("action","/user/login");  //表单action
        $(".btn_login").attr('disabled',false); //登录按钮状态
        $("#sms_code").css('display','none'); //隐藏图形验证
        $(".text_login").html('登录');
    }
    function set_none(){
        var noneBox   = $("#noneBox").html();
        $("#login_state").html('');
        $(".btn_login").attr('disabled',true); //登录按钮状态
        $(".regText").remove(); //删除忘记密码
        $("#sms_code").css('display','none'); //隐藏图形验证
        $(".text_login").html('登录/注册');
        $("#login_form").append(noneBox); //忘记密码
    }

    function loading(text,disabled){
        $(".btn_login").attr('disabled',disabled);
        $(".text_login").html(text);
    }



    $(document).ready(function() {


        $("body").on("click",'#btn_sub', function(){

            var btn_state = $("#btn_sub").attr('disabled');
            if(btn_state == 'disabled'){
                return false;
            }

            var url = $("#login_form").attr("action");
            var account = $("#account").val();
            var password = $("#password").val();
            var code = $("#code").val();
            var _r = $("#_r").val();
            loading('处理中...',true);
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                data: {
                    account:account,
                    password:password,
                    code:code,
                    _r:_r
                },
                success: function(data){
                    if(data.code=='success'){
                        $.messager.popup(data.message);
                        window.location.href = data.url 
                    }else{
                        $.messager.popup(data.message);
                    }
                 },
                 error:function(){
                    location.reload();
                    // var domain = $("#btn_sub").data('url');
                    // window.location.href = domain; 
                     // $.messager.popup("网络有问题，请稍后再试");
                     // set_none();
                 }                 
            });
        });





        $("body").on("click",'#getcode', function() {
            var account = $('#account').val();
            var response = $('#lc-captcha-response').val();
            if(account == '' || account == 'undefined'){
                $.messager.popup('请填写账号', 'error');
                return false;                
            }
            if (response == '' || response == 'undefined') {
                $.messager.popup('请先进行图形验证', 'error');
                return false;
            }
            $.post('/user/getverify', {'account': account, 'type': 'register', 'response': response}, function(request, response) {
                if (request.code == 'success') {

                    $.messager.popup('校验码已发送');
                    Countdown();
                } else {

                    $.messager.popup(request.message, 'error');
                }
            }, 'json');
            return false;
        });
    });


    //忘记密码
    $(document).ready(function() {
        $('#verify').click(function() {
            if ($(this).hasClass('disabled')) {
                return false;
            }
            
            var account = $('input[name="account"]').val();
            var response = $('#lc-captcha-response').val();
            if (response == '' || response == 'undefined') {
                $.messager.popup('请先进行图形验证', 'error');
                return false;
            }
            $.post('/user/getverify', {account: account, type: 'resetpass', 'response': response}, function(request) {
                if (request.code == 'success') {                   
                    $.messager.popup('验证码已发送');    
                    Countdown2();
                    return false;
                } else {
                    $.messager.popup(request.message, 'error');
                    return false;
                }
            }, 'json');
    
        });
    });


    var Countdown = function(data) {
        var btnDom = $('#getcode');
        time = btnDom.data('time') ? btnDom.data('time') : 60;
        if (time == 60) {
            btnDom.addClass('disabled');
        }
        if (time-- > 1) {
            html = '请稍候' + time;
            btnDom.html(html).data('time', time);
            var cd1 = setTimeout("Countdown()", 1000);
        } else {
            LUOCAPTCHA.reset();
            btnDom.html('重新获取验证码码').removeClass('disabled').data('time', 0);
            clearTimeout(cd1);
        }
    };

    var Countdown2 = function() {
        var btnDom = $('#verify');
        time = btnDom.data('time') ? btnDom.data('time') : 60;
        if (time == 60) {
            btnDom.addClass('disabled');
        }
        if (time-- > 1) {
            html = '请稍候' + time;
            btnDom.html(html).data('time', time);
            var cd1 = setTimeout("Countdown2()", 1000);
        } else {
            LUOCAPTCHA.reset();
            btnDom.html('重新获取验证码码').removeClass('disabled').data('time', 0);
            clearTimeout(cd1);
        }
    };