from django.db import models
from django.contrib.auth.models import User

class SecretSanta(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pub_date = models.DateTimeField("date published")

    @classmethod
    def create(cls, user, pub_date):
        return cls(user=user, pub_date=pub_date)
    
class Pairings(models.Model):
    player = models.CharField(max_length=100)
    pairing = models.CharField(max_length=100)
    secretSanta = models.ForeignKey(SecretSanta, on_delete=models.CASCADE)

    @classmethod
    def create(cls, player, pairing, secretSanta):
        return cls(player=player, pairing=pairing, secretSanta=secretSanta)