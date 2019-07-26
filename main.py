import webapp2
import os
import jinja2
import json
import logging
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
        self.response.write(template.render(dict_for_template))

class PinHandler(webapp2.RequestHandler):
    def post(self):
        lat_lng = json.loads(self.request.body)
        pin_lat = round(lat_lng["lat"], 4)
        pin_long = round(lat_lng["lng"], 4)
        pin_record = Pin(latitude = pin_lat, longitude = pin_long)
        pin_record.user_id = users.get_current_user().user_id()
        pin_record.put()

class PinDeleteHandler(webapp2.RequestHandler):
    def post(self):
        lat_lng = json.loads(self.request.body)
        current_user = users.get_current_user()
        pin_lat = round(lat_lng["lat"], 4)
        pin_long = round(lat_lng["lng"], 4)
        deleted_pin = Pin.query().filter(Pin.user_id == current_user.user_id()).filter(Pin.latitude == pin_lat).filter(Pin.longitude == pin_long).get()
        if deleted_pin is not None:
            deleted_pin.key.delete()

class AboutPage(webapp2.RequestHandler):
     def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/aboutus.html')
        self.response.write(template.render())

class EntryPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/entries.html')
        self.response.write(template.render())

class MemoryPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/memories.html')
        self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/map', MapPage),
    ('/aboutus', AboutPage),
    ('/entries', EntryPage),
    ('/pin', PinHandler),
    ('/deletepin', PinDeleteHandler),
    ('/memories', MemoryPage),
], debug=True)
