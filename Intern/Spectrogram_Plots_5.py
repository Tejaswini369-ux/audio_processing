import librosa
import librosa.display
import matplotlib.pyplot as plt
import os
def plot_spectrogram(Y, sr, audfile_name,fig_name,uniqueIdentifier, x_axis = "linear", y_axis = None,output_path='outputs'):
    plt.figure(figsize=(25, 10))
    librosa.display.specshow(Y, 
                             sr=sr, 
                             x_axis=x_axis, 
                             y_axis=y_axis)
    plt.colorbar(format="%+2.f")
    plt.title(f"{fig_name} for {audfile_name}", fontsize=18)
    plt.tight_layout()
    plt.savefig(os.path.join(output_path, f"{fig_name}_{uniqueIdentifier}.jpg"))
    #plt.show()