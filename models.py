from google.appengine.ext import ndb

class Pin(ndb.Model):
    latitude = ndb.FloatProperty(required = True)
    longitude = ndb.FloatProperty(required = True)
    user_id = ndb.StringProperty()

    @classmethod
    def get_by_user(cls, user):
        return cls.query().filter(cls.user_id == user.user_id()).get()
