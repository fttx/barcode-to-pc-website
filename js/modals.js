$(function () {

    var adsTimeout = null;
    var COOKIE_VIEWS_COUNT_BEFORE_ACQUSITION = 'viewsCountBeforeAcquisition';
    var COOKIE_USER_ACQUIRED = 'userAcquired';
    var COOKIE_DID_CLICK_DOWNLOAD = 'didClickDownload';
    var country = null;
    var ip = null;

    if (!getCookie(COOKIE_USER_ACQUIRED)) {
        if (getCookie(COOKIE_DID_CLICK_DOWNLOAD)) { // if the user already saw the popup but didn't subscribe
            showAdsDialog(5);
        } else { // if it is the first time that the user visits the website
            showAdsDialog(90);
        }
    }

    $('#download-server a, #download-app a').click(function () {
        setCookie(COOKIE_DID_CLICK_DOWNLOAD, true)
        if (!getCookie(COOKIE_USER_ACQUIRED)) {
            showAdsDialog(5);
        }
    });

    $('#ads-form').submit(function (e) {
        var name = $('#ads-name').val().split(' ');
        var firstName = name[0];
        var lastName = name.splice(1, name.length - 1).join(' ');
        var email = $('#ads-email').val()
        var viewsCountBeforeAcquisition = parseInt(getCookie(COOKIE_VIEWS_COUNT_BEFORE_ACQUSITION) || 0);

        $.post(CONFIG_MARKETING_SERVER_URL + '/addUser', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            ip: ip,
            country: country,
            utcOffset: new Date().getTimezoneOffset(),
            campaignId: 1,
            viewsCountBeforeAcquisition: viewsCountBeforeAcquisition,
        }, function (data) {
            if (data == 'OK') {
                setCookie(COOKIE_USER_ACQUIRED, true)
                $('#ads-modal').modal('hide');

                gtag('event', 'ads_modal', {
                    'event_category': 'marketing',
                    'event_label': 'user_acquired',
                });
            } else {
                alert('An error occurred, please try later')
            }
        }).fail(function () {
            alert('An error occurred, please try later')
        });
        return false;
    });

    function showAdsDialog(afterSeconds) {
        $.get("https://ipinfo.io", function (response) {
            country = response.country;
            ip = response.ip;
        }, "jsonp");

        // $.get("https://api.ipdata.co", function (response) {
        //     country = response.country_code;
        //     ip = response.ip;
        // }, "jsonp");


        if (adsTimeout) clearTimeout(adsTimeout);
        adsTimeout = setTimeout(function () {
            $('#ads-modal').modal('show');
            var viewsCountBeforeAcquisition = parseInt(getCookie(COOKIE_VIEWS_COUNT_BEFORE_ACQUSITION) || 0);
            setCookie(COOKIE_VIEWS_COUNT_BEFORE_ACQUSITION, viewsCountBeforeAcquisition + 1)
            gtag('event', 'ads_modal', {
                'event_category': 'marketing',
                'event_label': 'show_modal',
            });
        }, 1000 * afterSeconds)
    }
})