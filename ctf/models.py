from django.db import models
from django.contrib import admin



# Create your models here.


class Problems(models.Model):
    title = models.CharField(max_length=1000, blank=False, null=False)
    text = models.CharField(max_length=1000, blank=False, null=False)
    answer = models.CharField(max_length=100, blank=False, null=False)
    is_star = models.BooleanField(blank=False, null=False)




