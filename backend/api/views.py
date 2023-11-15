from django.http import HttpResponse
from django.shortcuts import render
from .models import SecretSanta, Pairings
from django.contrib.auth import authenticate
import json

def create_secretsanta(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    required_elts = ["pairings", "pub_date"]
    for elt in required_elts:
        if elt not in body:
            return HttpResponse(json.dumps({"message": f'Invalid Request: missing {elt}'}), status=400)
        if elt == "pairings":
            for item in body["pairings"]:
                if "player" not in item or "pairing" not in item:
                    return HttpResponse(json.dumps({"message": 'Invalid Request: missing player or pairing elts'}), status=400)
        
    user = authenticate(username="jehan", password="1234")
    secretSanta = SecretSanta.create(user, body["pub_date"])
    secretSanta.save()

    for item in body["pairings"]:
         pairing = Pairings.create(item["player"], item["pairing"], secretSanta)
         pairing.save()
    return HttpResponse(json.dumps({"id": secretSanta.id}))

def get_last_secret_santa(request):
    #get user id with token authentification
    user_id = 2
    santas = SecretSanta.objects.filter(user_id=user_id)
    result = {}
    for santa in santas:
         result[santa.id] = {"pairings": []}
         pairings = Pairings.objects.filter(secretSanta=santa)
         for pairing in pairings:
            result[santa.id]["pairings"].append({"player": pairing.player, "pairing": pairing.pairing})
    return HttpResponse(json.dumps(result))
    