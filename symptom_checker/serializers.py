from rest_framework import serializers
from .models import *

class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Symptom
        fields = ('id', 'name')

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ('id', 'name', 'frequency', 'symptom')