FROM node:18.12.1 As dev
WORKDIR /app
ADD . /app/
RUN yarn
RUN yarn prisma-all
RUN yarn build
CMD ["yarn", "start:prod"]