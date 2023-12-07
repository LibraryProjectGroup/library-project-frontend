FROM node:bullseye

RUN apt-get update &&  apt-get install -y curl unzip xvfb libxi6 libgconf-2-4 python3 gnupg2 python3-pip procps
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&  apt-get -y update &&  apt-get -y install google-chrome-stable
RUN curl -L https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/119.0.6045.105/linux64/chromedriver-linux64.zip -o chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip && \
    chmod +x chromedriver-linux64/chromedriver && \
    mv chromedriver-linux64/chromedriver /usr/local/bin/
WORKDIR /app
COPY requirements.txt .
COPY package.json .
COPY package-lock.json .
RUN pip3 install -r requirements.txt && npm install
COPY tsconfig.json .
EXPOSE 3000
