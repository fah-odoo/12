from odoo import http

class BusTest(http.Controller):

    @http.route('/bus_test/test', type='http', auth='none')
    def test(self):
        http.request.env['bus.bus'].sendone('bus_test', {'message':'This is test',
                                                         'title': 'Test'})
        return 'ok'
