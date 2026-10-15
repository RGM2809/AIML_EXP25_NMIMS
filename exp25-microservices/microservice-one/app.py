
from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "Microservice One is running"
    })


@app.route("/process")
def process_data():
    try:
        response = requests.get(
            "http://service-two-svc:5000/data",
            timeout=5
        )

        response.raise_for_status()

        data = response.json()

        return jsonify({
            "status": "Success",
            "service": "Microservice One",
            "message": "Data retrieved successfully",
            "data": data
        })

    except requests.RequestException as error:
        return jsonify({
            "status": "Error",
            "service": "Microservice One",
            "message": "Could not connect to Microservice Two",
            "error": str(error)
        }), 502


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
