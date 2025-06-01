import librosa
import librosa.display
import matplotlib.pyplot as plt
import os

def plot_spectrogram(Y_SPECT, sr, hop_length, SC, SB, audfile_name, fig_name, output_path='outputs', uniqueIdentifier='default'):
    # Compute time axis
    frames = range(len(SC))
    t = librosa.frames_to_time(frames, hop_length=hop_length, sr=sr)
    
    # Configure plot
    plt.figure(figsize=(25, 15))
    plt.rcParams.update({'font.size': 22})
    
    # Log-Frequency Spectrogram
    plt.subplot(2, 1, 1)
    librosa.display.specshow(Y_SPECT, 
                             sr=sr,
                             hop_length=hop_length,
                             x_axis='s',
                             y_axis='log')
    plt.colorbar(format="%+2.f")
    plt.title(audfile_name + ' - ' + fig_name[0])
    plt.ylabel('Frequency (Hz)')

    # Spectral Centroid
    plt.subplot(2, 2, 3)
    plt.plot(t, SC, color="red", linewidth=4)
    plt.title(audfile_name + ' - ' + fig_name[1])
    plt.xlabel('Time (s)')
    plt.ylabel('Spectral Centroid (Hz)')

    # Spectral Bandwidth
    plt.subplot(2, 2, 4)
    plt.plot(t, SB, color="red", linewidth=4)
    plt.title(audfile_name + ' - ' + fig_name[2])
    plt.xlabel('Time (s)')
    plt.ylabel('Spectral Bandwidth (Hz)')

    plt.tight_layout()

    # Save figure
    os.makedirs(output_path, exist_ok=True)
    save_path = os.path.join(output_path, f"{uniqueIdentifier}_Spectral_Centroid_Bandwidth.jpg")
    plt.savefig(save_path)
    plt.show()
