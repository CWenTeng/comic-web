from django.db import models

# Create your models here.
from django.db import models
import datetime

# 任务表
class CrawlTask(models.Model):
    task_url = models.CharField(max_length=255)
    task_status = models.IntegerField(default=0)
    create_time = models.DateTimeField(default=datetime.datetime.now)
    last_crawl_time = models.DateTimeField(blank=True, null=True)
    next_crawl_time = models.DateTimeField(blank=True, null=True)
    crawl_cyclicity = models.IntegerField(blank=True, null=True, default=1440)
    crawl_flag = models.CharField(max_length=255, blank=True, null=True)
    site_name = models.CharField(max_length=255)
    crawl_num = models.IntegerField(blank=True, null=True, default=0)

    class Meta:
        # managed = False
        db_table = 'crawl_task'
        

# 漫画列表
class Comic(models.Model):
    task_id = models.IntegerField()
    comic_name = models.CharField(max_length=255)
    chapter_num = models.IntegerField(default=0)
    update_time = models.DateTimeField(auto_now=True)
    class Meta:
        managed = False

# 章节图片表
class Chapter(models.Model):
    comic_id = models.IntegerField()
    chapter_name = models.CharField(max_length=255)
    create_time = models.DateTimeField(default=datetime.datetime.now)
    num_chapter = models.IntegerField()
    img_num = models.IntegerField()
    class Meta:
        managed = False

class Img(models.Model):
    chapter = models.ForeignKey(Chapter,on_delete=models.CASCADE,primary_key=True)
    img_path = models.JSONField()
    class Meta:
        managed = False