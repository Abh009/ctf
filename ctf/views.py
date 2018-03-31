from django.shortcuts import render, HttpResponse, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt,login_required
from ctf.models import Problems
from django.contrib.auth import logout
# Create your views here.

@csrf_exempt
def problems(request):
    if request.is_ajax():
        if request.method == 'POST':
            p_id = request.POST.get('p_id')
            try:
               text = Problems.objects.get(id = p_id).text
               return HttpResponse(text)
            except:
               return HttpResponse('Invalid Problem ID')    
        # if method is get ie: if the request is for just problem titles
        data = list(Problems.objects.all())
        output = ''
        for object in data:
            output = output + str(object.id) + ". " + object.title + "\n"
        
        output = "Your Pending Questions: \n" + output
        return HttpResponse(output)
    return HttpResponse("it worked")

def terminal(request):
    return render(request,'terminal.html',{})

def logout_user(request):
    logout(request)
    return redirect("/")

def home(request):
    return render(request,'index.html',{})

@csrf_exempt
@login_required
def submit(request):
    if request.is_ajax():
       if request.method == 'POST':
           problem_id = str(request.POST.get('p_id'))
           answer = str(request.POST.get('answer'))

           status = 0
           try:
               actual_ans = Problems.objects.get(id = problem_id).answer
               if actual_ans == answer:
                    status = 1
           except:
                return HttpResponse('Invalid Problem ID')    
           return HttpResponse(str(status))
       else:
           return HttpResponse('404 Not Found')
    else:
        return HttpResponse('404 not found')


def login(request):
    logout(request)
    return redirect("/auth/login/google-oauth2/")