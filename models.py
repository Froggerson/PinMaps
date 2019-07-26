from google.appengine.ext import ndb

class Pin(ndb.Model):
    latitude = ndb.FloatProperty(required = True)
    longitude = ndb.FloatProperty(required = True)
    user_id = ndb.StringProperty()

class Entry(ndb.Model):
     user_location = ndb.StringProperty(required = True)
     entry_date = ndb.StringProperty(required = True)
     entry_details = ndb.StringProperty(required = True)
     entry_links = ndb.StringProperty(required = True)
     user_id = ndb.StringProperty()
