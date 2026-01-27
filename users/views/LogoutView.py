from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class LogoutView(APIView):
    def post(self, request):
        try:
            #Blacklist refresh token if provided
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            #Flush Django session
            request.session.flush()

            #Clear cookies (example: JWT stored in cookies)
            response = Response(
                {"message": "Logged out successfully"},
                status=status.HTTP_205_RESET_CONTENT
            )
            response.delete_cookie("access")   # if you stored access token in cookie
            response.delete_cookie("refresh")  # if you stored refresh token in cookie
            response.delete_cookie("sessionid")  # Django default session cookie

            return response

        except Exception as e:
            return Response(
                {"error": "Invalid token", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )