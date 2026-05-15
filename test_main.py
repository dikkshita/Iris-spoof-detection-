from fastapi.testclient import TestClient
from pathlib import Path
import sys
import os

# Add backend directory to path so we can import main
# This assumes tests is inside backend/tests
BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BACKEND_DIR))

from main import app

client = TestClient(app)

def test_health_check():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "active"

def test_predict_no_model():
    """
    Test prediction when model is not loaded. 
    Note: This depends on the actual state of the model loading.
    If model loads on startup (which we try to do), this test might fail if logic isn't mocked.
    For unit testing, we often mock the model.
    """
    # Force model to be None for this test to verify error handling
    from main import model
    original_model = model
    import main
    main.model = None
    
    # Create valid dummy image
    try:
        response = client.post("/predict", files={"file": ("test.jpg", b"fake_content", "image/jpeg")})
        assert response.status_code == 503
        assert response.json()["detail"] == "Model is not loaded. Please check server logs."
    finally:
        # Restore model
        main.model = original_model

def test_predict_invalid_file_type():
    """Test uploading a non-image file."""
    # Ensure model is "loaded" so we don't hit 503
    import main
    if main.model is None:
         # Mock a dummy model if needed, or skip. 
         # For this test, we hit the file check before model check? 
         # In main.py: model check is first. So we need to ensure model is not None.
         main.model = "Dummy" 

    response = client.post("/predict", files={"file": ("test.txt", b"text content", "text/plain")})
    
    # Reset model if we set it to string
    if main.model == "Dummy":
        main.model = None

    assert response.status_code == 400
    assert "Invalid file type" in response.json()["detail"]
