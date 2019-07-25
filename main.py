import webapp2
import os
import jinja2
import json
from google.appengine.api import users
from models import Pin

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/main.html')
        self.response.write(template.render())

class MapPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/maps.html')
        current_user = users.get_current_user()
        user_pins = Pin.query().filter(Pin.user_id == current_user.user_id()).fetch()
        dict_for_template = {'user_pins': user_pins}
        # for each_pin in user_pins:
        #     pin_query_lat = each_pin["lat"]
        #     pin_query_lng = each_pin["lng"]
        #     L.marker([pin_query_lat, pin_query_lng], {icon:happyPin}).addTo(map);
        self.response.write(template.render(dict_for_template))

class PinHandler(webapp2.RequestHandler):
    def post(self):
        lat_lng = json.loads(self.request.body)
        print(lat_lng)
        pin_lat = lat_lng["lat"]
        pin_long = lat_lng["lng"]
        pin_record = Pin(latitude = pin_lat, longitude = pin_long)
        pin_record.user_id = users.get_current_user().user_id()
        pin_record.put()


class AboutPage(webapp2.RequestHandler):
     def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/aboutus.html')
        self.response.write(template.render())



app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/map', MapPage),
    ('/aboutus', AboutPage),
    ('/pin', PinHandler)
], debug=True)
