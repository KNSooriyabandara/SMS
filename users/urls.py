from django.urls import path
from .views import (
    ListStudents, RetrieveStudent, RegisterStudent,
    CreateNote, ListNotes,
    LogoutView, EditStudent, DeleteStudent,
    EditNote, DeleteNote
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Student endpoints
    path('api/v1/student/all', ListStudents.as_view(), name='all_students'),
    path('api/v1/student/<int:pk>', RetrieveStudent.as_view(), name='retrieve_student'),
    path('api/v1/student/create', RegisterStudent.as_view(), name='register_student'),
    path('api/v1/student/<int:pk>/edit', EditStudent.as_view(), name='edit_student'),
    path('api/v1/student/<int:pk>/delete', DeleteStudent.as_view(), name='delete_student'),

    # Notes endpoints
    path('api/v1/note/create', CreateNote.as_view(), name='create_note'),
    path('api/v1/note/all', ListNotes.as_view(), name='list_notes'),
    path('api/v1/note/<int:pk>/edit', EditNote.as_view(), name='edit_note'),
    path('api/v1/note/<int:pk>/delete', DeleteNote.as_view(), name='delete_note'),

    # JWT authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Logout endpoint
    path('api/logout/', LogoutView.as_view(), name='logout'),
]