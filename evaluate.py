import os
import numpy as np  # type: ignore
import tensorflow as tf  # type: ignore
from sklearn.metrics import classification_report, confusion_matrix  # type: ignore
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))
from dataset_loader import get_data_generators  # type: ignore

from pathlib import Path

# Path to model relative to this script
MODEL_PATH = Path(__file__).resolve().parent.parent / "backend" / "model" / "iris_spoof_model.h5"

def evaluate():
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model not found at {MODEL_PATH}. Run train.py first.")
        return

    print(f"Loading model from {MODEL_PATH}...")
    model = tf.keras.models.load_model(MODEL_PATH)
    
    _, _, test_gen = get_data_generators()
    
    if test_gen.samples == 0:
        print("Error: No test data found.")
        return
    
    print("Running evaluation on test set...")
    results = model.evaluate(test_gen, verbose=1)
    print(f"\n--- Results ---")
    print(f"Test Loss: {results[0]:.4f}")
    print(f"Test Accuracy: {results[1]:.4f}")

    # Generate predictions
    print("\nGenerating detailed report...")
    predictions = model.predict(test_gen)
    y_pred = (predictions > 0.5).astype(int).flatten()
    y_true = test_gen.classes
    
    class_labels = list(test_gen.class_indices.keys()) # ['fake', 'real']
    
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_true, y_pred))
    
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, target_names=class_labels))

if __name__ == "__main__":
    evaluate()