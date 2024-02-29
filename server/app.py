# app.py

from flask import Flask, jsonify, request, session, redirect, url_for
#from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User,Task,register_user, check_user_credentials
from flask_cors import CORS
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash
#  Item,Category, Task, Inventory, Report,

# from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farm_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secrets.token_urlsafe(32)'

CORS(app)
migrate=Migrate(app,db)
db.init_app(app)
jwt = JWTManager(app)
#db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

 #Dashboard route
@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Assuming you have methods to serialize tasks, inventory, and reports
    tasks_data = [task.serialize() for task in user.tasks]
    inventory_data = [item.serialize() for item in user.inventory]
    reports_data = [report.serialize() for report in user.reports]
    
    return jsonify({
        'email': current_user_email,
        'tasks': tasks_data,
        'inventory': inventory_data,
        'reports': reports_data
    })

#     return render_template('dashboard.html', tasks=tasks, inventory=inventory, reports=reports)
   

# Logout Route
@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    # Clear the session or JWT token
    session.clear()  # If using sessions
    return redirect(url_for('login'))

# Notification Route
# @app.route('/notifications', methods=['GET'])
# @jwt_required()
# def notifications():
#     current_user = get_jwt_identity()
#     user = User.query.filter_by(username=current_user).first()
#     notifications = user.notifications  # Assuming you have implemented Notifications model
#     return render_template('notifications.html', notifications=notifications)

# Register Route
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json  # Get JSON data from request
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'user')  # Set default role to 'user'

        if not first_name or not last_name or not email or not password:
            return jsonify({"msg": "First name, last name, email, and password are required."}), 400
        
        # Ensure first_name and last_name are strings and contain only alphabets
        if not isinstance(first_name, str) or not first_name.isalpha():
            return jsonify({"msg": "Invalid first name. Please provide a valid first name with only characters."}), 400
        
        if not isinstance(last_name, str) or not last_name.isalpha():
            return jsonify({"msg": "Invalid last name. Please provide a valid last name with only characters."}), 400
        
        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"msg": "Email already exists."}), 400
        
        # Assuming register_user is a function that registers the user
        register_user(first_name, last_name, password, email, role)
        return jsonify({"msg": "User created successfully"}), 201
    except Exception as e:  # Catching a broader exception
        return jsonify({"msg": "An error occurred during registration. " + str(e)}), 400

def register_user(first_name, last_name, password, email, role='user'):
    # Assuming the User model and db session are correctly set up
    user = User(first_name=first_name, last_name=last_name, email=email, role=role)
    user.set_password(password)  # Assuming the User model has a method to hash password
    db.session.add(user)
    db.session.commit()
    
  # Login Route
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Query user by email
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        # Create access token
        access_token = create_access_token(identity=email)

        # Prepare the response object
        user_details = {
            "role": user.role,
            "email": user.email,
            "access_token": access_token,
        }

        # Optionally, add admin-specific details in the response
        if user.role == 'admin':
            user_details.update({
                "msg": "Welcome admin",
                # Include any admin-specific details here
            })

        return jsonify(user_details), 200
    else:
        return jsonify({"msg": "User not found or wrong credentials"}), 401

    
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
        
    # Example route that requires admin privileges
@app.route('/admin_only_route', methods=['GET'])
@jwt_required()
def admin_only_route():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    # Check if the user is an admin
    if user.role != 'admin':
        return jsonify({"msg": "Unauthorized access"}), 403  # Return Forbidden status if not admin
    
    # Admin-only logic here
    return jsonify({"msg": "Welcome admin"}), 200
 

# User Profile
# @app.route('/profile/<int:user_id>', methods=['GET'])
# def user_profile(user_id):
#     # Retrieve the user from the database by ID
#     user = User.query.get_or_404(user_id)
    
#     # Example of customizing the response format
#     profile_data = {
#         'username': user.username,
#         'email': user.email,
#         'tasks': [{'title': task.title, 'description': task.description} for task in user.tasks]
#     }
    
#     # Convert the profile data to JSON and return it with a 200 status code
#     return jsonify(profile_data), 200

# Delete User
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Assuming 'db' is your SQLAlchemy instance and 'User' is your user model
    session = Session(db.engine)
    try:
        user = session.get(User, user_id)  # Updated to use Session.get() for SQLAlchemy 2.0
        if user:
            session.delete(user)
            session.commit()
            return jsonify({"msg": f"User with ID {user_id} deleted successfully"}), 200
        else:
            return jsonify({"msg": f"User with ID {user_id} not found"}), 404
    except OperationalError as e:
    # Log the error message and any other details
     print(f"Database error occurred: {e}")
    # Optionally, log the full stack trace or other details
    import traceback
    print(traceback.format_exc())
    return jsonify({"msg": "An error occurred while attempting to delete the user"}), 500



# Update User Data
@app.route('/update_user/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    user = User.query.get(user_id)   # This gets the user by ID directly
    hashed_password = generate_password_hash(new_password)
    user.password_hash = hashed_password
    if user:
        new_password = request.json.get('new_password')
        if new_password:
            user.password_hash = new_password  # Here, you might want to hash the password before assigning it
            db.session.commit()
            return jsonify({"msg": f"Password for user with ID {user_id} updated successfully"}), 200
        else:
            return jsonify({"msg": "New password is required"}), 400
    else:
        return jsonify({"msg": f"User with ID {user_id} not found"}), 404


# Get Users
@app.route('/get_users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{'firstname': user.firstname, 'lastname': user.lastname, 'email': user.email} for user in users]
    return jsonify(user_list), 200



# Items and Category

# @app.route('/items', methods=['GET'])
# def get_items():
#     items = Item.query.all()
#     item_list = [{'id': item.id, 'name': item.name, 'description': item.description, 'category': item.category.name} for item in items]
#     return jsonify(item_list), 200

# @app.route('/items/<int:item_id>', methods=['GET'])
# def get_item(item_id):
#     item = Item.query.get_or_404(item_id)
#     item_data = {'id': item.id, 'name': item.name, 'description': item.description, 'category': item.category.name}
#     return jsonify(item_data), 200

# @app.route('/items', methods=['POST'])
# def create_item():
#     data = request.json
#     name = data.get('name')
#     description = data.get('description')
#     category_name= data.get('category_name')

#     category= category.query.filter_by(name=category_name).first()
#     category_id = category_id


#     if not name or not description or not category_id:
#         return jsonify({"msg": "Name, description, and category_id are required."}), 400
    
#     category = Category.query.get(category_id)
#     if not category:
#         return jsonify({"msg": "Category not found."}), 404
#     if category:
      
#      category_id = category_id
#      new_item = Item(name=name, description=description, category_id=category_id)
#      db.session.add(new_item)
#      db.session.commit()
    
#      return jsonify({"msg": "Item created successfully."}), 201
#     else:
#            return jsonify({"msg": "Category not found."}), 404

# @app.route('/items/<int:item_id>', methods=['PUT'])
# def update_item(item_id):
#     item = Item.query.get_or_404(item_id)
#     data = request.json
#     name = data.get('name', item.name)
#     description = data.get('description', item.description)
#     category_id = data.get('category_id', item.category_id)

#     category = Category.query.get(category_id)
#     if not category:
#         return jsonify({"msg": "Category not found."}), 404

#     item.name = name
#     item.description = description
#     item.category = category
#     db.session.commit()

#     return jsonify({"msg": "Item updated successfully."}), 200

# @app.route('/items/<int:item_id>', methods=['DELETE'])
# def delete_item(item_id):
#     item = Item.query.get_or_404(item_id)
#     db.session.delete(item)
#     db.session.commit()
#     return jsonify({"msg": "Item deleted successfully."}), 200

# @app.route('/categories', methods=['GET'])
# def get_categories():
#     categories = Category.query.all()
#     category_list = [{'id': category.id, 'name': category.name} for category in categories]
#     return jsonify(category_list), 200


# # Create a Task
# @app.route('/tasks', methods=['POST'])
# def add_task():
#     data = request.json

#     # Validate request data
#     if not data.get('description') or not data.get('type'):
#         return jsonify({'error': 'Description and type are required'}), 400

#     # Create new task object
#     new_task = Task(
#         description=data['description'],
#         type=data['type'],
#         assigned_user_id=data.get('assigned_user_id'),  # Corrected field name
#         deadline=data.get('deadline')
#     )

#     # Add task to database
#     db.session.add(new_task)
#     db.session.commit()

#     return jsonify({'message': 'Task added successfully', 'task': new_task.to_dict()}), 201



# @app.route('/workers', methods=['POST'])
# def add_worker():
#     data = request.get_json()
    
#     # Basic validation to ensure data contains required fields
#     if not data or 'name' not in data or 'email' not in data:
#         return jsonify({'message': 'Missing name or email'}), 400

#     # Creating a new Worker object
#     new_worker = Worker(name=data['name'], email=data['email'])

#     # Adding the new Worker to the session and committing
#     try:
#         db.session.add(new_worker)
#         db.session.commit()
#         return jsonify({'message': 'Worker added successfully', 'id': new_worker.id}), 201
#     except Exception as e:
#         # In case of any exception, we roll back the session
#         db.session.rollback()
#         return jsonify({'message': 'Failed to add worker', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
