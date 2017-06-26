'use strict';

// generate the share link
function generateURL(url, opt) {
    return url.replace(/<%-sURL%>/g, opt.sURL).replace(/<%-sTitle%>/g, opt.sTitle).replace(/<%-sDesc%>/g, opt.sDesc).replace(/<%-sPic%>/g, opt.sPic);
}

// switch which site to share
function switchToShare(className, opt) {
    var combindedURL = void 0;
    switch (className) {
        case 'to-weibo':
            combindedURL = generateURL('http://service.weibo.com/share/share.php?url=<%-sURL%>&title=<%-sTitle%>&pic=<%-sPic%>', opt);
            break;
        case 'to-wechat':
            combindedURL = generateURL('', opt);
            break;
        case 'to-qq':
            combindedURL = generateURL('', opt);
            break;
        case 'to-twitter':
            combindedURL = generateURL('', opt);
            break;
        default:
            break;
    }
    window.open(combindedURL);
}

var initShareBox = function initShareBox() {
    // show share
    function showShare(eve) {
        var shareBox = this.getElementsByClassName('share-box')[0];
        shareBox.classList.add('share-box-show');
        initShare(shareBox);
    }

    // hide share
    function hideShare() {
        var shareBox = this.getElementsByClassName('share-box')[0];
        shareBox.classList.remove('share-box-show');
    }

    // click event    
    var shareButtons = document.getElementsByClassName('post-share');
    var i = shareButtons.length;
    while (i--) {
        // document.body.addEventListener('mouse', hideShare);
        shareButtons[i].addEventListener('mouseover', showShare);
        shareButtons[i].addEventListener('mouseout', hideShare);
    }
};

function initShare(shareBox) {
    var shareBtns = shareBox.querySelectorAll('li');
    console.log(shareBox);
    var opt = {
        sURL: shareBox.dataset.href,
        sTitle: shareBox.dataset.title,
        sDesc: shareBox.dataset.title,
        sPic: ''
    };
    shareBtns.forEach(function (ele) {
        ele.addEventListener('click', function (eve) {
            console.log(opt.sURL);
            console.log(opt.sTitle);
            console.log(opt.sDesc);
            switchToShare(this.className, opt);
        });
    }, this);
}

module.exports = initShareBox;