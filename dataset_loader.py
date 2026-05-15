import os
from pathlib import Path
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# --- Configuration ---
IMG_HEIGHT = 224
IMG_WIDTH = 224
BATCH_SIZE = 32
# Path relative to this script: ../dataset
DATASET_PATH = Path(__file__).resolve().parent.parent / "dataset"

def get_data_generators():
    """
    Creates data generators.
    - Applies data augmentation to the Training set.
    - Only rescales Validation and Test sets.
    """
    
    # 1. Augmentation for Training
    train_datagen = ImageDataGenerator(
        rescale=1./255,           # Normalize pixel values to 0-1
        rotation_range=20,        # Rotates images slightly
        zoom_range=0.15,          # Simulates different distances
        width_shift_range=0.1,
        height_shift_range=0.1,
        horizontal_flip=True,
        brightness_range=[0.8, 1.2], # Simulates lighting conditions
        fill_mode='nearest'
    )

    # 2. Only Rescaling for Val/Test
    val_test_datagen = ImageDataGenerator(rescale=1./255)

    print(f"Loading data from: {DATASET_PATH.resolve()}")

    # 3. Flow from directory
    # flow_from_directory expects strings, so we convert paths to str
    train_generator = train_datagen.flow_from_directory(
        str(DATASET_PATH / 'train'),
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=True
    )

    val_generator = val_test_datagen.flow_from_directory(
        str(DATASET_PATH / 'val'),
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=False
    )

    test_generator = val_test_datagen.flow_from_directory(
        str(DATASET_PATH / 'test'),
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='binary',
        shuffle=False
    )

    return train_generator, val_generator, test_generator