from django.shortcuts import render, HttpResponse

# Create your views here.


def problems(request):
    if request.is_ajax():
        return HttpResponse("finally")
    return HttpResponse("it worked")

def home(request):
    return render(request,'index.html',{})