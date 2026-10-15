
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "Microservice Two is running"
    })


@app.route("/data")
def get_data():
    return jsonify({
        "status": "Success",
        "service": "Microservice Two",
        "message": "Data received from the Data Provider"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
