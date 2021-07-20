FROM node:16-alpine3.11
RUN apk --no-cache add git

RUN git clone https://github.com/Study-Together-Org/study_dashboard.git
WORKDIR ./study_dashboard
RUN npm install
RUN npm install -g serve
RUN npm run build

ENTRYPOINT serve -s build
# to run the image: docker run -p 127.0.0.1:5000:5000/tcp study_dashboard
