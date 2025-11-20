from flask import Flask, request, jsonify
import os

app = Flask(__name__)
API_TOKEN = os.getenv('TITAN_API_TOKEN', 'changeme')

def require_token(fn):
    from functools import wraps
    @wraps(fn)
    def wrapper(*args, **kwargs):
        tok = request.headers.get('Authorization', '').replace('Bearer ', '')
        if tok != API_TOKEN:
            return jsonify({'error':'Unauthorized'}), 401
        return fn(*args, **kwargs)
    return wrapper

@app.route('/health')
def health():
    return 'ok'

@app.route('/api/chat', methods=['POST'])
@require_token
def chat():
    data = request.json or {}
    q = data.get('query','')
    # Prototype response: echo
    answer = f"[Prototype] Titan Battalion Brain received: {q}"
    return jsonify({'answer': answer, 'sources': []})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860)