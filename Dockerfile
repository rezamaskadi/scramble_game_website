FROM tiangolo/node-frontend:10 as build-stage

# Create app directory
WORKDIR /usr/src/app

RUN npm i -g serve

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install
# If you are building your code for production
#RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . .

RUN npm run build
# RUN node build/build.js
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80