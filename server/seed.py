from app import app
from extension import db, bcrypt
from models import User, Task


with app.app_context():

    user1 = User.query.filter_by(username="josephine").first()

    if not user1:
        user1 = User(
            username="josephine",
            password_hash=bcrypt.generate_password_hash("password123").decode("utf-8")
        )
        db.session.add(user1)
        db.session.commit()

    user2 = User.query.filter_by(username="john").first()

    if not user2:
        user2 = User(
            username="john",
            password_hash=bcrypt.generate_password_hash("password456").decode("utf-8")
        )
        db.session.add(user2)
        db.session.commit()

    sample_tasks = [
        {
            "title": "Complete Flask project",
            "description": "Finish the authentication and task management API",
            "completed": False,
            "user_id": user1.id
        },
        {
            "title": "Practice Python",
            "description": "Solve four data structures problems",
            "completed": True,
            "user_id": user1.id
        },
        {
            "title": "Read documentation",
            "description": "Study Flask SQLAlchemy",
            "completed": False,
            "user_id": user2.id
        }
    ]

    for task_data in sample_tasks:
        existing_task = Task.query.filter_by(
            title=task_data["title"],
            user_id=task_data["user_id"]
        ).first()

        if not existing_task:
            task = Task(**task_data)
            db.session.add(task)

    db.session.commit()

    print("Database seeded successfully!")
