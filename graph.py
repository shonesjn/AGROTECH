import pandas as pd
import matplotlib.pyplot as plt
import os

# Load CSV
df = pd.read_csv("backend/sensor_data.csv")

# Sample Number
df["Sample"] = range(1, len(df) + 1)

# Output folder
os.makedirs("output_graphs", exist_ok=True)

plt.figure(figsize=(12,6))

# Plot confidence values
plt.plot(
    df["Sample"],
    df["temperatureConfidence"],
    linewidth=2.8,
    label="Temperature",
    marker='o',
    markersize=3,
    markevery=5
)

plt.plot(
    df["Sample"],
    df["humidityConfidence"],
    linewidth=2.8,
    label="Humidity",
    marker='s',
    markersize=3,
    markevery=5
)

plt.plot(
    df["Sample"],
    df["moistureConfidence"],
    linewidth=2.8,
    label="Moisture",
    marker='^',
    markersize=3,
    markevery=5
)

plt.plot(
    df["Sample"],
    df["lightConfidence"],
    linewidth=2.8,
    label="Light",
    marker='D',
    markersize=3,
    markevery=5
)

# Formatting
plt.title("Individual Sensor Confidence", fontsize=16, fontweight="bold")
plt.xlabel("Sample Number", fontsize=13)
plt.ylabel("Confidence (%)", fontsize=13)

plt.xlim(1, len(df))
plt.ylim(0, 105)

plt.xticks(range(0, len(df)+1, 10))

plt.grid(True, linestyle="--", alpha=0.4)

plt.legend(
    loc="upper center",
    bbox_to_anchor=(0.5, -0.15),
    ncol=4,
    frameon=False
)

plt.tight_layout()

plt.savefig(
    "output_graphs/Figure2_IndividualSensorConfidence.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()