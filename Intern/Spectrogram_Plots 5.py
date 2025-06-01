import librosa
import librosa.display
import matplotlib.pyplot as plt
def plot_spectrogram(Y, sr, audfile_name,fig_name, x_axis = "linear", y_axis = None,):
    plt.figure(figsize=(25, 10))
    librosa.display.specshow(Y, 
                             sr=sr, 
                             x_axis=x_axis, 
                             y_axis=y_axis)
    plt.colorbar(format="%+2.f")
    plt.title(audfile_name + '_' + fig_name)
    plt.tight_layout()
    plt.savefig(audfile_name + '_' + fig_name +'.jpg')
    #plt.show()