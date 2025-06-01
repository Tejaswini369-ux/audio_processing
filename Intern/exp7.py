import librosa
import numpy as np
import os
import argparse
import Spectrogram_Plots_7 as spectplots
import SPLIT_BAND_ENERGY_RATIO as SPER  # Assuming SPER contains helper functions
                           # like `calculate_split_frequency_bin` and `band_energy_ratio`

def compute_and_plot_ber_features(input_file, sr_user, frame_length, hop_length, split_freq, unique_id, output_dir='outputs'):
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

    # STFT computation
    SPECT = librosa.stft(input_audio, n_fft=frame_length, hop_length=hop_length)
    Y_SPECT = np.abs(SPECT) ** 2
    Y_SPECT_log_scale = librosa.power_to_db(Y_SPECT)

    print(f"\nNumber of frequency bins: {SPECT.shape[0]}")

    # Compute Band Energy Ratio
    Split_Frequency_Bin = SPER.calculate_split_frequency_bin(split_freq, sr_user, SPECT.shape[0])
    BER = SPER.band_energy_ratio(SPECT, split_freq, sr_user)

    fig_names = ['LOG_FREQ_SPECTROGRAM', 'BAND_ENERGY_RATIO']
    spectplots.plot_spectrogram(
        Y_SPECT_log_scale,
        sr_user,
        hop_length,
        BER,
        audfile_name,
        fig_name=fig_names,
        output_path='outputs',
        uniqueIdentifier=unique_id
    )
# ...existing code...

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Extract and plot Log-Frequency Spectrogram and Band Energy Ratio from an audio file.')
    parser.add_argument('--file', type=str, required=True, help='Path to audio file (inside audio1/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate for audio loading')
    parser.add_argument('--frame-length', type=int, required=True, help='Frame length (n_fft), typically power of 2')
    parser.add_argument('--hop-length', type=int, required=True, help='Hop length, typically power of 2')
    parser.add_argument('--split-freq', type=int, required=True, help='Split frequency for Band Energy Ratio')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output filenames')

    args = parser.parse_args()

    compute_and_plot_ber_features(
        input_file=os.path.join('inputs', args.file),
        sr_user=args.sampling_rate,
        frame_length=args.frame_length,
        hop_length=args.hop_length,
        split_freq=args.split_freq,
        unique_id=args.unique_id
    )
