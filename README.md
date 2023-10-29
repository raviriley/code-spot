# code-spot
CalHacks 10 monorepo

backend: multimodal LLM backend
spotter: frontend that connects the AI backend and the robot control backend
robot-control-server: web server to remotely control the robot

# Running the stack:

## backend
1. install Poetry
2. `poetry install`
3. `poetry run dev` to start the backend

## frontend
1. install Bun
2. `bun install`
3. `bun dev` to start the frontend

## robot server
1. connect to Spot wifi network
2. run `python3 python/examples/wasd_server/app.py` and ensure the hostname `192.168.80.3` is correct
3. enter the username `admin` and the admin password `2zqa8dgw7lor`
