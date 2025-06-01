import librosa
import numpy as np
import argparse
import os
import Spectrogram_Plots_6 as spectplots

def compute_and_plot_mfcc_features(input_file, sr_user, n_mfcc, unique_id, output_dir='outputs'):
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

    # Compute MFCCs and deltas
    mfccs = librosa.feature.mfcc(y=input_audio, sr=sr_user, n_mfcc=n_mfcc)
    delta_mfccs = librosa.feature.delta(mfccs)
    delta2_mfccs = librosa.feature.delta(mfccs, order=2)
    mfccs_features = np.concatenate((mfccs, delta_mfccs, delta2_mfccs))

    # Plot all
    fig_names = ['Mfccs', 'Delta_Mfccs', 'Delta2_Mfccs', 'Mfccs_Concat_Features']
    spectplots.plot_spectrogram(mfccs, delta_mfccs, delta2_mfccs, mfccs_features,
                                 sr_user, audfile_name, fig_name=fig_names,
                                 output_path='outputs', uniqueIdentifier=unique_id)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Extract and plot MFCCs and their deltas from an audio file.')
    parser.add_argument('--file', type=str, required=True, help='Path to audio file (in audio1/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate for audio loading')
    parser.add_argument('--nmfcc', type=int, required=True, help='Number of MFCCs to extract (<= 20)')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output image naming')

    args = parser.parse_args()

    compute_and_plot_mfcc_features(
        input_file=os.path.join('audio1', args.file),
        sr_user=args.sampling_rate,
        n_mfcc=args.nmfcc,
        unique_id=args.unique_id
    )
