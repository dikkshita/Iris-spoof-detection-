import os
import tensorflow as tf  # type: ignore
from tensorflow.keras.applications import ResNet50  # type: ignore
from tensorflow.keras.models import Model  # type: ignore
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout  # type: ignore
from tensorflow.keras.optimizers import Adam  # type: ignore
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping  # type: ignore
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent))
from dataset_loader import get_data_generators  # type: ignore

from pathlib import Path

# --- Setup Paths ---
# Save model to backend/model relative to this script
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_SAVE_DIR = BASE_DIR / "backend" / "model"
MODEL_NAME = "iris_spoof_model.h5"
MODEL_SAVE_DIR.mkdir(parents=True, exist_ok=True)
MODEL_PATH = MODEL_SAVE_DIR / MODEL_NAME

def build_model():
    """
    Builds the model using ResNet50 backbone.
    """
    print("Building model with ResNet50 backbone...")
    
    # Load ResNet50, exclude top layers (the classification layers)
    base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

    # Freeze base layers
    for layer in base_model.layers:
        layer.trainable = False

    # Add custom head for Binary Classification
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)  # Prevents overfitting
    predictions = Dense(1, activation='sigmoid')(x)  # Sigmoid for binary (0 or 1)

    model = Model(inputs=base_model.input, outputs=predictions)
    
    model.compile(optimizer=Adam(learning_rate=0.0001),
                  loss='binary_crossentropy',
                  metrics=['accuracy', tf.keras.metrics.Precision(name='precision'), tf.keras.metrics.Recall(name='recall')])
    
    return model

def train():
    train_gen, val_gen, _ = get_data_generators()
    
    # Check if data exists
    if train_gen.samples == 0:
        print("Error: No training data found. Please populate dataset/train/real and dataset/train/fake")
        return

    model = build_model()

    # Callbacks
    checkpoint = ModelCheckpoint(
        MODEL_PATH, 
        monitor='val_accuracy', 
        save_best_only=True, 
        mode='max', 
        verbose=1
    )
    
    early_stop = EarlyStopping(
        monitor='val_loss', 
        patience=5, 
        restore_best_weights=True, 
        verbose=1
    )

    print("Starting training...")
    history = model.fit(
        train_gen,
        epochs=20,
        validation_data=val_gen,
        callbacks=[checkpoint, early_stop]
    )
    
    print(f"Training complete. Best model saved at: {MODEL_PATH}")

if __name__ == "__main__":
    train()