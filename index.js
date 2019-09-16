var dust = require('dust')();
var serand = require('serand');
var utils = require('utils');

var user;

var context;

dust.loadSource(dust.compile(require('./template'), 'breadcrumb-ui'));

module.exports = function (ctx, container, options, done) {
    var destroy = function () {
        $('.breadcrumb', container.sandbox).remove();
    };
    context = {
        ctx: ctx,
        container: container,
        options: options,
        destroy: destroy
    };
    done(null, destroy);
};

utils.on('breadcrumb', 'render', function (links) {
    dust.render('breadcrumb-ui', serand.pack(links, context && context.container), function (err, out) {
        if (err) {
            return console.error(err);
        }
        if (!context) {
            return;
        }
        $(out).appendTo(context.container.sandbox);
    });
});

setTimeout(function () {
    utils.emit('breadcrumb', 'render', [
        {title: 'Home', url: '/'},
        {title: 'Accounts', url: '/accounts'}
    ]);
}, 0);
