# app.py

from flask import Flask, jsonify, request, session, redirect, url_for
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User,Task, register_user, check_user_credentials,InventoryModel
from flask_cors import CORS
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///farm_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secrets.token_urlsafe(32)'

CORS(app)
migrate=Migrate(app,db)
db.init_app(app)
jwt = JWTManager(app)


with app.app_context():
    db.create_all()

 #Dashboard route
@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    # Retrieve the email of the current user from the JWT token
    current_user_email = get_jwt_identity()
    
    # Find the user in the database by their email
    user = User.query.filter_by(email=current_user_email).first()
    
    # If the user does not exist, return an error message
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Serialize the tasks, inventory, and reports associated with the user
    # Ensure you have methods to serialize these items in your models
    tasks_data = [task.serialize() for task in user.tasks]
    inventory_data = [item.serialize() for item in user.inventory]
    reports_data = [report.serialize() for report in user.reports]
    
    # Return the data as JSON
    return jsonify({
        'email': current_user_email,  # Confirming the identity of the user
        'tasks': tasks_data,          # List of serialized tasks
        'inventory': inventory_data,  # List of serialized inventory items
        'reports': reports_data       # List of serialized reports
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



@app.route('/inventory', methods=['POST'])
def add_inventory():
    data = request.json

 # Convert date strings to datetime objects
    purchase_date = datetime.strptime(data.get('purchaseDate'), '%Y-%m-%d')
    expiry_date = datetime.strptime(data.get('expiryDate'), '%Y-%m-%d')


    existing_inventory = InventoryModel.query.filter_by(
        Item=data.get('item'),
        Category=data.get('category'),
        Supplier=data.get('supplier'),
        Purchase_Date=purchase_date,
        Expiry_Date=expiry_date
    ).first()

    if existing_inventory:
        return jsonify({'error': 'Inventory already added'}), 400

    new_inventory = InventoryModel(
        Item=data.get('item'),
        Category=data.get('category'),
        Quantity=data.get('quantity'),
        Units_of_Measurement=data.get('units'),
        Unit_Cost=data.get('cost'),
        Supplier=data.get('supplier'),
        Purchase_Date=purchase_date,
        Expiry_Date=expiry_date
    )

    db.session.add(new_inventory)
    db.session.commit()

    return jsonify({'message': 'Inventory added successfully'}), 201

@app.route('/inventory', methods=['GET'])
def get_inventory():
    inventory = InventoryModel.query.all()
    serialized_inventory = [{
        'Item': inv.Item,
        'Category': inv.Category,
        'Quantity': inv.Quantity,
        'Units_of_Measurement': inv.Units_of_Measurement,
        'Unit_Cost': inv.Unit_Cost,
        'Supplier': inv.Supplier,
        'Purchase_Date': inv.Purchase_Date.isoformat(),  # Convert datetime object to ISO format string
        'Expiry_Date': inv.Expiry_Date.isoformat() if inv.Expiry_Date else None  # Convert datetime object to ISO format string or None if expiry date is None
    } for inv in inventory]
    return jsonify(serialized_inventory)

@app.route('/inventory/<int:id>', methods=['DELETE'])
def delete_inventory(id):
    inventory = InventoryModel.query.get(id)
    if inventory:
        db.session.delete(inventory)
        db.session.commit()
        return jsonify({'message': 'Inventory deleted successfully'}), 200
    else:
        return jsonify({'error': 'Inventory not found'}), 404

@app.route('/inventory/<int:id>', methods=['PATCH'])
def update_inventory(id):
    inventory = InventoryModel.query.get(id)
    if not inventory:
        return jsonify({'error': 'Inventory not found'}), 404

    data = request.json
    inventory.Item = data.get('item', inventory.Item)
    inventory.Category = data.get('category', inventory.Category)
    inventory.Quantity = data.get('quantity', inventory.Quantity)
    inventory.Units_of_Measurement = data.get('units', inventory.Units_of_Measurement)
    inventory.Unit_Cost = data.get('cost', inventory.Unit_Cost)
    inventory.Supplier = data.get('supplier', inventory.Supplier)

    # Convert date strings to Python datetime objects
    purchase_date_str = data.get('purchaseDate')
    if purchase_date_str:
        inventory.Purchase_Date = datetime.strptime(purchase_date_str, '%Y-%m-%d')

    expiry_date_str = data.get('expiryDate')
    if expiry_date_str:
        inventory.Expiry_Date = datetime.strptime(expiry_date_str, '%Y-%m-%d')

    db.session.commit()
    return jsonify({'message': 'Inventory updated successfully'}), 200


@app.route('/task', methods=['POST'])
def create_task():
    data = request.json
    description = data.get('description')
    task_type = data.get('task_type')
    user_id = data.get('user_id')
    assigned_user_id = data.get('assigned_user_id')
    deadline_str = data.get('deadline')

    if deadline_str:
        try:
            deadline = datetime.strptime(deadline_str, '%Y-%m-%dT%H:%M:%S')
        except ValueError as e:
            return jsonify({'error': f'Invalid deadline format: {str(e)}'}), 400
    else:
        deadline = None

    if not all([description, task_type, user_id]):
        return jsonify({'error': 'Description, task_type, and user_id are required'}), 400

    # Check if a task with the same attributes already exists
    existing_task = Task.query.filter_by(description=description, task_type=task_type, user_id=user_id, assigned_user_id=assigned_user_id, deadline=deadline).first()
    if existing_task:
        return jsonify({'error': 'Task already exists'}), 409  # HTTP 409 Conflict

    new_task = Task(description=description, task_type=task_type, user_id=user_id, assigned_user_id=assigned_user_id, deadline=deadline)

    db.session.add(new_task)
    db.session.commit()

    return jsonify({'message': 'Task created successfully', 'task_id': new_task.id}), 201


# GET TASKS ROUTE 
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    tasks_data = [{
        'id': task.id,
        'description': task.description,
        'task_type': task.task_type,
        'user_id': task.user_id,
        'assigned_user_id': task.assigned_user_id,
        'deadline': task.deadline.isoformat() if task.deadline else None
    } for task in tasks]
    return jsonify(tasks_data), 200

@app.route('/task/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get(task_id)
    if task:
        task_data = {
            'id': task.id,
            'description': task.description,
            'task_type': task.task_type,
            'user_id': task.user_id,
            'assigned_user_id': task.assigned_user_id,
            'deadline': task.deadline.isoformat() if task.deadline else None
        }
        return jsonify(task_data), 200
    else:
        return jsonify({'error': 'Task not found'}), 404

# PATCH ROUTE
@app.route('/task/<int:task_id>', methods=['PATCH'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404

    data = request.json
    task.description = data.get('description', task.description)
    task.task_type = data.get('task_type', task.task_type)
    task.user_id = data.get('user_id', task.user_id)
    task.assigned_user_id = data.get('assigned_user_id', task.assigned_user_id)

    deadline_str = data.get('deadline')
    if deadline_str:
        task.deadline = datetime.strptime(deadline_str, '%Y-%m-%dT%H:%M:%S')

    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

# DELETE TASK
@app.route('/task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully'}), 200
    else:
        return jsonify({'error': 'Task not found'}), 404



if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables for our data models
    app.run(debug=True)

# if __name__ == '__main__':
#     app.run(debug=True)
