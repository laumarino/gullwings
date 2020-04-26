from django.db import models
import random

# Create your models here.

class Symptom(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def likely_diagnosis(self):
        """Returns the most likely diagnosis."""
        f = 0
        likely = []
        for diag in self.diagnosis_set.all():
            if diag.frequency > f:
                likely = [diag]
                f = diag.frequency
            if diag.frequency == f:
                likely.append(diag)
        return random.choice(likely)

class Diagnosis(models.Model):
    name = models.CharField(max_length=100)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    frequency = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "diagnoses"
