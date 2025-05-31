import matplotlib.pyplot as plt
import librosa
import librosa.display
import numpy as np
import os

def root_zcr_plot(input_audio, feature_values, sampling_rate, hop_length, audio_filename, feature_name, output_path, uniqueIdentifier):
    # Convert frame indices to time
    frames = np.arange(len(feature_values))
    t_audio = librosa.frames_to_time(frames, hop_length=hop_length, sr=sampling_rate)

    plt.figure(figsize=(18, 12))

    # Plot input waveform
    plt.subplot(2, 1, 1)
    librosa.display.waveshow(input_audio, sr=sampling_rate, alpha=0.5, color='lime', label='Audio Waveform')
    plt.ylim((-1, 1))
    plt.title(f"Input Audio - {audio_filename}")
    plt.ylabel('Amplitude')
    plt.xlabel('Time (s)')
    plt.legend()

    # Plot feature (RMSE or ZCR)
    plt.subplot(2, 1, 2)
    librosa.display.waveshow(input_audio, sr=sampling_rate, alpha=0.3, color='gray', label='Audio Waveform')
    plt.plot(t_audio, feature_values, color="red", label=feature_name)
    
    # Set y-axis limits depending on feature
    if feature_name.upper() == 'ZCR':
        plt.ylim((0, 1))
        ylabel = 'Zero Crossing Rate'
    else:
        plt.ylim((0, max(feature_values) * 1.1))
        ylabel = 'Root Mean Square Energy'
    
    plt.title(f"{feature_name.upper()} Over Time - {audio_filename}")
    plt.ylabel(ylabel)
    plt.xlabel('Time (s)')
    plt.legend()

    # Ensure output directory exists
    os.makedirs(output_path, exist_ok=True)
    filename = f"{uniqueIdentifier}_{feature_name.upper()}_Plot.png"
    plt.savefig(os.path.join(output_path, filename))
    plt.close()
