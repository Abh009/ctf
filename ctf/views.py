from django.shortcuts import render, HttpResponse, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from ctf.models import Problems,DoneQuestions
from django.contrib.auth import logout
import operator,json
# Create your views here.

@csrf_exempt
def problems(request):
    if request.is_ajax():
        user = request.user
        if not request.user.is_authenticated:
            return HttpResponse("Login required")
        if DoneQuestions.objects.filter(user_id = user.id).exists():
            done_q = DoneQuestions.objects.get(user_id = user.id).done_quest.filter()
            done_q_id = [ x.id for x in list(done_q)]
        else:
            done_q_id = []
        if request.method == 'POST':
            p_id = str(request.POST.get('p_id'))
            try:
               if p_id in done_q_id:
                   return HttpResponse('Already Answered')    
               text = Problems.objects.get(id = p_id).text
               url =  Problems.objects.get(id = p_id).url
               if url == '' or url == None:
                   url = ''
               return JsonResponse({'text':text,'url':url})
            except:
               return HttpResponse('Invalid Problem ID')    
        
        # if method is get ie: if the request is for just problem titles
        data = list(Problems.objects.exclude(pk__in = done_q_id))
        output = ''
        for object in data:
            output = output + str(object.id) + ". " + object.title + "\n"
        if output == '':
            return HttpResponse('')
        
        return HttpResponse("Your Pending Questions: \n" + output)
    return HttpResponse("Bad Gateway")

def terminal(request):
    return render(request,'terminal.html',{})

def logout_user(request):
    logout(request)
    return redirect("/")

def home(request):
    return render(request,'index.html',{})

@csrf_exempt
def submit(request):
    if not request.user.is_authenticated:
            return HttpResponse("Login required")
    if request.is_ajax():
       if request.method == 'POST':
           user = request.user
           
        #    print(username)
           problem_id = str(request.POST.get('p_id'))
           answer = str(request.POST.get('answer'))


           status = 0
           try:
               problem = Problems.objects.get(id = problem_id)
           except:
                return HttpResponse('Invalid Problem ID')    
            
           
           # if already subitted print so
           if DoneQuestions.objects.filter(user_id = user.id).exists():
                d = DoneQuestions.objects.get(user_id_id = user.id)
                done_qs = list(d.done_quest.filter())
           else:
                done_qs = []

           if problem in done_qs:
               return HttpResponse('Already answered')    
            
           if problem.answer.lower() == answer:
                    status = 1
                    # add as done
                    if DoneQuestions.objects.filter(user_id = user).exists():
                        done_q = DoneQuestions.objects.get(user_id = user)
                    else:
                        done_q = DoneQuestions.objects.create(user_id = user)
                    done_q.done_quest.add(problem)

           
           return HttpResponse(str(status))
       else:
           return HttpResponse('404 Not Found')
    else:
        return HttpResponse('404 not found')


def login(request):
    logout(request)
    return redirect("/auth/login/google-oauth2/")


def leaderboard(request):
    if request.is_ajax():
        if not request.user.is_authenticated:
            return HttpResponse("Login required")
        done_qs = list(DoneQuestions.objects.all().order_by('done_quest__count'))
        # u = { object.user_id.username:len(object.done_quest.filter()) for object in done_qs}

        # sorted_u = sorted(u.items(), key=operator.itemgetter(1))
        return JsonResponse(done_qs)
    else:
        return HttpResponse("Bad Gateway")