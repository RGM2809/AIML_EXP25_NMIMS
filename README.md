# Experiment 25: Microservices on Kubernetes

A small three-tier microservices application with a web dashboard, a Flask aggregation service, and a Flask data provider. Kubernetes manifests deploy the frontend and both backend services.

## Project structure

```text
exp25-microservices/
├── frontend/             # Static dashboard served by Nginx
├── microservice-one/     # Flask API that calls Microservice Two
├── microservice-two/     # Flask API that returns sample data
└── k8s/                  # Kubernetes Deployment and Service manifests
```

## Architecture

- **Frontend:** Static HTML, CSS, and JavaScript served by Nginx on port 80.
- **Microservice One:** Flask application on port 5000. `GET /process` calls Microservice Two through the Kubernetes DNS name `service-two-svc:5000` and returns its response.
- **Microservice Two:** Flask application on port 5000. `GET /data` returns a sample JSON response.
- **Kubernetes:** Each component has a Deployment. The frontend is exposed as a NodePort service on port `30080`; the two backend services use ClusterIP.

## Prerequisites

- Docker
- A Kubernetes cluster (for example, Docker Desktop Kubernetes or Minikube)
- `kubectl` configured to access that cluster

## Build container images

Run these commands from the project root:

```sh
docker build -t microservice-one:latest ./microservice-one
docker build -t microservice-two:latest ./microservice-two
docker build -t microservices-frontend:latest ./frontend
```

The manifests use `imagePullPolicy: IfNotPresent`, so make sure these images are available to your Kubernetes cluster. With Minikube, you can build them in Minikube's Docker environment or load them into the cluster before deploying.

## Deploy to Kubernetes

Apply the manifests from the project root:

```sh
kubectl apply -f k8s/microservice-two.yaml
kubectl apply -f k8s/microservice-one.yaml
kubectl apply -f k8s/frontend.yaml
```

Check deployment status:

```sh
kubectl get deployments
kubectl get pods
kubectl get services
```

Open the dashboard at `http://localhost:30080` when your cluster exposes NodePort services on localhost. For Minikube, you can find the service URL with:

```sh
minikube service frontend-svc --url
```

## API endpoints

| Service | Endpoint | Description |
|---|---|---|
| Microservice One | `GET /` | Health/message response |
| Microservice One | `GET /process` | Fetches data from Microservice Two and returns it |
| Microservice Two | `GET /` | Health/message response |
| Microservice Two | `GET /data` | Returns sample JSON data |

Use the dashboard's **Test Connection** button to test the request path through Microservice One to Microservice Two.

## Notes

- The backend `requirements.txt` files list Flask and, for Microservice One, Requests.
- The app is a learning/demo project and currently returns sample data; it does not connect to a database.
