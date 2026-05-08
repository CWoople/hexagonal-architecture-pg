## Project Structure
```
src/
 ├── domain/           # Core entities (No dependencies)
 ├── ports/            # Interfaces for the outside world
 ├── application/      # Use cases
 ├── adapters/         
 │   ├── inbound/      # Controllers (Express)
 │   └── outbound/     # Repositories (Database)
 ├── index.ts.         # Entrypoint
 ```
