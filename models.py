from google.appengine.ext import ndb

class Pin(ndb.Model):
    latitude = ndb.FloatProperty(required = True)
    longitude = ndb.FloatProperty(required = True)
    user_id = ndb.StringProperty()
