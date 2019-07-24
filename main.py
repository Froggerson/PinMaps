import webapp2
import os
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class MainPage(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('maps.html')
        self.response.write(template.render())

class MapPage(webapp2.RequestHandler):
    

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/map', MapPage),
], debug=True)
