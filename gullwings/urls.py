"""gullwings URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from symptom_checker import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/symptom_checker/', views.symptoms_list),
    path('api/symptom_checker/symptoms/<int:symptom_id>', views.diagnosis_list),
    path('api/symptom_checker/symptoms/<int:symptom_id>/diagnose', views.diagnose),
    path('api/symptom_checker/diagnoses/<int:diagnosis_id>', views.update_frequency),
]
