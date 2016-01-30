FROM node:5.5
MAINTAINER Dan Levy


ENTRYPOINT ["nodemon", "--harmony", "--harmony_modules", "--harmony_sloppy", "--harmony_sloppy_function", "--harmony_sloppy_let", "--harmony_arrow_functions", "--harmony_default_parameters", "--harmony_destructuring", "app"]
