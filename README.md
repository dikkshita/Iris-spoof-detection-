# Iris Spoof Detection System 👁️

A Deep Learning system capable of detecting fake iris scans (spoofing attacks) using Transfer Learning (ResNet50). Built for biometric security research.

## 📂 Structure
* `dataset/`: Contains Real vs Fake iris images.
* `ml_engine/`: Scripts for training and evaluating the model.
* `backend/`: FastAPI server for real-time inference.

## 🚀 Setup

1.  **Install Requirements**
    ```bash
    pip install -r requirements.txt
    ```

2.  **Dataset Preparation**
    Place your images in `dataset/train`, `dataset/val`, and `dataset/test` with `real` and `fake` subdirectories.

3.  **Train the Model**
    ```bash
    cd ml_engine
    python train.py
    ```
    This saves `iris_spoof_model.h5` to the `backend/model/` folder.

4.  **Run the API**
    ```bash
    cd backend
    python main.py
    ```

5.  **Test API**
    Go to `http://localhost:8000/docs` and use the `/predict` endpoint.

6.  **Run Tests (Developers)**
    To verify code integrity:
    ```bash
    python -m pytest backend/tests/test_main.py
    ```