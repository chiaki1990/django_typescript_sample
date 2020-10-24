from django.shortcuts import render

# Create your views here.

def index(request):
    context = {}
    context["key"] = "value"
    return render(request, "myapp/index.html", context)
