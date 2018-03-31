from django.shortcuts import render, HttpResponse, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from ctf.models import Problems,DoneQuestions
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
           user = request.user
           
        #    print(username)
           problem_id = str(request.POST.get('p_id'))
           answer = str(request.POST.get('answer'))

           # if already subitted print so
           
        #    submitted = DoneQuestions.objects.get(user_id = user.id)
        #    print(submitted)
           # else submit the answer and if right add as done


           status = 0
           try:
               problem = Problems.objects.get(id = problem_id)
           except:
                return HttpResponse('Invalid Problem ID')    
            
           if problem.answer == answer:
                    status = 1
           # add as done
           done_quest = DoneQuestions.objects.create(user_id = user.id,done_quest = problem)

           
           return HttpResponse(str(status))
       else:
           return HttpResponse('404 Not Found')
    else:
        return HttpResponse('404 not found')


def login(request):
    logout(request)
    return redirect("/auth/login/google-oauth2/")