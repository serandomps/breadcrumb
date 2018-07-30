var dust = require('dust')();
var serand = require('serand');

var user;

var context;

dust.loadSource(dust.compile(require('./template'), 'breadcrumb-ui'));

module.exports = function (sandbox, options, done) {
    var destroy = function () {
        $('.breadcrumb', sandbox).remove();
    };
    context = {
        sandbox: sandbox,
        options: options,
        destroy: destroy
    };
    done(null, destroy);
};

serand.on('breadcrumb', 'render', function (links) {
    dust.render('breadcrumb-ui', links, function (err, out) {
        if (err) {
            return console.error(err);
        }
        context.destroy();
        $(out).appendTo(context.sandbox);
    });
});

setTimeout(function () {
    serand.emit('breadcrumb', 'render', [
        {title: 'Home', url: '/'},
        {title: 'Accounts', url: '/accounts'}
    ]);
}, 0);
