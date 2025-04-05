from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas, auth
from .database import engine, SessionLocal
from .schemas import UserLogin
from .database import get_db
from fastapi import WebSocket
from .websocket import manager
from fastapi import WebSocket, WebSocketDisconnect
from dotenv import load_dotenv
import os
from .auth import get_current_user  # ✅ import your JWT checker


load_dotenv()  # 👈 Load variables from .env file

app = FastAPI()
origins = [
    os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In dev, allow all. In prod, use ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "FastAPI with DB is working ✅"}

@app.post("/register")
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return await auth.create_user(db=db, user=user)

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = auth.authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = auth.create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/welcome")
def welcome(current_user: models.User = Depends(get_current_user)):
    return {"message": f"🎉 Welcome back, {current_user.email}!"}

@app.websocket("/ws/notifications")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # Keeps connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)

