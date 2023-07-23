import os
import re
import traceback

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import json
# Create your views here.
from showImg import utils
from showImg.models import CrawlTask

PATH = '/home/pi/smb/share1/comic'

def index(request):
    context = {}
    resHtml = render(request,'showImg/index.html',context=context)
    return resHtml

def imgpage(request):
    path = PATH
    filePath = request.GET.get('filePath')
    print(path)
    print("++"*200)
    imgpaths = utils.img_list(filePath=filePath,path=path)
    context = {
        'imgpaths':imgpaths,
    }
    resHtml = render(request,'showImg/imgpage.html',context=context)
    return resHtml

def imglists(request):
    path = PATH
    # pageType = request.GET.get('pageType')
    filePath = request.GET.get('filePath')
    print("=="*200)
    print(request.GET)
    print(filePath)
    if filePath:
        print(filePath)
        path = PATH+'/'+filePath
        print(path)
        print("=**="*200)
    fileName = utils.dir_list(path=path)
    filePath = os.path.relpath(path,PATH)
    context = {
        'fileName':fileName,
        'filePath':filePath,
    }
    fileName = json.dumps(fileName)
    return JsonResponse(context)

def add_task(request):
    context = {
        'res' : 0,
    }
    try:
        task_url = request.POST.get('task_url')
        site_name = request.POST.get('site_name')
        start_sign = request.POST.get('start_sign')
        select = request.POST.get('select')
        print(task_url)
        print(site_name)
        print(select)
        if select:
            select = re.split('&',select)
        if site_name == 'None' or task_url == None or 'http' not in task_url:
            context['res'] = 2
            return JsonResponse(context)
        try:
            CrawlTask.objects.get(task_url = task_url)
        except:
            task = CrawlTask()
            task.task_url = task_url
            task.site_name = site_name
            task.crawl_flag = start_sign
            if select:
                # select = re.split('&',str(select))
                print(select)
                for s in select:
                    print(s)
                    if s == 'select=1':
                        task.task_status = 1
            task.save()
            context['res'] = 1
        else:
            context['res'] = 3

    except:
        print(traceback.format_exc())
        context['res'] = 0
    return JsonResponse(context)
