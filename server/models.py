# models.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farm_management.db'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), nullable=False, default='user')

    # tasks = db.relationship('Task', backref='assigned_user', lazy=True)
    # inventory = db.relationship('Inventory', backref='user', lazy=True)
    # reports = db.relationship('Report', back_populates='user', lazy=True)


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    
def register_user(first_name, last_name, password, email):
    user = User(first_name=first_name, last_name=last_name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()


def check_user_credentials(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return True
    return False



# class Worker(db.Model):
#     __tablename__ = 'workers'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), nullable=False)
#     tasks_assigned = db.relationship('Task', backref='assigned_worker', lazy=True)

#Task Model
class Task(db.Model):   
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    task_type = db.Column(db.String(255))  # Renamed from 'type' to 'task_type'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Foreign key referencing the User table
    assigned_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    deadline = db.Column(db.DateTime)

# class Inventory(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)    
#     quantity = db.Column(db.Integer, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     user = db.relationship("User", back_populates="inventory")

# class Item(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
#     category = relationship("Category", back_populates="items")

# class Report(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     user = relationship("User", back_populates="reports")

# class Category(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     items = relationship("Item", back_populates="category")

# class Notifications(db.Model):
#     notification_id = db.Column(db.Integer, primary_key=True)
#     farmer_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
#     email = db.Column(db.String(254), unique=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
#     message = db.Column(db.Text)
#     timestamp = db.Column(db.DateTime, index=True)
    # class InventoryModel(db.Model):
    # _tablename_ = 'inventories'

    # id = db.Column(db.Integer, primary_key=True)
    # Item = db.Column(db.String(20), nullable=False)
    # Category = db.Column(db.String(50), nullable=False)
    # Quantity = db.Column(db.Integer, nullable=False)
    # Units_of_Measurement = db.Column(db.String(15), nullable=False)
    # Unit_Cost = db.Column(db.Integer, nullable=False)
    # Supplier = db.Column(db.String(50), nullable=False)
    # Purchase_Date = db.Column(db.DateTime)
    # Expiry_Date = db.Column(db.DateTime)

    # def _repr_(self):
    #     return f'<InventoryModel {self.Item}>'

    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'item': self.Item,
    #         'category': self.Category,
    #         'quantity': self.Quantity,
    #         'units': self.Units_of_Measurement,
    #         'cost': self.Unit_Cost,
    #         'supplier': self.Supplier,
    #         'purchaseDate': self.Purchase_Date,
    #         'expiryDate': self.Expiry_Date
    #     }

class InventoryModel(db.Model):
    __tablename__ = 'inventories'

    id = db.Column(db.Integer, primary_key=True)
    Item = db.Column(db.String(20), nullable=False)
    Category = db.Column(db.String(50), nullable=False)
    Quantity = db.Column(db.Integer, nullable=False)
    Units_of_Measurement = db.Column(db.String(15), nullable=False)
    Unit_Cost = db.Column(db.Integer, nullable=False)
    Supplier = db.Column(db.String(50), nullable=False)
    Purchase_Date = db.Column(db.DateTime)
    Expiry_Date = db.Column(db.DateTime)
   