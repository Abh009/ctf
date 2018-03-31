from django.shortcuts import render, HttpResponse, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from ctf.models import Problems

# Create your views here.


def problems(request):
    if request.is_ajax():
        data = list(Problems.objects.all())
        output = ''
        for object in data:
            output = output + str(object.id) + ". " + object.text + "\n"
        
        output = "Your Pending Questions: \n" + output
        return HttpResponse(output)
    return HttpResponse("it worked")

def terminal(request):
    return render(request,'terminal.html',{})
def home(request):
    return render(request,'index.html',{})

@csrf_exempt
def submit(request):
    if request.is_ajax():
       if request.method == 'POST':
           problem_id = str(request.POST.get('p_id'))
           answer = str(request.POST.get('answer'))
           print(answer)

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