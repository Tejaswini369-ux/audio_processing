import librosa
import librosa.display
import matplotlib.pyplot as plt
import os

def plot_spectrogram(Y, deltaY, deltaY1, deltaMFCCS_concat, sr, audfile_name, fig_name,
                     x_axis="s", output_path='outputs', uniqueIdentifier='default'):
    # Ensure output path exists
    os.makedirs(output_path, exist_ok=True)

    # Setup plot
    plt.figure(figsize=(25, 15))
    plt.rcParams.update({'font.size': 22})

    titles = [
        f"{audfile_name}_{fig_name[0]}",
        f"{audfile_name}_{fig_name[1]}",
        f"{audfile_name}_{fig_name[2]}",
        f"{audfile_name}_{fig_name[3]}"
    ]

    specs = [Y, deltaY, deltaY1, deltaMFCCS_concat]

    for i in range(4):
        plt.subplot(2, 2, i+1)
        librosa.display.specshow(specs[i], sr=sr, x_axis=x_axis)
        plt.colorbar(format="%+2.f")
        plt.title(titles[i])
        plt.ylabel('Index')

    plt.tight_layout()

    # Save with unique identifier
    output_file = os.path.join(output_path, f"Delta_MFCCS_Features_{uniqueIdentifier}.jpg")
    plt.savefig(output_file)
    plt.close()
