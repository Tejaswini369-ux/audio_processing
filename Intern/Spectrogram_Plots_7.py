import librosa
import librosa.display
import matplotlib.pyplot as plt
import os

def plot_spectrogram(Y_SPECT, sr, hop_length, BER_AUDIO, audfile_name, fig_name, output_path='outputs', uniqueIdentifier='default'):
    frames = range(len(BER_AUDIO))
    t = librosa.frames_to_time(frames, hop_length=hop_length, sr=sr)
    
    # Plotting Log-Freq Spectrogram and Band Energy Ratio
    plt.figure(figsize=(25, 15))
    plt.rcParams.update({'font.size': 22})

    # Log-frequency spectrogram
    plt.subplot(2, 1, 1)
    librosa.display.specshow(
        Y_SPECT, sr=sr, hop_length=hop_length, x_axis='s', y_axis='log'
    )
    plt.colorbar(format="%+2.f")
    plt.title(f"{audfile_name}_{fig_name[0]}")
    plt.ylabel('Frequency (Hz)')

    # Band Energy Ratio
    plt.subplot(2, 1, 2)
    plt.plot(t, BER_AUDIO, color="red", linewidth=4)
    plt.title(f"{audfile_name}_{fig_name[1]}")
    plt.xlabel('Time (seconds)')
    plt.ylabel('Band Energy Ratio')

    plt.tight_layout()
    
    # Save plot
    filename = f"{uniqueIdentifier}_BER_LogSpectrogram.jpg"
    save_path = os.path.join(output_path, filename)
    plt.savefig(save_path)
    print(f"Saved plot to: {save_path}")
    
    plt.show()
