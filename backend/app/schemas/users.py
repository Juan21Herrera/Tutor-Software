from pydantic import BaseModel, EmailStr, model_validator
from datetime import datetime
from typing import Optional

# User Model (Class)

# Schema for User creation

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    created_at: datetime = datetime.now()

    model_config = {
        "from_attributes": True
    }

class UserCreate(BaseModel):
    name: str
    last_name: str
    email: EmailStr
    password: str
    type_document: str
    document: int
    group: Optional[str] = None
    role: str

    # Validation for the 'group' field
    @model_validator(mode="after")
    def validate_group_if_student(self) -> 'UserCreate':
        if self.role.lower() == "estudiante" and not self.group:
            raise ValueError("El campo 'grupo' es obligatorio si el cargo es 'estudiante'")
        return self

class UserLogin(BaseModel):
    email: EmailStr
    password: str