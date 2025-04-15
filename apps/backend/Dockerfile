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

# Set working directory
WORKDIR $APP_HOME

# ------------------------- #
# Builder Stage
# ------------------------- #
FROM base as builder

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        g++ \
        cmake \
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

# Upgrade pip and configure pip settings
RUN pip install --no-cache-dir --upgrade pip && \
    pip config set global.timeout ${PIP_TIMEOUT} && \
    pip config set global.retries ${PIP_RETRIES} && \
    pip config set global.index-url ${PIP_INDEX_URL}

# Manually build and install dlib (Python 3.12 workaround)
RUN git clone -b v19.24 --depth 1 https://github.com/davisking/dlib.git /tmp/dlib && \
    cd /tmp/dlib && \
    python3 setup.py install && \
    rm -rf /tmp/dlib

# Copy requirements.txt and install wheels (excluding face-recognition)
COPY apps/backend/requirements.txt .

# Temporarily remove face-recognition for the wheel build
RUN grep -v "face-recognition" requirements.txt > requirements-clean.txt

RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements-clean.txt

# Manually install face-recognition now that dlib is ready
RUN pip install --no-cache-dir face-recognition

# ------------------------- #
# Final Stage
# ------------------------- #
FROM base

# Install runtime dependencies - using correct package names for Bookworm
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

# Copy wheels from builder and install
COPY --from=builder /wheels /wheels
COPY --from=builder $APP_HOME/requirements.txt .
RUN pip install --no-cache-dir /wheels/* && \
    rm -rf /wheels

# Also copy the manually installed face-recognition package from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Create necessary directories and set ownership
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
