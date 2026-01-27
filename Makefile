migrations:
	uv run python manage.py makemigrations

migrate:
	uv run python manage.py migrate

run:
	uv run python manage.py runserver

admin:
	uv run python manage.py createsuperuser
#%%
