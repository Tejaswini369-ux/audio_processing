import RMSEZCRE_PLOT
import librosa
import argparse
import os

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Compute and plot RMSE and ZCR features from an audio file.')
    parser.add_argument('--file', type=str, required=True, help='Audio file name (in audio1/ folder)')
    parser.add_argument('--frame', type=int, required=True, help='Frame length')
    parser.add_argument('--hop', type=int, required=True, help='Hop length')
    parser.add_argument('--unique-id', type=str, required=True, help='Unique identifier for output files')

    args = parser.parse_args()

    # Paths
    input_file = os.path.join('audio1', args.file)
    output_dir = 'outputs'
    os.makedirs(output_dir, exist_ok=True)

    print(f"\nAudio file selected is :: {args.file}")

    # Load audio
    input_audio, sr = librosa.load(input_file, sr=None)
    sample_duration = 1 / sr
    tot_samples = len(input_audio)

    print(f"\nSampling Rate used for the audio file {args.file} :: {sr}")
    print(f"Frame Length selected for the audio file {args.file} :: {args.frame}")
    print(f"Hop Length used for the audio file {args.file} :: {args.hop}")
    print(f"One sample lasts for {sample_duration:6f} seconds")
    print(f"Total number of samples in the audio file is::{tot_samples}")
    print(f"Audio duration is::{tot_samples * sample_duration:4.2f} seconds")

    # Compute RMSE
    rmse = librosa.feature.rms(y=input_audio, frame_length=args.frame, hop_length=args.hop)[0]
    RMSEZCRE_PLOT.root_zcr_plot(input_audio, rmse, sr,args.hop, args.file, 'RMSE',output_path='outputs',
    uniqueIdentifier=args.unique_id)

    # Compute ZCR
    zcr = librosa.feature.zero_crossing_rate(y=input_audio, frame_length=args.frame, hop_length=args.hop)[0]
    RMSEZCRE_PLOT.root_zcr_plot(input_audio, zcr, sr,args.hop, args.file, 'ZCR',output_path='outputs',
    uniqueIdentifier=args.unique_id)
