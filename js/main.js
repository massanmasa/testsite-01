let pointY;

// localstorage使用の宣言
// let storage = localStorage;

// localStorage用配列
// let arrayId = [];

// localstorageがブラウザで使えるか判定する関数
// const lsCheck = () => {
//     try {
//         if (typeof localStorage == 'undefined') {
//             return false;
//         } else if (window.localStorage) {
//             // detect IE10 and private mode
//         }
//     } catch (e) {
//         return false;
//     }
//     return true;
// }

// localstorageにデータを保存させる関数
// const saveStorage = () => {
//     let id = $('.favorite-on').parents('article').attr('id');
//     arrayId.push(id);
//     let data = JSON.stringify(arrayId);
//     storage.setItem('newsId', data);
//     console.log(storage);
// }

// localstorageのデータ取得、並びに処理
// const loadStorage = () => {
//     if (storage.length === 0) {
//         return;
//     }
//     // arrayId.push(storage);
//     let setId  = JSON.parse(storage.getItem('newsId'));
//     for (let i = 0; i < setId[i]; i++) {
//         // if($('article').attr('id') === setId[i]) {
//             $('#' + setId[i]).find('i').addClass('favorite-on');
//             console.log('#' + setId[i]);
//         // }
//     }
// }

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

    // localstorage使用できるか判定
    // lsCheck();

    // localstorageの中身をページに反映させる
    // loadStorage();

    // 200px以上スクロールされた場合、ページトップボタンを表示する
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
        // if ($(this).hasClass('favorite-on')) {
        //     saveStorage();
        // } else {
        //     storage.removeItem('newsId');
        // }
    });
});