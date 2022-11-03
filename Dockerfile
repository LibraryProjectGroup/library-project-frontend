FROM node:bullseye

RUN apt-get update &&  apt-get install -y curl unzip xvfb libxi6 libgconf-2-4 python3 gnupg2 python3-pip
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list &&  apt-get -y update &&  apt-get -y install google-chrome-stable
RUN wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip && unzip chromedriver_linux64.zip
RUN chmod +x chromedriver && cp /chromedriver /usr/local/bin && rm chromedriver_linux64.zip
WORKDIR /app
COPY requirements.txt .
COPY package.json .
COPY package-lock.json .
RUN pip3 install -r requirements.txt && npm install
COPY tsconfig.json .
EXPOSE 3000
CMD ["npm","run","startserverandtest"]

