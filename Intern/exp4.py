import argparse
import librosa
import numpy as np
import os
import Spectrogram_Plots  # Your plotting module

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate Log-Amplitude and Log-Frequency Spectrograms from audio.')
    parser.add_argument('--file', type=str, required=True, help='Audio file name (in audio1/ folder)')
    parser.add_argument('--frame', type=int, required=True, help='Frame length (n_fft)')
    parser.add_argument('--hop', type=int, required=True, help='Hop length')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output files')

    args = parser.parse_args()

    # Set file paths
    input_file = os.path.join("inputs", args.file)
    output_dir = 'outputs'
    os.makedirs(output_dir, exist_ok=True)

    print(f"\nAudio file selected is :: {args.file}")

    # Load audio with original sampling rate
    input_audio, sr = librosa.load(input_file, sr=None)
    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nSampling Rate used for the audio file {args.file} :: {sr}")
    print(f"Frame Length selected for the audio file {args.file} :: {args.frame}")
    print(f"Hop Length used for the audio file {args.file} :: {args.hop}")
    print(f"One sample lasts for {sample_duration:.6f} seconds")
    print(f"Total number of samples in the audio file is::{tot_samples}")
    print(f"Audio duration is::{tot_samples * sample_duration:.2f} seconds")

    # STFT computation
    STFT = librosa.stft(input_audio, n_fft=args.frame, hop_length=args.hop)

    print(f"Number of frequency bins obtained after STFT::{STFT.shape[0]}")
    print(f"Number of frames obtained after STFT::{STFT.shape[1]}")

    # Power Spectrogram
    Y_STFT = np.abs(STFT) ** 2
    Y_log_scale = librosa.power_to_db(Y_STFT)

    STR_FIGNAME = ['Log_Amplitude_Spectrogram', 'Log_Frequency_Spectrogram']

    # Plot log-amplitude spectrogram
    Spectrogram_Plots.plot_spectrogram(
        Y_log_scale,
        sr,
        args.hop,
        audfile_name=args.file,
        fig_name=STR_FIGNAME[0],
        output_path=output_dir,
        uniqueIdentifier=args.unique_id
    )

    # Plot log-frequency spectrogram
    Spectrogram_Plots.plot_spectrogram(
        Y_log_scale,
        sr,
        args.hop,
        audfile_name=args.file,
        fig_name=STR_FIGNAME[1],
        output_path=output_dir,
        uniqueIdentifier=args.unique_id,
        y_axis="log"
    )

    print("\nOperation completed successfully.")
