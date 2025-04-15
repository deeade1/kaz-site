# Use a specific base image tag for reproducibility
ARG PYTHON_VERSION=3.12.3-bookworm
FROM python:${PYTHON_VERSION} as base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    HOME=/home/apps \
    APP_HOME=/home/apps/backend \
    PIP_TIMEOUT=180 \
    PIP_RETRIES=10 \
    PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple

WORKDIR $APP_HOME

# ------------------------- #
# Builder Stage
# ------------------------- #
FROM base as builder

# Install system build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        cmake \
        gcc \
        g++ \
        make \
        python3-dev \
        libpq-dev \
        libgeos-dev \
        libproj-dev \
        libboost-all-dev \
        libopenblas-dev \
        liblapack-dev \
        libx11-dev \
        libgtk-3-dev && \
    rm -rf /var/lib/apt/lists/*

# Upgrade pip and set pip configs
RUN pip install --no-cache-dir --upgrade pip && \
    pip config set global.timeout ${PIP_TIMEOUT} && \
    pip config set global.retries ${PIP_RETRIES} && \
    pip config set global.index-url ${PIP_INDEX_URL}

# Copy and install base dependencies without face-recognition
COPY apps/backend/requirements.txt .
RUN grep -v "face-recognition" requirements.txt > requirements-clean.txt && \
    pip install --no-cache-dir -r requirements-clean.txt

# Install dlib manually from source
RUN git clone -b v19.24 --depth 1 https://github.com/davisking/dlib.git /tmp/dlib && \
    cd /tmp/dlib && \
    python3 setup.py install && \
    rm -rf /tmp/dlib

# Now install face-recognition (requires dlib)
RUN pip install --no-cache-dir face-recognition

# ------------------------- #
# Final Stage
# ------------------------- #
FROM base

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        netcat-traditional \
        libpq5 \
        libgeos-c1v5 \
        libproj25 \
        proj-bin \
        proj-data && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy installed Python packages from builder stage
COPY --from=builder /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY --from=builder /usr/local/bin /usr/local/bin

# Create necessary directories and app user
RUN mkdir -p $APP_HOME/static $APP_HOME/media && \
    addgroup --gid 1001 --system app && \
    adduser --uid 1001 --system --ingroup app --no-create-home --shell /bin/false app && \
    chown -R app:app $APP_HOME

# Copy entrypoint script
COPY --chown=app:app apps/backend/entrypoint.sh $APP_HOME/
RUN chmod +x $APP_HOME/entrypoint.sh

# Copy application code
COPY --chown=app:app apps/backend $APP_HOME/

# Switch to non-root user
USER app

# Set entrypoint
ENTRYPOINT ["/home/apps/backend/entrypoint.sh"]

# Optional healthcheck
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:8001/health || exit 1
