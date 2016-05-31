############################################################
# Dockerfile to build maxwell-forms application containers
############################################################

# Set the base image to  Ubuntu + node 4.4.0
FROM nodesource/vivid:4.4.0
# File Author / Maintainer
MAINTAINER Emma Spencer "emma@maxwellhealth.com"
ENV NODE_ENV development
# Set the default directory where CMD will execute
WORKDIR /usr/maxwell-forms/

# Install node dependencies (uses caching strategy)
COPY package.json package.json
RUN npm install
# add the rest of the repository to the docker env
ADD . /usr/maxwell-forms/

# EXPOSE
EXPOSE 8888

# Set the default command to execute
# when creating a new container

CMD ["node", "server.js"]