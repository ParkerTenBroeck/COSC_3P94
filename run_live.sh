(trap 'kill 0' SIGINT;
simple-http-server --index --threads 10&
sass --watch scss/main.scss:css/main.css)