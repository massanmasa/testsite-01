// localstorage使用の宣言
let storage = localStorage;

// localStorage用配列
let arrayId = [];

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
    let id = $('.favorite-on').parents('article').attr('id');
    arrayId.push(id);
    let data = JSON.stringify(arrayId);
    storage.setItem('newsId', data);
    console.log(storage);
}

// localstorageのデータ取得、並びに処理
const loadStorage = () => {
    if (storage.length === 0) {
        return;
    }
    // arrayId.push(storage);
    let setId  = JSON.parse(storage.getItem('newsId'));
    for (let i = 0; i < setId[i]; i++) {
        // if($('article').attr('id') === setId[i]) {
            $('#' + setId[i]).find('i').addClass('favorite-on');
            console.log('#' + setId[i]);
        // }
    }
}

jQuery(function($) {

    // localstorage使用できるか判定
    lsCheck();

    // localstorageの中身をページに反映させる
    loadStorage();

    console.log(storage);
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

    $('#reset-btn').on('click', function() {
        $('.news-contents-wrapper article').show();
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