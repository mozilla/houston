define('views/shelf_listing',
    ['core/l10n', 'core/notification', 'core/requests', 'core/urls',
     'core/utils', 'core/z', 'jquery'],
	function(l10n, notification, requests, urls,
             utils, z, $) {
    var gettext = l10n.gettext;

    z.body.on('click', '.inactive-shelves .activate', utils._pd(function(e) {
        // Confirm that the user wants to publish.
        if (!window.confirm(gettext('Do you really want to activate this? It will deactivate any existing active shelves'))) {
            return;
        }
        // Publish the shelf.
        requests.put(urls.api.url('feed-shelf-publish', [$(this).closest('li').data('slug')])).done(function(data) {
            notification.notification({message: gettext('Successfully activated shelf.')});
            z.page.trigger('navigate', [window.location.pathname]);
        }).fail(function() {
            notification.notification({message: gettext('Sorry, there was an error activating this shelf')});
        });
    }))

    .on('click', '.active-shelf .deactivate', utils._pd(function(e) {
        // Confirm that the user wants to deactivate.
        if (!window.confirm(gettext('Do you really want to deactivate this?'))) {
            return;
        }
        // Publish the shelf.
        requests.del(urls.api.url('feed-shelf-publish', [$(this).closest('li').data('slug')])).done(function(data) {
            notification.notification({message: gettext('Successfully deactivated')});
            z.page.trigger('navigate', [window.location.pathname]);
        }).fail(function() {
            notification.notification({message: gettext('Sorry, there was an error deactivating this shelf')});
        });
    }));

    return function(builder) {
        builder.z('type', 'shelf_listing');
        builder.z('title', gettext('Operator Shelves'));
        builder.start('shelf_listing.html');
    };
});
