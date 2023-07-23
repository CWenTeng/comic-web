from django.urls import path
from . import views

urlpatterns = [
    path('add_task',views.add_task,name='add_task'),
    path('imglists',views.imglists,name='imglists'),
    path('imgpage',views.imgpage,name='imgpage'),
    path('',views.index,name='index'),
]