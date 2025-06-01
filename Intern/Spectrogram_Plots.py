import librosa
import librosa.display
import matplotlib.pyplot as plt
import os

def plot_spectrogram(Y, sr, hop_length, audfile_name, fig_name, output_path='outputs', uniqueIdentifier='default', y_axis="linear"):
    # Ensure output directory exists
    os.makedirs(output_path, exist_ok=True)

    # Create figure
    plt.figure(figsize=(25, 10))
    librosa.display.specshow(Y, 
                             sr=sr, 
                             hop_length=hop_length, 
                             x_axis="s", 
                             y_axis=y_axis)
    plt.colorbar(format="%+2.f")
    plt.title(f"{fig_name} for {audfile_name}", fontsize=18)
    plt.tight_layout()

    # Create output filename with unique identifier
    
    output_file = os.path.join(output_path, f"{fig_name}_{uniqueIdentifier}.jpg")
    plt.savefig(output_file)
    plt.close()
