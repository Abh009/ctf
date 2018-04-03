from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User



# Create your models here.


class Problems(models.Model):
    title = models.CharField(max_length=1000, blank=False, null=False)
    text = models.CharField(max_length=1000, blank=False, null=False)
    url = models.CharField(max_length=1000, blank=True, null=True)
    answer = models.CharField(max_length=100, blank=False, null=False)
    is_star = models.BooleanField(blank=False, null=False)

    def __str__(self):
        return self.title

class DoneQuestions(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE,primary_key=True)
    done_quest = models.ManyToManyField(Problems)

    def __str__(self):
        return str(self.user_id.username)

class BannedUser(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    is_banned = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user.username)

class AttemptLog(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,primary_key=True)
    attempt_quest = models.OneToOneField(Problems,on_delete=models.CASCADE)
    attempt_text = models.CharField(max_length=1000,null=False,blank=False)
    time = models.DateTimeField(auto_now=False,auto_now_add=False)

    def __str__(self):
        return str(self.user.username) + str(self.attempt_quest.title)