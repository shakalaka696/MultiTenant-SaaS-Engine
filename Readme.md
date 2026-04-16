Run Redis server on Terminal(Local) :
  command prompt wsl
  sudo service redis-server start
  redis-cli ping - PONG(redis is working fine)
  sudo service redis-server stop

We need to run both the worker and the express server on Seperate terminal on VScode