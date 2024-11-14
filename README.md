# Docker + Deploying and Managing Containers with GCP Cloud Run and Azure Container Apps

## Link to Applications
1. GCP Cloud Run
    * https://flask-pkmn-md-site-1057035447975.us-central1.run.app
2. Azure 

## 1. Containerize a Simple Application
1. Created docker repo
2. Created a flask app in VSC
    * NOTE: I copied over an old website I made from [pkmn_md_site](https://github.com/dnce17/pkmn_md_site) repo
3. In VSC terminal, ran the following cmds based on [deployment_instructions.md](placeholder)
    * docker login -u dnce17
    * docker build --platform linux/amd64 -t prac-docker:v1
    * docker run -p 5000:5000 prac-docker:v1
    * docker tag prac-docker:v1 dnce17/prac-docker:v1
    * docker push prac-docker:v1
4. Your Docker image should now be in Docker, which is similar to GitHub
    
## 2. Deploy to GCP Cloud Run
### GCP Cloud Run
1. Go to Cloud Run
![Cloud Run link](cloud_img/gcp/cloud_run_link.png)
2. Deploy a service container
![Deploy service container link](cloud_img/gcp/deploy_service_ctnr.png)
3. Set the following configs
    * Artifact Registry + Docker Hub checked off
    * Container image URL: docker.io/dnce17/prac-docker
        * Format: docker.io/(docker_username)/(name_of_docker_repo)
    * Authentication: Allow unauthenticated invocations
        * Allows anyone to enter
    * CPU allocation and pricing: CPU is only allocated during request processing
        * Means a potential 0 cost env; not going to cost anything if user do not request (go to) URL, but of course there are limits
![Some configs](cloud_img/gcp/config_1.png)
![Some more configs](cloud_img/gcp/config_2.png)
    * Container(s), Volumes, Networking, Security
        * Container port: 5000
            * The port should be the same across app.py and EXPOSE in Dockerfile or else issues will arise
![Port configs](cloud_img/gcp/config_3.png)
        * Revision scaling
            * Maximum number of instances: 3
                NOTE: This can be helpful if say your site gets popular. Lowering the max instance prevents the site from getting overrun.   
![Revision scaling configs](cloud_img/gcp/config_4.png)
4. Create the container 
5. Click the link generated after creation is finished to see if the app is running correctly
![Cloud Run container site link](cloud_img/gcp/ctnr_site_link.png)

#### Extra: Updating the App
1. After making your edits to app, rerun the followings, but just change the version (if previous was v1, now do v2)
    1. docker build --platform linux/amd64 -t prac-docker:v2 .
    2. docker tag prac-docker:v2 dnce17/prac-docker:v2
    3. docker push dnce17/prac-docker:v2
2. In your GCP service container, click "Edit & Deploy New Revision"
![revision link](cloud_img/gcp/revision_link.png)
3. Change the container image URL to include the new version, then deploy
![revision config](cloud_img/gcp/revision_config.png)
4. After deployment, click the URL again to see if everything is correct

## Reflection

### GCP
Since I created my Docker account with my GitHub account, I did not have a password to enter when I ran the "docker login -u dnce17" cmd. I was able to create a password for my Docker account by using the forget password link. 

Another challenge I has was the "docker build" cmd not working. I was getting the following error: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?" I could not find a solution on Google, so I use ChatGPT and found that I simply needed to open up Docker Desktop, which solved the issue. 

However, deploying the application in GCP was smoother than I thought it would be. There was not much configurations that I needed to change and there were no issues with GCP creating the service container that generate the website URL. 

### Azure
