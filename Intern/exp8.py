import librosa
import numpy as np
import os
import argparse
import Spectrogram_Plots_8 as spectplots

def compute_and_plot_sc_sb_features(input_file, sr_user, frame_length, hop_length, unique_id, output_dir='outputs'):
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

    # STFT and log power spectrogram
    SPECT = librosa.stft(input_audio, n_fft=frame_length, hop_length=hop_length)
    Y_SPECT = np.abs(SPECT) ** 2
    Y_SPECT_log_scale = librosa.power_to_db(Y_SPECT)

    # Spectral Centroid
    SC = librosa.feature.spectral_centroid(y=input_audio, sr=sr, n_fft=frame_length, hop_length=hop_length)[0]

    # Spectral Bandwidth
    SB = librosa.feature.spectral_bandwidth(y=input_audio, sr=sr, n_fft=frame_length, hop_length=hop_length)[0]

    fig_names = ['LOG_FREQ_SPECTROGRAM', 'SPECTRAL_CENTROID', 'SPECTRAL_BANDWIDTH']
    spectplots.plot_spectrogram(
        Y_SPECT_log_scale,
        sr,
        hop_length,
        SC,
        SB,
        audfile_name,
        fig_name=fig_names,
        output_path=output_dir,
        uniqueIdentifier=unique_id
    )

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Plot Spectral Centroid and Spectral Bandwidth from audio file.')
    parser.add_argument('--file', type=str, required=True, help='Path to audio file (inside audio1/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate for loading audio')
    parser.add_argument('--frame-length', type=int, required=True, help='Frame length for STFT (power of 2)')
    parser.add_argument('--hop-length', type=int, required=True, help='Hop length for STFT (power of 2)')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output image filename')

    args = parser.parse_args()

    compute_and_plot_sc_sb_features(
        input_file=os.path.join('inputs', args.file),
        sr_user=args.sampling_rate,
        frame_length=args.frame_length,
        hop_length=args.hop_length,
        unique_id=args.unique_id
    )
