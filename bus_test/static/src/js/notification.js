odoo.define("bus_test.notification", function (require) {
    "use strict"
  
    var WebClient = require('web.WebClient')
    var session = require('web.session')
    var channel = 'bus_test'

    WebClient.include({
        start: function() {
            this._super()
            this.call('bus_service', 'addChannel', channel);
            this.call('bus_service', 'onNotification', this, this.on_agent_test_notification)
            console.log('Listening on ', channel)
        },

        on_agent_test_notification: function (notification) {
          for (var i = 0; i < notification.length; i++) {
             var ch = notification[i][0]
             var msg = notification[i][1]
             if (ch == channel) {
                 try {
                  this.handle_agent_test_message(msg)
                }
                catch(err) {console.log(err)}
             }
           }
        },

        handle_agent_test_message: function(msg) {
          console.log(msg)
          if (typeof msg == 'string')
            var message = JSON.parse(msg)
          else
            var message = msg
          if (message.warning == true)
            this.do_warn(message.title, message.message, message.sticky)
          else
            this.do_notify(message.title, message.message, message.sticky)
      },
  })
})
