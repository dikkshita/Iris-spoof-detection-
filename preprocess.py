import numpy as np
from PIL import Image
import io

def preprocess_image(image_bytes: bytes, target_size=(224, 224)):
    """
    1. Reads bytes
    2. Resizes to 224x224
    3. Normalizes (0-1)
    4. Adds batch dimension
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        
        # Ensure RGB
        if image.mode != "RGB":
            image = image.convert("RGB")
            
        # Resize
        image = image.resize(target_size)
        
        # Normalize
        image_array = np.array(image) / 255.0
        
        # Add batch dim: (1, 224, 224, 3)
        image_batch = np.expand_dims(image_array, axis=0)
        
        return image_batch
    except Exception as e:
        raise ValueError(f"Error processing image: {str(e)}")