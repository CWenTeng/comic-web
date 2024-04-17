import os
import re
from functools import cmp_to_key

COMIC_PATH = '/home/pi/smb/share1/comic'
def compare(x, y):
    global COMIC_PATH
    # print(COMIC_PATH)
    stat_x = os.stat(COMIC_PATH + "/" + x)
    stat_y = os.stat(COMIC_PATH + "/" + y)
    if stat_x.st_ctime < stat_y.st_ctime:
        return -1
    elif stat_x.st_ctime > stat_y.st_ctime:
        return 1
    else:
        return 0

# COMIC_PATH = "/tmp"
# dirList = os.listdir(COMIC_PATH)
# dirList.sort(key=cmp_to_key(compare))
# print(dirList)

def dir_list(path,sort=True,sort_type="file_name"):
    fileName = []
    dirList = os.listdir(path)
    if sort:
        if sort_type == 'create_time':
            dirList.sort(key=cmp_to_key(compare))
        else:
            dirList.sort()
    for i in dirList:
        # filepath = path+'/'+i+'/'
        if i:
            # file_path = os.path.relpath(os.path.join(path,i),COMIC_PATH)
            # fileName.append(file_path)
            fileName.append(i)
    return fileName

def img_list(filePath,path):
    imgMaps = {}
    imgpaths = []
    # 最大页数
    maxNum = 0
    j = 0
    for i in os.listdir(path+'/'+filePath):
        try:
            r = re.match(r'\d+',i)
            num = int(r.group())
            imgMaps[num]=i
            if num > maxNum:
                maxNum = num
        except:
            pass
    while True:
        if not j in imgMaps:
            if j>maxNum:
                break
            j += 1
            continue
        try:
            imgpaths.append(filePath +'/' + imgMaps[j])
            j += 1
        except:
            j += 1
    return imgpaths

def file_rename(path):
    for i in os.listdir(path):
        imgpath = path+'/'+i+'/'
        print(imgpath)
        for j in os.listdir(imgpath):
            if '1.jpg' in j:
                try:
                    # command = 'copy '+imgpath+j+' '+imgpath+'HomeImg.jpg'
                    f = open(imgpath+j,'rb')
                    c = open(imgpath+'HomeImg.jpg','wb')
                    c.write(f.read())
                    f.close()
                    c.close()
                    # os.popen(command)
                    print('copy success  '+imgpath+j)
                except:
                    print('copy faill  '+imgpath+j)
                break
# file_rename('''//192.168.1.108/share1/txt''')

# a=img_list('(C84)--Chimee-House-(Takapi)--Chiru-Roshutsu-5--Chinese---UAl汉化组----','''//192.168.1.108/share1/txt''')
# a=dir_list('''//192.168.1.108/share1/txt''')
# for i in a:
#     print(i)
