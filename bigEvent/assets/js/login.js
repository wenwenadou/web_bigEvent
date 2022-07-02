$(function() {
    $('#link_reg').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg_box').hide()
        $('.login_box').show()
    })
})
var form = layui.form
var layer = layui.layer
form.verify({
    pwd: [/^[\S]{6,18}$/,
        '请输入6-18位长度密码,且不能有空格'
    ],

    repwd: function(value) { //空格隔开
        var pwd = $('.reg_box [name=password]').val()
        if (pwd !== value) { return '两次密码不一样' }
    }
})
$('#form_reg').on('submit', function(e) {
    e.preventDefault()
    $.post('api/reguser', {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }, function(res) {
        if (res.status !== 0) { return layer.msg(res.message) }
        layer.msg('注册成功,请立即登录')
        setInterval(function() { $('#link_login').click() }, 1000)
    })
})
$('#form_log').submit(function(e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('登陆失败')
            }
            layer.msg('登陆成功')
            localStorage.setItem('token', res.token)
            location.href('/index.html')
        }
    })
})