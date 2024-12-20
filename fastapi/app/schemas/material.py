from typing import Optional
from pydantic import BaseModel, ConfigDict
from sqlalchemy import TEXT, Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from .base import Base

class Material(Base):
    __tablename__ = 'Material'
    
    material_id: int = Column(Integer, primary_key=True, nullable=False)
    name: str = Column(TEXT, nullable=False)
    capacity: Optional[str] = Column(TEXT, nullable=True)
    type: str = Column(TEXT, nullable=False)
    analyzed: bool = Column(Boolean, nullable=False)

    recipe_id: int = Column(Integer, ForeignKey('Recipe.recipe_id'), nullable=False)
    ingredient_id: Optional[int] = Column(Integer, ForeignKey('Ingredient.ingredient_id'), nullable=True)

    recipe = relationship("Recipe", back_populates="material")  # Adjust back_populates accordingly
    ingredient = relationship("Ingredient", back_populates="material")  # Adjust back_populates accordingly

class MaterialCreate(BaseModel):
    name: str
    capacity: Optional[str] = None
    type: str
    analyzed: bool
    recipe_id: int
    ingredient_id: Optional[int] = None

class MaterialRead(BaseModel):
    id: int
    name: str
    capacity: Optional[str] = None
    type: str
    analyzed: bool
    recipe_id: int
    ingredient_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)