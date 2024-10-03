from fastapi import FastAPI
from app.routes.recommend import router as recommend_router
from fastapi.middleware.cors import CORSMiddleware
from app.common.scheduler import start_scheduler
from contextlib import asynccontextmanager
from app.schemas import Base
from app.databases.database import engineconn
from app.models.models import initialize_models
import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = engineconn().engine
    Base.metadata.create_all(engine)
    
    # 모델 초기화
    try:
        initialize_models()
    except Exception as e:
        logger.error(f"Failed to initialize models: {e}")
        raise
    
    scheduler = start_scheduler()
    try:
        yield
    finally:
        scheduler.shutdown()

app = FastAPI(lifespan=lifespan)
app.include_router(recommend_router, prefix="/api/v1")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "An internal server error occurred."}
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins={"*"},
    allow_credentials=True,
    allow_methods={"OPTIONS", "GET", "POST"},
    allow_headers={"*"},
)

@app.get("/")
async def root():
    return {"message": "Hello World"}