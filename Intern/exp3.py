import argparse
import librosa
import numpy as np
import scipy as sp
import AMPPHASE_PLOT  # your plotting module
import os


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Process audio file and plot amplitude & phase spectrum.')
    parser.add_argument('--file', type=str, required=True, help='Audio file name (in input/ folder)')
    parser.add_argument('--sampling-rate', type=int, required=True, help='Sampling rate to load the audio')
    parser.add_argument('--start-sample', type=int, required=True, help='Starting sample number for display')
    parser.add_argument('--num-samples', type=int, required=True, help='Number of samples to display (max 20000)')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output file')

    args = parser.parse_args()

    # Paths
    input_file = os.path.join('inputs' \
    '', args.file)

    print(f"\nAudio file selected is :: {args.file}")

    input_audio, sr = librosa.load(input_file, sr=args.sampling_rate)

    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nSampling Rate used for the audio file {args.file} :: {sr}")
    print(f"One sample lasts for {sample_duration:6f} seconds")
    print(f"Total number of samples in the audio file is::{tot_samples}")
    print(f"Audio duration is::{tot_samples * sample_duration:4.2f} seconds")

    st_idx = args.start_sample
    N_Samples = args.num_samples

    ft = sp.fft.fft(input_audio)

    magnitude = np.absolute(ft)
    frequency = np.linspace(0, sr, len(magnitude))

    phase = np.angle(ft, deg=True)

    STR_FIGNAME = ['AMP_SPECTRUM', 'PHASE_SPECTRUM']

    AMPPHASE_PLOT.PLOTSPECTRUM(
        input_audio=input_audio,
        sampling_rate=sr,
        frequency=frequency,
        magnitude=magnitude,
        phase=phase,
        audfile_name=args.file,
        FIG_NAME=STR_FIGNAME,
        output_path='outputs',
        uniqueIdentifier=args.unique_id,
        sampidx=st_idx,
        NSAMPLES=N_Samples
    )

    print('\nOperation completed')
