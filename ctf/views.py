from django.shortcuts import render, HttpResponse
from ctf.models import Problems

# Create your views here.


def problems(request):
    if request.is_ajax():
        data = list(Problems.objects.all())
        output = ''
        i = 1
        for object in data:
            output = output + str(i) + ". " + object.text + "\n"
            i += 1
        
        output = "Your Pending Questions: \n" + output
        return HttpResponse(output)
    return HttpResponse("it worked")

def home(request):
    return render(request,'index.html',{})