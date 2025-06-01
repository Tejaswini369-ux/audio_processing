import librosa
import numpy as np
import argparse
import os
import Spectrogram_Plots_5 as spectplots

def compute_and_plot_mel_features(input_file, sr_user, hop_length, n_fft, n_mels, unique_id, output_dir='outputs'):
    # Ensure output path exists
    os.makedirs(output_dir, exist_ok=True)
    audfile_name = os.path.basename(input_file)

    # Load audio
    input_audio, sr = librosa.load(input_file, sr=sr_user)
    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nAudio file selected is :: {audfile_name}")
    print(f"Sampling Rate used :: {sr}")
    print(f"Frame duration :: {sample_duration:6f} seconds")
    print(f"Total samples :: {tot_samples}")
    print(f"Total audio duration :: {tot_samples * sample_duration:4.2f} seconds")

    # 1. Plot MEL filter banks
    melf_banks = librosa.filters.mel(n_fft=n_fft, sr=sr_user, n_mels=n_mels)
    spectplots.plot_spectrogram(melf_banks, sr_user, audfile_name, 
                                 fig_name='MEL_FILTER_BANKS', 
                                 uniqueIdentifier=unique_id, 
                                 y_axis='linear')

    # 2. Compute MEL spectrogram and convert to dB
    mel_spectrogram = librosa.feature.melspectrogram(
        y=input_audio, sr=sr, n_fft=n_fft, hop_length=hop_length, n_mels=n_mels
    )
    log_mel_spectrogram = librosa.power_to_db(mel_spectrogram)

    # 3. Plot MEL spectrogram
    spectplots.plot_spectrogram(log_mel_spectrogram, sr_user, audfile_name, 
                                 fig_name='MEL_Spectrogram', 
                                 uniqueIdentifier=unique_id, 
                                 y_axis='mel')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate MEL Filter Bank and MEL Spectrogram plots from an audio file.')
    parser.add_argument('--file', type=str, required=True, help='Path to audio file (in audio1/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate for audio loading')
    parser.add_argument('--hop-length', type=int, required=True, help='Hop length (power of 2 recommended)')
    parser.add_argument('--nfft', type=int, required=True, help='Number of FFT components (power of 2)')
    parser.add_argument('--nmels', type=int, required=True, help='Number of Mel bands (less than 128)')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output image naming')

    args = parser.parse_args()

    compute_and_plot_mel_features(
        input_file=os.path.join('inputs', args.file),
        sr_user=args.sampling_rate,
        hop_length=args.hop_length,
        n_fft=args.nfft,
        n_mels=args.nmels,
        unique_id=args.unique_id
    )
