from sqlalchemy.orm import Session
from app.models.db_class import Class
from app.schemas.class_schema import ClassCreate
from typing import List, Optional

def create_class(db: Session, class_data: ClassCreate) -> Class:
    try:
        new_class = Class(**class_data.dict(), is_active=True)
        db.add(new_class)
        db.commit()
        db.refresh(new_class)
        return new_class
    except Exception as e:
        print(f"Error creating class: {e}")
        db.rollback()
        raise

def get_all_classes(db: Session) -> List[Class]:
    return db.query(Class).filter(Class.is_active == True).all()

def get_class_by_id(db: Session, class_id: int) -> Optional[Class]:
    return db.query(Class).filter(Class.id == class_id, Class.is_active == True).first()

def update_class(db: Session, class_id: int, class_data: dict) -> Optional[Class]:
    db_class = db.query(Class).filter(Class.id == class_id, Class.is_active == True).first()
    if not db_class:
        return None

    valid_fields = {col.name for col in Class.__table__.columns}
    for key, value in class_data.items():
        if key in valid_fields:
            setattr(db_class, key, value)

    db.commit()
    db.refresh(db_class)
    return db_class

def deactivate_class(db: Session, class_id: int) -> Optional[Class]:
    db_class = db.query(Class).filter(Class.id == class_id).first()
    if not db_class:
        return None
    db_class.is_active = False
    db.commit()
    db.refresh(db_class)
    return db_class
