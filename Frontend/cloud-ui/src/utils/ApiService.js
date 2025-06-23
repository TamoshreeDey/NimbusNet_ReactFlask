const BASE_URL = "http://localhost:3500";

export class ApiService {
  static async uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Image upload failed");
    const result = await response.json();
    return result.image_url;
  }

  static async classifyCloudFromURL(imageUrl) {
    const response = await fetch(`${BASE_URL}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: imageUrl }),
    });

    if (!response.ok) throw new Error("Prediction failed");
    const result = await response.json();
    return result;
  }

  static async savePredictionHistory({ image_url, prediction, report }) {
    const payload = {
      image_url,
      prediction: {
        predicted_class: prediction.predicted_class,
        confidence_percentage: prediction.confidence_percentage,
      },
      report,
    };

    const response = await fetch(`${BASE_URL}/api/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to save prediction history");
    return await response.json();
  }

  static async getPredictionHistory({ from, to } = {}) {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const response = await fetch(`${BASE_URL}/api/history?${params.toString()}`, {
        method: "GET",
    });

    if (!response.ok) throw new Error("Failed to fetch prediction history");
    const result = await response.json();
    return result.history;
    }

}
