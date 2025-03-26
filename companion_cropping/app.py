from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import networkx as nx
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current script directory
FRONTEND_DIR = os.path.abspath(os.path.join(BASE_DIR, '../new_frontend/frontend'))

# app = Flask(__name__, static_folder='../frontend')
app = Flask(__name__, static_folder=FRONTEND_DIR)
CORS(app)

# Load dataset and create graph
df = pd.read_csv('data/companion_plants.csv')
df['Source Node'] = df['Source Node'].str.lower()
df['Destination Node'] = df['Destination Node'].str.lower()

G = nx.DiGraph()
for index, row in df.iterrows():
    source = row['Source Node']
    destination = row['Destination Node']
    link = row['Link']
    
    if link == 'helps':
        G.add_edge(source, destination, relationship='helps')
    elif link == 'helped_by':
        G.add_edge(destination, source, relationship='helps')
    elif link == 'avoid':
        G.add_edge(source, destination, relationship='avoid')

# Recommendation function
def get_recommendations(plant_name, top_n=5):
    plant_name = plant_name.strip().lower()
    
    if plant_name not in G:
        return {'error': f"'{plant_name}' not found in the dataset."}
    
    helps_plants = [n for n, attr in G[plant_name].items() if attr['relationship'] == 'helps']
    avoid_plants = [n for n, attr in G[plant_name].items() if attr['relationship'] == 'avoid']
    helped_by_plants = [n for n in G.predecessors(plant_name) if G[n][plant_name]['relationship'] == 'helps']
    
    top_plants_to_plant = list(set(helps_plants + helped_by_plants))
    top_plants_to_avoid = list(set(avoid_plants))
    
    if not top_plants_to_plant and not top_plants_to_avoid:
        return {'error': f"No relationships found for '{plant_name}'."}
    
    return {
        'plants_to_plant': top_plants_to_plant[:top_n],
        'plants_to_avoid': top_plants_to_avoid[:top_n]
    }

# API endpoint
@app.route('/recommend', methods=['GET'])
def recommend():
    plant_name = request.args.get('plant')
    if not plant_name:
        return jsonify({'error': 'No plant name provided.'}), 400
    
    recommendations = get_recommendations(plant_name)
    return jsonify(recommendations)

# Serve frontend files
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'companion.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# Run the server
if __name__ == '__main__':
    app.run(debug=True, port=5002)