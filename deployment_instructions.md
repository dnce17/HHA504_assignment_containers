# Make sure you first have a Docker Hub account with a empty repository created
- https://hub.docker.com/
- https://hub.docker.com/repository/create
- You will then use this repository to push your Docker image to

# Login to Docker Hub
- command structure: docker login -u {username}
    - e.g. `docker login -u {hants}`
    - NOTE: If you created an account by connecting it a GitHub account, you need to manually set a password by logging out in the Docker site and clicking "forgot password" to create one

# Build
- command structure: docker build --platform linux/amd64 -t {docker_repo_name}:{optional_version} .
    - NOTE: 
        - Make sure Dockerfile exist + have Docker Desktop open (or else this cmd will fail)
        - Adding versions like "v1" and "v2" can help keep things organized, so it's recommended
    - e.g. `docker build --platform linux/amd64 -t 504flask:v1 .`

# Run (test local build)
- command structure: docker run -p {host_port}:{container_port} {docker_repo_name}:{version}
    - `docker run -p 5005:5000 504flask:v1`
        - Template: `docker run -p (any open port we want):(port you EXPOSE on Dockerfile) (name of docker image)`

# Publish to Docker Hub
- will need to first do `docker login -u {username}`
- then command structure: docker tag {docker_repo_name}:{version} {docker_hub_username}/{docker_repo_name}:{optional_version}
    - `docker tag 504flask:v1 hants/504flask:v1`
- then command to push structure: docker push {docker_hub_username}/{docker_repo_name}:{optional_version}
    - `docker push hants/504flask:v1`
