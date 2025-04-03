import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
from django.conf import settings
import os

class DemandPredictor:
    MODEL_PATH = os.path.join(settings.BASE_DIR, 'models/demand_predictor.pkl')
    
    def __init__(self):
        try:
            self.model = joblib.load(self.MODEL_PATH)
        except:
            self.model = None
            self.train_model()
    
    def train_model(self):
        """Train or retrain the prediction model"""
        # This would use historical data
        # Simplified example:
        data = pd.DataFrame({
            'hour': [9, 17, 22, 10],
            'day_of_week': [1, 3, 5, 2],
            'demand': [0.8, 0.9, 0.6, 0.7]
        })
        
        X = data[['hour', 'day_of_week']]
        y = data['demand']
        
        self.model = RandomForestRegressor()
        self.model.fit(X, y)
        joblib.dump(self.model, self.MODEL_PATH)
    
    def predict(self, hour, day_of_week):
        """Predict demand for given time"""
        if not self.model:
            return 0.5  # Default if no model
            
        return self.model.predict([[hour, day_of_week]])[0]