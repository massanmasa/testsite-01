let pointY;

// モーダルをセンタリングする関数
const centeringModal = () => {
    let w = $(window).width();
    let h = $(window).height();

    let contentsW = $('.contact-wrapper').outerWidth();
    let contentsH = $('.contact-wrapper').outerHeight();

    $('.contact-wrapper').css({
        'top': ((h - contentsH) / 2) + 'px',
        'left': ((w - contentsW) / 2) + 'px'
    });
}

// 背景固定を解除する関数
const releaseScrolling = () => {
    $('body').css({
        'position': 'relative',
        'width': '',
        'top': ''
    });
    $(window).scrollTop(pointY);
}

jQuery(function($) {
    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 200) {
            $('#pageTopBtn').fadeIn();
        } else {
            $('#pageTopBtn').fadeOut();
        }
    });

    // ボタンのクリック処理
    $('#pageTopBtn').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 600);

        return false;
    });

    // モーダルウィンドウ処理
    $('#contact-modal').on('click', function() {
        $(this).blur();
        if($('#contact-overlay')[0]) return false;

        // 背景固定
        pointY = $(window).scrollTop();
        $('body').css({
            'position': 'fixed',
            'width': '100%',
            'top': -pointY
        });

        // オーバーレイの表示
        $('body').append('<div id="contact-overlay"></div>');
        $('#contact-overlay').fadeIn();

        // コンタクトフォームのセンタリング
        centeringModal();

        // コンタクトフォームの表示
        $('.contact-wrapper').fadeIn();
    });

    $('#contact-overlay, #cancel-btn').unbind().on('click', function() {
        $('.contact-wrapper, #contact-overlay').fadeOut('slow', function() {
            $('#contact-overlay').remove();
            releaseScrolling();
        });
    });

    // Favorite News
    $('#favorite-btn').on('click', function() {
        $('.news-contents-wrapper article').hide();
        $('.favorite-on').parents('article').show();
    });

    $('#reset-btn').on('click', function() {
        $('.news-contents-wrapper article').show();
    });

    $('.favorite').on('click', function() {
        $(this).toggleClass('favorite-on');
    });
});