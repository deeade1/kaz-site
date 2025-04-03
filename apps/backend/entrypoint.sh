#!/bin/bash
APP_PORT=${PORT:-8000}

if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for postgres..."

    timeout 30 bash -c 'until nc -z $PGHOST $PGPORT; do sleep 0.1; done' || {
        echo "PostgreSQL not available after 30 seconds. Exiting."
        exit 1
    }

    echo "PostgreSQL started"

    echo "Collect static files"
    python manage.py collectstatic --no-input
fi

exec gunicorn backend.wsgi:application --bind "0.0.0.0:${APP_PORT}" --workers 4 --timeout 120 --log-level debug --reload
