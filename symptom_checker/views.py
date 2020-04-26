from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
def symptoms_list(request):
    if request.method == 'GET':
        data = Symptom.objects.all()

        serializer = SymptomSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)


@api_view(['GET'])
def diagnosis_list(request, symptom_id):
    try:
        symptom = Symptom.objects.get(id=symptom_id)
    except Symptom.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = Diagnosis.objects.filter(symptom=symptom)

        serializer = DiagnosisSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET'])
def diagnose(request, symptom_id):
    try:
        symptom = Symptom.objects.get(id=symptom_id)
    except Symptom.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = symptom.likely_diagnosis()

        serializer = DiagnosisSerializer(data, context={'request': request}, many=False)

        return Response(serializer.data)

# @api_view(['GET'])
# def get_diagnosis(request, diagnosis_id):
#     try:
#         diagnosis = Diagnosis.objects.get(id=diagnosis_id)
#     except Diagnosis.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         data = diagnosis
#
#         serializer = DiagnosisSerializer(data, context={'request': request}, many=False)
#
#         return Response(serializer.data)

@api_view(['GET', 'PUT'])
def update_frequency(request, diagnosis_id):
    try:
        diagnosis = Diagnosis.objects.get(id=diagnosis_id)
    except Diagnosis.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = diagnosis

        serializer = DiagnosisSerializer(data, context={'request': request}, many=False)

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = DiagnosisSerializer(diagnosis, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)