from google.appengine.ext import ndb

class User(ndb.Model):
  food_name = ndb.StringProperty(required=True)
