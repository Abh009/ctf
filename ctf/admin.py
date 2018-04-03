from django.contrib import admin
from ctf.models import *

# Register your models here.

admin.site.register(Problems)
admin.site.register(DoneQuestions)
admin.site.register(UserLog)
admin.site.register(BannedUser)