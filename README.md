# Load Balancer Cluster

A containerized load balancer cluster using Docker Compose, Nginx, and Express.js backends. This project demonstrates how to distribute incoming traffic across multiple backend services using Nginx as a reverse proxy.

## 🏗️ Architecture

```
Internet/Client
       ↓
   Load Balancer (Nginx)
       ↓
   ┌─────────┬─────────┐
   ↓         ↓         ↓
Backend1   Backend2
(Express)  (Express)
```

## 🛠️ Technologies

-   **Docker & Docker Compose**: Containerization and orchestration
-   **Nginx**: Load balancer and reverse proxy
-   **Node.js & Express.js**: Backend services
-   **Custom Docker Bridge Network**: Internal service communication

## 📁 Project Structure

```
load-balancer-cluster/
├── docker-compose.yml          # Service orchestration
├── backend1/
│   ├── app.js                 # Express.js server
│   ├── Dockerfile.dev         # Docker configuration
│   └── package.json           # Node.js dependencies
├── backend2/
│   ├── app.js                 # Express.js server
│   ├── Dockerfile.dev         # Docker configuration
│   └── package.json           # Node.js dependencies
└── load-balancer/
    ├── nginx.conf             # Nginx configuration
    └── Dockerfile.dev         # Docker configuration
```

## 🚀 Usage

### Prerequisites

-   Docker (latest version)
-   Docker Compose (latest version)

### Running the Cluster

1. **Clone or navigate to the project directory:**

    ```bash
    cd load-balancer-cluster
    ```

2. **Start the cluster:**

    ```bash
    docker compose up --build
    ```

3. **Access the application:**

    - Open your browser and go to `http://localhost`
    - The load balancer will distribute requests between Backend1 and Backend2
    - Refresh the page to see different responses from each backend

4. **Stop the cluster:**
    ```bash
    docker compose down
    ```

## 🔧 Configuration

### Network Configuration

The services communicate through a custom bridge network:

-   **Network Subnet**: `172.30.0.0/16`
-   **Backend1**: `172.30.0.2:3000`
-   **Backend2**: `172.30.0.3:3000`
-   **Load Balancer**: `172.30.0.4:80`

### Load Balancing Strategy

Nginx uses round-robin load balancing by default, distributing requests evenly between available backends.

### Security Features

-   **Backend Isolation**: Backend services are not directly accessible from outside the Docker network
-   **Single Entry Point**: Only the load balancer (port 80) is exposed to the host
-   **Internal Communication**: Backends communicate only through the custom network

## 🧪 Testing

### Check Running Containers

```bash
docker ps
```

You should see three containers:

-   `load-balancer-cluster-load-balancer-1` (port 80 exposed)
-   `load-balancer-cluster-backend1-1` (internal only)
-   `load-balancer-cluster-backend2-1` (internal only)

### Test Load Balancing

```bash
# Make multiple requests to see load balancing in action
curl http://localhost
curl http://localhost
curl http://localhost
```

### View Logs

```bash
# All services
docker compose logs

# Specific service
docker compose logs load-balancer
docker compose logs backend1
docker compose logs backend2
```

## 🔍 Troubleshooting

### Common Issues

1. **Port 80 already in use:**

    ```bash
    # Change the load balancer port in docker-compose.yml
    ports:
      - "8080:80"  # Use port 8080 instead
    ```

2. **Network conflicts:**

    ```bash
    # Clean up Docker networks
    docker network prune
    docker compose down --remove-orphans
    ```

3. **Build issues:**
    ```bash
    # Force rebuild all images
    docker compose build --no-cache
    docker compose up
    ```

## 📈 Scaling

To add more backend instances:

1. Add new backend services in `docker-compose.yml`
2. Update `nginx.conf` to include new upstream servers
3. Assign new IP addresses in the custom network range

Example:

```yaml
backend3:
    build:
        context: ./backend3
        dockerfile: Dockerfile.dev
    networks:
        custom_net:
            ipv4_address: 172.30.0.5
```
