// localstorage使用の宣言
let storage = localStorage;

// localstorageがブラウザで使えるか判定する関数
const lsCheck = () => {
    try {
        if (typeof localStorage == 'undefined') {
            return false;
        } else if (window.localStorage) {
            // detect IE10 and private mode
        }
    } catch (e) {
        return false;
    }
    return true;
}

// localstorageにデータを保存させる関数
const saveStorage = () => {
    let id = $(this).parents('article').attr('id');
    console.log(id);
    storage.setItem('newsId', id);
}

jQuery(function($) {

    // localstorage使用できるか判定
    lsCheck();

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

    // Favorite News
    $('#favorite-btn').on('click', function() {
        $('.news-contents-wrapper article').hide();
        $('.favorite-on').parents('article').show();
    });

    $('.favorite').on('click', function() {
        $(this).toggleClass('favorite-on');
        if ($(this).hasClass('favorite-on')) {
            saveStorage();
        } else {
            storage.removeItem('newsId');
        }
    });
});