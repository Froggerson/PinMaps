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
        user_pins = Pin.get_by_user(current_user)

        self.response.write(template.render())

class PinHandler(webapp2.RequestHandler):
    def post(self):
        lat_lng = json.loads(self.request.body)
        print("************ here is latlng")
        print(lat_lng)
        pin_lat = lat_lng["lat"]
        pin_long = lat_lng["lng"]
        pin_record = Pin(latitude = pin_lat, longitude = pin_long)
        pin_record.user_id = users.get_current_user().user_id()
        pin_record.put()

        self.response.write("")

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
