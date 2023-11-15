from django.test import TestCase
from django.contrib.auth.models import User
from .models import SecretSanta, Pairings
from django.test import Client
import json

class ViewTestCase(TestCase):
    player = "aurelie"
    pairing = "gilou"
    c = Client()
    user = None
    admin = None

    @classmethod
    def setUpClass(self):
        super(ViewTestCase, self).setUpClass()
        self.admin = User.objects.create_user('admin', 'admin@gmail.com', "1234")
        self.user = User.objects.create_user('jehan', 'jehan@gmail.com', "1234")

    def test_index_success(self):
        santa = SecretSanta.create(self.user, "2023-03-19T18:41:28+00:00")
        santa.save()
        pairings = Pairings.create(self.player, self.pairing, santa)
        pairings.save()
        
        response = self.c.get("/api/previous/")
        body_unicode = response.content.decode('utf-8')
        body = json.loads(body_unicode)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(body), 1)
        self.assertEqual(len(body["1"]["pairings"]), 1)
        self.assertEqual(body["1"]["pairings"][0]["player"], self.player)
        self.assertEqual(body["1"]["pairings"][0]["pairing"], self.pairing)
    
    def test_post_pairing_success(self):
        data = {"pairings": [{"player": "jean", "pairing": "thomas"}, {"player": "aurelie", "pairing": "solene"}], "pub_date": "2023-03-19T18:41:28+00:00"}
        response = self.c.post("/api/create/", json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        body_unicode = response.content.decode('utf-8')
        body = json.loads(body_unicode)
        self.assertEqual(body["id"], 2)

    def test_post_pairing_fails_because_missing_field(self):
        data = {"pairings": [{"player": "jean"}], "pub_date": "2023-03-19T18:41:28+00:00"}
        response = self.c.post("/api/create/", json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        body_unicode = response.content.decode('utf-8')
        body = json.loads(body_unicode)
        self.assertEqual(body["message"], "Invalid Request: missing player or pairing elts")