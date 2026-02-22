FROM python:3.10-slim

WORKDIR /app

COPY . .

ENV SMS_HOST=0.0.0.0
ENV SMS_PORT=8000

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/health', timeout=3)" || exit 1

CMD ["python3", "app.py"]
