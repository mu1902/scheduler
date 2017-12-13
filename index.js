const Agenda = require('agenda')

var mongo = 'mongodb://127.0.0.1:27017/agenda';
var agenda = new Agenda({ db: { address: mongo } });

agenda.define('test', function (job, done) {
    
});

agenda.on('ready', function () {
    agenda.every('1 minutes', 'delete old users');

    // Alternatively, you could also do:
    agenda.every('*/3 * * * *', 'delete old users');

    agenda.start();
});