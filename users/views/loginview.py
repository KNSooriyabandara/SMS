from django.views import View
from django.shortcuts import render


class LoginView(View):
  def get(self,request):
    return render(request, "login.html", context={})