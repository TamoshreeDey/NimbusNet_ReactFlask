import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64
from preprocess_utilities.preprocess_services import (
    get_gaussian_kernel,
    get_sobel_kernels,
    get_laplacian_kernel,
    preprocess_image
)

class BlockAttentionModule(tf.keras.layers.Layer):
    def __init__(self, channels, reduction_ratio=16, **kwargs):
        super(BlockAttentionModule, self).__init__(**kwargs)
        self.channels = channels
        self.reduction_ratio = reduction_ratio

    def build(self, input_shape):
        self.channels = input_shape[-1]  # Automatically set channels from input
        self.avg_pool = tf.keras.layers.GlobalAveragePooling2D()
        self.fc1 = tf.keras.layers.Dense(self.channels // self.reduction_ratio, activation='relu')
        self.fc2 = tf.keras.layers.Dense(self.channels)
        self.conv = tf.keras.layers.Conv2D(1, kernel_size=7, padding='same', activation='sigmoid')

    def call(self, inputs):
        avg = self.avg_pool(inputs)
        avg = self.fc1(avg)
        avg = self.fc2(avg)
        channel_att = tf.nn.sigmoid(avg)
        channel_att = tf.reshape(channel_att, (-1, 1, 1, self.channels))
        channel_refined = inputs * channel_att

        spatial_att = self.conv(channel_refined)
        spatial_refined = channel_refined * spatial_att

        return channel_refined + spatial_refined

    def get_config(self):
        config = super().get_config()
        config.update({'channels': self.channels, 'reduction_ratio': self.reduction_ratio})
        return config


class CloudClassifier:
    def __init__(self, model_path=None, image_size=(256, 256)):
        self.image_height, self.image_width = image_size
        self.class_names = ['cirrus', 'cumulus', 'stratus','stratocumulus','nimbostratus','cirrocumulus','cirrostratus','contrails','cumulonimbus','altocumulus','altostratus']
        self.model = None
        self._init_kernels()
        if model_path:
            self.load_model(model_path)

    def _init_kernels(self):
        self.gaussian_kernel = get_gaussian_kernel()
        self.sobel_x, self.sobel_y = get_sobel_kernels()
        self.laplacian_kernel = get_laplacian_kernel()

    def load_model(self, model_path):
        custom_objects = {'BlockAttentionModule': BlockAttentionModule}
        self.model = tf.keras.models.load_model(model_path, custom_objects=custom_objects)

    def preprocess_image_from_binary(self, image_binary):
        try:
            image = Image.open(io.BytesIO(image_binary)).convert('RGB')
        except Exception as e:
            raise ValueError(f"Cannot open image (cloud_classifier line 67): {e}")

        image = image.resize((self.image_width, self.image_height))
        image_array = np.array(image, dtype=np.uint8)
        image_tensor = tf.convert_to_tensor(image_array, dtype=tf.uint8)
        return preprocess_image(
            image_tensor,
            self.gaussian_kernel,
            self.sobel_x,
            self.sobel_y,
            self.laplacian_kernel
        )

    def preprocess_image_from_base64(self, base64_string):
        if base64_string.startswith('data:image'):
            base64_string = base64_string.split(',')[1]
        image_binary = base64.b64decode(base64_string)
        return self.preprocess_image_from_binary(image_binary)

    def predict(self, input_data):
        """
        Unified prediction method that handles multiple input types:
        - Binary data (bytes)
        - Base64 string
        - TensorFlow tensor
        - NumPy array
        """
        if self.model is None:
            raise ValueError("Model not loaded.(cloud_classifier line 95)")
        
        # Determine input type and preprocess accordingly
        if isinstance(input_data, (bytes, bytearray)):
            # Binary data
            processed_image = self.preprocess_image_from_binary(input_data)
        
        elif isinstance(input_data, str):
            # Base64 string
            processed_image = self.preprocess_image_from_base64(input_data)
        
        elif isinstance(input_data, (tf.Tensor, np.ndarray)):
            if isinstance(input_data, np.ndarray):
                input_data = tf.convert_to_tensor(input_data)
            
            if input_data.dtype in [tf.float32, tf.float64]:
                input_data = tf.cast(input_data * 255.0, tf.uint8)
            
            # ✅ DO NOT REMOVE BATCH DIM!
            if len(input_data.shape) != 4 or input_data.shape[1:] != (256, 256, 3):
                raise ValueError(f"Expected shape (None, 256, 256, 3), got {input_data.shape}")

            processed_image = preprocess_image(
                input_data,
                self.gaussian_kernel,
                self.sobel_x,
                self.sobel_y,
                self.laplacian_kernel
            )

        
        else:
            raise ValueError(f"Unsupported input type (cloud_classifier line 129): {type(input_data)}")
        
        # Run prediction
        predictions = self.model.predict(processed_image, verbose=0)
        
        confidence_scores = predictions[0]
        predicted_class_idx = int(np.argmax(confidence_scores))
        predicted_class = self.class_names[predicted_class_idx]
        confidence = float(confidence_scores[predicted_class_idx])
        
        return {
            'predicted_class': predicted_class,
            'confidence': confidence,
            'confidence_percentage': f"{confidence:.2%}",
            'all_predictions': {
                self.class_names[i]: {
                    'confidence': float(confidence_scores[i]),
                    'percentage': f"{float(confidence_scores[i]):.2%}"
                }
                for i in range(len(self.class_names))
            }
        }

    # Keep backward compatibility methods
    def predict_from_binary(self, image_binary):
        return self.predict(image_binary)

    def predict_from_base64(self, base64_string):
        return self.predict(base64_string)