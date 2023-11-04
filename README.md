# CalHacks 10 monorepo

### The spot for our code for running spotter on the spot

🎥 Demo Video: https://www.youtube.com/watch?v=f8duOCsi8As

**backend**: backend for multilingual, multimodal LLM stuff
- REST API written in Python using Flask
- Poetry for dependency management
- GPT-4
- Hume AI
- Bark

**spotter**: frontend that connects the AI backend and the robot control backend
- [Bun](https://bun.sh/)
- [Next.js](https://nextjs.org/)
- [shadcn-ui](https://ui.shadcn.com/) components

**robot-control-server**: web server that enables remotely controlling the robot
- REST API written in Python using Flask
- Boston Dynamics SDK

----

## Running the stack:

### backend
1. install Poetry
2. `poetry install`
3. `poetry run dev` to start the backend

### frontend
1. install Bun
2. `bun install`
3. `bun dev` to start the frontend

### robot server
1. connect to Spot's wifi network
2. run `python3 python/examples/wasd_server/app.py` and replace the hostname `192.168.80.3` with your Spot's IP
3. enter the `admin` username & password, or the equivalent credentials for your Spot
4. send requests to control endpoints manually or via the frontend
